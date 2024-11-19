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
    Can you think of an algorithm that is used to traverse the tree? Maybe in terms of recursion.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse the tree. Can you think of a way to simultaneously traverse both the trees?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We traverse both trees starting from their root nodes. At each step in the recursion, we check if the current nodes in both trees are either <code>null</code> or have the same value. If one node is <code>null</code> while the other is not, or if their values differ, we return <code>false</code>. If the values match, we recursively check their <code>left</code> and <code>right</code> subtrees. If any recursive call returns <code>false</code>, the result for the current recursive call is <code>false</code>.
    </p>
</details>