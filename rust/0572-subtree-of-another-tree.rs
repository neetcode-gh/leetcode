use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn is_same_tree(
        p: &Option<Rc<RefCell<TreeNode>>>,
        q: &Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        match (p, q) {
            (None, None) => true,
            (Some(_), None) => false,
            (None, Some(_)) => false,
            (Some(p_node), Some(q_node)) => {
                let mut p_node = p_node.borrow();
                let mut q_node = q_node.borrow();
                Solution::is_same_tree(&p_node.left, &q_node.left)
                    && Solution::is_same_tree(&p_node.right, &q_node.right)
                    && p_node.val == q_node.val
            }
        }
    }

    pub fn recursive(
        root: &Option<Rc<RefCell<TreeNode>>>,
        sub_root: &Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        match Solution::is_same_tree(root, sub_root) {
            true => true,
            false => match root {
                None => false,
                Some(node) => {
                    let node = node.borrow();
                    return Solution::recursive(&node.left, &sub_root)
                        || Solution::recursive(&node.right, &sub_root);
                }
            },
        }
    }

    pub fn is_subtree(
        root: Option<Rc<RefCell<TreeNode>>>,
        sub_root: Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        Solution::recursive(&root, &sub_root)
    }
}
