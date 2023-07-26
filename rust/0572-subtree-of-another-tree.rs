use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn is_subtree(
        root: Option<Rc<RefCell<TreeNode>>>,
        sub_root: Option<Rc<RefCell<TreeNode>>>
    ) -> bool {
        fn is_sametree(a: Option<Rc<RefCell<TreeNode>>>, b: Option<Rc<RefCell<TreeNode>>>) -> bool {
            match (a, b) {
                (None, None) => true,
                (Some(a), Some(b)) => {
                    a.borrow().val == b.borrow().val
                        && is_sametree(a.borrow().left.clone(), b.borrow().left.clone())
                        && is_sametree(a.borrow().right.clone(), b.borrow().right.clone())
                }
                _ => false,
            }
        }
    
        match (root, sub_root) {
            (_, None) => true,
            (None, _) => false,
            (Some(root), Some(sub_root)) => {
                if is_sametree(Some(root.clone()), Some(sub_root.clone())) {
                    return true;
                }
                Solution::is_subtree(root.borrow().left.clone(), Some(sub_root.clone()))
                    || Solution::is_subtree(root.borrow().right.clone(), Some(sub_root))
            }
        }
    }
}
