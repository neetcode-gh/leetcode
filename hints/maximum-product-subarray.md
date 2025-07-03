<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where  <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to find the product for every subarray and then return the maximum among all the products. This would be an <code>O(n ^ 2)</code> approach. Can you think of a better way? Maybe you should think of a dynamic programming approach.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Try to identify a pattern by finding the maximum product for an array with two elements and determining what values are needed when increasing the array size to three. Perhaps you only need two values when introducing a new element.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We maintain both the minimum and maximum product values and update them when introducing a new element by considering three cases: starting a new subarray, multiplying with the previous max product, or multiplying with the previous min product. The max product is updated to the maximum of these three, while the min product is updated to the minimum. We also track a global max product for the result. This approach is known as Kadane's algorithm.
    </p>
</details>
