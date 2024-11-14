<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where n is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to check every pair of numbers in the array. This would be an <code>O(n<sup>2</sup>)</code> solution. Can you think of a better way? Maybe in terms of mathematical equation?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Given, We need to find indices <code>i</code> and <code>j</code> such that <code>i != j</code> and <code>nums[i] + nums[j] == target</code>. Can you rearrange the equation and try to fix any index to iterate on? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can fix index <code>i</code> and iterate on it. The equation becomes <code>nums[i] == target - nums[j]</code> when we rearrange it. Let <code>value = target - nums[j]</code> and check if <code>value</code> exists in the hash map as we iterate through the array, else store the current element in the hashmap with its index and continue.
    </p>
</details>