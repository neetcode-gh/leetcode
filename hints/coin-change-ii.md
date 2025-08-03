<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * a)</code> time and <code>O(n * a)</code> space, where <code>n</code> is the number of coins and <code>a</code> is the given amount.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    As we need to find the total number of combinations, think in terms of recursion and visualize it as a decision tree where multiple coin choices are available at each recursion step. Can you determine a way to allow picking the same coin multiple times? Maybe you should consider the decisions made at each recursion step.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The given coins are unique. We recursively iterate through the coins array using index <code>i</code>, tracking the collected amount along the current path. At each step, we can either skip the current coin or pick it, ensuring the total does not exceed the target. To allow picking the same coin multiple times, we recurse with the same index but an updated amount, generating different combinations.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If we reach the target amount, we return <code>1</code>. The recursion stops if the index goes out of bounds. We count all possible ways and return the total. This approach is exponential. Can you think of a way to optimize it? Maybe you should consider an approach to avoid redundant computations.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant computations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
