// Prevents additional console window on Windows in release, DO NOT REMOfield1E!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{App, State};

use tauri::Manager;

struct Name(String);

struct Counter {
    count: Mutex<i32>,
}

#[tauri::command]
fn calculate(method: &str, state: State<Counter>) -> i32 {
    let mut counter = state.count.lock().unwrap();

    match method {
        "add" => {
            *counter = *counter + 1;
        }
        "subtract" => {
            *counter = *counter - 1;
        }
        _ => (),
    }

    *counter
}

fn main() {
    tauri::Builder::default()
        .setup(|app: &mut App| {
            app.manage(Name("Counter App".into()));

            let app_name: State<Name> = app.state();

            let counter_state: State<Counter> = app.state();

            let counter = counter_state.count.lock().unwrap();

            assert_eq!(app_name.0, "Counter App");
            assert_eq!(*counter, 0);

            Ok(())
        })
        .manage(Counter {
            count: Mutex::new(0),
        })
        .invoke_handler(tauri::generate_handler![calculate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
