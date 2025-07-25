<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the given string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    The characters <code>A</code> through <code>Z</code> are mapped to the numbers from <code>1</code> to <code>26</code>. A mapped number can have at most <code>2</code> digits. In the given string of digits, we can explore all possible decodings by combining one or two consecutive digits. Think of this in terms of a decision tree and explore all paths. Can you derive a recurrence relation for this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Iterate over the string with index <code>i</code>. At each index, we have two choices: decode the current digit as a character with its mapped value, or combine the current digit with the next digit to form a two-digit value. The recurrence relation can be expressed as <code>dfs(i + 1) + dfs(i + 2)</code> where <code>dfs</code> is the recursive function. Also, consider edge cases, as not every two-digit number or a number with a leading zero is valid. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A brute-force recursive solution would result in <code>O(2^n)</code> time complexity. Can you think of a better way? Perhaps you should consider the repeated work of calling the recursion multiple times with the same parameter values and find a way to avoid this. Also, can you think about the base condition of this recursive function?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The base condition is to return <code>1</code> if <code>i</code> goes out of bounds. If the current digit is <code>'0'</code>, return <code>0</code>, as no character maps to <code>'0'</code>, making the string invalid. Use memoization to avoid repeated work by caching recursion results in an array or hash map and returning the stored value when the result is already calculated.
    </p>
</details>
