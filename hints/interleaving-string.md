<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the length of the string <code>s1</code> and <code>n</code> is the length of the string <code>s2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    If the sum of the characters in <code>s1</code> and <code>s2</code> does not equal <code>s3</code>, we return <code>false</code>. Think in terms of recursion and visualize it as a decision tree, where we explore different combinations of portions from both strings. Can you determine the possible decisions at each recursion step?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the strings using indices <code>i</code>, <code>j</code>, and <code>k</code> for <code>s1</code>, <code>s2</code>, and <code>s3</code>, respectively. At each step, we extend the current path in two directions based on whether the <code>k</code>-th character of <code>s3</code> matches the current character of <code>s1</code> or <code>s2</code>. If any path returns <code>true</code>, we immediately return <code>true</code>. If <code>k</code> goes out of bounds, it means we have successfully formed the interleaved string, so we return <code>true</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    This approach is exponential. Can you think of a way to optimize it? Since <code>k</code> depends on <code>i</code> and <code>j</code>, it can be treated as a constant, as we can derive <code>k</code> using <code>i + j</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant computations. Treating <code>i</code> and <code>j</code> as states, we can use a hash map or a <code>2D</code> array to store the results.
    </p>
</details>
