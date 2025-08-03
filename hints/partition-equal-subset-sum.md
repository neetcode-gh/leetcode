<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * t)</code> time and <code>O(n * t)</code> space, where <code>n</code> is the size of the input array and <code>t</code> is half the sum of the array elements.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    If the sum of the array elements is not even, we can immediately return <code>false</code>. Think in terms of recursion, where we try to build a subset with a sum equal to half of the total sum. If we find such a subset, the remaining elements will automatically form another subset with the same sum. The entire array can also be considered as one subset, with the other being empty. Can you visualize this as a decision tree to process the array recursively?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the array with index <code>i</code>. At each step, we decide whether to include the current element in the subset or not. Instead of forming the subset explicitly, can you think of a better approach? Maybe you only need to track the subset sum rather than generating the subset itself.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can track the subset sum using a variable <code>curSum</code>. At each step, we make two recursive calls. If adding the current element does not exceed the target, we include it. If either path leads to a solution, we immediately return <code>true</code>. Can you determine the base case for this recursion? All elements in the array are positive.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    If <code>curSum</code> equals half the sum of the array elements, we return <code>true</code>. If index <code>i</code> goes out of bounds, we return <code>false</code>. This solution is exponential, but we can use memoization to cache recursive call results and avoid redundant computations. We can use a hash map or a <code>2D</code> array with dimensions <code>n * t</code>, where <code>n</code> is the size of the input array and <code>t</code> is half the sum of the input array elements.
    </p>
</details>
