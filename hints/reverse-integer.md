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
    A straightforward approach would be to convert the given integer to a string, reverse it, convert it back to an integer using a long type, and return 0 if the result exceeds the integer range. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We initially declare the result <code>res</code> as an <code>int</code> with a value of <code>0</code>. We iterate through the given integer, extracting digits one by one. Before appending a digit to <code>res</code>, we consider multiple cases. Can you determine them? Maybe you should think about overflow.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Let <code>MAX</code> be the maximum positive integer and <code>MIN</code> be the minimum negative integer. We iterate through each digit and check for overflow before updating <code>res</code>. If <code>res > MAX / 10</code> or <code>res < MIN / 10</code>, return <code>0</code>. If <code>res == MAX / 10</code> and the current digit is greater than <code>MAX % 10</code>, return <code>0</code>. If <code>res == MIN / 10</code> and the current digit is less than <code>MIN % 10</code>, return <code>0</code>. Otherwise, append the digit to <code>res</code> and continue.
    </p>
</details>
