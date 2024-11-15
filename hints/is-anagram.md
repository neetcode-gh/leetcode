<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n + m)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the string <code>s</code> and <code>m</code> is the length of the string <code>t</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to sort the given strings and check for their equality. This would be an <code>O(nlogn + mlogm)</code> solution. Though this solution is acceptable, can you think of a better way without sorting the given strings?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    By the definition of the anagram, we can rearrange the characters. Does the order of characters matter in both the strings? Then what matters?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can just consider maintaining the frequency of each character. We can do this by having two separate hash tables for the two strings. Then, we can check whether the frequency of each character in string <code>s</code> is equal to that in string <code>t</code> and vice versa.
    </p>
</details>