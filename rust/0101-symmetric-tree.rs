use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    // Time O(n) - Space O(h)
    pub fn is_symmetric(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        // An internal function that checks two nodes situated in a
        // symmetrical position in the tree.
        fn dfs(left: Option<Rc<RefCell<TreeNode>>>, right: Option<Rc<RefCell<TreeNode>>>) -> bool {
            match (left, right) {
                (None, None) => true,
                (None, Some(_)) | (Some(_), None) => false,
                (Some(left), Some(right)) => {
                    left.borrow().val == right.borrow().val
                        && dfs(left.borrow().left.clone(), right.borrow().right.clone())
                        && dfs(left.borrow().right.clone(), right.borrow().left.clone())
                }
            }
        }
        match root {
            Some(root) => dfs(root.borrow().left.clone(), root.borrow().right.clone()),
            None => true,
        }
    }
}
