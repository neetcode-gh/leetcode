<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n^2)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the side of the given square matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would use <code>O(n^2)</code> extra space to solve the problem. Can you think of a way to avoid using extra space? Maybe you should consider observing the positions of the elements before rotating and after rotating of the matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can rotate the matrix in two steps. First, we reverse the matrix vertically, meaning the first row becomes the last, the second row becomes the second last, and so on. Next, we transpose the reversed matrix, meaning rows become columns and columns become rows. How would you transpose the matrix?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Since the given matrix is a square matrix, we only need to iterate over the upper triangular part, meaning the right upper portion of the main diagonal. In this way, we can transpose a matrix.
    </p>
</details>
