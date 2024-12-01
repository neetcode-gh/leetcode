<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of nodes.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
   You can observe that the in-order traversal helps divide the array into two halves based on the root node: the left part corresponds to the left subtree, and the right part corresponds to the right subtree. Can you think of how we can get the index of the root node in the in-order array? Maybe you should look into the pre-order traversal array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    From the pre-order traversal, we know that the first node is the root node. Using this information, can you now construct the binary tree?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    After getting the root node from pre-order traversal, we then look for the index of that node in the in-order array. We can linearly search for the index but this would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe we can use a data structure to get the index of a node in <code>O(1)</code>?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use a hash map to get the index of any node in the in-order array in <code>O(1)</code> time. How can we implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
    We use Depth First Search (DFS) to construct the tree. A global variable tracks the current index in the pre-order array. Indices <code>l</code> and <code>r</code> represent the segment in the in-order array for the current subtree. For each node in the pre-order array, we create a node, find its index in the in-order array using the hash map, and recursively build the left and right subtrees by splitting the range <code>[l, r]</code> into two parts for the left and right subtrees.
    </p>
</details>