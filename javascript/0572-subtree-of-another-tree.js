/**
 * https://leetcode.com/problems/subtree-of-another-tree/
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    if (!root) return false

    if (isSame(root, subRoot)) return true

    const hasLeftTree = isSubtree(root.left, subRoot)
    const hasRightTree = isSubtree(root.right, subRoot)

    return hasLeftTree || hasRightTree
};

const isSame = (root, subRoot) => {
    const hasReachedEnd = !(root && subRoot)
    if (hasReachedEnd) return root === subRoot

    const isMismatch = root.val !== subRoot.val;
    if (isMismatch) return false

    const isLeftSame = isSame(root.left, subRoot.left)
    const isRightSame = isSame(root.right, subRoot.right)

    return isLeftSame && isRightSame
}

const hash = (val) =>
    require('crypto').createHash('md5').update(val).digest('hex')

const merkle = (root) => {
    if (!root) return '#'

    const { left, val, right } = root

    const leftMerkle = merkle(left)
    const rightMerkle = merkle(right)

    const merkleVal = [leftMerkle, val, rightMerkle].join('')
    const merkleHash = hash(merkleVal)

    root.merkle = merkleHash

    return root.merkle
}

const search = (root, subRoot) => {
    if (!root) return false

    const hasSamePath = root.merkle === subRoot.merkle
    if (hasSamePath) return true

    const left = search(root.left, subRoot)
    const right = search(root.right, subRoot)

    return left || right
}

var isSubtree = function (root, subRoot) {
    [root, subRoot].forEach(merkle)

    return search(root, subRoot)
}

const hashify = (root, hash, postOrderKey) => {
    if (!root) return '#'

    const left = hashify(root.left, hash, postOrderKey)
    const right = hashify(root.right, hash, postOrderKey)

    const key = [left, root.val, right].join('')

    if (!hash.has(key)) {
        hash.set(key, postOrderKey[0])
        postOrderKey[0]++
    }

    return hash.get(key)
}

var isSubtree = function (root, subRoot, hash = new Map(), postOrderKey = [0]) {
    hashify(root, hash, postOrderKey)

    const hashKey = [
        hashify(subRoot.left, hash, postOrderKey),
        subRoot.val,
        hashify(subRoot.right, hash, postOrderKey),
    ].join('')

    return hash.has(hashKey)
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/subtree-of-another-tree/
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    if (!subRoot) {
        return true
    } else if (!root) {
        return false
    } else if (isSameTree(root, subRoot)) {
        return true
    }

    const leftResult = isSubtree(root.left, subRoot)
    const rightResult = isSubtree(root.right, subRoot)

    return leftResult || rightResult
}

function isSameTree(root, subRoot) {
    if (!root && !subRoot) {
        return true
    } else if (!root || !subRoot) {
        return false
    } else if (root.val !== subRoot.val) {
        return false
    }

    const leftRes = isSameTree(root.left, subRoot.left)
    const rightRes = isSameTree(root.right, subRoot.right)

    return leftRes && rightRes
}
