use serde_json;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(js_name = findHead)]
pub fn wasm_find_head_from_models(models_str: &str) -> Box<[JsValue]> {
    // Uncomment these 2 lines to add more info to console.error, but it will crash fn if everything is good.
    // use std::panic;
    // panic::set_hook(Box::new(console_error_panic_hook::hook));

    let models = serde_json::from_str(models_str).unwrap();
    let (expert, maxf) = crate::find_head_from_models(models);

    vec![JsValue::from_str(&expert), JsValue::from_f64(maxf)].into_boxed_slice()
}

#[wasm_bindgen(js_name = aggregatedScore)]
pub fn wasm_aggregated_score(models_str: &str) -> Vec<f64> {
    let models = serde_json::from_str(models_str).unwrap();
    crate::aggregated_score(&models)
}

#[wasm_bindgen(js_name = rankingOfExperts)]
pub fn wasm_ranking_of_experts(models_str: &str) -> Vec<f64> {
    let models = serde_json::from_str(models_str).unwrap();
    crate::ranking_of_experts(&models)
}
