<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the given integer.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A straightforward approach would be to iterate from <code>0</code> to <code>n</code> using <code>i</code>, and for each <code>i</code>, iterate through its bits to count the number of set bits. This would result in an <code>O(n \log n)</code> approach. Can you think of a better way? Maybe you should try identifying a pattern by observing the bitwise representation of consecutive numbers.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    For example, to compute set bits for <code>7</code>, add <code>1</code> to the count of set bits in <code>3</code>, which was previously computed by adding <code>1</code> to the count of set bits in <code>1</code>. Observing the pattern, for numbers less than <code>4</code>, add <code>1</code> to the count from two positions before. For numbers less than <code>8</code>, add <code>1</code> to the count from four positions before. Can you derive a dynamic programming relation from this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We find an offset for the current number based on the number before <code>offset</code> positions. The dynamic programming relation is <code>dp[i] = 1 + dp[i - offset]</code>, where <code>dp[i]</code> represents the number of set bits in <code>i</code>. The offset starts at <code>1</code> and updates when encountering a power of <code>2</code>. To simplify the power of <code>2</code> check, if <code>offset * 2</code> equals the current number, we update <code>offset</code> to the current number.
    </p>
</details>
