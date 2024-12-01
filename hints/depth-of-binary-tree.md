<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of nodes in the tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    From the definition of binary tree's maximum depth, Can you think of a way to achieve this recursively? Maybe you should consider the max depth of the subtrees first before computing the maxdepth at the root.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We use the Depth First Search (DFS) algorithm to find the maximum depth of a binary tree, starting from the <code>root</code>. For the subtrees rooted at the <code>left</code> and <code>right</code> children of the <code>root</code> node, we calculate their maximum depths recursively going through <code>left</code> and <code>right</code> subtrees. We return <code>1 + max(leftDepth, rightDepth)</code>. Why?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    The <code>+1</code> accounts for the current node, as it contributes to the current depth in the recursion call. We pass the maximum depth from the current node's left and right subtrees to its parent because the current maximum depth determines the longest path from the parent to a leaf node through this subtree.
    </p>
</details>