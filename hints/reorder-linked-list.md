<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the given list.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to store the node values of the list in an array, reorder the values, and create a new list. Can you think of a better way? Perhaps you can try reordering the nodes directly in place, avoiding the use of extra space.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    For example, consider the list <code>[1, 2, 3, 4, 5]</code>. To reorder the list, we connect the first and last nodes, then continue with the second and second-to-last nodes, and so on. Essentially, the list is split into two halves: the first half remains as is, and the second half is reversed and merged with the first half. For instance, <code>[1, 2]</code> will merge with the reversed <code>[5, 4, 3]</code>. Can you figure out a way to implement this reordering process? Maybe dividing the list into two halves could help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can divide the list into two halves using the fast and slow pointer approach, which helps identify the midpoint of the list. This allows us to split the list into two halves, with the heads labeled as <code>l1</code> and <code>l2</code>. Next, we reverse the second half (<code>l2</code>). After these steps, we proceed to reorder the two lists by iterating through them node by node, updating the next pointers accordingly. 
    </p>
</details>
