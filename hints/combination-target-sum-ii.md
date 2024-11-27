<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * (2^n))</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute-force solution would be to create a <code>hash set</code>, which is used to detect duplicates, to get combinations without duplicates. Can you think of a better way without using a <code>hash set</code>? Maybe you should sort the input array and observe the recursive calls that are responsible for duplicate combinations.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to generate all combinations whose sum equals the given target. When the input array contains duplicate elements, it may result in duplicate combinations. To avoid this, we can sort the array. Why does sorting help? Because as we traverse the array from left to right, we form combinations with the current element. By skipping duplicate elements, we ensure that the same combinations are not repeated for identical elements. How can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We recursively traverse the given array starting at index <code>i</code>, with a variable <code>sum</code> representing the sum of the picked elements. We explore elements from <code>i</code> to the end of the array and extend the recursive path if adding the current element results in <code>sum <= target</code>. When we processed an element, we backtrack and proceed to the next distinct element, skipping any similar elements in the middle to avoid duplicate combinations.
    </p>
</details>