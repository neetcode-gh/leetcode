<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n ^ 2)</code> time and <code>O(n ^ 2)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A subsequence is formed by selecting elements while maintaining their order. Using recursion, we can generate all subsequences. The recursive function returns the length of the longest increasing subsequence up to index <code>i</code>, processing from left to right. At each step, we decide whether to include or exclude the current element.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Since the sequence must be increasing, we represent choices by adding <code>1</code> when including an element and <code>0</code> when excluding it. In recursion, how can we ensure the current element is greater than the previous one? Perhaps additional information is needed to process it.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can store the index of the previously chosen element as <code>j</code>, making it easier to process the current element at index <code>i</code>. If and only if <code>j == -1</code> or <code>nums[i] > nums[j]</code>, we include the current element and extend the recursive path. Can you determine the recurrence relation? At most, two recursive calls are made at each recursion step.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We stop the recursion when index <code>i</code> goes out of bounds and return <code>0</code> since no more elements can be added. The initial recursion call starts with <code>j = -1</code>. At each step, we include the current element if it is greater than the previous one and continue the recursion, or we exclude it and explore the next possibility. We return the maximum value obtained from both paths.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
    The time complexity of this approach is exponential. We can use memoization to store results of recursive calls and avoid recalculations. A hash map or a <code>2D</code> array can be used to cache these results.
    </p>
</details>
