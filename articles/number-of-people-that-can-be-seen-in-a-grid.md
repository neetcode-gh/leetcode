## 1. Brute Force

::tabs-start

```python
class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])

        def countVisible(line):
            size = len(line)
            cnt = [0] * size
            for i in range(size):
                mx = 0
                for j in range(i + 1, size):
                    if mx < line[j]:
                        cnt[i] += 1
                    mx = max(mx, line[j])
                    if mx >= line[i]:
                        break
            return cnt

        res = [countVisible(row) for row in heights]
        for j in range(n):
            col = [heights[i][j] for i in range(m)]
            cnt = countVisible(col)
            for i in range(m):
                res[i][j] += cnt[i]
        return res
```

```java
public class Solution {
    public int[][] seePeople(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] countVisible(int[] line) {
        int size = line.length;
        int[] cnt = new int[size];
        for (int i = 0; i < size; i++) {
            int mx = 0;
            for (int j = i + 1; j < size; j++) {
                if (mx < line[j]) {
                    cnt[i]++;
                }
                mx = Math.max(mx, line[j]);
                if (mx >= line[i]) {
                    break;
                }
            }
        }
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> seePeople(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> res(m);
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            vector<int> col(m);
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            vector<int> cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

private:
    vector<int> countVisible(vector<int>& line) {
        int size = line.size();
        vector<int> cnt(size, 0);
        for (int i = 0; i < size; i++) {
            int mx = 0;
            for (int j = i + 1; j < size; j++) {
                if (mx < line[j]) {
                    cnt[i]++;
                }
                mx = max(mx, line[j]);
                if (mx >= line[i]) {
                    break;
                }
            }
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights) {
        const m = heights.length;
        const n = heights[0].length;
        const res = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line) {
        const size = line.length;
        const cnt = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            let mx = 0;
            for (let j = i + 1; j < size; j++) {
                if (mx < line[j]) {
                    cnt[i]++;
                }
                mx = Math.max(mx, line[j]);
                if (mx >= line[i]) {
                    break;
                }
            }
        }
        return cnt;
    }
}
```

```csharp
public class Solution {
    public int[][] SeePeople(int[][] heights) {
        int m = heights.Length, n = heights[0].Length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = CountVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = CountVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] CountVisible(int[] line) {
        int size = line.Length;
        int[] cnt = new int[size];
        for (int i = 0; i < size; i++) {
            int mx = 0;
            for (int j = i + 1; j < size; j++) {
                if (mx < line[j]) {
                    cnt[i]++;
                }
                mx = Math.Max(mx, line[j]);
                if (mx >= line[i]) {
                    break;
                }
            }
        }
        return cnt;
    }
}
```

```go
func seePeople(heights [][]int) [][]int {
    m, n := len(heights), len(heights[0])

    countVisible := func(line []int) []int {
        size := len(line)
        cnt := make([]int, size)
        for i := 0; i < size; i++ {
            mx := 0
            for j := i + 1; j < size; j++ {
                if mx < line[j] {
                    cnt[i]++
                }
                mx = max(mx, line[j])
                if mx >= line[i] {
                    break
                }
            }
        }
        return cnt
    }

    res := make([][]int, m)
    for i := 0; i < m; i++ {
        res[i] = countVisible(heights[i])
    }
    for j := 0; j < n; j++ {
        col := make([]int, m)
        for i := 0; i < m; i++ {
            col[i] = heights[i][j]
        }
        cnt := countVisible(col)
        for i := 0; i < m; i++ {
            res[i][j] += cnt[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun seePeople(heights: Array<IntArray>): Array<IntArray> {
        val m = heights.size
        val n = heights[0].size
        val res = Array(m) { countVisible(heights[it]) }
        for (j in 0 until n) {
            val col = IntArray(m) { heights[it][j] }
            val cnt = countVisible(col)
            for (i in 0 until m) {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private fun countVisible(line: IntArray): IntArray {
        val size = line.size
        val cnt = IntArray(size)
        for (i in 0 until size) {
            var mx = 0
            for (j in i + 1 until size) {
                if (mx < line[j]) {
                    cnt[i]++
                }
                mx = maxOf(mx, line[j])
                if (mx >= line[i]) {
                    break
                }
            }
        }
        return cnt
    }
}
```

```swift
class Solution {
    func seePeople(_ heights: [[Int]]) -> [[Int]] {
        let m = heights.count
        let n = heights[0].count
        var res = heights.map { countVisible($0) }
        for j in 0..<n {
            let col = (0..<m).map { heights[$0][j] }
            let cnt = countVisible(col)
            for i in 0..<m {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private func countVisible(_ line: [Int]) -> [Int] {
        let size = line.count
        var cnt = [Int](repeating: 0, count: size)
        for i in 0..<size {
            var mx = 0
            for j in (i + 1)..<size {
                if mx < line[j] {
                    cnt[i] += 1
                }
                mx = max(mx, line[j])
                if mx >= line[i] {
                    break
                }
            }
        }
        return cnt
    }
}
```

```rust
impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res: Vec<Vec<i32>> = heights
            .iter()
            .map(|row| Self::count_visible(row))
            .collect();
        for j in 0..n {
            let col: Vec<i32> = (0..m).map(|i| heights[i][j]).collect();
            let cnt = Self::count_visible(&col);
            for i in 0..m {
                res[i][j] += cnt[i];
            }
        }
        res
    }

    fn count_visible(line: &[i32]) -> Vec<i32> {
        let size = line.len();
        let mut cnt = vec![0; size];
        for i in 0..size {
            let mut mx = 0;
            for j in i + 1..size {
                if mx < line[j] {
                    cnt[i] += 1;
                }
                mx = mx.max(line[j]);
                if mx >= line[i] {
                    break;
                }
            }
        }
        cnt
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights: number[][]): number[][] {
        const m = heights.length;
        const n = heights[0].length;
        const res: number[][] = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col: number[] = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line: number[]): number[] {
        const size = line.length;
        const cnt: number[] = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            let mx = 0;
            for (let j = i + 1; j < size; j++) {
                if (mx < line[j]) {
                    cnt[i]++;
                }
                mx = Math.max(mx, line[j]);
                if (mx >= line[i]) {
                    break;
                }
            }
        }
        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * (m + n))$
- Space complexity: $O(m + n)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 2. Stack + Binary Search

::tabs-start

```python
class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])

        def countVisible(line):
            size = len(line)
            cnt = [0] * size
            stack = []
            for i in range(size - 1, -1, -1):
                h = line[i]
                l, r = 0, len(stack)
                while l < r:
                    mid = (l + r) // 2
                    if stack[mid] >= h:
                        l = mid + 1
                    else:
                        r = mid
                cnt[i] = len(stack) - l
                if l > 0:
                    cnt[i] += 1
                while stack and stack[-1] <= h:
                    stack.pop()
                stack.append(h)
            return cnt

        res = [countVisible(row) for row in heights]
        for j in range(n):
            col = [heights[i][j] for i in range(m)]
            cnt = countVisible(col)
            for i in range(m):
                res[i][j] += cnt[i]
        return res
```

```java
public class Solution {
    public int[][] seePeople(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] countVisible(int[] line) {
        int size = line.length;
        int[] cnt = new int[size];
        List<Integer> stack = new ArrayList<>();
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            int l = 0, r = stack.size();
            while (l < r) {
                int mid = (l + r) / 2;
                if (stack.get(mid) >= h) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = stack.size() - l;
            if (l > 0) {
                cnt[i]++;
            }
            while (!stack.isEmpty() && stack.get(stack.size() - 1) <= h) {
                stack.remove(stack.size() - 1);
            }
            stack.add(h);
        }
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> seePeople(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> res(m);
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            vector<int> col(m);
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            vector<int> cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

private:
    vector<int> countVisible(vector<int>& line) {
        int size = line.size();
        vector<int> cnt(size, 0);
        vector<int> stack;
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            int l = 0, r = stack.size();
            while (l < r) {
                int mid = (l + r) / 2;
                if (stack[mid] >= h) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = stack.size() - l;
            if (l > 0) {
                cnt[i]++;
            }
            while (!stack.empty() && stack.back() <= h) {
                stack.pop_back();
            }
            stack.push_back(h);
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights) {
        const m = heights.length;
        const n = heights[0].length;
        const res = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line) {
        const size = line.length;
        const cnt = new Array(size).fill(0);
        const stack = [];
        for (let i = size - 1; i >= 0; i--) {
            const h = line[i];
            let l = 0;
            let r = stack.length;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (stack[mid] >= h) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = stack.length - l;
            if (l > 0) {
                cnt[i]++;
            }
            while (stack.length && stack[stack.length - 1] <= h) {
                stack.pop();
            }
            stack.push(h);
        }
        return cnt;
    }
}
```

```csharp
public class Solution {
    public int[][] SeePeople(int[][] heights) {
        int m = heights.Length, n = heights[0].Length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = CountVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = CountVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] CountVisible(int[] line) {
        int size = line.Length;
        int[] cnt = new int[size];
        var stack = new List<int>();
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            int l = 0, r = stack.Count;
            while (l < r) {
                int mid = (l + r) / 2;
                if (stack[mid] >= h) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = stack.Count - l;
            if (l > 0) {
                cnt[i]++;
            }
            while (stack.Count > 0 && stack[stack.Count - 1] <= h) {
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add(h);
        }
        return cnt;
    }
}
```

```go
func seePeople(heights [][]int) [][]int {
    m, n := len(heights), len(heights[0])

    countVisible := func(line []int) []int {
        size := len(line)
        cnt := make([]int, size)
        stack := []int{}
        for i := size - 1; i >= 0; i-- {
            h := line[i]
            l, r := 0, len(stack)
            for l < r {
                mid := (l + r) / 2
                if stack[mid] >= h {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            cnt[i] = len(stack) - l
            if l > 0 {
                cnt[i]++
            }
            for len(stack) > 0 && stack[len(stack)-1] <= h {
                stack = stack[:len(stack)-1]
            }
            stack = append(stack, h)
        }
        return cnt
    }

    res := make([][]int, m)
    for i := 0; i < m; i++ {
        res[i] = countVisible(heights[i])
    }
    for j := 0; j < n; j++ {
        col := make([]int, m)
        for i := 0; i < m; i++ {
            col[i] = heights[i][j]
        }
        cnt := countVisible(col)
        for i := 0; i < m; i++ {
            res[i][j] += cnt[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun seePeople(heights: Array<IntArray>): Array<IntArray> {
        val m = heights.size
        val n = heights[0].size
        val res = Array(m) { countVisible(heights[it]) }
        for (j in 0 until n) {
            val col = IntArray(m) { heights[it][j] }
            val cnt = countVisible(col)
            for (i in 0 until m) {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private fun countVisible(line: IntArray): IntArray {
        val size = line.size
        val cnt = IntArray(size)
        val stack = mutableListOf<Int>()
        for (i in size - 1 downTo 0) {
            val h = line[i]
            var l = 0
            var r = stack.size
            while (l < r) {
                val mid = (l + r) / 2
                if (stack[mid] >= h) {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            cnt[i] = stack.size - l
            if (l > 0) {
                cnt[i]++
            }
            while (stack.isNotEmpty() && stack.last() <= h) {
                stack.removeAt(stack.lastIndex)
            }
            stack.add(h)
        }
        return cnt
    }
}
```

```swift
class Solution {
    func seePeople(_ heights: [[Int]]) -> [[Int]] {
        let m = heights.count
        let n = heights[0].count
        var res = heights.map { countVisible($0) }
        for j in 0..<n {
            let col = (0..<m).map { heights[$0][j] }
            let cnt = countVisible(col)
            for i in 0..<m {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private func countVisible(_ line: [Int]) -> [Int] {
        let size = line.count
        var cnt = [Int](repeating: 0, count: size)
        var stack = [Int]()
        for i in stride(from: size - 1, through: 0, by: -1) {
            let h = line[i]
            var l = 0
            var r = stack.count
            while l < r {
                let mid = (l + r) / 2
                if stack[mid] >= h {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            cnt[i] = stack.count - l
            if l > 0 {
                cnt[i] += 1
            }
            while !stack.isEmpty && stack.last! <= h {
                stack.removeLast()
            }
            stack.append(h)
        }
        return cnt
    }
}
```

```rust
impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res: Vec<Vec<i32>> = heights
            .iter()
            .map(|row| Self::count_visible(row))
            .collect();
        for j in 0..n {
            let col: Vec<i32> = (0..m).map(|i| heights[i][j]).collect();
            let cnt = Self::count_visible(&col);
            for i in 0..m {
                res[i][j] += cnt[i];
            }
        }
        res
    }

    fn count_visible(line: &[i32]) -> Vec<i32> {
        let size = line.len();
        let mut cnt = vec![0; size];
        let mut stack: Vec<i32> = Vec::new();
        for i in (0..size).rev() {
            let h = line[i];
            let (mut l, mut r) = (0, stack.len());
            while l < r {
                let mid = (l + r) / 2;
                if stack[mid] >= h {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = (stack.len() - l) as i32;
            if l > 0 {
                cnt[i] += 1;
            }
            while let Some(&top) = stack.last() {
                if top <= h {
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(h);
        }
        cnt
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights: number[][]): number[][] {
        const m = heights.length;
        const n = heights[0].length;
        const res: number[][] = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col: number[] = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line: number[]): number[] {
        const size = line.length;
        const cnt: number[] = new Array(size).fill(0);
        const stack: number[] = [];
        for (let i = size - 1; i >= 0; i--) {
            const h = line[i];
            let l = 0;
            let r = stack.length;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (stack[mid] >= h) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            cnt[i] = stack.length - l;
            if (l > 0) {
                cnt[i]++;
            }
            while (stack.length && stack[stack.length - 1] <= h) {
                stack.pop();
            }
            stack.push(h);
        }
        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log (\max(m, n)))$
- Space complexity: $O(m + n)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 3. Stack - I

::tabs-start

```python
class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])

        def countVisible(line):
            size = len(line)
            cnt = [0] * size
            stack = []
            for i in range(size):
                h = line[i]
                while stack and line[stack[-1]] < h:
                    cnt[stack.pop()] += 1
                if stack:
                    cnt[stack[-1]] += 1
                    if line[stack[-1]] == h:
                        stack.pop()
                stack.append(i)
            return cnt

        res = [countVisible(row) for row in heights]
        for j in range(n):
            col = [heights[i][j] for i in range(m)]
            cnt = countVisible(col)
            for i in range(m):
                res[i][j] += cnt[i]
        return res
```

```java
public class Solution {
    public int[][] seePeople(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] countVisible(int[] line) {
        int size = line.length;
        int[] cnt = new int[size];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < size; i++) {
            int h = line[i];
            while (!stack.isEmpty() && line[stack.peek()] < h) {
                cnt[stack.pop()]++;
            }
            if (!stack.isEmpty()) {
                cnt[stack.peek()]++;
                if (line[stack.peek()] == h) {
                    stack.pop();
                }
            }
            stack.push(i);
        }
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> seePeople(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> res(m);
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            vector<int> col(m);
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            vector<int> cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

private:
    vector<int> countVisible(vector<int>& line) {
        int size = line.size();
        vector<int> cnt(size, 0);
        vector<int> stack;
        for (int i = 0; i < size; i++) {
            int h = line[i];
            while (!stack.empty() && line[stack.back()] < h) {
                cnt[stack.back()]++;
                stack.pop_back();
            }
            if (!stack.empty()) {
                cnt[stack.back()]++;
                if (line[stack.back()] == h) {
                    stack.pop_back();
                }
            }
            stack.push_back(i);
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights) {
        const m = heights.length;
        const n = heights[0].length;
        const res = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line) {
        const size = line.length;
        const cnt = new Array(size).fill(0);
        const stack = [];
        for (let i = 0; i < size; i++) {
            const h = line[i];
            while (stack.length && line[stack[stack.length - 1]] < h) {
                cnt[stack.pop()]++;
            }
            if (stack.length) {
                cnt[stack[stack.length - 1]]++;
                if (line[stack[stack.length - 1]] === h) {
                    stack.pop();
                }
            }
            stack.push(i);
        }
        return cnt;
    }
}
```

```csharp
public class Solution {
    public int[][] SeePeople(int[][] heights) {
        int m = heights.Length, n = heights[0].Length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = CountVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = CountVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] CountVisible(int[] line) {
        int size = line.Length;
        int[] cnt = new int[size];
        var stack = new Stack<int>();
        for (int i = 0; i < size; i++) {
            int h = line[i];
            while (stack.Count > 0 && line[stack.Peek()] < h) {
                cnt[stack.Pop()]++;
            }
            if (stack.Count > 0) {
                cnt[stack.Peek()]++;
                if (line[stack.Peek()] == h) {
                    stack.Pop();
                }
            }
            stack.Push(i);
        }
        return cnt;
    }
}
```

```go
func seePeople(heights [][]int) [][]int {
    m, n := len(heights), len(heights[0])

    countVisible := func(line []int) []int {
        size := len(line)
        cnt := make([]int, size)
        stack := []int{}
        for i := 0; i < size; i++ {
            h := line[i]
            for len(stack) > 0 && line[stack[len(stack)-1]] < h {
                cnt[stack[len(stack)-1]]++
                stack = stack[:len(stack)-1]
            }
            if len(stack) > 0 {
                top := stack[len(stack)-1]
                cnt[top]++
                if line[top] == h {
                    stack = stack[:len(stack)-1]
                }
            }
            stack = append(stack, i)
        }
        return cnt
    }

    res := make([][]int, m)
    for i := 0; i < m; i++ {
        res[i] = countVisible(heights[i])
    }
    for j := 0; j < n; j++ {
        col := make([]int, m)
        for i := 0; i < m; i++ {
            col[i] = heights[i][j]
        }
        cnt := countVisible(col)
        for i := 0; i < m; i++ {
            res[i][j] += cnt[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun seePeople(heights: Array<IntArray>): Array<IntArray> {
        val m = heights.size
        val n = heights[0].size
        val res = Array(m) { countVisible(heights[it]) }
        for (j in 0 until n) {
            val col = IntArray(m) { heights[it][j] }
            val cnt = countVisible(col)
            for (i in 0 until m) {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private fun countVisible(line: IntArray): IntArray {
        val size = line.size
        val cnt = IntArray(size)
        val stack = mutableListOf<Int>()
        for (i in 0 until size) {
            val h = line[i]
            while (stack.isNotEmpty() && line[stack.last()] < h) {
                cnt[stack.removeAt(stack.lastIndex)]++
            }
            if (stack.isNotEmpty()) {
                cnt[stack.last()]++
                if (line[stack.last()] == h) {
                    stack.removeAt(stack.lastIndex)
                }
            }
            stack.add(i)
        }
        return cnt
    }
}
```

```swift
class Solution {
    func seePeople(_ heights: [[Int]]) -> [[Int]] {
        let m = heights.count
        let n = heights[0].count
        var res = heights.map { countVisible($0) }
        for j in 0..<n {
            let col = (0..<m).map { heights[$0][j] }
            let cnt = countVisible(col)
            for i in 0..<m {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private func countVisible(_ line: [Int]) -> [Int] {
        let size = line.count
        var cnt = [Int](repeating: 0, count: size)
        var stack = [Int]()
        for i in 0..<size {
            let h = line[i]
            while !stack.isEmpty && line[stack.last!] < h {
                cnt[stack.removeLast()] += 1
            }
            if let top = stack.last {
                cnt[top] += 1
                if line[top] == h {
                    stack.removeLast()
                }
            }
            stack.append(i)
        }
        return cnt
    }
}
```

```rust
impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res: Vec<Vec<i32>> = heights
            .iter()
            .map(|row| Self::count_visible(row))
            .collect();
        for j in 0..n {
            let col: Vec<i32> = (0..m).map(|i| heights[i][j]).collect();
            let cnt = Self::count_visible(&col);
            for i in 0..m {
                res[i][j] += cnt[i];
            }
        }
        res
    }

    fn count_visible(line: &[i32]) -> Vec<i32> {
        let size = line.len();
        let mut cnt = vec![0; size];
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..size {
            let h = line[i];
            while let Some(&top) = stack.last() {
                if line[top] >= h {
                    break;
                }
                cnt[top] += 1;
                stack.pop();
            }
            if let Some(&top) = stack.last() {
                cnt[top] += 1;
                if line[top] == h {
                    stack.pop();
                }
            }
            stack.push(i);
        }
        cnt
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights: number[][]): number[][] {
        const m = heights.length;
        const n = heights[0].length;
        const res: number[][] = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col: number[] = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line: number[]): number[] {
        const size = line.length;
        const cnt: number[] = new Array(size).fill(0);
        const stack: number[] = [];
        for (let i = 0; i < size; i++) {
            const h = line[i];
            while (stack.length && line[stack[stack.length - 1]] < h) {
                cnt[stack.pop() as number]++;
            }
            if (stack.length) {
                cnt[stack[stack.length - 1]]++;
                if (line[stack[stack.length - 1]] === h) {
                    stack.pop();
                }
            }
            stack.push(i);
        }
        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m + n)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 4. Stack - II

::tabs-start

```python
class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])

        def countVisible(line):
            size = len(line)
            cnt = [0] * size
            stack = []
            for i in range(size - 1, -1, -1):
                h = line[i]
                while stack and stack[-1] < h:
                    stack.pop()
                    cnt[i] += 1
                if stack:
                    cnt[i] += 1
                    if stack[-1] == h:
                        stack.pop()
                stack.append(h)
            return cnt

        res = [countVisible(row) for row in heights]
        for j in range(n):
            col = [heights[i][j] for i in range(m)]
            cnt = countVisible(col)
            for i in range(m):
                res[i][j] += cnt[i]
        return res
```

```java
public class Solution {
    public int[][] seePeople(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] countVisible(int[] line) {
        int size = line.length;
        int[] cnt = new int[size];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            while (!stack.isEmpty() && stack.peek() < h) {
                stack.pop();
                cnt[i]++;
            }
            if (!stack.isEmpty()) {
                cnt[i]++;
                if (stack.peek() == h) {
                    stack.pop();
                }
            }
            stack.push(h);
        }
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> seePeople(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> res(m);
        for (int i = 0; i < m; i++) {
            res[i] = countVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            vector<int> col(m);
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            vector<int> cnt = countVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

private:
    vector<int> countVisible(vector<int>& line) {
        int size = line.size();
        vector<int> cnt(size, 0);
        vector<int> stack;
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            while (!stack.empty() && stack.back() < h) {
                stack.pop_back();
                cnt[i]++;
            }
            if (!stack.empty()) {
                cnt[i]++;
                if (stack.back() == h) {
                    stack.pop_back();
                }
            }
            stack.push_back(h);
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights) {
        const m = heights.length;
        const n = heights[0].length;
        const res = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line) {
        const size = line.length;
        const cnt = new Array(size).fill(0);
        const stack = [];
        for (let i = size - 1; i >= 0; i--) {
            const h = line[i];
            while (stack.length && stack[stack.length - 1] < h) {
                stack.pop();
                cnt[i]++;
            }
            if (stack.length) {
                cnt[i]++;
                if (stack[stack.length - 1] === h) {
                    stack.pop();
                }
            }
            stack.push(h);
        }
        return cnt;
    }
}
```

```csharp
public class Solution {
    public int[][] SeePeople(int[][] heights) {
        int m = heights.Length, n = heights[0].Length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = CountVisible(heights[i]);
        }
        for (int j = 0; j < n; j++) {
            int[] col = new int[m];
            for (int i = 0; i < m; i++) {
                col[i] = heights[i][j];
            }
            int[] cnt = CountVisible(col);
            for (int i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    private int[] CountVisible(int[] line) {
        int size = line.Length;
        int[] cnt = new int[size];
        var stack = new Stack<int>();
        for (int i = size - 1; i >= 0; i--) {
            int h = line[i];
            while (stack.Count > 0 && stack.Peek() < h) {
                stack.Pop();
                cnt[i]++;
            }
            if (stack.Count > 0) {
                cnt[i]++;
                if (stack.Peek() == h) {
                    stack.Pop();
                }
            }
            stack.Push(h);
        }
        return cnt;
    }
}
```

```go
func seePeople(heights [][]int) [][]int {
    m, n := len(heights), len(heights[0])

    countVisible := func(line []int) []int {
        size := len(line)
        cnt := make([]int, size)
        stack := []int{}
        for i := size - 1; i >= 0; i-- {
            h := line[i]
            for len(stack) > 0 && stack[len(stack)-1] < h {
                stack = stack[:len(stack)-1]
                cnt[i]++
            }
            if len(stack) > 0 {
                cnt[i]++
                if stack[len(stack)-1] == h {
                    stack = stack[:len(stack)-1]
                }
            }
            stack = append(stack, h)
        }
        return cnt
    }

    res := make([][]int, m)
    for i := 0; i < m; i++ {
        res[i] = countVisible(heights[i])
    }
    for j := 0; j < n; j++ {
        col := make([]int, m)
        for i := 0; i < m; i++ {
            col[i] = heights[i][j]
        }
        cnt := countVisible(col)
        for i := 0; i < m; i++ {
            res[i][j] += cnt[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun seePeople(heights: Array<IntArray>): Array<IntArray> {
        val m = heights.size
        val n = heights[0].size
        val res = Array(m) { countVisible(heights[it]) }
        for (j in 0 until n) {
            val col = IntArray(m) { heights[it][j] }
            val cnt = countVisible(col)
            for (i in 0 until m) {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private fun countVisible(line: IntArray): IntArray {
        val size = line.size
        val cnt = IntArray(size)
        val stack = mutableListOf<Int>()
        for (i in size - 1 downTo 0) {
            val h = line[i]
            while (stack.isNotEmpty() && stack.last() < h) {
                stack.removeAt(stack.lastIndex)
                cnt[i]++
            }
            if (stack.isNotEmpty()) {
                cnt[i]++
                if (stack.last() == h) {
                    stack.removeAt(stack.lastIndex)
                }
            }
            stack.add(h)
        }
        return cnt
    }
}
```

```swift
class Solution {
    func seePeople(_ heights: [[Int]]) -> [[Int]] {
        let m = heights.count
        let n = heights[0].count
        var res = heights.map { countVisible($0) }
        for j in 0..<n {
            let col = (0..<m).map { heights[$0][j] }
            let cnt = countVisible(col)
            for i in 0..<m {
                res[i][j] += cnt[i]
            }
        }
        return res
    }

    private func countVisible(_ line: [Int]) -> [Int] {
        let size = line.count
        var cnt = [Int](repeating: 0, count: size)
        var stack = [Int]()
        for i in stride(from: size - 1, through: 0, by: -1) {
            let h = line[i]
            while !stack.isEmpty && stack.last! < h {
                stack.removeLast()
                cnt[i] += 1
            }
            if let top = stack.last {
                cnt[i] += 1
                if top == h {
                    stack.removeLast()
                }
            }
            stack.append(h)
        }
        return cnt
    }
}
```

```rust
impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res: Vec<Vec<i32>> = heights
            .iter()
            .map(|row| Self::count_visible(row))
            .collect();
        for j in 0..n {
            let col: Vec<i32> = (0..m).map(|i| heights[i][j]).collect();
            let cnt = Self::count_visible(&col);
            for i in 0..m {
                res[i][j] += cnt[i];
            }
        }
        res
    }

    fn count_visible(line: &[i32]) -> Vec<i32> {
        let size = line.len();
        let mut cnt = vec![0; size];
        let mut stack: Vec<i32> = Vec::new();
        for i in (0..size).rev() {
            let h = line[i];
            while let Some(&top) = stack.last() {
                if top >= h {
                    break;
                }
                stack.pop();
                cnt[i] += 1;
            }
            if let Some(&top) = stack.last() {
                cnt[i] += 1;
                if top == h {
                    stack.pop();
                }
            }
            stack.push(h);
        }
        cnt
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights: number[][]): number[][] {
        const m = heights.length;
        const n = heights[0].length;
        const res: number[][] = heights.map((row) => this.countVisible(row));
        for (let j = 0; j < n; j++) {
            const col: number[] = [];
            for (let i = 0; i < m; i++) {
                col.push(heights[i][j]);
            }
            const cnt = this.countVisible(col);
            for (let i = 0; i < m; i++) {
                res[i][j] += cnt[i];
            }
        }
        return res;
    }

    /**
     * @param {number[]} line
     * @return {number[]}
     */
    countVisible(line: number[]): number[] {
        const size = line.length;
        const cnt: number[] = new Array(size).fill(0);
        const stack: number[] = [];
        for (let i = size - 1; i >= 0; i--) {
            const h = line[i];
            while (stack.length && stack[stack.length - 1] < h) {
                stack.pop();
                cnt[i]++;
            }
            if (stack.length) {
                cnt[i]++;
                if (stack[stack.length - 1] === h) {
                    stack.pop();
                }
            }
            stack.push(h);
        }
        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m + n)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 5. Stack (One Pass)

::tabs-start

```python
class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        res = [[0] * n for _ in range(m)]
        colStacks = [[] for _ in range(n)]

        def countVisible(stack, h):
            cnt = 0
            while stack and stack[-1] < h:
                stack.pop()
                cnt += 1
            if stack:
                cnt += 1
                if stack[-1] == h:
                    stack.pop()
            stack.append(h)
            return cnt

        for i in range(m - 1, -1, -1):
            rowStack = []
            for j in range(n - 1, -1, -1):
                h = heights[i][j]
                res[i][j] = countVisible(rowStack, h) + countVisible(colStacks[j], h)
        return res
```

```java
public class Solution {
    public int[][] seePeople(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] res = new int[m][n];
        List<Deque<Integer>> colStacks = new ArrayList<>();
        for (int j = 0; j < n; j++) {
            colStacks.add(new ArrayDeque<>());
        }
        for (int i = m - 1; i >= 0; i--) {
            Deque<Integer> rowStack = new ArrayDeque<>();
            for (int j = n - 1; j >= 0; j--) {
                int h = heights[i][j];
                res[i][j] = countVisible(rowStack, h) + countVisible(colStacks.get(j), h);
            }
        }
        return res;
    }

    private int countVisible(Deque<Integer> stack, int h) {
        int cnt = 0;
        while (!stack.isEmpty() && stack.peek() < h) {
            stack.pop();
            cnt++;
        }
        if (!stack.isEmpty()) {
            cnt++;
            if (stack.peek() == h) {
                stack.pop();
            }
        }
        stack.push(h);
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> seePeople(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> res(m, vector<int>(n, 0));
        vector<vector<int>> colStacks(n);
        for (int i = m - 1; i >= 0; i--) {
            vector<int> rowStack;
            for (int j = n - 1; j >= 0; j--) {
                int h = heights[i][j];
                res[i][j] = countVisible(rowStack, h) + countVisible(colStacks[j], h);
            }
        }
        return res;
    }

private:
    int countVisible(vector<int>& stack, int h) {
        int cnt = 0;
        while (!stack.empty() && stack.back() < h) {
            stack.pop_back();
            cnt++;
        }
        if (!stack.empty()) {
            cnt++;
            if (stack.back() == h) {
                stack.pop_back();
            }
        }
        stack.push_back(h);
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights) {
        const m = heights.length;
        const n = heights[0].length;
        const res = Array.from({ length: m }, () => new Array(n).fill(0));
        const colStacks = Array.from({ length: n }, () => []);
        for (let i = m - 1; i >= 0; i--) {
            const rowStack = [];
            for (let j = n - 1; j >= 0; j--) {
                const h = heights[i][j];
                res[i][j] =
                    this.countVisible(rowStack, h) +
                    this.countVisible(colStacks[j], h);
            }
        }
        return res;
    }

    /**
     * @param {number[]} stack
     * @param {number} h
     * @return {number}
     */
    countVisible(stack, h) {
        let cnt = 0;
        while (stack.length && stack[stack.length - 1] < h) {
            stack.pop();
            cnt++;
        }
        if (stack.length) {
            cnt++;
            if (stack[stack.length - 1] === h) {
                stack.pop();
            }
        }
        stack.push(h);
        return cnt;
    }
}
```

```csharp
public class Solution {
    public int[][] SeePeople(int[][] heights) {
        int m = heights.Length, n = heights[0].Length;
        int[][] res = new int[m][];
        for (int i = 0; i < m; i++) {
            res[i] = new int[n];
        }
        var colStacks = new Stack<int>[n];
        for (int j = 0; j < n; j++) {
            colStacks[j] = new Stack<int>();
        }
        for (int i = m - 1; i >= 0; i--) {
            var rowStack = new Stack<int>();
            for (int j = n - 1; j >= 0; j--) {
                int h = heights[i][j];
                res[i][j] = CountVisible(rowStack, h) + CountVisible(colStacks[j], h);
            }
        }
        return res;
    }

    private int CountVisible(Stack<int> stack, int h) {
        int cnt = 0;
        while (stack.Count > 0 && stack.Peek() < h) {
            stack.Pop();
            cnt++;
        }
        if (stack.Count > 0) {
            cnt++;
            if (stack.Peek() == h) {
                stack.Pop();
            }
        }
        stack.Push(h);
        return cnt;
    }
}
```

```go
func seePeople(heights [][]int) [][]int {
    m, n := len(heights), len(heights[0])

    countVisible := func(stack *[]int, h int) int {
        s := *stack
        cnt := 0
        for len(s) > 0 && s[len(s)-1] < h {
            s = s[:len(s)-1]
            cnt++
        }
        if len(s) > 0 {
            cnt++
            if s[len(s)-1] == h {
                s = s[:len(s)-1]
            }
        }
        *stack = append(s, h)
        return cnt
    }

    res := make([][]int, m)
    for i := 0; i < m; i++ {
        res[i] = make([]int, n)
    }
    colStacks := make([][]int, n)
    for i := m - 1; i >= 0; i-- {
        rowStack := []int{}
        for j := n - 1; j >= 0; j-- {
            h := heights[i][j]
            res[i][j] = countVisible(&rowStack, h) + countVisible(&colStacks[j], h)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun seePeople(heights: Array<IntArray>): Array<IntArray> {
        val m = heights.size
        val n = heights[0].size
        val res = Array(m) { IntArray(n) }
        val colStacks = Array(n) { mutableListOf<Int>() }
        for (i in m - 1 downTo 0) {
            val rowStack = mutableListOf<Int>()
            for (j in n - 1 downTo 0) {
                val h = heights[i][j]
                res[i][j] = countVisible(rowStack, h) + countVisible(colStacks[j], h)
            }
        }
        return res
    }

    private fun countVisible(stack: MutableList<Int>, h: Int): Int {
        var cnt = 0
        while (stack.isNotEmpty() && stack.last() < h) {
            stack.removeAt(stack.lastIndex)
            cnt++
        }
        if (stack.isNotEmpty()) {
            cnt++
            if (stack.last() == h) {
                stack.removeAt(stack.lastIndex)
            }
        }
        stack.add(h)
        return cnt
    }
}
```

```swift
class Solution {
    func seePeople(_ heights: [[Int]]) -> [[Int]] {
        let m = heights.count
        let n = heights[0].count
        var res = [[Int]](repeating: [Int](repeating: 0, count: n), count: m)
        var colStacks = [[Int]](repeating: [], count: n)
        for i in stride(from: m - 1, through: 0, by: -1) {
            var rowStack = [Int]()
            for j in stride(from: n - 1, through: 0, by: -1) {
                let h = heights[i][j]
                res[i][j] = countVisible(&rowStack, h) + countVisible(&colStacks[j], h)
            }
        }
        return res
    }

    private func countVisible(_ stack: inout [Int], _ h: Int) -> Int {
        var cnt = 0
        while !stack.isEmpty && stack.last! < h {
            stack.removeLast()
            cnt += 1
        }
        if let top = stack.last {
            cnt += 1
            if top == h {
                stack.removeLast()
            }
        }
        stack.append(h)
        return cnt
    }
}
```

```rust
impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res = vec![vec![0; n]; m];
        let mut col_stacks: Vec<Vec<i32>> = vec![Vec::new(); n];
        for i in (0..m).rev() {
            let mut row_stack: Vec<i32> = Vec::new();
            for j in (0..n).rev() {
                let h = heights[i][j];
                res[i][j] = Self::count_visible(&mut row_stack, h)
                    + Self::count_visible(&mut col_stacks[j], h);
            }
        }
        res
    }

    fn count_visible(stack: &mut Vec<i32>, h: i32) -> i32 {
        let mut cnt = 0;
        while let Some(&top) = stack.last() {
            if top >= h {
                break;
            }
            stack.pop();
            cnt += 1;
        }
        if let Some(&top) = stack.last() {
            cnt += 1;
            if top == h {
                stack.pop();
            }
        }
        stack.push(h);
        cnt
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    seePeople(heights: number[][]): number[][] {
        const m = heights.length;
        const n = heights[0].length;
        const res: number[][] = Array.from({ length: m }, () =>
            new Array(n).fill(0),
        );
        const colStacks: number[][] = Array.from({ length: n }, () => []);
        for (let i = m - 1; i >= 0; i--) {
            const rowStack: number[] = [];
            for (let j = n - 1; j >= 0; j--) {
                const h = heights[i][j];
                res[i][j] =
                    this.countVisible(rowStack, h) +
                    this.countVisible(colStacks[j], h);
            }
        }
        return res;
    }

    /**
     * @param {number[]} stack
     * @param {number} h
     * @return {number}
     */
    countVisible(stack: number[], h: number): number {
        let cnt = 0;
        while (stack.length && stack[stack.length - 1] < h) {
            stack.pop();
            cnt++;
        }
        if (stack.length) {
            cnt++;
            if (stack[stack.length - 1] === h) {
                stack.pop();
            }
        }
        stack.push(h);
        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$ extra space for the column stacks.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.
