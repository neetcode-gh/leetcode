/*

In this code we have to delete the node of a binary search tree the logic is as follows:

1) If the value of the current node is greater than the value of the key to be deleted go left

2) If the value of the current node is less than the value of the key to be deleted go right

3) If the value of the current node is the value to be deleted there can be two senarios :

a) The left side of the node is none in that case simply return the right side of the node

b) The right side of the node is none in that case simply return the left side of the node

c) Both left and right side of the node are not none in that case:

* Go to the right branch of the tree and then go as left as possible. Return the number

* The value of the node to be deleted should be replaced by the value return by the inorder_successor function

* Recursively call the delete node function in order to delete the leaf node whose value we returned from the inorder_successor function
  

*/


use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
  pub val: i32,
  pub left: Option<Rc<RefCell<TreeNode>>>,
  pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
  #[inline]
  pub fn new(val: i32) -> Self {
    TreeNode {
      val,
      left: None,
      right: None
    }
  }
}

struct Solution{}

impl Solution {
    pub fn delete_node(root: Option<Rc<RefCell<TreeNode>>>, key: i32)->Option<Rc<RefCell<TreeNode>>>{
        Solution::helper(root.as_ref(), key)
    }

    pub fn helper(root:Option<&Rc<RefCell<TreeNode>>>,key:i32)->Option<Rc<RefCell<TreeNode>>>{

        if root.is_none(){
            return None;
        }

        let current_node: &Rc<RefCell<TreeNode>> = root.unwrap();

        if current_node.borrow().val > key{
            let l =  Solution::helper(current_node.borrow().left.as_ref(), key);
            current_node.borrow_mut().left = l;
        }else if current_node.borrow().val < key {
            let r = Solution::helper(current_node.borrow().right.as_ref(), key);
            current_node.borrow_mut().right = r;
        }

        else{

            if current_node.borrow().left.is_none(){
                return current_node.borrow().right.clone();
            } else if current_node.borrow().right.is_none() {
                return current_node.borrow().left.clone();
            }

            else{

                let number = Solution::inorder_successor(current_node.borrow().right.as_ref(), key);
                if let Some(num) = number{
                    let r =  Solution::helper(current_node.borrow().right.as_ref(), num);
                    current_node.borrow_mut().right = r;
                    current_node.borrow_mut().val = num;
                }
            }
        }

        return Some(current_node.clone());

    }

    pub fn inorder_successor(root:Option<&Rc<RefCell<TreeNode>>>,value:i32)->Option<i32>{

                if let Some(node) = root {
                    if node.borrow().left.is_none(){
                        return Some(node.borrow().val);
                    }

                    else
                    {
                        return Solution::inorder_successor(node.borrow().left.as_ref(), value);
                    }
                }

                return None
    }
}