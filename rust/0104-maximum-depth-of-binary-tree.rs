use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn max_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        if let Some(root) = root {
            let mut frontier : Vec<(i32, Rc<RefCell<TreeNode>>)> = vec![(1, root)];
            let mut max_depth : i32 = 1;
            
            while let Some((depth, curr)) = frontier.pop() {
                max_depth = depth.max(max_depth);
                
                if let Some(left) = curr.borrow_mut().left.take() {
                    frontier.push((depth + 1, left));
                }
                
                if let Some(right) = curr.borrow_mut().right.take() {
                    frontier.push((depth + 1, right));
                }
            }

            max_depth
        } else {
            0
        }
    }
}
