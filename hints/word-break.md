<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * m * t)</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the string <code>s</code>, <code>m</code> is the number of words in <code>wordDict</code>, and <code>t</code> is the maximum length of any word in <code>wordDict</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think of this problem in terms of recursion, where we explore all possibilities. We iterate through the given string <code>s</code>, attempting to pick a word from <code>wordDict</code> that matches a portion of <code>s</code>, and then recursively continue processing the remaining string. Can you determine the recurrence relation and base condition?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The base condition is to return <code>true</code> if we reach the end of the string <code>s</code>. At each recursive call with index <code>i</code> iterating through <code>s</code>, we check all words in <code>wordDict</code> and recursively process the remaining string by incrementing <code>i</code> by the length of the matched word. If any recursive path returns <code>true</code>, we immediately return <code>true</code>. However, this solution is exponential. Can you think of an optimization? Maybe you should consider an approach that avoids repeated work.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can avoid recalculating results for recursive calls by using memoization. Since we iterate with index <code>i</code>, we can use a hash map or an array of the same length as <code>s</code> to cache the results of recursive calls and prevent redundant computations.
    </p>
</details>
