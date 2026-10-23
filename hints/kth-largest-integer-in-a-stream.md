<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(nlog(k + 1))</code> initialization time, <code>O(log(k + 1))</code> time per <code>add()</code> call, and <code>O(k)</code> space. The total time is <code>O((n + m)log(k + 1))</code>, where <code>n</code> is the initial array length, <code>m</code> is the number of <code>add()</code> calls, and <code>k</code> is the rank of the largest number to track. These bounds assume the heap is trimmed during initialization as described in Hint 4.
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
    We can use a Min-Heap, which stores elements and keeps the smallest element at its top. When we add an element to the Min-Heap, it takes <code>O(log(k + 1))</code> time since we are storing at most <code>k</code> elements in it before the insertion. Retrieving the top element (the smallest in the heap) takes <code>O(1)</code> time. How can this be useful for finding the <code>k-th</code> largest element?
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
    Start with an empty Min-Heap. Insert each initial value and, after each insertion, remove the smallest element if the heap size exceeds <code>k</code>. This keeps initialization to <code>O(nlog(k + 1))</code> time and <code>O(k)</code> space. Apply the same insert-and-trim steps for each <code>add()</code> call, then return the heap's smallest element, which is the <code>k-th</code> largest element.
    </p>
</details>
