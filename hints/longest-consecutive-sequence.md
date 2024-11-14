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
    A brute force solution would be to consider every element from the array as the start of the sequence and count the length of the sequence formed with that starting element. This would be an <code>O(n<sup>2</sup>)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Is there any repeated work we are doing?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Yes, we should only start building the sequence with an element <code>num</code> such that <code>num - 1</code> is not present in the array. We can use a hash set for fast lookups.
    </p>
</details>