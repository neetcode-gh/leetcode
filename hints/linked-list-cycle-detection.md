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
    A naive approach would be to use a hash set, which takes <code>O(1)</code> time to detect duplicates. Although this solution is acceptable, it requires <code>O(n)</code> extra space. Can you think of a better solution that avoids using extra space? Maybe there is an efficient algorithm which uses two pointers.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the fast and slow pointers technique, which is primarily used to detect cycles in a linked list. We iterate through the list using two pointers. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If the list has a cycle, these two pointers will eventually meet. Why does this work?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    When there is no cycle in the list, the loop ends when the fast pointer becomes <code>null</code>. If a cycle exists, the fast pointer moves faster and continuously loops through the cycle. With each step, it reduces the gap between itself and the slow pointer by one node. For example, if the gap is <code>10</code>, the slow pointer moves by <code>1</code>, increasing the gap to <code>11</code>, while the fast pointer moves by <code>2</code>, reducing the gap to <code>9</code>. This process continues until the fast pointer catches up to the slow pointer, confirming a cycle.
    </p>
</details>