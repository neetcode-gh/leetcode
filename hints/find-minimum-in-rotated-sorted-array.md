<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(logn)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to do a linear search on the array to find the minimum element. This would be an <code>O(n)</code> solution. Can you think of a better way? Maybe an efficient searching algorithm is helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Given that the array is rotated after sorting, elements from the right end are moved to the left end one by one. This creates two parts of a sorted array, separated by a deflection point caused by the rotation. For example, consider the array <code>[3, 4, 1, 2]</code>. Here, the array is rotated twice, resulting in two sorted segments: <code>[3, 4]</code> and <code>[1, 2]</code>. And the minimum element will be the first element of the right segment. Can you do a binary search to find this cut?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We perform a binary search on the array with pointers <code>l</code> and <code>r</code>, which belong to two different sorted segments. For example, in <code>[3, 4, 5, 6, 1, 2, 3]</code>, <code>l = 0</code>, <code>r = 6</code>, and <code>mid = 3</code>. At least two of <code>l</code>, <code>mid</code>, and <code>r</code> will always be in the same sorted segment. Can you find conditions to eliminate one half and continue the binary search? Perhaps analyzing all possible conditions for <code>l</code>, <code>mid</code>, and <code>r</code> would help. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    There will be two conditions where <code>l</code> and <code>mid</code> will be in left sorted segment or <code>mid</code> and <code>r</code> will be in right sorted segement.
    If <code>l</code> and <code>mid</code> in sorted segement, then <code>nums[l] < nums[mid]</code> and the minimum element will be in the right part. If <code>mid</code> and <code>r</code> in sorted segment, then <code>nums[m] < nums[r]</code> and the minimum element will be in the left part. After the binary search we end up finding the minimum element.
    </p>
</details>