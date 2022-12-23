/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sortedArrayToBST(nums []int) *TreeNode {
	if len(nums) == 0 {
		return nil
	}
	midx := len(nums) / 2
	root := &TreeNode{Val: nums[midx]}
	root.Left = sortedArrayToBST(nums[:midx])
	root.Right = sortedArrayToBST(nums[midx+1:])
	return root
}
