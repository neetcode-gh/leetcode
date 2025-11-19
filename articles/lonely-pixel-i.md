## 1. Counting with Arrays

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(M + N)$

>  Where $M$ is the number of rows in the given matrix `picture`, and $N$ is the number of columns in it.

---

## 2. Space Optimized Counting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(1)$ constant space

>  Where $M$ is the number of rows in the given matrix `picture`, and $N$ is the number of columns in it.
