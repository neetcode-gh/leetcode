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
    Given a 32-bit integer, what is the position of bit <code>i</code> after reversing the bits? Maybe you should observe the bit positions before and after reversal to find a pattern.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    After reversing the bits, the bit at position <code>i</code> moves to position <code>31 - i</code>. Can you use this observation to construct the reversed number efficiently?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We initialize <code>res</code> to <code>0</code> and iterate through the bits of the given integer <code>n</code>. We extract the bit at the <code>i</code>-th position using <code>((n >> i) & 1)</code>. If it is <code>1</code>, we set the corresponding bit in <code>res</code> at position <code>(31 - i)</code> using <code>(res |= (1 << (31 - i)))</code>.
    </p>
</details>
