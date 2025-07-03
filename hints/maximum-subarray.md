<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would be to compute the sum of every subarray and return the maximum among them. This would be an <code>O(n^2)</code> approach. Can you think of a better way? Maybe you should consider a dynamic programming-based approach.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Instead of calculating the sum for every subarray, try maintaining a running sum. Maybe you should consider whether extending the previous sum or starting fresh with the current element gives a better result. Can you think of a way to track this efficiently?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We use a variable <code>curSum</code> to track the sum of the elements. At each index, we have two choices: either add the current element to <code>curSum</code> or start a new subarray by resetting <code>curSum</code> to the current element. Maybe you should track the maximum sum at each step and update the global maximum accordingly.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    This algorithm is known as Kadane's algorithm.
    </p>
</details>
