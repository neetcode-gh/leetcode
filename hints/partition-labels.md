<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(m)</code> space, where <code>n</code> is the length of the string <code>s</code> and <code>m</code> is the number of unique characters in the string <code>s</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A character has a first and last index in the given string. Can you think of a greedy approach to solve this problem? Maybe you should try iterating over one of these two indices.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We store the last index of each character in a hash map or an array. As we iterate through the string, treating each index as a potential start of a partition, we track the end of the partition using the maximum last index of the characters seen so far in the current partition. Additionally, we maintain the size of the current partition using a variable, say <code>size</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We update the end of the current partition based on the maximum last index of the characters, extending the partition as needed. When the current index reaches the partition’s end, we finalize the partition, append its size to the output list, reset the size to <code>0</code>, and continue the same process for the remaining string.
    </p>
</details>
