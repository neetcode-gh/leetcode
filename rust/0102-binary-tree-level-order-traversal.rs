use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        if let Some(root) = root {
            let mut frontier : Vec<(Rc<RefCell<TreeNode>>, u16)> = vec![(root, 0)];
            let mut res : Vec<Vec<i32>> = vec![];
            let mut len : u16 = 0;
            
            while let Some((node, depth)) = frontier.pop() {
                let val = node.borrow().val;
                
                if depth == len {
                    res.push(vec![val]);
                    len += 1;
                } else {
                    res[depth as usize].push(val);
                }
                
                if let Some(right) = node.borrow_mut().right.take() {
                    frontier.push((right, depth + 1));
                }
                
                if let Some(left) = node.borrow_mut().left.take() {
                    frontier.push((left, depth + 1));
                }
            }
            
            res
        } else {
            vec![]
        }
    }
}
