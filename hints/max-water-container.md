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
    A brute force solution would be to try all pairs of bars in the array, compute the water for each pair, and return the maximum water among all pairs. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you think of an algorithm that runs in linear time and is commonly used in problems that deal with pairs of numbers? Find a formula to calculate the amount of water when we fix two heights.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the two pointer algorithm. One pointer is at the start and the other at the end. At each step, we calculate the amount of water using the formula <code>(j - i) * min(heights[i], heights[j])</code>. Then, we move the pointer that has the smaller height value. Can you think why we only move the pointer at smaller height?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    In the formula, the amount of water depends only on the minimum height. Therefore, it is appropriate to replace the smaller height value.
    </p>
</details>