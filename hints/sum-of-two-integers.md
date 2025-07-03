<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(1)</code> time and <code>O(1)</code> space.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would use the addition operator. Can you think of a way to perform addition without using it? Maybe you should consider solving this using bit manipulation.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the bitwise XOR operator to perform addition. If both <code>a</code> and <code>b</code> have <code>1</code> at the same bit position, the sum at that position is <code>0</code>, and a carry of <code>1</code> is generated. If the bits are different, the sum at that position is <code>1</code>. Additionally, we account for the carry from the previous step in the next iteration.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We iterate bit by bit from <code>0</code> to <code>31</code> since the given integers are 32-bit. We track the carry, initially set to <code>0</code>, and initialize the result as <code>res</code>. During iteration, the XOR of the bits at the <code>i</code>-th position of both integers and the carry determines the current bit of <code>res</code>. How can you handle negative numbers?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    To handle negative numbers, if the final result exceeds the maximum positive 32-bit integer, it means the number should be negative. We adjust it using bitwise operations: flipping the bits with <code>res ^ ((2 ^ 32) - 1)</code> and applying <code>~</code> to restore the correct two’s complement representation. This ensures the result correctly represents signed 32-bit integers.
    </p>
</details>
