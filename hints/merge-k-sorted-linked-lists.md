<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * k)</code> time and <code>O(1)</code> space, where <code>k</code> is the total number of lists and <code>n</code> is the total number of nodes across all lists.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute-force solution would involve storing all <code>n</code> nodes in an array, sorting them, and converting the array back into a linked list, resulting in an <code>O(nlogn)</code> time complexity. Can you think of a better way? Perhaps consider leveraging the idea behind merging two sorted linked lists. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can merge two sorted linked lists without using any extra space. To handle <code>k</code> sorted linked lists, we can iteratively merge each linked list with a resultant merged list. How can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We iterate through the list array with index <code>i</code>, starting at <code>i = 1</code>. We merge the linked lists using <code>mergeTwoLists(lists[i], lists[i - 1])</code>, which returns the head of the merged list. This head is stored in <code>lists[i]</code>, and the process continues. Finally, the merged list is obtained at the last index, and we return its head.
    </p>
</details>