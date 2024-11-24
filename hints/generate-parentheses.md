<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(4^n / sqrt(n))</code> time and <code>O(n)</code> space, where <code>n</code> is the number of parenthesis pairs in the string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to generate all possible strings of size <code>2n</code> and add only the valid strings. This would be an <code>O(n * 2 ^ (2n))</code> solution. Can you think of a better way? Maybe you can use pruning to avoid generating invalid strings.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking with pruning. But what makes a string invalid? Can you think of a condition for this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    When the count of closing brackets exceeds the count of opening brackets, the string becomes invalid. Therefore, we can maintain two variables, <code>open</code> and <code>close</code>, to track the number of opening and closing brackets. We avoid exploring paths where <code>close > open</code>. Once the string length reaches <code>2n</code>, we add it to the result.
    </p>
</details>