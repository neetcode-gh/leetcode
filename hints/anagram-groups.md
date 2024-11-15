<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n)</code> time and <code>O(m)</code> space, where <code>m</code> is the number of strings and <code>n</code> is the length of the longest string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to sort each string and group them using a hash map. This would be an <code>O(m * nlogn)</code> solution. Though this solution is acceptable, can you think of a better way without sorting the strings?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    By the definition of an anagram, we only care about the frequency of each character in a string. How is this helpful in solving the problem?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can simply use an array of size <code>O(26)</code>, since the character set is <code>a</code> through <code>z</code> (<code>26</code> continuous characters), to count the frequency of each character in a string. Then, we can use this array as the key in the hash map to group the strings.
    </p>
</details>