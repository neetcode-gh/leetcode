<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n ^ 3)</code> time and <code>O(n ^ 2)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to simulate the process recursively by passing the array to the recursive function. At each step, iterate through the array, pop an element, and recursively apply the same process to the two subarrays on both sides of the popped element, returning the maximum result from all recursive paths. This approach is exponential. Can you think of a way to optimize it? Maybe you should consider observing the subproblems instead of modifying the array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Instead of passing the array, we can pass the range of indices <code>l</code> and <code>r</code> that need to be processed. We pad the input array with <code>1</code>s on both sides for easier computation, but <code>l</code> and <code>r</code> represent the first and last indices of the original input array. Can you think of a reverse engineering approach for popping elements?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We determine the result by considering each element as the last one to be popped in the current range. For each element, we calculate its value by multiplying it with the elements at <code>l - 1</code> and <code>r + 1</code>, then recursively solve the subproblems for the ranges <code>(l, i - 1)</code> and <code>(i + 1, r)</code>, where <code>i</code> is the current element in the given range. Can you think of a way to optimize and avoid redundant calculations?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant calculations. A hash map or a <code>2D</code> array can be used to store results since the recursive function parameters <code>l</code> and <code>r</code> are within the range of the input array size.
    </p>
</details>
