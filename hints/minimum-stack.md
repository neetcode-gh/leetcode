<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(1)</code> time for each function call and <code>O(n)</code> space, where <code>n</code> is the maximum number of elements present in the stack.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to always check for the minimum element in the stack for the <code>getMin()</code> function call. This would be an <code>O(n)</code> appraoch. Can you think of a better way? Maybe <code>O(n)</code> extra space to store some information. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a stack to maintain the elements. But how can we find the minimum element at any given time? Perhaps we should consider a prefix approach.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We use an additional stack to maintain the prefix minimum element. When popping elements from the main stack, we should also pop from this extra stack. However, when pushing onto the extra stack, we should push the minimum of the top element of the extra stack and the current element onto this extra stack.
    </p>
</details>