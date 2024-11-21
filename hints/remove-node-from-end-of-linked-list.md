<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(N)</code> time and <code>O(1)</code> space, where <code>N</code> is the length of the given list.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve storing the nodes of the list into an array, removing the <code>nth</code> node from the array, and then converting the array back into a linked list to return the new head. However, this requires <code>O(N)</code> extra space. Can you think of a better approach to avoid using extra space? Maybe you should first solve with a two pass approach.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a two-pass approach by first finding the length of the list, <code>N</code>. Since removing the <code>nth</code> node from the end is equivalent to removing the <code>(N - n)th</code> node from the front, as they both mean the same. How can you remove the node in a linked list? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    For example, consider a three-node list <code>[1, 2, 3]</code>. If we want to remove <code>2</code>, we update the <code>next</code> pointer of <code>1</code> (initially pointing to <code>2</code>) to point to the node after <code>2</code>, which is <code>3</code>. After this operation, the list becomes <code>[1, 3]</code>, and we return the head. But, can we think of a more better approach? Maybe a greedy calculation can help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can solve this in one pass using a greedy approach. Move the <code>first</code> pointer <code>n</code> steps ahead. Then, start another pointer <code>second</code> at the head and iterate both pointers simultaneously until <code>first</code> reaches <code>null</code>. At this point, the <code>second</code> pointer is just before the node to be removed. We then remove the node that is next to the <code>second</code> pointer. Why does this work?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
    This greedy approach works because the <code>second</code> pointer is <code>n</code> nodes behind the <code>first</code> pointer. When the <code>first</code> pointer reaches the end, the <code>second</code> pointer is exactly <code>n</code> nodes from the end. This positioning allows us to remove the <code>nth</code> node from the end efficiently.
    </p>
</details>