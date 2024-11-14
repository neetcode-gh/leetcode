<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m)</code> time and <code>O(1)</code> space for each <code>encode()</code> and <code>decode()</code> call, where <code>m</code>  is the sum of lengths of all the strings.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to use a non-ascii character as a delimiter. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Try to encode and decode the strings using a smart approach based on the lengths of each string. How can you differentiate between the lengths and any numbers that might be present in the strings?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use an encoding approach where we start with a number representing the length of the string, followed by a separator character (let's use <code>#</code> for simplicity), and then the string itself. To decode, we read the number until we reach a <code>#</code>, then use that number to read the specified number of characters as the string.
    </p>
</details>