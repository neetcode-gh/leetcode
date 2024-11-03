use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn lowest_common_ancestor(
        root: Option<Rc<RefCell<TreeNode>>>,
        p: Option<Rc<RefCell<TreeNode>>>,
        q: Option<Rc<RefCell<TreeNode>>>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        let (p, q) = (p.unwrap().borrow().val, q.unwrap().borrow().val);
        let mut root = root;
        while let Some(node) = root {
            if p > node.borrow().val && q > node.borrow().val {
                root = node.borrow().right.clone();
            } else if p < node.borrow().val && q < node.borrow().val {
                root = node.borrow().left.clone();
            } else {
                return Some(node.clone());
            }
        }
        unreachable!()
    }
}
