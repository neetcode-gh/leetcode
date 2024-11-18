<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    How can we determine the amount of water that can be trapped at a specific position in the array? Perhaps looking at the image might help clarify.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    From the image, we can see that to calculate the amount of water trapped at a position, the greater element to the left <code>l</code> and the greater element to the right <code>r</code> of the current position are crucial. The formula for the trapped water at index <code>i</code> is given by: <code>min(height[l], height[r]) - height[i]</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A brute force solution would involve iterating through the array with index <code>i</code>, finding the greater elements to the left (<code>l</code>) and right (<code>r</code>) for each index, and then calculating the trapped water for that position. The total amount of trapped water would be the sum of the water trapped at each index. Finding <code>l</code> and <code>r</code> for each index involves repeated work, resulting in an <code>O(n^2)</code> solution. Can you think of a more efficient approach? Maybe there is something that we can precompute and store in arrays.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can store the prefix maximum in an array by iterating from left to right and the suffix maximum in another array by iterating from right to left. For example, in <code>[1, 5, 2, 3, 4]</code>, for the element <code>3</code>, the prefix maximum is <code>5</code>, and the suffix maximum is <code>4</code>. Once these arrays are built, we can iterate through the array with index <code>i</code> and calculate the total water trapped at each position using the formula: <code>min(prefix[i], suffix[i]) - height[i]</code>. 
    </p>
</details>