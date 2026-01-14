## 1. Brute Force

### Intuition

We are given an `n x n` matrix and need to rotate it **90 degrees clockwise**.

A direct and beginner-friendly way to think about this is:
- create a **new matrix** where each element from the original matrix is placed in its rotated position
- after building this rotated version, copy it back into the original matrix

The key observation for a 90° clockwise rotation is:
- an element at position `(i, j)` in the original `matrix`
- moves to position `(j, n - 1 - i)` in the rotated `matrix`

By applying this rule to every cell, we can construct the rotated matrix easily.

### Algorithm

1. Let `n` be the size of the `matrix`.
2. Create a new `n x n` `matrix` called `rotated`, initially filled with zeros.
3. Traverse each cell `(i, j)` of the original `matrix`:
   - place its value into the rotated position:
     - `rotated[j][n - 1 - i] = matrix[i][j]`
4. After filling the `rotated` `matrix`, copy all values back into the original `matrix`.
5. The original `matrix` is now rotated 90 degrees clockwise.

::tabs-start

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        rotated = [[0] * n for _ in range(n)]

        for i in range(n):
            for j in range(n):
                rotated[j][n - 1 - i] = matrix[i][j]

        for i in range(n):
            for j in range(n):
                matrix[i][j] = rotated[i][j]
```

```java
public class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        int[][] rotated = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j];
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = rotated[i][j];
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> rotated(n, vector<int>(n));

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j];
            }
        }

        matrix = rotated;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    rotate(matrix) {
        const n = matrix.length;
        const rotated = Array.from({ length: n }, () => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j];
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = rotated[i][j];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[][] matrix) {
        int n = matrix.Length;
        int[][] rotated = new int[n][];
        for (int i = 0; i < n; i++) {
            rotated[i] = new int[n];
            for (int j = 0; j < n; j++) {
                rotated[i][j] = matrix[n - 1 - j][i];
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = rotated[i][j];
            }
        }
    }
}
```

```go
func rotate(matrix [][]int) {
	n := len(matrix)
	rotated := make([][]int, n)
	for i := range rotated {
		rotated[i] = make([]int, n)
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			rotated[j][n-1-i] = matrix[i][j]
		}
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			matrix[i][j] = rotated[i][j]
		}
	}
}
```

```kotlin
class Solution {
    fun rotate(matrix: Array<IntArray>) {
        val n = matrix.size
        val rotated = Array(n) { IntArray(n) }

        for (i in 0 until n) {
            for (j in 0 until n) {
                rotated[j][n - 1 - i] = matrix[i][j]
            }
        }

        for (i in 0 until n) {
            for (j in 0 until n) {
                matrix[i][j] = rotated[i][j]
            }
        }
    }
}
```

```swift
class Solution {
    func rotate(_ matrix: inout [[Int]]) {
        let n = matrix.count
        var rotated = Array(repeating: Array(repeating: 0, count: n), count: n)

        for i in 0..<n {
            for j in 0..<n {
                rotated[j][n - 1 - i] = matrix[i][j]
            }
        }

        for i in 0..<n {
            for j in 0..<n {
                matrix[i][j] = rotated[i][j]
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Rotate By Four Cells

### Intuition

We want to rotate an `n x n` matrix **90 degrees clockwise**, but this time **in-place**, without using extra space.

A useful way to visualize this is to rotate the matrix **layer by layer**, starting from the outermost layer and moving inward.

For each square layer:
- elements move in groups of **four**
- each element in the group shifts to its new rotated position

Specifically, for a given layer:
- **`top-left` → `top-right`**
- **`top-right` → `bottom-right`**
- **`bottom-right` → `bottom-left`**
- **`bottom-left` → `top-left`**

By rotating these four cells at a time, we complete the rotation without needing an extra `matrix`.

### Algorithm

1. Initialize two pointers:
   - `l = 0` → left boundary of the current layer
   - `r = n - 1` → right boundary of the current layer
2. While `l < r` (process each layer):
3. For each position `i` in the current layer (from `0` to `r - l - 1`):
   - Identify:
     - `top = l`
     - `bottom = r`
   - Save the **`top-left`** value temporarily
   - Move **`bottom-left` → `top-left`**
   - Move **`bottom-right` → `bottom-left`**
   - Move **`top-right` → `bottom-right`**
   - Move saved **`top-left` → `top-right`**
4. After finishing one layer:
   - increment `l`
   - decrement `r`
5. Continue until all layers are rotated.

::tabs-start

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        l, r = 0, len(matrix) - 1
        while l < r:
            for i in range(r - l):
                top, bottom = l, r

                # save the topleft
                topLeft = matrix[top][l + i]

                # move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l]

                # move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i]

                # move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r]

                # move top left into top right
                matrix[top + i][r] = topLeft
            r -= 1
            l += 1
```

```java
public class Solution {
    public void rotate(int[][] matrix) {
        int l = 0;
        int r = matrix.length - 1;

        while ( l < r ) {
            for(int i = 0; i < r - l; i++) {
                int top = l;
                int bottom = r;
                 //save the topleft
                int topLeft = matrix[top][l + i];

                //move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l];

                // move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i];

                // move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r];

                // move top left into top right
                matrix[top + i][r] = topLeft;

            }
            r--;
            l++;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int l = 0;
        int r = matrix.size() - 1;

        while ( l < r ) {
            for(int i = 0; i < r - l; i++) {
                int top = l;
                int bottom = r;

                //save the topleft
                int topLeft = matrix[top][l + i];

                //move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l];

                // move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i];

                // move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r];

                // move top left into top right
                matrix[top + i][r] = topLeft;

            }
            r--;
            l++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    rotate(matrix) {
        let l = 0;
        let r = matrix.length - 1;

        while (l < r) {
            for (let i = 0; i < r - l; i++) {
                const top = l;
                const bottom = r;

                // save the topleft
                const topLeft = matrix[top][l + i];

                // move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l];

                // move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i];

                // move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r];

                // move top left into top right
                matrix[top + i][r] = topLeft;
            }
            r--;
            l++;
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[][] matrix) {
        (int left, int right) = (0, matrix.Length -1);

        while(left < right) {
            var limit = right - left;
            for(var i = 0; i < limit; i++) {
                (int top, int bottom) = (left, right);

                // save the top left position
                var topLeft = matrix[top][left + i];

                // put the bottom left value to the top left position
                matrix[top][left + i] = matrix[bottom - i][left];

                // put the bottom right value to the bottom left position
                matrix[bottom - i][left] = matrix[bottom][right - i];

                // put the top right value to the bottom right position
                matrix[bottom][right - i] = matrix[top + i][right];

                // put the saved top left value to the top right position
                matrix[top + i][right] = topLeft;

            }
            left++;
            right--;
        }

        return;
    }
}
```

```go
func rotate(matrix [][]int) {
	l, r := 0, len(matrix)-1
	for l < r {
		for i := 0; i < r-l; i++ {
			top, bottom := l, r

			// save the topleft
			topLeft := matrix[top][l+i]

			// move bottom left into top left
			matrix[top][l+i] = matrix[bottom-i][l]

			// move bottom right into bottom left
			matrix[bottom-i][l] = matrix[bottom][r-i]

			// move top right into bottom right
			matrix[bottom][r-i] = matrix[top+i][r]

			// move top left into top right
			matrix[top+i][r] = topLeft
		}
		r--
		l++
	}
}
```

```kotlin
class Solution {
    fun rotate(matrix: Array<IntArray>) {
        var l = 0
        var r = matrix.size - 1
        while (l < r) {
            for (i in 0 until r - l) {
                val top = l
                val bottom = r

                // save the topleft
                val topLeft = matrix[top][l + i]

                // move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l]

                // move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i]

                // move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r]

                // move top left into top right
                matrix[top + i][r] = topLeft
            }
            r--
            l++
        }
    }
}
```

```swift
class Solution {
    func rotate(_ matrix: inout [[Int]]) {
        var l = 0
        var r = matrix.count - 1
        while l < r {
            for i in 0..<r - l {
                let top = l
                let bottom = r

                // save the topleft
                let topLeft = matrix[top][l + i]

                // move bottom left into top left
                matrix[top][l + i] = matrix[bottom - i][l]

                // move bottom right into bottom left
                matrix[bottom - i][l] = matrix[bottom][r - i]

                // move top right into bottom right
                matrix[bottom][r - i] = matrix[top + i][r]

                // move top left into top right
                matrix[top + i][r] = topLeft
            }
            r -= 1
            l += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 3. Reverse And Transpose

### Intuition

We want to rotate an `n x n` `matrix` **90 degrees clockwise** in-place.

A very clean way to do this is to break the rotation into **two simple operations**:
1. **Reverse the `matrix` vertically**
2. **Transpose the `matrix`**

Why this works:
- Reversing the `matrix` flips it upside down
- Transposing swaps rows with columns
- Doing both together results in a 90° clockwise rotation

This method is elegant, easy to remember, and avoids extra space.

### Algorithm

1. Reverse the `matrix` vertically:
   - the first row becomes the last
   - the last row becomes the first
2. Transpose the `matrix`:
   - swap elements across the main diagonal
   - for all `i < j`, swap `matrix[i][j]` with `matrix[j][i]`
3. The `matrix` is now rotated 90 degrees clockwise in-place.

::tabs-start

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        # Reverse the matrix vertically
        matrix.reverse()

        # Transpose the matrix
        for i in range(len(matrix)):
            for j in range(i + 1, len(matrix)):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

```java
public class Solution {
    public void rotate(int[][] matrix) {
        // Reverse the matrix vertically
        reverse(matrix);

        // Transpose the matrix
        for (int i = 0; i < matrix.length; i++) {
            for (int j = i; j < matrix[i].length; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }

    private void reverse(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n / 2; i++) {
            int[] temp = matrix[i];
            matrix[i] = matrix[n - 1 - i];
            matrix[n - 1 - i] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Reverse the matrix vertically
        reverse(matrix.begin(), matrix.end());

        // Transpose the matrix
        for (int i = 0; i < matrix.size(); ++i) {
            for (int j = i + 1; j < matrix[i].size(); ++j)
                swap(matrix[i][j], matrix[j][i]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    rotate(matrix) {
        // Reverse the matrix vertically
        matrix.reverse();

        // Transpose the matrix
        for (let i = 0; i < matrix.length; i++) {
            for (let j = i; j < matrix[i].length; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[][] matrix) {
        // Reverse the matrix vertically
        Array.Reverse(matrix);

        // Transpose the matrix
        for (int i = 0; i < matrix.Length; i++) {
            for (int j = i; j < matrix[i].Length; j++) {
                (matrix[i][j], matrix[j][i]) = (matrix[j][i], matrix[i][j]);
            }
        }
    }
}
```

```go
func rotate(matrix [][]int) {
	// Reverse the matrix vertically
	for i, j := 0, len(matrix)-1; i < j; i, j = i+1, j-1 {
		matrix[i], matrix[j] = matrix[j], matrix[i]
	}

	// Transpose the matrix
	for i := 0; i < len(matrix); i++ {
		for j := i + 1; j < len(matrix); j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}
}
```

```kotlin
class Solution {
    fun rotate(matrix: Array<IntArray>) {
        // Reverse the matrix vertically
        matrix.reverse()

        // Transpose the matrix
        for (i in matrix.indices) {
            for (j in i + 1 until matrix.size) {
                val temp = matrix[i][j]
                matrix[i][j] = matrix[j][i]
                matrix[j][i] = temp
            }
        }
    }
}
```

```swift
class Solution {
    func rotate(_ matrix: inout [[Int]]) {
        // Reverse the matrix vertically
        matrix.reverse()

        // Transpose the matrix
        for i in 0..<matrix.count {
            for j in i + 1..<matrix.count {
                (matrix[i][j], matrix[j][i]) = (matrix[j][i], matrix[i][j])
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Confusing Clockwise and Counter-Clockwise Rotation

The order of operations matters: for 90-degree clockwise rotation, reverse rows first then transpose. For counter-clockwise, transpose first then reverse rows. Mixing up this order or using the wrong sequence produces incorrect rotations.

### Transposing the Entire Matrix Instead of Upper Triangle

When transposing in-place, swapping all pairs `(i, j)` with `(j, i)` including when `i > j` swaps each element twice, returning to the original matrix. The inner loop should only iterate for `j > i` to swap each pair exactly once.

### Incorrect Index Calculation in Layer-by-Layer Rotation

In the four-cell rotation approach, computing the indices for the four corners incorrectly causes elements to be placed in wrong positions. Each of the four positions involves different combinations of `l`, `r`, `i`, `top`, and `bottom`, and confusing these leads to corrupted matrix values.
