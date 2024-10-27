use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn kth_smallest(root: Option<Rc<RefCell<TreeNode>>>, k: i32) -> i32 {
        fn into_vec(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
            match root {
                None => vec![],
                Some(node) => into_vec(node.borrow().left.clone())
                    .into_iter()
                    .chain(vec![node.borrow().val])
                    .chain(into_vec(node.borrow().right.clone()))
                    .collect(),
            }
        }
        
        into_vec(root)[k as usize - 1] 
    }
}
