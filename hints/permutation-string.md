<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the maximum of the lengths of the two strings.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to check every substring of <code>s2</code> with <code>s1</code> by sorting <code>s1</code> as well as the substring of <code>s2</code>. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe we can use the freqency of the characters of both the strings as we did in checking anagrams.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We return false if the length of <code>s1</code> is greater than the length of <code>s2</code>. To count the frequency of each character in a string, we can simply use an array of size <code>O(26)</code>, since the character set consists of <code>a</code> through <code>z</code> (<code>26</code> continuous characters). Which algorithm can we use now?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We use a sliding window approach on <code>s2</code> with a fixed window size equal to the length of <code>s1</code>. To track the current window, we maintain a running frequency count of characters in <code>s2</code>. This frequency count represents the characters in the current window. At each step, if the frequency count matches that of <code>s1</code>, we return <code>true</code>.
    </p>
</details>