impl Solution {
    pub fn simplify_path(path: String) -> String {
        let mut stack = vec![];

        for i in path.split("/") {
            match i {
                ".." => {
                    if !stack.is_empty() {
                        stack.pop();
                    }
                }
                "." | "" => continue,
                _ => stack.push(i),
            };
        }

        format!("/{}", stack.join("/"))
    }
}