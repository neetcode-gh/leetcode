<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(1)</code> time for each <code>put()</code> and <code>get()</code> function call and an overall space of <code>O(n)</code>, where <code>n</code> is the capacity of the <code>LRU</code> cache.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you think of a data structure for storing data in key-value pairs? Maybe a hash-based data structure with unique keys.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a hash map which takes <code>O(1)</code> time to get and put the values. But, how can you deal with the least recently used to be removed criteria as a key is updated by the <code>put()</code> or recently used by the <code>get()</code> functions? Can you think of a data structure to store the order of values?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A brute-force solution would involve maintaining the order of key-value pairs in an array list, performing operations by iterating through the list to erase and insert these key-value pairs. However, this would result in an <code>O(n)</code> time complexity. Can you think of a data structure that allows removing and reinserting elements in <code>O(1)</code> time?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use a doubly-linked list, which allows us to remove a node from the list when we have the address of that node. Can you think of a way to store these addresses so that we can efficiently remove or update a key when needed?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 5</summary>
    <p>
    We can use a doubly linked list where key-value pairs are stored as nodes, with the least recently used (LRU) node at the head and the most recently used (MRU) node at the tail. Whenever a key is accessed using <code>get()</code> or <code>put()</code>, we remove the corresponding node and reinsert it at the tail. When the cache reaches its capacity, we remove the LRU node from the head of the list. Additionally, we use a hash map to store each key and the corresponding address of its node, enabling efficient operations in <code>O(1)</code> time. 
    </p>
</details>