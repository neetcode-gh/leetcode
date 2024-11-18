<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(m)</code> space, where <code>n</code> is the length of the given string and <code>m</code> is the number of unique characters in the string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Which characters would you replace in a string to make all its characters unique? Can you think with respect to the frequency of the characters?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    It is always optimal to replace characters with the most frequent character in the string. Why? Because using the most frequent character minimizes the number of replacements required to make all characters in the string identical. How can you find the number of replacements now?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    The number of replacements is equal to the difference between the length of the string and the frequency of the most frequent character in the string. A brute force solution would be to consider all substrings, use a hash map for frequency counting, and return the maximum length of the substring that has at most <code>k</code> replacements. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use the sliding window approach. The window size will be dynamic, and we will shrink the window when the number of replacements exceeds <code>k</code>. The result will be the maximum window size observed at each iteration.
    </p>
</details>