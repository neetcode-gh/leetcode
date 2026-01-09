## 1. Brute Force

### Intuition

For each box position, we want to know the total number of moves needed to bring all balls to that position. A move shifts a ball one position left or right. The cost to move a ball from position `i` to position `pos` is simply the absolute difference `|pos - i|`.

We can compute this directly by iterating through all boxes for each target position and summing up the distances from each `ball`.

### Algorithm

1. Create a `res` array of size `n`.
2. For each target position `pos`:
   - Iterate through all boxes.
   - If box `i` contains a `ball` (value is '1'), add `|pos - i|` to `res`.
3. Return the `res` array.

::tabs-start

```python
class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        n = len(boxes)
        res = [0] * n

        for pos in range(n):
            for i in range(n):
                if boxes[i] == '1':
                    res[pos] += abs(pos - i)

        return res
```

```java
public class Solution {
    public int[] minOperations(String boxes) {
        int n = boxes.length();
        int[] res = new int[n];

        for (int pos = 0; pos < n; pos++) {
            for (int i = 0; i < n; i++) {
                if (boxes.charAt(i) == '1') {
                    res[pos] += Math.abs(pos - i);
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> minOperations(string boxes) {
        int n = boxes.size();
        vector<int> res(n, 0);

        for (int pos = 0; pos < n; pos++) {
            for (int i = 0; i < n; i++) {
                if (boxes[i] == '1') {
                    res[pos] += abs(pos - i);
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} boxes
     * @return {number[]}
     */
    minOperations(boxes) {
        const n = boxes.length;
        const res = new Array(n).fill(0);

        for (let pos = 0; pos < n; pos++) {
            for (let i = 0; i < n; i++) {
                if (boxes[i] === '1') {
                    res[pos] += Math.abs(pos - i);
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] MinOperations(string boxes) {
        int n = boxes.Length;
        int[] res = new int[n];

        for (int pos = 0; pos < n; pos++) {
            for (int i = 0; i < n; i++) {
                if (boxes[i] == '1') {
                    res[pos] += Math.Abs(pos - i);
                }
            }
        }

        return res;
    }
}
```

```go
func minOperations(boxes string) []int {
    n := len(boxes)
    res := make([]int, n)

    for pos := 0; pos < n; pos++ {
        for i := 0; i < n; i++ {
            if boxes[i] == '1' {
                if pos > i {
                    res[pos] += pos - i
                } else {
                    res[pos] += i - pos
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(boxes: String): IntArray {
        val n = boxes.length
        val res = IntArray(n)

        for (pos in 0 until n) {
            for (i in 0 until n) {
                if (boxes[i] == '1') {
                    res[pos] += kotlin.math.abs(pos - i)
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ boxes: String) -> [Int] {
        let n = boxes.count
        var res = [Int](repeating: 0, count: n)
        let chars = Array(boxes)

        for pos in 0..<n {
            for i in 0..<n {
                if chars[i] == "1" {
                    res[pos] += abs(pos - i)
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output list.

---

## 2. Prefix Sum

### Intuition

We can split the total cost for each position into contributions from the left and the right. For `balls` on the left, the cost is `i * count_left - sum_of_indices_left`. For `balls` on the right, the cost is `sum_of_indices_right - i * count_right`. Using prefix sums for both the `count` of `balls` and the sum of their `indices`, we can compute both parts efficiently.

### Algorithm

1. Build two prefix arrays:
   - `prefix_count[i]` = number of `balls` in boxes 0 to `i-1`.
   - `index_sum[i]` = sum of `indices` of `balls` in boxes 0 to `i-1`.
2. For each position `i`:
   - Left contribution: `i * left_count - left_sum`.
   - Right contribution: `right_sum - i * right_count`.
   - Add both to get the `res` for position `i`.
3. Return the `res` array.

::tabs-start

```python
class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        n = len(boxes)
        res = [0] * n

        prefix_count = [0] * (n + 1)
        index_sum = [0] * (n + 1)
        for i in range(n):
            prefix_count[i + 1] = prefix_count[i] + (boxes[i] == '1')
            index_sum[i + 1] = index_sum[i] + (i if boxes[i] == '1' else 0)

        for i in range(n):
            left = prefix_count[i]
            left_sum = index_sum[i]

            right = prefix_count[n] - prefix_count[i + 1]
            right_sum = index_sum[n] - index_sum[i + 1]

            res[i] = (i * left - left_sum) + (right_sum - i * right)

        return res
```

```java
public class Solution {
    public int[] minOperations(String boxes) {
        int n = boxes.length();
        int[] res = new int[n];
        int[] prefixCount = new int[n + 1];
        int[] indexSum = new int[n + 1];

        for (int i = 0; i < n; i++) {
            prefixCount[i + 1] = prefixCount[i] + (boxes.charAt(i) == '1' ? 1 : 0);
            indexSum[i + 1] = indexSum[i] + (boxes.charAt(i) == '1' ? i : 0);
        }

        for (int i = 0; i < n; i++) {
            int left = prefixCount[i];
            int leftSum = indexSum[i];

            int right = prefixCount[n] - prefixCount[i + 1];
            int rightSum = indexSum[n] - indexSum[i + 1];

            res[i] = i * left - leftSum + (rightSum - i * right);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> minOperations(string boxes) {
        int n = boxes.size();
        vector<int> res(n), prefixCount(n + 1, 0), indexSum(n + 1, 0);

        for (int i = 0; i < n; i++) {
            prefixCount[i + 1] = prefixCount[i] + (boxes[i] == '1' ? 1 : 0);
            indexSum[i + 1] = indexSum[i] + (boxes[i] == '1' ? i : 0);
        }

        for (int i = 0; i < n; i++) {
            int left = prefixCount[i];
            int leftSum = indexSum[i];
            int right = prefixCount[n] - prefixCount[i + 1];
            int rightSum = indexSum[n] - indexSum[i + 1];
            res[i] = i * left - leftSum + (rightSum - i * right);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} boxes
     * @return {number[]}
     */
    minOperations(boxes) {
        const n = boxes.length;
        const res = new Array(n).fill(0);
        const prefixCount = new Array(n + 1).fill(0);
        const indexSum = new Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            prefixCount[i + 1] = prefixCount[i] + (boxes[i] === '1' ? 1 : 0);
            indexSum[i + 1] = indexSum[i] + (boxes[i] === '1' ? i : 0);
        }

        for (let i = 0; i < n; i++) {
            const left = prefixCount[i];
            const leftSum = indexSum[i];
            const right = prefixCount[n] - prefixCount[i + 1];
            const rightSum = indexSum[n] - indexSum[i + 1];

            res[i] = i * left - leftSum + (rightSum - i * right);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] MinOperations(string boxes) {
        int n = boxes.Length;
        int[] res = new int[n];
        int[] prefixCount = new int[n + 1];
        int[] indexSum = new int[n + 1];

        for (int i = 0; i < n; i++) {
            prefixCount[i + 1] = prefixCount[i] + (boxes[i] == '1' ? 1 : 0);
            indexSum[i + 1] = indexSum[i] + (boxes[i] == '1' ? i : 0);
        }

        for (int i = 0; i < n; i++) {
            int left = prefixCount[i];
            int leftSum = indexSum[i];
            int right = prefixCount[n] - prefixCount[i + 1];
            int rightSum = indexSum[n] - indexSum[i + 1];

            res[i] = i * left - leftSum + (rightSum - i * right);
        }

        return res;
    }
}
```

```go
func minOperations(boxes string) []int {
    n := len(boxes)
    res := make([]int, n)
    prefixCount := make([]int, n+1)
    indexSum := make([]int, n+1)

    for i := 0; i < n; i++ {
        if boxes[i] == '1' {
            prefixCount[i+1] = prefixCount[i] + 1
            indexSum[i+1] = indexSum[i] + i
        } else {
            prefixCount[i+1] = prefixCount[i]
            indexSum[i+1] = indexSum[i]
        }
    }

    for i := 0; i < n; i++ {
        left := prefixCount[i]
        leftSum := indexSum[i]
        right := prefixCount[n] - prefixCount[i+1]
        rightSum := indexSum[n] - indexSum[i+1]

        res[i] = i*left - leftSum + (rightSum - i*right)
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(boxes: String): IntArray {
        val n = boxes.length
        val res = IntArray(n)
        val prefixCount = IntArray(n + 1)
        val indexSum = IntArray(n + 1)

        for (i in 0 until n) {
            prefixCount[i + 1] = prefixCount[i] + if (boxes[i] == '1') 1 else 0
            indexSum[i + 1] = indexSum[i] + if (boxes[i] == '1') i else 0
        }

        for (i in 0 until n) {
            val left = prefixCount[i]
            val leftSum = indexSum[i]
            val right = prefixCount[n] - prefixCount[i + 1]
            val rightSum = indexSum[n] - indexSum[i + 1]

            res[i] = i * left - leftSum + (rightSum - i * right)
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ boxes: String) -> [Int] {
        let n = boxes.count
        var res = [Int](repeating: 0, count: n)
        var prefixCount = [Int](repeating: 0, count: n + 1)
        var indexSum = [Int](repeating: 0, count: n + 1)
        let chars = Array(boxes)

        for i in 0..<n {
            prefixCount[i + 1] = prefixCount[i] + (chars[i] == "1" ? 1 : 0)
            indexSum[i + 1] = indexSum[i] + (chars[i] == "1" ? i : 0)
        }

        for i in 0..<n {
            let left = prefixCount[i]
            let leftSum = indexSum[i]
            let right = prefixCount[n] - prefixCount[i + 1]
            let rightSum = indexSum[n] - indexSum[i + 1]

            res[i] = i * left - leftSum + (rightSum - i * right)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum (Optimal)

### Intuition

Instead of storing prefix arrays, we can compute the contribution incrementally using two passes. In the left-to-right pass, we track how many `balls` are to the left and accumulate the `moves` needed to shift them one position right. In the right-to-left pass, we do the same for `balls` on the right. The sum of both passes gives the final answer.

### Algorithm

1. Left-to-right pass:
   - Track `balls` (count of `balls` seen) and `moves` (cumulative operations).
   - For each position, `res[i] = balls + moves`, then update `moves += balls` and add current `ball` if present.
2. Right-to-left pass:
   - Reset `balls` and `moves`.
   - For each position from right to left, add `balls + moves` to `res[i]`, then update similarly.
3. Return the `res` array.

::tabs-start

```python
class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        n = len(boxes)
        res = [0] * n

        balls = moves = 0
        for i in range(n):
            res[i] = balls + moves
            moves += balls
            balls += int(boxes[i])

        balls = moves = 0
        for i in range(n - 1, -1, -1):
            res[i] += balls + moves
            moves += balls
            balls += int(boxes[i])

        return res
```

```java
public class Solution {
    public int[] minOperations(String boxes) {
        int n = boxes.length();
        int[] res = new int[n];

        int balls = 0, moves = 0;
        for (int i = 0; i < n; i++) {
            res[i] = balls + moves;
            moves += balls;
            balls += boxes.charAt(i) - '0';
        }

        balls = moves = 0;
        for (int i = n - 1; i >= 0; i--) {
            res[i] += balls + moves;
            moves += balls;
            balls += boxes.charAt(i) - '0';
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> minOperations(string boxes) {
        int n = boxes.size();
        vector<int> res(n, 0);

        int balls = 0, moves = 0;
        for (int i = 0; i < n; i++) {
            res[i] = balls + moves;
            moves += balls;
            balls += boxes[i] - '0';
        }

        balls = moves = 0;
        for (int i = n - 1; i >= 0; i--) {
            res[i] += balls + moves;
            moves += balls;
            balls += boxes[i] - '0';
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} boxes
     * @return {number[]}
     */
    minOperations(boxes) {
        const n = boxes.length;
        const res = new Array(n).fill(0);

        let balls = 0,
            moves = 0;
        for (let i = 0; i < n; i++) {
            res[i] = balls + moves;
            moves += balls;
            balls += Number(boxes[i]);
        }

        balls = moves = 0;
        for (let i = n - 1; i >= 0; i--) {
            res[i] += balls + moves;
            moves += balls;
            balls += Number(boxes[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] MinOperations(string boxes) {
        int n = boxes.Length;
        int[] res = new int[n];

        int balls = 0, moves = 0;
        for (int i = 0; i < n; i++) {
            res[i] = balls + moves;
            moves += balls;
            balls += boxes[i] - '0';
        }

        balls = moves = 0;
        for (int i = n - 1; i >= 0; i--) {
            res[i] += balls + moves;
            moves += balls;
            balls += boxes[i] - '0';
        }

        return res;
    }
}
```

```go
func minOperations(boxes string) []int {
    n := len(boxes)
    res := make([]int, n)

    balls, moves := 0, 0
    for i := 0; i < n; i++ {
        res[i] = balls + moves
        moves += balls
        balls += int(boxes[i] - '0')
    }

    balls, moves = 0, 0
    for i := n - 1; i >= 0; i-- {
        res[i] += balls + moves
        moves += balls
        balls += int(boxes[i] - '0')
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(boxes: String): IntArray {
        val n = boxes.length
        val res = IntArray(n)

        var balls = 0
        var moves = 0
        for (i in 0 until n) {
            res[i] = balls + moves
            moves += balls
            balls += boxes[i] - '0'
        }

        balls = 0
        moves = 0
        for (i in n - 1 downTo 0) {
            res[i] += balls + moves
            moves += balls
            balls += boxes[i] - '0'
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ boxes: String) -> [Int] {
        let n = boxes.count
        var res = [Int](repeating: 0, count: n)
        let chars = Array(boxes)

        var balls = 0
        var moves = 0
        for i in 0..<n {
            res[i] = balls + moves
            moves += balls
            balls += chars[i] == "1" ? 1 : 0
        }

        balls = 0
        moves = 0
        for i in stride(from: n - 1, through: 0, by: -1) {
            res[i] += balls + moves
            moves += balls
            balls += chars[i] == "1" ? 1 : 0
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output list.
