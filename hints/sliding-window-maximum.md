<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(nlogn)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve iterating through each window of size <code>k</code> and finding the maximum element within the window by iterating through it. This would be an <code>O(n * k)</code> solution. Can you think of a better way? Maybe think of a data structure that tells the current maximum element of the window in <code>O(1)</code> time.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    A heap is the best data structure to use when dealing with maximum or minimum values and it takes <code>O(1)</code> time to get the max or min value. Here, we use a max-heap. But what should we do if the current maximum element is no longer part of the window? Can you think of a different way of adding values to the max-heap?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We process each window by adding elements to the heap along with their indices to track whether the maximum value is still within the current window. As we move from one window to the next, an element may go out of the window but still remain in the max-heap. Is there a way to handle this situation efficiently?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can ignore those elements that are no longer part of the current window, except when the maximum value is outside the window. In that case, we remove elements from the max-heap until the maximum value belongs to the current window. Why? Because those elements will be eventually removed when the maximum element goes out of the window. 
    </p>
</details>