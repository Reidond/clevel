use ron;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io;

#[derive(Debug, Deserialize, Serialize)]
pub struct Model {
    pub crisps: Vec<u32>,
    pub a: u32,
    pub b: u32,
    pub t: u32,
    pub p: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct NormalizedModel {
    pub phased_crisps: Vec<f64>,
    pub phased_t: f64,
}

impl Model {
    pub fn parse(raw_data: Vec<String>) -> Vec<Model> {
        let mut models = Vec::new();

        for raw in raw_data {
            let normal = raw
                .split(",")
                .collect::<Vec<&str>>()
                .iter()
                .map(|s| s.parse::<u32>().unwrap())
                .collect::<Vec<u32>>();
            let (crisps, other) = &normal.split_at(normal.len() - 4);
            models.push(Model {
                crisps: crisps.to_vec(),
                a: other[0],
                b: other[1],
                t: other[2],
                p: other[3],
            })
        }

        models
    }

    pub fn parse_ron(path: String) -> io::Result<Vec<Model>> {
        let f = File::open(&path)?;
        let models: Vec<Model> = match ron::de::from_reader(f) {
            Ok(x) => x,
            Err(e) => panic!(format!("Failed to load: {}", e)),
        };
        Ok(models)
    }
}
