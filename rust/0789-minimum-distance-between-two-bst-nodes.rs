use std::cell::RefCell;
use std::rc::Rc;

type OptNode = Option<Rc<RefCell<TreeNode>>>;

impl Solution {
    pub fn min_diff_in_bst(root: OptNode) -> i32 {
        let mut min = i32::MAX;
        let mut prev = None;

        Self::dfs(root, &mut prev, &mut min);
        min
    }

    fn dfs(root: Option<Rc<RefCell<TreeNode>>>, prev: &mut Option<i32>, min: &mut i32) {
        if let Some(node) = root {
            let node = node.borrow();

            Self::dfs(node.left.clone(), prev, min);

            if let Some(prev) = prev {
                *min = (*min).min(node.val - *prev)
            }
            *prev = Some(node.val);

            Self::dfs(node.right.clone(), prev, min);
        }
    }
}

