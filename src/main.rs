use clap::{App, Arg};
use clevel::*;

fn execute(input: &[String]) -> Result<f64, ClevelError> {
    let app = App::new("clevel")
        .version(*crate::VERSION)
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
            Arg::with_name("file")
                .value_name("FILE")
                .takes_value(true)
                .help("File with models"),
        );

    let matches = app.get_matches_from(input);

    let models = if matches.is_present("models") {
        Model::parse(matches.values_of_lossy("models").unwrap())
    } else {
        Model::parse_ron(matches.value_of("file").unwrap().to_string()).unwrap()
    };

    Ok(find_head_from_models(models))
}

fn main() {
    let args: Vec<_> = std::env::args().collect();

    println!("{:.3}", execute(&args).unwrap());
}
