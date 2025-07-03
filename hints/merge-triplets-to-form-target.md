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
    An important observation is that we can ignore triplets with values greater than the target triplet.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Specifically, if a triplet <code>t</code> has any element greater than the corresponding value in <code>target</code> (i.e., <code>t[0] > target[0]</code>, <code>t[1] > target[1]</code>, or <code>t[2] > target[2]</code>), we can discard it. This is because using such a triplet in operations would exceed the target values, making it invalid.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Now, from the remaining valid triplets, we only need to check whether the target triplet values exist. Since all values in the valid triplets are less than or equal to the corresponding values in the target triplet, finding the target triplet among them guarantees that we can achieve it.
    </p>
</details>
