<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n<sup>2</sub>)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force would be to check for every three pairs in the array. This would be an <code>O(n<sup>3</sup>)</code> solution. Can you think of a better way?
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
    We can fix index <code>i</code> and get <code>nums[i] = -(nums[j] + nums[k])</code> after rearranging the equation, making <code>target = -(nums[j] + nums[k])</code>. For each index <code>i</code>, we can compute the required <code>target</code>. Which algorithm is suitable for finding the <code>target</code> pairs?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    To efficiently find the <code>j</code> and <code>k</code> pairs, we can use the two pointer algorithm.
    </p>
</details>