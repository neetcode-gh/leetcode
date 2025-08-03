<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> and <code>n</code> are the lengths of the strings <code>word1</code> and <code>word2</code>, respectively.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree, as we have choices at each recursion step. Can you determine the recurrence relation and base cases?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the strings using indices <code>i</code> and <code>j</code> for <code>word1</code> and <code>word2</code>, respectively. If the characters at the current indices match, we increment both indices without counting an operation. Otherwise, we have three choices: insert the character at the current index of <code>word1</code> (increment <code>j</code>), delete the current character of <code>word1</code> (increment <code>i</code>), or replace the character at index <code>i</code> in <code>word1</code> (increment both <code>i</code> and <code>j</code>).
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If index <code>i</code> goes out of bounds, we return the number of remaining characters in <code>word2</code> (using insert operations). If index <code>j</code> goes out of bounds, we return the number of remaining characters in <code>word1</code> (using delete operations). At each step, we return the minimum operation path. This approach is exponential. Can you think of a way to optimize it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results and avoid redundant calculations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
