<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(log(min(n, m)))</code> time and <code>O(1)</code> space, where <code>n</code> is the size of <code>nums1</code> and <code>m</code> is the size of <code>nums2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to create a new array by merging elements from both arrays, then sorting it and returning the median. This would be an <code>O(n + m)</code> solution. Can you think of a better way? Maybe you can use the criteria of both the arrays being sorted in ascending order.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Suppose we merged both arrays. Then, we would have <code>half = (m + n) / 2</code> elements to the left of the median. So, without merging, is there any way to use this information to find the median? You can leverage the fact that the arrays are sorted. Consider the smaller array between the two and use binary search to find the correct partition between the two arrays, which will allow you to directly find the median without fully merging the arrays. How will you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We will always try to keep array <code>A</code> smaller and interchange it with array <code>B</code> if <code>len(A) > len(B)</code>. Now, we perform binary search on the number of elements we will choose from array <code>A</code>. It is straightforward that when we choose <code>x</code> elements from array <code>A</code>, we have to choose <code>half - x</code> elements from array <code>B</code>. But we should also ensure that this partition is valid. How can we do this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p> 
    When we do a partition for both arrays, we should ensure that the maximum elements from the left partitions of both arrays are smaller than or equal to the minimum elements of the right partitions of both the arrays. This will ensure that the partition is valid, and we can then find the median. We can find the min or max of these partitions in <code>O(1)</code> as these partitions are sorted in ascending order. Why does this work?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
    For example, consider the arrays <code>A = [1, 2, 3, 4, 5]</code> and <code>B = [1, 2, 3, 4, 5, 6, 7, 8]</code>. When we select <code>x = 2</code>, we take <code>4</code> elements from array <code>B</code>. However, this partition is not valid because value <code>4</code> from the left partition of array <code>B</code> is greater than the value <code>3</code> from the right partition of array <code>A</code>. So, we should try to take more elements from array <code>A</code> to make the partition valid. Binary search will eventually help us find a valid partition.
    </p>
</details>