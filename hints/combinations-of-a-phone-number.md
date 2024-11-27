<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * (4^n))</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the input string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    We can use a hash map to pair all the digits with their corresponding letters. Think of this as a decision tree, where at each step, we have a digit, and we select one of multiple characters to proceed to the next digit in the given string <code>digits</code>. Can you think of an algorithm to generate all combinations of strings? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking where we select a character and process it, then backtrack to process another character. We recursively iterate on the given string with index <code>i</code>. At each step, we consider the letters from the hash map that correspond to the digit at the <code>i-th</code> index. Can you think of the base condition to stop this recursive path?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We initialize an empty string that represents the choices of the characters throughout the current recursive path. When the index <code>i</code> reaches the end of the string, we add the current string to the result list and return.
    </p>
</details>