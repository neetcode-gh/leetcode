<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n^2)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to check for every triplet in the array. This would be an <code>O(n^3)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you think of an algorithm after sorting the input array? What can we observe by rearranging the given equation in the problem?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
     We can iterate through nums with index <code>i</code> and get <code>nums[i] = -(nums[j] + nums[k])</code> after rearranging the equation, making <code>-nums[i] = nums[j] + nums[k]</code>. For each index <code>i</code>, we should efficiently  calculate the <code>j</code> and <code>k</code> pairs without duplicates. Which algorithm is suitable to find <code>j</code> and <code>k</code> pairs?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    To efficiently find the <code>j</code> and <code>k</code> pairs, we run the two pointer approach on the elements to the right of index <code>i</code> as the array is sorted. When we run two pointer algorithm, consider <code>j</code> and <code>k</code> as pointers (<code>j</code> is at left, <code>k</code> is at right) and <code>target = -nums[i]</code>, if the current sum <code>num[j] + nums[k] < target</code> then we need to increase the value of current sum by incrementing <code>j</code> pointer. Else if the current sum <code>num[j] + nums[k] > target</code> then we should decrease the value of current sum by decrementing <code>k</code> pointer. How do you deal with duplicates? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
     When the current sum <code>nums[j] + nums[k] == target</code> add this pair to the result. We can move <code>j</code> or <code>k</code> pointer until <code>j < k</code> and the pairs are repeated. This ensures that no duplicate pairs are added to the result.
    </p>
</details>
