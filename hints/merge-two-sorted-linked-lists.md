<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n + m)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of <code>list1</code> and <code>m</code> is the length of <code>list2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve storing the values of both linked lists in an array, sorting the array, and then converting it back into a linked list. This approach would use <code>O(n)</code> extra space and is trivial. Can you think of a better way? Perhaps the sorted nature of the lists can be leveraged.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We create a dummy node to keep track of the head of the resulting linked list while iterating through the lists. Using <code>l1</code> and <code>l2</code> as iterators for <code>list1</code> and <code>list2</code>, respectively, we traverse both lists node by node to build a final linked list that is also sorted. How do you implement this?
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    For example, consider <code>list1 = [1, 2, 3]</code> and <code>list2 = [2, 3, 4]</code>. While iterating through the lists, we move the pointers by comparing the node values from both lists. We link the next pointer of the iterator to the node with the smaller value. For instance, when <code>l1 = 1</code> and <code>l2 = 2</code>, since <code>l1 < l2</code>, we point the iterator's next pointer to <code>l1</code> and proceed.
    </p>
    </p>
</details>