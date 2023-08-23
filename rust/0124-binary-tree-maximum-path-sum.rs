use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn max_path_sum(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        fn dfs(node: Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
            match node {
                None => (-1001, -1001),
                Some(node) => {
                    let (l_max, l_sum) = dfs(node.borrow().left.clone());
                    let (r_max, r_sum) = dfs(node.borrow().right.clone());
                    let val = node.borrow().val;
    
                    (
                        l_max.max(r_max).max(val + l_sum.max(0) + r_sum.max(0)),
                        val.max(val + l_sum).max(val + r_sum)
                    )
                }
            }
        }

        dfs(root).0
    }
}
