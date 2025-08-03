<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would iterate through the array, checking each element using a nested loop. If a duplicate is found, we continue to the next element; otherwise, the current element is the required number. This results in an <code>O(n^2)</code> solution. Can you think of a better way? Maybe a data structure can help detect duplicates efficiently.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We use a hash set, iterating through the array and adding elements that are not in the set while removing those that are already present. After the iteration, the required number remains in the hash set. This results in an <code>O(n)</code> space solution. Can you further optimize it? Maybe a bitwise operator could be useful here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Think about the bitwise XOR <code>("^")</code>. What is the result when two identical numbers are XORed?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    When two identical numbers are XORed, they cancel out, resulting in zero. Since every number appears twice except for one, the XOR of the entire array gives the number that appears only once.
    </p>
</details>
