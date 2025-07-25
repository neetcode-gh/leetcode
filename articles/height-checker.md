## 1. Sorting

::tabs-start

```python
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        expected = sorted(heights)

        res = 0
        for i in range(len(heights)):
            if heights[i] != expected[i]:
                res += 1

        return res
```

```java
public class Solution {
    public int heightChecker(int[] heights) {
        int[] expected = Arrays.copyOf(heights, heights.length);
        Arrays.sort(expected);

        int res = 0;
        for (int i = 0; i < heights.length; i++) {
            if (heights[i] != expected[i]) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int heightChecker(vector<int>& heights) {
        vector<int> expected = heights;
        sort(expected.begin(), expected.end());

        int res = 0;
        for (int i = 0; i < heights.size(); i++) {
            if (heights[i] != expected[i]) {
                res++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    heightChecker(heights) {
        const expected = [...heights].sort((a, b) => a - b);

        let res = 0;
        for (let i = 0; i < heights.length; i++) {
            if (heights[i] !== expected[i]) {
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Counting Sort

::tabs-start

```python
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        count = [0] * 101
        for h in heights:
            count[h] += 1

        expected = []
        for h in range(1, 101):
            c = count[h]
            for _ in range(c):
                expected.append(h)

        res = 0
        for i in range(len(heights)):
            if heights[i] != expected[i]:
                res += 1

        return res
```

```java
public class Solution {
    public int heightChecker(int[] heights) {
        int[] count = new int[101];
        for (int h : heights) {
            count[h]++;
        }

        List<Integer> expected = new ArrayList<>();
        for (int h = 1; h <= 100; h++) {
            int c = count[h];
            for (int i = 0; i < c; i++) {
                expected.add(h);
            }
        }

        int res = 0;
        for (int i = 0; i < heights.length; i++) {
            if (heights[i] != expected.get(i)) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int heightChecker(vector<int>& heights) {
        int count[101] = {};
        for (int h : heights) {
            count[h]++;
        }

        vector<int> expected;
        for (int h = 1; h <= 100; h++) {
            int c = count[h];
            for (int i = 0; i < c; i++) {
                expected.push_back(h);
            }
        }

        int res = 0;
        for (int i = 0; i < heights.size(); i++) {
            if (heights[i] != expected[i]) {
                res++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    heightChecker(heights) {
        const count = new Array(101).fill(0);
        for (let h of heights) {
            count[h]++;
        }

        const expected = [];
        for (let h = 1; h <= 100; h++) {
            let c = count[h];
            for (let i = 0; i < c; i++) {
                expected.push(h);
            }
        }

        let res = 0;
        for (let i = 0; i < heights.length; i++) {
            if (heights[i] !== expected[i]) {
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k)$
- Space complexity: $O(n + k)$

> Where $n$ is the size of the input array, and $k$ is the range of numbers.
