use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        Self::inorder(root).1
    }

    fn inorder(node : Option<Rc<RefCell<TreeNode>>>) -> (Option<i32>, bool) {
        if let Some(node) = node {
            let val = node.borrow().val;
            let (left_val, left_state) = Self::inorder(node.borrow_mut().left.take());
            let (right_val, right_state) = Self::inorder(node.borrow_mut().right.take());
            
            (Some(val), left_state && 
            right_state && 
            if let Some(left_val) = left_val {left_val < val} else {true} && 
            if let Some(right_val) = right_val {val < right_val} else {true})
        } else {
            (None, true)
        }
    }
}
