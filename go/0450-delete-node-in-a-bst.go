/*
 * The rules for deleting the nodes in the binary tree are as follows: 
 * 
 * 1. Traverse the tree to find the node that has the same value as the key being searched for
 * 2. If the key is greater than the current node value then traverse on the right branch of the current node and vice versa
 * 3. Once the node to be deleted is found then the following cases can happen :
 * 
 * a. The node is a root node so delete it without any problem
 * b. The left branch is not null while the right branch is null return the left node
 * c. The right branch is not null while left branch is null return the right branch
 * d. Both the left and right node are not null in that case traverse to the left most node of the right branch and replace the value of the node to be deleted with this value.
 * This is done as the elements to the left will be smaller and the elements to the right will always be bigger than the new value of the node
 * e. Recursively serach for the leftmost node of the right branch and delete it. This presents us with no problem as both the right and left branches of the leftmost node of the right branch will always be NULL and hence can be deleted safely
 *
 * */
type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func helper(root *TreeNode) *TreeNode{

	var prev *TreeNode = root;

	for root != nil{

		prev = root;
		root = root.Left;
	}

	return prev;
}

func find_delete(root *TreeNode,key int) *TreeNode{

	if root == nil{
		return nil;
	}else if(root.Val > key){

		root.Left = find_delete(root.Left,key);
	}else if(root.Val < key){
		root.Right = find_delete(root.Right,key);
	}else{

		if root.Right == nil && root.Left!=nil{
			return root.Left;
		}else if(root.Left == nil && root.Right!=nil){
			return root.Right;
		}else{
			var Temproray *TreeNode = helper(root.Right);
			root.Val = Temproray.Val;
			root.Right = find_delete(root.Right,Temproray.Val);
		}
	}
	return root;
}

func deleteNode(root *TreeNode, key int) *TreeNode {

	return find_delete(root,key); 

}
