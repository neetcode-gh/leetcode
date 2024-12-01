<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(logn)</code> time for <code>addNum()</code>, <code>O(1)</code> time for <code>findMedian()</code>, and <code>O(n)</code> space, where <code>n</code> is the current number of elements.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to store the data stream in an array and sort it each time to find the median, resulting in <code>O(nlogn)</code> time for each <code>findMedian()</code> call. Can you think of a better way? Perhaps using a data structure that allows efficient insertion and retrieval of the median can make the solution more efficient.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    If we divide the array into two parts, we can find the median in <code>O(1)</code> if the left half can efficiently return the maximum and the right half can efficiently return the minimum. These values determine the median. However, the process changes slightly if the total number of elements is odd — in that case, the median is the element from the half with the larger size. Can you think of a data structure which is suitable to implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use a Heap (Max-Heap for the left half and Min-Heap for the right half). Instead of dividing the array, we store the elements in these heaps as they arrive in the data stream. But how can you maintain equal halves of elements in these two heaps? How do you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We initialize a Max-Heap and a Min-Heap. When adding an element, if the element is greater than the minimum element of the Min-Heap, we push it into the Min-Heap; otherwise, we push it into the Max-Heap. If the size difference between the two heaps becomes greater than one, we rebalance them by popping an element from the larger heap and pushing it into the smaller heap. This process ensures that the elements are evenly distributed between the two heaps, allowing us to retrieve the middle element or elements in <code>O(1)</code> time.
    </p>
</details>