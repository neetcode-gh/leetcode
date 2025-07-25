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
    A brute force approach would iterate through the range of numbers from <code>0</code> to <code>n</code>, checking if each number is present in the given array. If a number is missing, it is returned. This results in an <code>O(n^2)</code> solution. Can you think of a better way? Maybe a data structure could help optimize this process.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a hash set by inserting the given array elements into it. Then, we iterate through the range of numbers from <code>0</code> to <code>n</code> and use the hash set for <code>O(1)</code> lookups to find the missing number. Can you think of a way to further optimize this? Maybe a bitwise operator could be useful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use bitwise XOR. When two identical numbers are XORed, the result is <code>0</code>. Using this property, we can efficiently find the missing number.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We first compute the bitwise XOR of numbers from <code>0</code> to <code>n</code>. Then, we iterate through the array and XOR its elements as well. The missing number remains in the final XOR result since all other numbers appear twice—once in the range and once in the array—while the missing number is XORed only once.
    </p>
</details>
