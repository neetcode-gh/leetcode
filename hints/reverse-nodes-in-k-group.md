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
    A brute-force solution would involve storing the linked list node values in an array, reversing the <code>k</code> groups one by one, and then converting the array back into a linked list, requiring extra space of <code>O(n)</code>. Can you think of a better way? Perhaps you could apply the idea of reversing a linked list in-place without using extra space.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can avoid extra space by reversing each group in-place while keeping track of the head of the next group. For example, consider the list <code>[1, 2, 3, 4, 5]</code> with <code>k = 2</code>. First, we reverse the group <code>[1, 2]</code> to <code>[2, 1]</code>. Then, we reverse <code>[3, 4]</code>, resulting in <code>[2, 1, 4, 3, 5]</code>. While reversing <code>[3, 4]</code>, we need to link <code>1</code> to <code>4</code> and also link <code>3</code> to <code>5</code>. How can we efficiently manage these pointers?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We create a dummy node to handle modifications to the head of the linked list, pointing its <code>next</code> pointer to the current head. We then iterate <code>k</code> nodes, storing the address of the next group's head and tracking the tail of the previous group. After reversing the current group, we reconnect it by linking the previous group's tail to the new head and the current group's tail to the next group's head. This process is repeated for all groups, and we return the new head of the linked list.
    </p>
</details>