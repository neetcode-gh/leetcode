<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * (2^n))</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    It is straightforward that if the array is empty we return an empty array. When we have an array <code>[1]</code> which is of size <code>1</code>, we have two subsets, <code>[[], [1]]</code> as the output. Can you think why the output is so?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can see that one subset includes a number, and another does not. From this, we can conclude that we need to find the subsets that include a number and those that do not. This results in <code>2^n</code> subsets for an array of size <code>n</code> because there are many combinations for including and excluding the array of numbers. Since the elements are unique, duplicate subsets will not be formed if we ensure that we don't pick the element more than once in the current subset. Which algorithm is helpful to generate all subsets, and how would you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use backtracking to generate all possible subsets. We iterate through the given array with an index <code>i</code> and an initially empty temporary list representing the current subset. We recursively process each index, adding the corresponding element to the current subset and continuing, which results in a subset that includes that element. Alternatively, we skip the element by not adding it to the subset and proceed to the next index, forming a subset without including that element. What can be the base condition to end this recursion?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    When the index <code>i</code> reaches the end of the array, we append a copy of the subset formed in that particular recursive path to the result list and return. All subsets of the given array are generated from these different recursive paths, which represent various combinations of "include" and "not include" steps for the elements of the array. As we are only iterating from left to right in the array, we don't pick an element more than once.
    </p>
</details>