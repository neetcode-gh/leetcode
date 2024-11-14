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
    A brute-force solution would be to iterate through the array for each <code>nums[i]</code> and compute the product of the array except for that element. This would be an <code>O(n<sup>2</sup>)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Is there a way to avoid the repeated work? Maybe there is a technique with linear time?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the Prefix and Suffix technique. First, we iterate from left to right and store the prefix products for each index. Then, we iterate from right to left, maintaining the suffix product, and compute the result for each index.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    Try using prefix and suffix arrays, and then optimize the space.
    </p>
</details>