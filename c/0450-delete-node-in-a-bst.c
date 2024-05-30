
//  Definition for a binary tree node.
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
#include <time.h>
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
};

struct TreeNode* InorderPrefix(struct TreeNode*root){

	struct TreeNode*prev = root;
	while(root!=NULL){
		prev = root;
		root = root->left;
	}

	return prev;
}

struct TreeNode* DeleteNode(struct TreeNode* root,int key){


	if(root->val > key){

		root->left = DeleteNode(root->left,key);
	}


	else if(root->val < key){
		root->right = DeleteNode(root->right,key);
	}

	else if(root->val == key){
		if(root->left == NULL && root->right == NULL){
			return NULL;
		}

		else if(root->left == NULL && root->right != NULL){
			return root->right;
		}


		else if(root->left != NULL && root->right == NULL){
			return root->left;
		}

		else{
			struct TreeNode*InorderNode = InorderPrefix(root->right);
			root->val = InorderNode->val;
			root->right = DeleteNode(root->right, InorderNode->val);
		}
	}
	return root;
}

struct TreeNode* deleteNode(struct TreeNode* root, int key) {

	if(root == NULL){
		return NULL;
	}


	return 	DeleteNode(root,key);


}
