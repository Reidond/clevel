use clap::{App, Arg};
use ron;
use serde::Deserialize;
use std::fs::File;
use std::io;

#[derive(Debug, Deserialize)]
struct Model {
    crisps: Vec<u32>,
    a: u32,
    b: u32,
    t: u32,
    p: u32,
}

#[derive(Debug, Deserialize)]
struct Models {
    data: Vec<Model>,
}

impl Models {
    fn parse(raw_data: Vec<String>) -> Models {
        let mut data = Vec::new();

        for raw in raw_data {
            let normal = raw
                .split(",")
                .collect::<Vec<&str>>()
                .iter()
                .map(|s| s.parse::<u32>().unwrap())
                .collect::<Vec<u32>>();
            let (crisps, other) = &normal.split_at(normal.len() - 4);
            data.push(Model {
                crisps: crisps.to_vec(),
                a: other[0],
                b: other[1],
                t: other[2],
                p: other[3],
            })
        }

        Models { data }
    }

    fn parse_ron(path: String) -> io::Result<Models> {
        let f = File::open(&path)?;
        let models: Models = match ron::de::from_reader(f) {
            Ok(x) => x,
            Err(e) => panic!(format!("Failed to load: {}", e)),
        };
        Ok(models)
    }
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

fn find_head_from_models(models: Models) -> f64 {
    0.0
}

fn main() {
    // let model = vec![70, 90, 110, 85, 115];
    // let a = 55;
    // let b = 120;
    // let t = 100;

    // for crisp in model {
    //     if let Some(x) = phase_data(crisp, a, b) {
    //         println!("{:.3}", x)
    //     }
    // }

    // if let Some(x) = phase_data(t, a, b) {
    //     println!("{:.3}", x)
    // }
    let matches = App::new("clevel")
        .version("0.1.0")
        .author("Andrii Shafar <andreyshafar@gmail.com>")
        .about("Assessment of expert competence")
        .arg(
            Arg::with_name("models")
                .short("m")
                .long("model")
                .value_name("MODEL")
                .multiple(true)
                .takes_value(true)
                .required_if("file", "")
                .help("Your models"),
        )
        .arg(
            Arg::with_name("experts") // Probably not needed
                .short("e")
                .long("experts")
                .value_name("EXPERTS")
                .takes_value(true)
                .required(false)
                .help("How much experts"),
        )
        .arg(
            Arg::with_name("file")
                .value_name("FILE")
                .takes_value(true)
                .help("File with models"),
        )
        .get_matches();

    if matches.is_present("models") {
        println!(
            "{:?}",
            Models::parse(matches.values_of_lossy("models").unwrap())
        )
    } else {
        println!(
            "{:?}",
            Models::parse_ron(matches.value_of("file").unwrap().to_string())
        )
    }
}
