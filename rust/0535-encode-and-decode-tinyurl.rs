use std::collections::HashMap;

const BASE: &str = "http://tinyurl.com";

struct Codec {
    url_map: HashMap<String, String>,
}

impl Codec {
    fn new() -> Self {
        Self {
            url_map: HashMap::new(),
        }
    }

    // Encodes a URL to a shortened URL.
    fn encode(&mut self, longURL: String) -> String {
        let short_url = format!("{}{}", BASE, Self::generate_hash(&longURL));
        self.url_map.insert(short_url.clone(), longURL.clone());
        short_url
    }

    // Decodes a shortened URL to its original URL.
    fn decode(&self, shortURL: String) -> String {
        self.url_map.get(&shortURL).unwrap().clone()
    }

    fn generate_hash(url: &String) -> i32 {
        let mut hash = 5831;

        for ch in url.chars() {
            hash = ((hash << 5) + hash) + (ch as i32);
        }

        hash
    }
}
