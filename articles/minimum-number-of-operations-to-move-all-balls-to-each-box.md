## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output list.

---

## 2. Prefix Sum

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output list.
