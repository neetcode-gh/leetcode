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
    A naive solution would involve simulating the process by sorting the array at each step and processing the top <code>2</code> heaviest stones, resulting in an <code>O(n * nlogn)</code> time complexity. Can you think of a better way? Consider using a data structure that efficiently supports insertion and removal of elements and maintain the sorted order. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a Max-Heap, which allows us to retrieve the maximum element in <code>O(1)</code> time. We initially insert all the weights into the Max-Heap, which takes <code>O(logn)</code> time per insertion. We then simulate the process until only one or no element remains in the Max-Heap. At each step, we pop two elements from the Max-Heap which takes <code>O(logn)</code> time. If they are equal, we do not insert anything back into the heap and continue. Otherwise, we insert the difference of the two elements back into the heap.
    </p>
</details>