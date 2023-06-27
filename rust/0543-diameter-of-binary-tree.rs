use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        fn dfs(root: Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
            match root {
                None => (0, 0),
                Some(node) => {
                    let (l_diameter, l_max) = dfs(node.borrow().left.clone());
                    let (r_diameter, r_max) = dfs(node.borrow().right.clone());
                    (
                        1 + l_diameter.max(r_diameter),
                        l_max.max(r_max.max(l_diameter + r_diameter)),
                    )
                }
            }
        }
    
        dfs(root).1
    }
}
