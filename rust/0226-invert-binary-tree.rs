use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn invert_tree(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        if root == None {
            return None;
        }

        let mut temp = root.clone();
        let mut root_ref = temp.as_mut().unwrap().borrow_mut();

        let left = root_ref.left.take();
        let right = root_ref.right.take();

        root_ref.left = Solution::invert_tree(right);
        root_ref.right = Solution::invert_tree(left);

        root
    }
}
