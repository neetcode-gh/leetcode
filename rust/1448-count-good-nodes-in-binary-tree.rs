use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn good_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let root = root.unwrap();
        let val = root.borrow().val;
        let mut count = 0;
        let mut stack = Vec::with_capacity(10_000);
        stack.push((root, val as i16));
        
        while let Some((curr, mut max)) = stack.pop() {
            let mut curr = curr.borrow_mut();
            if curr.val as i16 >= max {
                count += 1;
                max = curr.val as i16;
            }
            if curr.left.is_some() {
                let mut left = None;
                std::mem::swap(&mut left, &mut curr.left);
                stack.push((left.unwrap(), max));
            }
            if curr.right.is_some() {
                let mut right = None;
                std::mem::swap(&mut right, &mut curr.right);
                stack.push((right.unwrap(), max));
            }
        }
        
        count
    }
}
