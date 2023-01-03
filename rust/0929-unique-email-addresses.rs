use std::collections::HashSet;

impl Solution {
    pub fn num_unique_emails(emails: Vec<String>) -> i32 {
        let mut unique_emails = HashSet::new();

        for email in emails {
            let (local, domain) = email.split_once("@").unwrap();

            let mut local = local.split("+").take(1).next().unwrap().replace(".", "");

            local = format!("{}@{}", local, domain);
            
            unique_emails.insert(local);
        }
        unique_emails.len() as i32
    }
}