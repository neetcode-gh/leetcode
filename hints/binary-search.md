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
    Can you find an algorithm that is useful when the array is sorted? Maybe other than linear seacrh.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The problem name is the name of the algorithm that we can use. We need to find a target value and if it does not exist in the array return <code>-1</code>. We have <code>l</code> and <code>r</code> as the boundaries of the segment of the array in which we are searching. Try building conditions to eliminate half of the search segment at each step. Maybe sorted nature of the array can be helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We compare the target value with the <code>mid</code> of the segment. For example, consider the array <code>[1, 2, 3, 4, 5]</code> and <code>target = 4</code>. The <code>mid</code> value is <code>3</code>, thus, on the next iteration we search to the right of <code>mid</code>. The remaining segment is <code>[4,5]</code>. Why?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    Because the array is sorted, all elements to the left of <code>mid</code> (including <code>3</code>) are guaranteed to be smaller than the target. Therefore, we can safely eliminate that half of the array from consideration, narrowing the search to the right half and repeat this search until we find the target.
    </p>
</details>