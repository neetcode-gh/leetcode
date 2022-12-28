class Solution {
  func isValidBST(_ root: TreeNode?) -> Bool {
      return isBst(root, min: Int.min, max: Int.max)
  }

  private func isBst(_ node: TreeNode?, min: Int, max: Int) -> Bool {
    if node == nil { return true }
    if node!.val <= min || node!.val >= max { return false }
      let lc = isBst(node?.left, min: min, max: node!.val)
      let rc = isBst(node?.right, min: node!.val, max: max)
    return lc && rc
  }
}
