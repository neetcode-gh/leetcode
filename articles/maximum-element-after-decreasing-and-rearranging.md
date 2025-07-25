## 1. Greedy + Sorting

::tabs-start

```python
class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        arr.sort()
        prev = 0
        for num in arr:
            prev = min(prev + 1, num)
        return prev
```

```java
public class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);
        int prev = 0;
        for (int num : arr) {
            prev = Math.min(prev + 1, num);
        }
        return prev;
    }
}
```

```cpp
class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int prev = 0;
        for (int num : arr) {
            prev = min(prev + 1, num);
        }
        return prev;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maximumElementAfterDecrementingAndRearranging(arr) {
        arr.sort((a, b) => a - b);
        let prev = 0;
        for (let num of arr) {
            prev = Math.min(prev + 1, num);
        }
        return prev;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Greedy

::tabs-start

```python
class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        n = len(arr)
        count = [0] * (n + 1)

        for num in arr:
            count[min(num, n)] += 1

        prev = 1
        for num in range(2, n + 1):
            prev = min(prev + count[num], num)

        return prev
```

```java
public class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        int n = arr.length;
        int[] count = new int[n + 1];

        for (int num : arr) {
            count[Math.min(num, n)]++;
        }

        int prev = 1;
        for (int num = 2; num <= n; num++) {
            prev = Math.min(prev + count[num], num);
        }

        return prev;
    }
}
```

```cpp
class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        int n = arr.size();
        vector<int> count(n + 1, 0);

        for (int num : arr) {
            count[min(num, n)]++;
        }

        int prev = 1;
        for (int num = 2; num <= n; num++) {
            prev = min(prev + count[num], num);
        }

        return prev;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maximumElementAfterDecrementingAndRearranging(arr) {
        let n = arr.length;
        let count = new Array(n + 1).fill(0);

        for (let num of arr) {
            count[Math.min(num, n)]++;
        }

        let prev = 1;
        for (let num = 2; num <= n; num++) {
            prev = Math.min(prev + count[num], num);
        }

        return prev;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
