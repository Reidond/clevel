use std::cmp::Ordering;

pub mod error;
pub mod models;

pub use error::ClevelError;
pub use models::{Model, NormalizedModel};

use serde_json;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

trait FloatIterExt {
    fn float_min(&mut self) -> f64;
    fn float_max(&mut self) -> f64;
}

impl<T> FloatIterExt for T
where
    T: Iterator<Item = f64>,
{
    fn float_max(&mut self) -> f64 {
        self.fold(std::f64::NAN, f64::max)
    }

    fn float_min(&mut self) -> f64 {
        self.fold(std::f64::NAN, f64::min)
    }
}

lazy_static::lazy_static! {
    pub static ref VERSION: &'static str = {
        let mut version = env!("CARGO_PKG_VERSION").to_string();
        if let Some(v) = option_env!("GIT_HASH") {
            version.push_str("-");
            version.push_str(v);
        }
        if cfg!(debug_assertions) {
            version.push_str("-debug");
        }
        Box::leak(Box::new(version))
    };
}

fn phase_data(crisp: u32, a: u32, b: u32) -> Option<f64> {
    match Some(f64::default()) {
        Some(_) if crisp <= a => Some(0.0),
        Some(_) if a < crisp && crisp <= (a + b) / 2 => {
            let first = (crisp - a) as f64;
            let second = (b - a) as f64;
            return Some(2.0 * f64::powf(first / second, 2.0));
        }
        Some(_) if (a + b) / 2 < crisp && crisp < b => {
            let first = (b - crisp) as f64;
            let second = (b - a) as f64;
            return Some(1.0 - 2.0 * f64::powf(first / second, 2.0));
        }
        Some(_) if crisp >= b => Some(1.0),
        _ => None,
    }
}

fn phase_data_vec(models: &Vec<Model>) -> Vec<NormalizedModel> {
    let mut normalized_models: Vec<NormalizedModel> = vec![];
    for item in models {
        let phased_crisps = item
            .crisps
            .iter()
            .map(|num| phase_data(*num, item.a, item.b).unwrap())
            .collect::<Vec<f64>>();
        let phased_t = phase_data(item.t, item.a, item.b).unwrap();
        normalized_models.push(NormalizedModel {
            phased_crisps,
            phased_t,
        })
    }
    normalized_models
}

fn weighting_normalization(models: &Vec<Model>) -> Vec<f64> {
    let pvec = models.iter().map(|model| model.p).collect::<Vec<u32>>();
    let sum_of_pvec = pvec.iter().sum::<u32>();
    pvec.iter()
        .map(|p| *p as f64 / sum_of_pvec as f64)
        .collect::<Vec<f64>>()
}

fn calc_desired_value(crisp: f64, min_crisp: f64, max_crisp: f64, t: f64) -> f64 {
    let first = (t - crisp).abs();
    let second: Vec<f64> = vec![t - min_crisp, max_crisp - t];
    let max_second = second.iter().cloned().float_max();
    1.0 - (first / max_second)
}

fn desired_values(models: &Vec<Model>) -> Vec<Vec<f64>> {
    let mut vec_of_vec: Vec<Vec<f64>> = vec![];
    let normalized_models = phase_data_vec(models);
    for nm in normalized_models {
        let vv: Vec<f64> = nm
            .phased_crisps
            .iter()
            .map(|num: &f64| {
                let max_val = nm.phased_crisps.iter().cloned().float_max();
                let min_val = nm.phased_crisps.iter().cloned().float_min();
                calc_desired_value(*num, min_val, max_val, nm.phased_t)
            })
            .collect();
        vec_of_vec.push(vv)
    }
    vec_of_vec
}

fn simplify_desired_values(dv: Vec<Vec<f64>>) -> Vec<f64> {
    let mut new_dv: Vec<f64> = vec![];

    for v in dv {
        for i in v {
            new_dv.push(i)
        }
    }

    new_dv
}

fn initialize_matrix(models: &Vec<Model>) -> simple_matrix::Matrix<f64> {
    let dv = desired_values(&models);
    let simple_dv = simplify_desired_values(dv);

    let rows = models.len();
    let cols = models[0].crisps.len();

    let matrix: simple_matrix::Matrix<f64> =
        simple_matrix::Matrix::from_iter(rows, cols, simple_dv.iter().cloned());

    matrix
}

pub fn aggregated_score(models: &Vec<Model>) -> Vec<f64> {
    let weights = weighting_normalization(&models);
    let matrix = initialize_matrix(&models);

    let mut temp: Vec<f64> = vec![];

    for col in 0..matrix.cols() {
        let get_col = matrix.get_col(col).unwrap().collect::<Vec<&f64>>();
        let mut res: Vec<f64> = vec![];

        for row in 0..matrix.rows() {
            res.push(*get_col[row] * weights[row])
        }

        temp.push(res.iter().sum())
    }

    temp
}

pub fn find_head_from_models(models: Vec<Model>) -> f64 {
    let weights = weighting_normalization(&models);
    let dv = desired_values(&models);
    let simple_dv = simplify_desired_values(dv);

    let rows = models.len();
    let cols = models[0].crisps.len();

    let matrix: simple_matrix::Matrix<&f64> =
        simple_matrix::Matrix::from_iter(rows, cols, simple_dv.iter());

    let mut aggregation_estimates = aggregated_score(matrix, weights);

    aggregation_estimates.sort_by(|a, b| a.partial_cmp(b).unwrap_or(Ordering::Greater));

    aggregation_estimates.iter().cloned().float_max()
}

#[wasm_bindgen]
pub fn find_head_from_models_wasm(models_str: &str) -> f64 {
    let models = serde_json::from_str(models_str).unwrap();

    let weights = weighting_normalization(&models);
    let dv = desired_values(&models);
    let simple_dv = simplify_desired_values(dv);

    let rows = models.len();
    let cols = models[0].crisps.len();

    let matrix: simple_matrix::Matrix<&f64> =
        simple_matrix::Matrix::from_iter(rows, cols, simple_dv.iter());

    let mut aggregation_estimates = aggregated_score(matrix, weights);

    aggregation_estimates.sort_by(|a, b| a.partial_cmp(b).unwrap_or(Ordering::Greater));

    aggregation_estimates.iter().cloned().float_max()
}
