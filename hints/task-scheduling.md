<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m)</code> time and <code>O(1)</code> space, where <code>m</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    There are at most <code>26</code> different tasks, represented by <code>A</code> through <code>Z</code>. It is more efficient to count the frequency of each task and store it in a hash map or an array of size <code>26</code>. Can you think of a way to determine which task should be processed first?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We should always process the most frequent task first. After selecting the most frequent task, we must ensure that it is not processed again until after <code>n</code> seconds, due to the cooldown condition. Can you think of an efficient way to select the most frequent task and enforce the cooldown? Perhaps you could use a data structure that allows for <code>O(1)</code> time to retrieve the maximum element and another data structure to cooldown the processed tasks.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use a Max-Heap to efficiently retrieve the most frequent task at any given instance. However, to enforce the cooldown period, we must temporarily hold off from reinserting the processed task into the heap. This is where a queue data structure comes in handy. It helps maintain the order of processed tasks. Can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We start by calculating the frequency of each task and initialize a variable <code>time</code> to track the total processing time. The task frequencies are inserted into a Max-Heap. We also use a queue to store tasks along with the time they become available after the cooldown. At each step, if the Max-Heap is empty, we update <code>time</code> to match the next available task in the queue, covering idle time. Otherwise, we process the most frequent task from the heap, decrement its frequency, and if it's still valid, add it back to the queue with its next available time. If the task at the front of the queue becomes available, we pop it and reinsert it into the heap.
    </p>
</details>