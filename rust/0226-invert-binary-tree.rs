use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn invert_tree(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        root.map(|node| {
            {
              let mut node_ref = node.borrow_mut();
              let left = node_ref.left.take();
              let right = node_ref.right.take();
              node_ref.right = Solution::invert_tree(left);
              node_ref.left = Solution::invert_tree(right);
            }
            node
        })
    }
}
