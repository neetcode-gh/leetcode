<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(mlogk)</code> time and <code>O(k)</code> space, where <code>m</code> is the number of times <code>add()</code> is called, and <code>k</code> represents the rank of the largest number to be tracked (i.e., the <code>k-th</code> largest element).
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve sorting the array in every time a number is added using <code>add()</code>, and then returning the <code>k-th</code> largest element. This would take <code>O(m * nlogn)</code> time, where <code>m</code> is the number of calls to <code>add()</code> and <code>n</code> is the total number of elements added. However, do we really need to track all the elements added, given that we only need the <code>k-th</code> largest element? Maybe you should think of a data structure which can maintain only the top <code>k</code> largest elements.
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
    We initialize a Min-Heap with the elements of the input array. When the <code>add()</code> function is called, we insert the new element into the heap. If the heap size exceeds <code>k</code>, we remove the smallest element (the root of the heap). Finally, the top element of the heap represents the <code>k-th</code> largest element and is returned.
    </p>
</details>