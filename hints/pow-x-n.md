<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(logn)</code> time and <code>O(logn)</code> space, where <code>n</code> is the given integer.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would be to iterate linearly up to <code>n</code>, multiplying by <code>x</code> each time to find <code>(x^n)</code>. If <code>n</code> is negative, return <code>(1 / (x^n))</code>; otherwise, return <code>(x^n)</code>. Can you think of a better way? Maybe a recursive approach would be more efficient.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    For example, to calculate <code>2^6</code>, instead of multiplying <code>2</code> six times, we compute <code>2^3</code> and square the result. The same logic applies recursively to find <code>2^3</code> and further break down the multiplication. What should be the base case for this recursion? Maybe you should consider the term that cannot be further broken down.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    In <code>(x^n)</code>, if <code>x</code> is <code>0</code>, we return <code>0</code>. If <code>n</code> is <code>0</code>, we return <code>1</code>, as any number raised to the power of <code>0</code> is <code>1</code>. Otherwise, we compute <code>(x^(n/2))</code> recursively and square the result. If <code>n</code> is odd, we multiply the final result by <code>x</code>. What should be the logic if <code>n</code> is negative? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We start the recursion with the absolute value of <code>n</code>. After computing the result as <code>res</code>, we return <code>res</code> if <code>n</code> is non-negative; otherwise, we return <code>(1 / res)</code>. 
    </p>
</details>
