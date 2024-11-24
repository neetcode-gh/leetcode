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
    A brute force solution would be to check every pair of numbers in the array. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe in terms of mathematical equation?
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
     we can iterate through nums with index <code>i</code>. Let <code>difference = target - nums[i]</code> and check if <code>difference</code> exists in the hash map as we iterate through the array, else store the current element in the hashmap with its index and continue. We use a hashmap for <code>O(1)</code> lookups.
    </p>
</details>