<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of nodes in the given tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to store the node values in an array, sort it, and then return the <code>k-th</code> value from the sorted array. This would be an <code>O(nlogn)</code> solution due to sorting. Can you think of a better way? Maybe you should try one of the traversal technique.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse the tree. Since the tree is a Binary Search Tree (BST), we can leverage its structure and perform an in-order traversal, where we first visit the left subtree, then the current node, and finally the right subtree. Why? Because we need the <code>k-th</code> smallest integer, and by visiting the left subtree first, we ensure that we encounter smaller nodes before the current node. How can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We keep a counter variable <code>cnt</code> to track the position of the current node in the ascending order of values. When <code>cnt == k</code>, we store the current node's value in a global variable and return. This allows us to identify and return the <code>k-th</code> smallest element during the in-order traversal.
    </p>
</details>