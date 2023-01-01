use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        Self::inorder(root).windows(2).all(|window| window[0] < window[1])
    }

    fn inorder(node : Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        if let Some(node) = node {
            let mut res = Self::inorder(node.borrow_mut().left.take());
            res.push(node.borrow().val);
            res.extend(&Self::inorder(node.borrow_mut().right.take()));
            res
        } else {
            Vec::with_capacity(10_000)
        }
    }
}
