## 1. Counting with Arrays

### Intuition

A pixel is "lonely" if it's the only black pixel in both its row and its column. Instead of checking the entire row and column for each black pixel (which would be slow), we can precompute the count of black pixels in every row and every column. Then, a black pixel at position `(i, j)` is lonely if and only if both `row_count[i]` and `column_count[j]` equal `1`.

### Algorithm

1. Create two arrays: `row_count` of size `n` (number of rows) and `column_count` of size `m` (number of columns), initialized to zero.
2. First pass: iterate through the entire grid. For each black pixel (`'B'`) at `(i, j)`, increment `row_count[i]` and `column_count[j]`.
3. Second pass: iterate through the grid again. For each black pixel at `(i, j)`, check if `row_count[i] == 1` and `column_count[j] == 1`. If both conditions hold, increment the answer.
4. Return the total count of lonely pixels.

::tabs-start

```python
class Solution:
    def findLonelyPixel(self, picture: List[List[str]]) -> int:
        n = len(picture)
        m = len(picture[0])
        
        # Arrays to store the count of black cells in rows and columns.
        row_count = [0] * n
        column_count = [0] * m
        for i in range(n):
            for j in range(m):
                if picture[i][j] == 'B':
                    row_count[i] += 1
                    column_count[j] += 1
        
        answer = 0
        for i in range(n):
            for j in range(m):
                # Its a lonely cell, if the current cell is black and,
                # the count of black cells in its row and column is 1.
                if picture[i][j] == 'B' and row_count[i] == 1 and column_count[j] == 1:
                    answer += 1
        
        return answer
```

```java
class Solution {
    public int findLonelyPixel(char[][] picture) {
        int n = picture.length;
        int m = picture[0].length;
        
        // Arrays to store the count of black cells in rows and columns.
        int rowCount[] = new int[n];
        int columnCount[] = new int[m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (picture[i][j] == 'B') {
                    rowCount[i]++;
                    columnCount[j]++;
                }
            }
        }
        
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if (picture[i][j] == 'B' && rowCount[i] == 1 && columnCount[j] == 1) {
                    answer++;
                }
            }
        }
        
        return answer;
    }
}
```

```cpp
class Solution {
public:
    int findLonelyPixel(vector<vector<char>>& picture) {
        int n = int(picture.size());
        int m = int(picture[0].size());
        
        // Arrays to store the count of black cells in rows and columns.
        vector<int> rowCount(n, 0);
        vector<int> columnCount(m, 0);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (picture[i][j] == 'B') {
                    rowCount[i]++;
                    columnCount[j]++;
                }
            }
        }
        
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if (picture[i][j] == 'B' && rowCount[i] == 1 && columnCount[j] == 1) {
                    answer++;
                }
            }
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} picture
     * @return {number}
     */
    findLonelyPixel(picture) {
        let n = picture.length;
        let m = picture[0].length;

        // Arrays to store the count of black cells in rows and columns.
        let rowCount = new Array(n).fill(0);
        let columnCount = new Array(m).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (picture[i][j] === 'B') {
                    rowCount[i]++;
                    columnCount[j]++;
                }
            }
        }

        let answer = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if (picture[i][j] === 'B' && rowCount[i] === 1 && columnCount[j] === 1) {
                    answer++;
                }
            }
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    public int FindLonelyPixel(char[][] picture) {
        int n = picture.Length;
        int m = picture[0].Length;

        // Arrays to store the count of black cells in rows and columns.
        int[] rowCount = new int[n];
        int[] columnCount = new int[m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (picture[i][j] == 'B') {
                    rowCount[i]++;
                    columnCount[j]++;
                }
            }
        }

        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if (picture[i][j] == 'B' && rowCount[i] == 1 && columnCount[j] == 1) {
                    answer++;
                }
            }
        }

        return answer;
    }
}
```

```go
func findLonelyPixel(picture [][]byte) int {
    n := len(picture)
    m := len(picture[0])

    // Arrays to store the count of black cells in rows and columns.
    rowCount := make([]int, n)
    columnCount := make([]int, m)
    for i := 0; i < n; i++ {
        for j := 0; j < m; j++ {
            if picture[i][j] == 'B' {
                rowCount[i]++
                columnCount[j]++
            }
        }
    }

    answer := 0
    for i := 0; i < n; i++ {
        for j := 0; j < m; j++ {
            // Its a lonely cell, if the current cell is black and,
            // the count of black cells in its row and column is 1.
            if picture[i][j] == 'B' && rowCount[i] == 1 && columnCount[j] == 1 {
                answer++
            }
        }
    }

    return answer
}
```

```kotlin
class Solution {
    fun findLonelyPixel(picture: Array<CharArray>): Int {
        val n = picture.size
        val m = picture[0].size

        // Arrays to store the count of black cells in rows and columns.
        val rowCount = IntArray(n)
        val columnCount = IntArray(m)
        for (i in 0 until n) {
            for (j in 0 until m) {
                if (picture[i][j] == 'B') {
                    rowCount[i]++
                    columnCount[j]++
                }
            }
        }

        var answer = 0
        for (i in 0 until n) {
            for (j in 0 until m) {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if (picture[i][j] == 'B' && rowCount[i] == 1 && columnCount[j] == 1) {
                    answer++
                }
            }
        }

        return answer
    }
}
```

```swift
class Solution {
    func findLonelyPixel(_ picture: [[Character]]) -> Int {
        let n = picture.count
        let m = picture[0].count

        // Arrays to store the count of black cells in rows and columns.
        var rowCount = [Int](repeating: 0, count: n)
        var columnCount = [Int](repeating: 0, count: m)
        for i in 0..<n {
            for j in 0..<m {
                if picture[i][j] == "B" {
                    rowCount[i] += 1
                    columnCount[j] += 1
                }
            }
        }

        var answer = 0
        for i in 0..<n {
            for j in 0..<m {
                // Its a lonely cell, if the current cell is black and,
                // the count of black cells in its row and column is 1.
                if picture[i][j] == "B" && rowCount[i] == 1 && columnCount[j] == 1 {
                    answer += 1
                }
            }
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(M + N)$

>  Where $M$ is the number of rows in the given matrix `picture`, and $N$ is the number of columns in it.

---

## 2. Space Optimized Counting

### Intuition

We can avoid using extra arrays by reusing the first row and first column of the grid itself to store the counts. However, we must first handle lonely pixels in the first row and first column separately, since those cells will be overwritten. After that, we convert the border cells to store counts and use them to check interior cells.

### Algorithm

1. First, check for lonely pixels in the first row and first column using a helper function that scans the entire row and column.
2. Convert the first row and first column from `'B'`/`'W'` to `'0'`/`'1'` to use as counters.
3. Iterate through the interior cells (excluding first row and column). For each black pixel, increment the count stored in the corresponding first row and first column cells.
4. Finally, scan the interior again. A black pixel at `(i, j)` is lonely if both `picture[0][j]` and `picture[i][0]` equal `'1'`.
5. Return the total count.

::tabs-start

```python
class Solution:
    def findLonelyPixel(self, picture: List[List[str]]) -> int:
        # Returns true if the cell at (x, y) is lonely.
        # There should not be any other black cell 
        # In the first row and column except (x, y) itself.
        def check(x, y):
            n = len(picture)
            m = len(picture[0])
            
            cnt = 0
            for i in range(n):
                cnt += 1 if picture[i][y] == 'B' else 0
            
            for j in range(m):
                # avoid double count (x, y)
                if j != y:
                    cnt += 1 if picture[x][j] == 'B' else 0
            
            return picture[x][y] == 'B' and cnt == 1
        
        n = len(picture)
        m = len(picture[0])
        
        answer = 0
        for j in range(m):
            answer += 1 if check(0, j) else 0
        
        for i in range(1, n):
            answer += 1 if check(i, 0) else 0
        
        # Convert cell 'B' to '1' and 'W' to '0'
        for j in range(m):
            picture[0][j] = '1' if picture[0][j] == 'B' else '0'
        
        for i in range(n):
            picture[i][0] = '1' if picture[i][0] == 'B' else '0'
        
        # If the cell is black increment the count of corresponding row and column by 1
        for i in range(1, n):
            for j in range(1, m):
                if picture[i][j] == 'B':
                    picture[i][0] = chr(ord(picture[i][0]) + 1)
                    picture[0][j] = chr(ord(picture[0][j]) + 1)
        
        for i in range(1, n):
            for j in range(1, m):
                if picture[i][j] == 'B':
                    if picture[0][j] == '1' and picture[i][0] == '1':
                        answer += 1
        
        return answer
```

```java
class Solution {
    
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell 
    // In the first row and column except (x, y) itself.
    boolean check(char[][] picture, int x, int y) {
        int n = picture.length;
        int m = picture[0].length;
        
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cnt += (picture[i][y] == 'B' ? 1 : 0);
        }
        
        for (int j = 0; j < m; j++) {
            // avoid double count (x, y)
            if (j != y) cnt += (picture[x][j] == 'B' ? 1 : 0);
        }
        return picture[x][y] == 'B' && cnt == 1;
    }
    
    public int findLonelyPixel(char[][] picture) {
        int n = picture.length;
        int m = picture[0].length;
        
        int answer = 0;
        for (int j = 0; j < m; j++) {
            answer += check(picture, 0, j) ? 1 : 0;
        }
        for (int i = 1; i < n; i++) {
            answer += check(picture, i, 0) ? 1 : 0;
        }

        // Convert cell 'B' to '1' and 'W' to '0'
        for (int j = 0; j < m; j++) {
            picture[0][j] = (picture[0][j] == 'B' ? '1' : '0');
        }
        
        for (int i = 0; i < n; i++) {
            picture[i][0] = (picture[i][0] == 'B' ? '1' : '0');
        }
        
        // If the cell is black increment the count of corresponding row and column by 1
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    picture[i][0]++;
                    picture[0][j]++;
                }
            }
        }
        
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    if (picture[0][j] == '1' && picture[i][0] == '1') {
                        answer++;
                    }
                }
            }
        }
        
        return answer;
    }
}
```

```cpp

class Solution {
public:
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell 
    // In the first row and column except (x, y) itself.
    bool check(vector<vector<char>>& picture, int x, int y) {
        int n = int(picture.size());
        int m = int(picture[0].size());
        
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cnt += (picture[i][y] == 'B');
        }
        
        for (int j = 0; j < m; j++) {
            // avoid double count (x, y)
            if (j != y) cnt += (picture[x][j] == 'B');
        }
        return picture[x][y] == 'B' && cnt == 1;
    }
    
    int findLonelyPixel(vector<vector<char>>& picture) {
        int n = int(picture.size());
        int m = int(picture[0].size());
        
        int answer = 0;
        // Lonely cells in the first row
        for (int j = 0; j < m; j++) {
            answer += check(picture, 0, j);
        }
        //Lonely cells in the first column
        for (int i = 1; i < n; i++) {
            answer += check(picture, i, 0);
        }

        // Convert cell 'B' to '1' and 'W' to '0'
        for (int j = 0; j < m; j++) {
            picture[0][j] = (picture[0][j] == 'B' ? '1' : '0');
        }
        
        for (int i = 0; i < n; i++) {
            picture[i][0] = (picture[i][0] == 'B' ? '1' : '0');
        }
        
        // If the cell is black increment the count of corresponding row and column by 1
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    picture[i][0]++;
                    picture[0][j]++;
                }
            }
        }
        
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    if (picture[0][j] == '1' && picture[i][0] == '1') {
                        answer++;
                    }
                }
            }
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} picture
     * @return {number}
     */
    findLonelyPixel(picture) {
        // Returns true if the cell at (x, y) is lonely.
        // There should not be any other black cell
        // In the first row and column except (x, y) itself.
        const check = (x, y) => {
            let n = picture.length;
            let m = picture[0].length;

            let cnt = 0;
            for (let i = 0; i < n; i++) {
                cnt += (picture[i][y] === 'B' ? 1 : 0);
            }

            for (let j = 0; j < m; j++) {
                // avoid double count (x, y)
                if (j !== y) cnt += (picture[x][j] === 'B' ? 1 : 0);
            }
            return picture[x][y] === 'B' && cnt === 1;
        };

        let n = picture.length;
        let m = picture[0].length;

        let answer = 0;
        for (let j = 0; j < m; j++) {
            answer += check(0, j) ? 1 : 0;
        }
        for (let i = 1; i < n; i++) {
            answer += check(i, 0) ? 1 : 0;
        }
        // Convert cell 'B' to '1' and 'W' to '0'
        for (let j = 0; j < m; j++) {
            picture[0][j] = (picture[0][j] === 'B' ? '1' : '0');
        }

        for (let i = 0; i < n; i++) {
            picture[i][0] = (picture[i][0] === 'B' ? '1' : '0');
        }

        // If the cell is black increment the count of corresponding row and column by 1
        for (let i = 1; i < n; i++) {
            for (let j = 1; j < m; j++) {
                if (picture[i][j] === 'B') {
                    picture[i][0] = String.fromCharCode(picture[i][0].charCodeAt(0) + 1);
                    picture[0][j] = String.fromCharCode(picture[0][j].charCodeAt(0) + 1);
                }
            }
        }

        for (let i = 1; i < n; i++) {
            for (let j = 1; j < m; j++) {
                if (picture[i][j] === 'B') {
                    if (picture[0][j] === '1' && picture[i][0] === '1') {
                        answer++;
                    }
                }
            }
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell
    // In the first row and column except (x, y) itself.
    private bool Check(char[][] picture, int x, int y) {
        int n = picture.Length;
        int m = picture[0].Length;

        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cnt += (picture[i][y] == 'B' ? 1 : 0);
        }

        for (int j = 0; j < m; j++) {
            // avoid double count (x, y)
            if (j != y) cnt += (picture[x][j] == 'B' ? 1 : 0);
        }
        return picture[x][y] == 'B' && cnt == 1;
    }

    public int FindLonelyPixel(char[][] picture) {
        int n = picture.Length;
        int m = picture[0].Length;

        int answer = 0;
        for (int j = 0; j < m; j++) {
            answer += Check(picture, 0, j) ? 1 : 0;
        }
        for (int i = 1; i < n; i++) {
            answer += Check(picture, i, 0) ? 1 : 0;
        }

        // Convert cell 'B' to '1' and 'W' to '0'
        for (int j = 0; j < m; j++) {
            picture[0][j] = (picture[0][j] == 'B' ? '1' : '0');
        }

        for (int i = 0; i < n; i++) {
            picture[i][0] = (picture[i][0] == 'B' ? '1' : '0');
        }

        // If the cell is black increment the count of corresponding row and column by 1
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    picture[i][0]++;
                    picture[0][j]++;
                }
            }
        }

        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (picture[i][j] == 'B') {
                    if (picture[0][j] == '1' && picture[i][0] == '1') {
                        answer++;
                    }
                }
            }
        }

        return answer;
    }
}
```

```go
func findLonelyPixel(picture [][]byte) int {
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell
    // In the first row and column except (x, y) itself.
    check := func(x, y int) bool {
        n := len(picture)
        m := len(picture[0])

        cnt := 0
        for i := 0; i < n; i++ {
            if picture[i][y] == 'B' {
                cnt++
            }
        }

        for j := 0; j < m; j++ {
            // avoid double count (x, y)
            if j != y && picture[x][j] == 'B' {
                cnt++
            }
        }
        return picture[x][y] == 'B' && cnt == 1
    }

    n := len(picture)
    m := len(picture[0])

    answer := 0
    for j := 0; j < m; j++ {
        if check(0, j) {
            answer++
        }
    }
    for i := 1; i < n; i++ {
        if check(i, 0) {
            answer++
        }
    }

    // Convert cell 'B' to '1' and 'W' to '0'
    for j := 0; j < m; j++ {
        if picture[0][j] == 'B' {
            picture[0][j] = '1'
        } else {
            picture[0][j] = '0'
        }
    }

    for i := 0; i < n; i++ {
        if picture[i][0] == 'B' {
            picture[i][0] = '1'
        } else {
            picture[i][0] = '0'
        }
    }

    // If the cell is black increment the count of corresponding row and column by 1
    for i := 1; i < n; i++ {
        for j := 1; j < m; j++ {
            if picture[i][j] == 'B' {
                picture[i][0]++
                picture[0][j]++
            }
        }
    }

    for i := 1; i < n; i++ {
        for j := 1; j < m; j++ {
            if picture[i][j] == 'B' {
                if picture[0][j] == '1' && picture[i][0] == '1' {
                    answer++
                }
            }
        }
    }

    return answer
}
```

```kotlin
class Solution {
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell
    // In the first row and column except (x, y) itself.
    private fun check(picture: Array<CharArray>, x: Int, y: Int): Boolean {
        val n = picture.size
        val m = picture[0].size

        var cnt = 0
        for (i in 0 until n) {
            if (picture[i][y] == 'B') cnt++
        }

        for (j in 0 until m) {
            // avoid double count (x, y)
            if (j != y && picture[x][j] == 'B') cnt++
        }
        return picture[x][y] == 'B' && cnt == 1
    }

    fun findLonelyPixel(picture: Array<CharArray>): Int {
        val n = picture.size
        val m = picture[0].size

        var answer = 0
        for (j in 0 until m) {
            if (check(picture, 0, j)) answer++
        }
        for (i in 1 until n) {
            if (check(picture, i, 0)) answer++
        }

        // Convert cell 'B' to '1' and 'W' to '0'
        for (j in 0 until m) {
            picture[0][j] = if (picture[0][j] == 'B') '1' else '0'
        }

        for (i in 0 until n) {
            picture[i][0] = if (picture[i][0] == 'B') '1' else '0'
        }

        // If the cell is black increment the count of corresponding row and column by 1
        for (i in 1 until n) {
            for (j in 1 until m) {
                if (picture[i][j] == 'B') {
                    picture[i][0]++
                    picture[0][j]++
                }
            }
        }

        for (i in 1 until n) {
            for (j in 1 until m) {
                if (picture[i][j] == 'B') {
                    if (picture[0][j] == '1' && picture[i][0] == '1') {
                        answer++
                    }
                }
            }
        }

        return answer
    }
}
```

```swift
class Solution {
    // Returns true if the cell at (x, y) is lonely.
    // There should not be any other black cell
    // In the first row and column except (x, y) itself.
    private func check(_ picture: inout [[Character]], _ x: Int, _ y: Int) -> Bool {
        let n = picture.count
        let m = picture[0].count

        var cnt = 0
        for i in 0..<n {
            if picture[i][y] == "B" {
                cnt += 1
            }
        }

        for j in 0..<m {
            // avoid double count (x, y)
            if j != y && picture[x][j] == "B" {
                cnt += 1
            }
        }
        return picture[x][y] == "B" && cnt == 1
    }

    func findLonelyPixel(_ picture: [[Character]]) -> Int {
        var picture = picture
        let n = picture.count
        let m = picture[0].count

        var answer = 0
        for j in 0..<m {
            if check(&picture, 0, j) {
                answer += 1
            }
        }
        for i in 1..<n {
            if check(&picture, i, 0) {
                answer += 1
            }
        }

        // Convert cell 'B' to '1' and 'W' to '0'
        for j in 0..<m {
            picture[0][j] = picture[0][j] == "B" ? "1" : "0"
        }

        for i in 0..<n {
            picture[i][0] = picture[i][0] == "B" ? "1" : "0"
        }

        // If the cell is black increment the count of corresponding row and column by 1
        for i in 1..<n {
            for j in 1..<m {
                if picture[i][j] == "B" {
                    picture[i][0] = Character(UnicodeScalar(picture[i][0].asciiValue! + 1))
                    picture[0][j] = Character(UnicodeScalar(picture[0][j].asciiValue! + 1))
                }
            }
        }

        for i in 1..<n {
            for j in 1..<m {
                if picture[i][j] == "B" {
                    if picture[0][j] == "1" && picture[i][0] == "1" {
                        answer += 1
                    }
                }
            }
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(1)$ constant space

>  Where $M$ is the number of rows in the given matrix `picture`, and $N$ is the number of columns in it.

## Common Pitfalls

### Checking Only the Row or Only the Column

A common mistake is to count a black pixel as lonely if it is the only black pixel in its row, without also verifying that it is the only black pixel in its column (or vice versa). Both conditions must be satisfied simultaneously for a pixel to be considered lonely.

### Confusing Row and Column Indices

When working with 2D matrices, it is easy to mix up row and column indices. Remember that `picture[i][j]` refers to row `i` and column `j`. Swapping these when updating or querying counts will produce incorrect results.

### Forgetting to Handle Edge Cases with No Black Pixels

If the matrix contains no black pixels at all, the answer is `0`. While most implementations handle this naturally, some solutions that assume at least one black pixel exists may encounter issues or unnecessary iterations.
