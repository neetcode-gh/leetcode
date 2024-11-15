<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute-force solution would be to iterate through the array with index <code>i</code> and compute the product of the array except for that index element. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Is there a way to avoid the repeated work? Maybe we can store the results of the repeated work in an array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the prefix and suffix technique. First, we iterate from left to right and store the prefix products for each index in a prefix array, excluding the current index's number. Then, we iterate from right to left and store the suffix products for each index in a suffix array, also excluding the current index's number. Can you figure out the solution from here? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use the stored prefix and suffix products to compute the result array by iterating through the array and simply multiplying the prefix and suffix products at each index.
    </p>
</details>