<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A rectangle has a height and a width. Can you visualize how rectangles are formed in the given input? Considering one bar at a time might help. We can try to form rectangles by going through every bar and current bar's height will be the height of the rectangle. How can you determine the width of the rectangle for the current bar being the height of the rectangle? Extending the current bar to the left and right might help determine the rectangle's width.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    For a bar with height <code>h</code>, try extending it to the left and right. We can see that we can't extend further when we encounter a bar with a smaller height than <code>h</code>. The width will be the number of bars within this extended range. A brute force solution would be to go through every bar and find the area of the rectangle it can form by extending towards the left and right. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe precomputing the left and right boundaries might be helpful.
    </p>
</details>

<br>
<details class="hint-accordion">
    <summary>Hint 3</summary>
    <p>
    The left and right boundaries are the positions up to which we can extend the bar at index <code>i</code>. The area of the rectangle will be <code>height[i] * (right - left + 1)</code>, which is the general formula for <code>height * width</code>. These boundaries are determined by the first smaller bars encountered to the left and right of the current bar. How can we find the left and right boundaries now? Maybe a data structure is helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use a stack with a monotonically strictly increasing nature, but instead of storing values, we store indices in the stack and perform operations based on the values at those indices. The top of the stack will represent the smaller bar that we encounter while extending the current bar. To find the left and right boundaries, we perform this algorithm from left to right and vice versa, storing the boundaries. Then, we iterate through the array to find the area for each bar and return the maximum area we get.
    </p>
</details>