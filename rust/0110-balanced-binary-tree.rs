use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn is_balanced(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        fn dfs(root: Option<Rc<RefCell<TreeNode>>>) -> (bool, i32) {
            match root {
                None => (true, 0),
                Some(node) => {
                    let (l_balanced, l_max) = dfs(node.borrow().left.clone());
                    let (r_balanced, r_max) = dfs(node.borrow().right.clone());
                    let balanced = l_balanced && r_balanced && (l_max - r_max).abs() <= 1;
                    (balanced, 1 + l_max.max(r_max))
                }
            }
        }
    
        dfs(root).0
    }
}
