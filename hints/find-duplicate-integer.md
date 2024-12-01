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
    A naive approach would be to use a hash set, which takes <code>O(1)</code> time to detect duplicates. Although this solution is acceptable, it requires <code>O(n)</code> extra space. Can you think of a better solution that avoids using extra space? Consider that the elements in the given array <code>nums</code> are within the range <code>1</code> to <code>len(nums)</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the given input array itself as a hash set without creating a new one. This can be achieved by marking the positions (<code>0</code>-indexed) corresponding to the elements that have already been encountered. Can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We iterate through the array using index <code>i</code>. For each element, we use its absolute value to find the corresponding index and mark that position as negative: <code>nums[abs(nums[i]) - 1] *= -1</code>. Taking absolute value ensures we work with the original value even if it’s already negated. How can you detect duplicates?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    For example, in the array <code>[2, 1, 2, 3]</code>, where <code>2</code> is repeated, we mark the index corresponding to each element as negative. If we encounter a number whose corresponding position is already negative, it means the number is a duplicate, and we return it.
    </p>
</details>