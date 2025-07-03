<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the length of the string <code>s</code> and <code>n</code> is the length of the string <code>p</code>. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree, where we explore different combinations to match the strings when encountering <code>*</code>. Multiple decisions are made at each step to find a valid matching path. Can you determine the possible decisions at each recursion step?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the strings using indices <code>i</code> and <code>j</code> for <code>s</code> and <code>p</code>, respectively. If the characters match or <code>p[j]</code> is <code>'.'</code>, we increment both <code>i</code> and <code>j</code> to process the remaining strings. When the next character of string <code>p</code> is <code>'*'</code>, we have two choices: skip it (treating it as zero occurrences) or match one or more characters (if <code>s[i]</code> matches <code>p[j]</code>), incrementing <code>i</code> accordingly.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If both indices go out of bounds, we return <code>true</code>; otherwise, we return <code>false</code>. If any recursive path returns <code>true</code>, we immediately return <code>true</code>. This approach is exponential. Can you think of a way to optimize it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant calculations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
