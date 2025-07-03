<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    There are two cases when adding <code>1</code> to a number. If the rightmost digit is less than <code>9</code>, we simply increment it. Otherwise, we set it to <code>0</code> and apply the same process to the preceding digit.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We iterate through the given <code>digits</code> from right to left using index <code>i</code>. If the current digit is less than <code>9</code>, we increment it and return the array. Otherwise, we set the digit to <code>0</code> and continue. If the loop completes without returning, we insert <code>1</code> at the beginning of the array and return it.
    </p>
</details>
