## 1. Brute Force

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
        const rotated = Array.from({ length: n }, () => 
                        Array(n).fill(0));

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 2. Rotate By Four Cells

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 3. Reverse And Transpose

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$