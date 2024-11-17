<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(1)</code> time for <code>set()</code>, <code>O(logn)</code> time for <code>get()</code>, and <code>O(m * n)</code> space, where <code>n</code> is the total number of values associated with a key, and <code>m</code> is the total number of keys.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you think of a data structure that is useful for storing key-value pairs? Perhaps a hash-based data structure where we not only store unique elements but also associate additional information with each element?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We store key-value pairs in a hash map. In this case, we store the keys as usual, but instead of a single value, we store a list of values, each paired with its corresponding timestamp. This allows us to implement the <code>set()</code> method in <code>O(1)</code>. How can you leverage this hash map to implement the <code>get()</code> method?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A brute force solution would involve linearly going through every value associated with the key and returning the most recent value with a timestamp less than or equal to the given timestamp. This approach has a time complexity of <code>O(n)</code> for each <code>get()</code> call. Can you think of a better way? Since the timestamps in the value list are sorted in ascending order by default, maybe an efficient searching algorithm could help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use binary search because the timestamps in the values list are sorted in ascending order. This makes it straightforward to find the value with the most recent timestamp that is less than or equal to the given timestamp.
    </p>
</details>