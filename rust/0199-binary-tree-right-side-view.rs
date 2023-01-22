use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn right_side_view(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        
        if let Some(root) = root {
            let mut frontier : VecDeque<(Rc<RefCell<TreeNode>>, usize)> = VecDeque::from([(root, 0)]);
            let mut res = Vec::with_capacity(100);
            let mut res_len : usize = 0;

            while let Some((node, depth)) = frontier.pop_front() {
                let val = node.borrow().val;
                let left = node.borrow_mut().left.take();
                let right = node.borrow_mut().right.take();

                if res_len == depth {
                    res.push(val);
                    res_len += 1;
                } else {
                    res[res_len - 1] = val;
                }

                if let Some(left) = left {
                    frontier.push_back((left, depth + 1));
                }

                if let Some(right) = right {
                    frontier.push_back((right, depth + 1));
                }
            }

            res
        } else {
            vec![]
        }
    }
}
