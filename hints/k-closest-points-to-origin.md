<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(nlogk)</code> time and <code>O(k)</code> space, where <code>n</code> is the size of the input array, and <code>k</code> is the number of points to be returned.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to sort the array in ascending order based on the distances of the points from the origin <code>(0, 0)</code> and return the first <code>k</code> points. This would take <code>O(nlogn)</code> time. Can you think of a better way? Perhaps you could use a data structure that maintains only <code>k</code> points and allows efficient insertion and removal. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a Max-Heap that keeps the maximum element at its top and allows retrieval in <code>O(1)</code> time. This data structure is ideal because we need to return the <code>k</code> closest points to the origin. By maintaining only <code>k</code> points in the heap, we can efficiently remove the farthest point when the size exceeds <code>k</code>. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We initialize a Max-Heap that orders points based on their distances from the origin. Starting with an empty heap, we iterate through the array of points, inserting each point into the heap. If the size of the heap exceeds <code>k</code>, we remove the farthest point (the maximum element in the heap). After completing the iteration, the heap will contain the <code>k</code> closest points to the origin. Finally, we convert the heap into an array and return it. 
    </p>
</details>