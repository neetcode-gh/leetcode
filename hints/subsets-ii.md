<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * (2^n))</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute-force solution would involve creating a hash set and inserting every subset into it. Then, converting the hash set to a list and returning it. However, this approach would require extra space of <code>O(2^n)</code>. Can you think of a better way? Maybe you should sort the input array and observe which recusive calls are resposible to make duplicate subsets.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to generate subsets of an array. If the input contains duplicates, duplicate subsets may be created. To prevent this, we sort the array beforehand. For example, in <code>[1, 1, 2]</code>, sorting allows us to create subsets using the first <code>1</code> and skip the second <code>1</code>, ensuring unique subsets. How can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start by sorting the input array. Then, we recursively iterate through the array from left to right, extending recursive paths by including or excluding each element. To avoid duplicate subsets, we skip an element if it is the same as the previous one. Finally, we return the generated subsets as a list.
    </p>
</details>