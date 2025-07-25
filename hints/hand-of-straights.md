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
    It is observed that to form a group, the minimum value should be the starting value of the group. Additionally, the minimum value in the array serves as the starting value for one or more groups based on its frequency. Can you think of an efficient way to determine the frequencies of array elements? Maybe a specific data structure can be useful here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a hash map to store the elements along with their frequencies. Additionally, we sort the given array. Then, we iterate through the sorted array and try to form groups by decrementing the frequency count. If we fail to form a group at any step, we immediately return <code>false</code>. Can you think why this works?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Sorting ensures we start with the smallest available value, while the hash map helps track element availability using frequency counts. At each step, we pick the smallest available value <code>x</code> and attempt to form a group from <code>x</code> to <code>x + groupSize - 1</code>. If all elements are present based on their frequency counts, we decrement their counts as we iterate. If we successfully form all groups, we return <code>true</code>; otherwise, we return <code>false</code>.
    </p>
</details>
