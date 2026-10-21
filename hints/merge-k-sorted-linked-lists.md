<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(k + n log k)</code> time and <code>O(k)</code> auxiliary space, where <code>k</code> is the total number of lists and <code>n</code> is the total number of nodes across all lists. The <code>O(k)</code> term accounts for visiting all input list heads, including empty lists. The hints below use iterative divide and conquer with arrays of merged list heads.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Collecting all <code>n</code> node values, sorting them, and building a new linked list takes <code>O(n log n)</code> time and <code>O(n)</code> extra space. Can you use the fact that each input list is already sorted? Think about how to merge two sorted linked lists by relinking their existing nodes.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Merging lists one by one into a growing result is a slower <code>O(n * k)</code> baseline and can exceed the time limit. Instead, merge adjacent lists in pairs during each round, then repeat with the merged lists. How does this change the number of times each node is processed?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If <code>lists</code> is empty, return <code>null</code>. While more than one list remains, create a new <code>mergedLists</code> array and merge <code>lists[0]</code> with <code>lists[1]</code>, <code>lists[2]</code> with <code>lists[3]</code>, and so on, appending each merged head. If the final list has no partner, carry it into the next round unchanged. Replace <code>lists</code> with <code>mergedLists</code> and repeat, then return the remaining head. Use an iterative two-list merge that reuses the existing nodes. There are <code>O(log k)</code> rounds, each processing at most <code>n</code> nodes, and the arrays of list heads use <code>O(k)</code> auxiliary space.
    </p>
</details>
