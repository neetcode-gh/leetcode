<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(nlogk)</code> time and <code>O(k)</code> space, where <code>n</code> is the size of the input array, and <code>k</code> represents the rank of the largest number to be returned (i.e., the <code>k-th</code> largest element).
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A naive solution would be to sort the array in descending order and return the <code>k-th</code> largest element. This would be an <code>O(nlogn)</code> solution. Can you think of a better way? Maybe you should think of a data structure which can maintain only the top <code>k</code> largest elements.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a Min-Heap, which stores elements and keeps the smallest element at its top. When we add an element to the Min-Heap, it takes <code>O(logk)</code> time since we are storing <code>k</code> elements in it. Retrieving the top element (the smallest in the heap) takes <code>O(1)</code> time. How can this be useful for finding the <code>k-th</code> largest element?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    The <code>k-th</code> largest element is the smallest element among the top <code>k</code> largest elements. This means we only need to maintain <code>k</code> elements in our Min-Heap to efficiently determine the <code>k-th</code> largest element. Whenever the size of the Min-Heap exceeds <code>k</code>, we remove the smallest element by popping from the heap. How do you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We initialize an empty Min-Heap. We iterate through the array and add elements to the heap. When the size of the heap exceeds <code>k</code>, we pop from the heap and continue. After the iteration, the top element of the heap is the <code>k-th</code> largest element. 
    </p>
</details>