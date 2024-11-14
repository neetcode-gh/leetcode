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
    A brute force solution would be to check every pair of numbers in the array. This would be an <code>O(n<sup>2</sup>)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you think of an algorithm by taking the advantage of array being sorted?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the two-pointer algorithm. We keep two pointers, one at the start and the other at the end of the array. If the sum of the numbers at the two pointers is greater than the <code>target</code>, decrement the right pointer, else increment the left pointer. Repeat this process until you find a valid pair.
    </p>
</details>