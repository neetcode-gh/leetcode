<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the length of the string <code>text1</code> and <code>n</code> is the length of the string <code>text2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree. Can you determine the possible decisions at each step? Maybe you should consider iterating through both strings recursively at the same time.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    At each recursion step, we have two choices: if the characters at the current indices of both strings match, we move both indices forward and extend the subsequence. Otherwise, we explore two paths by advancing one index at a time and recursively finding the longest subsequence. We return the maximum length between these two choices. This approach is exponential. Can you think of a way to optimize it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We return <code>0</code> if either index goes out of bounds. To optimize, we can use memoization to cache recursive call results and avoid redundant calculations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
