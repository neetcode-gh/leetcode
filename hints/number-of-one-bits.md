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
    The given integer is a <code>32</code>-bit integer. Can you think of using bitwise operators to iterate through its bits? Maybe you should consider iterating <code>32</code> times.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We iterate <code>32</code> times <code>(0 to 31)</code> using index <code>i</code>. The expression <code>(1 << i)</code> creates a bitmask with a set bit at the <code>i</code>-th position. How can you check whether the <code>i</code>-th bit is set in the given number? Maybe you should consider using the bitwise-AND <code>("&")</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Since the mask has a set bit at the <code>i</code>-th position and all <code>0</code>s elsewhere, we can perform a bitwise-AND with <code>n</code>. If <code>n</code> has a set bit at the <code>i</code>-th position, the result is positive; otherwise, it is <code>0</code>. We increment the global count if the result is positive and return it after the iteration.
    </p>
</details>
