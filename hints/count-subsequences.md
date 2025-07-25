<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the length of the string <code>s</code> and <code>n</code> is the length of the string <code>t</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree, as we need to explore all subsequences of <code>s</code>. Can you determine the possible decisions at each recursion step?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the strings using indices <code>i</code> and <code>j</code> for <code>s</code> and <code>t</code>, respectively. At each recursion step, we can either skip the current character of <code>s</code> or include it in the current path if it matches the current character of <code>t</code>. Can you determine the base conditions for this recursive function?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If index <code>j</code> goes out of bounds, we return <code>1</code> as a valid subsequence is found. If index <code>i</code> goes out of bounds first, we return <code>0</code>. At each recursion step, we return the sum of both paths. This approach is exponential. Can you think of a way to optimize it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant computations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
