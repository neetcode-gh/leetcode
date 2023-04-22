use std::rc::Rc;
use std::cell::RefCell;
use std::cmp;
impl Solution {
    pub fn is_balanced(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        if let Some(root) = root {
            let mut left_height = Self::height(root.borrow().left.as_ref());
            let mut right_height = Self::height(root.borrow().right.as_ref());
            let height_diff = (right_height - left_height).abs();
            let mut left_balanced = Self::is_balanced(root.borrow_mut().left.take());
            let mut right_balanced = Self::is_balanced(root.borrow_mut().right.take());

            height_diff <= 1 && left_balanced && right_balanced
        } else {
            true
        }
    }

    pub fn height(root: Option<&Rc<RefCell<TreeNode>>>) -> i32 {
        if let Some(root) = root {
            let left_height = Self::height(root.borrow().left.as_ref());
            let right_height = Self::height(root.borrow().right.as_ref());

            1 + cmp::max(left_height, right_height)
        } else {
            0
        }
    }
}
