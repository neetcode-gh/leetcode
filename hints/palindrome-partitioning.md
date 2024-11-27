<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * (2^n))</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the input string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    For a given string there are <code>2^n</code> possible partitions because at each index we have two decisions: we can either partition and start a new string, or continue without partitioning. Can you think of an algorithm to recursively traverse all combinations?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to recursively traverse the string with indices <code>j</code> (start of the current substring) and <code>i</code> (current iterating index). At each step, we either skip partitioning at the current index or, if the substring from <code>j</code> to <code>i</code> is a palindrome, make a partition, update <code>j = i + 1</code>, and start a new substring. The base condition to stop the recursion is when <code>j</code> reaches the end of the string. How do you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start with <code>j = 0</code>, <code>i = 0</code> and a temporary list which stores the substrings from the partitions. Then we recursively iterate the string with the index <code>i</code>. At each step we apply the <code>2</code> decisions accordingly. At the base condition of the recursive path, we make a copy of the current partition list and add it to the result.
    </p>
</details>