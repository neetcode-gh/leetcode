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
    A brute force solution would be to do a linear search on the array to find the target element. This would be an <code>O(n)</code> solution. Can you think of a better way? Maybe an efficient searching algorithm is helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Given that the array is rotated after sorting, elements from the right end are moved to the left end one by one, creating two sorted segments separated by a deflection point due to the rotation. For example, consider the array <code>[3, 4, 1, 2]</code>, which is rotated twice, resulting in two sorted segments: <code>[3, 4]</code> and <code>[1, 2]</code>. In a fully sorted array, it's easy to find the target. So, if you can identify the deflection point (cut), you can perform a binary search on both segments to find the target element. Can you use binary search to find this cut?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We perform a binary search on the array with pointers <code>l</code> and <code>r</code>, which belong to two different sorted segments. For example, in <code>[3, 4, 5, 6, 1, 2, 3]</code>, <code>l = 0</code>, <code>r = 6</code>, and <code>mid = 3</code>. At least two of <code>l</code>, <code>mid</code>, and <code>r</code> will always be in the same sorted segment. Can you find conditions to eliminate one half and continue the binary search? Perhaps analyzing all possible conditions for <code>l</code>, <code>mid</code>, and <code>r</code> may help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    There are two cases: <code>l</code> and <code>mid</code> belong to the left sorted segment, or <code>mid</code> and <code>r</code> belong to the right sorted segment.
    If <code>l</code> and <code>mid</code> are in the same segment, <code>nums[l] < nums[mid]</code>, so the pivot index must lie in the right part. If <code>mid</code> and <code>r</code> are in the same segment, <code>nums[mid] < nums[r]</code>, so the pivot index must lie in the left part. After the binary search, we eventually find the pivot index. Once the pivot is found, it's straightforward to select the segment where the target lies and perform a binary search on that segement to find its position. If we don't find the target, we return <code>-1</code>.
    </p>
</details>