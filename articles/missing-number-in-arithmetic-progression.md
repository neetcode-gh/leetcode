## 1. Linear search

::tabs-start

```python
class Solution:
    def missingNumber(self, arr: List[int]) -> int:
        n = len(arr)

        # Get the difference `difference`.
        difference = (arr[-1] - arr[0]) // n

        # The expected element equals the starting element.
        expected = arr[0]

        for val in arr:
            # Return the expected value that doesn't match val.
            if val != expected:
                return expected

            # Next element will be expected element + `difference`.
            expected += difference

        return expected
```

```java
class Solution {
    public int missingNumber(int[] arr) {
        int n = arr.length;

        // Get the difference `difference`.
        int difference = (arr[arr.length - 1] - arr[0]) / n;

        // The expected element equals the starting element.
        int expected = arr[0];

        for (int val : arr) {
            // Return the expected value that doesn't match val.
            if (val != expected) return expected;

            // Next element will be expected element + `difference`.
            expected += difference;
        }
        return expected;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int> &arr) {
        int n = arr.size();

        // Get the difference `difference`.
        int difference = (arr.back() - arr.front()) / n;

        // The expected element equals the starting element.
        int expected = arr.front();

        for (int &val : arr) {
            // Return the expected value that doesn't match val.
            if (val != expected) return expected;

            // Next element will be expected element + `difference`.
            expected += difference;
        }
        return expected;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    missingNumber(arr) {
        const n = arr.length;

        // Get the difference `difference`.
        const difference = Math.floor((arr[arr.length - 1] - arr[0]) / n);

        // The expected element equals the starting element.
        let expected = arr[0];

        for (const val of arr) {
            // Return the expected value that doesn't match val.
            if (val !== expected) return expected;

            // Next element will be expected element + `difference`.
            expected += difference;
        }
        return expected;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of array `arr`.

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def missingNumber(self, arr: List[int]) -> int:
        n = len(arr)

        # Get the difference `difference`.
        difference = (arr[n - 1] - arr[0]) // n

        lo = 0
        hi = n - 1

        # Basic binary search template.
        while lo < hi:
            mid = (lo + hi) // 2

            # All numbers up to `mid` have no missing number, so search on the right side.
            if arr[mid] == arr[0] + mid * difference:
                lo = mid + 1

            # A number is missing before `mid` inclusive of `mid` itself.
            else:
                hi = mid

        # Index `lo` will be the position with the first incorrect number.
        # Return the value that was supposed to be at this index.
        return arr[0] + difference * lo
```

```java
class Solution {
    public int missingNumber(int arr[]) {
        int n = arr.length;

        // Get the difference `difference`.
        int difference = (arr[n - 1] - arr[0]) / n;
        int lo = 0;
        int hi = n - 1;

        // Basic binary search template.
        while (lo < hi) {
            int mid = (lo + hi) / 2; // Note: int mid = lo + (hi - lo) / 2; is recommended to avoid potential overflow

            // All numbers upto `mid` have no missing number, so search on the right side.
            if (arr[mid] == arr[0] + mid * difference) {
                lo = mid + 1;
            }

            // A number is missing before `mid` inclusive of `mid` itself.
            else {
                hi = mid;
            }
        }

        // Index `lo` will be the position with the first incorrect number.
        // Return the value that was supposed to be at this index.
        return arr[0] + difference * lo;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int> &arr) {
        int n = arr.size();

        // Get the difference `difference`.
        int difference = (arr.back() - arr.front()) / n;
        int lo = 0;
        int hi = n - 1;

        // Basic binary search template.
        while (lo < hi) {
            
            int mid = (lo + hi) / 2; // Note: int mid = lo + (hi - lo) / 2; is recommended to avoid potential overflow
            // All numbers upto `mid` have no missing number, so search on the right side.
            if (arr[mid] == arr.front() + mid * difference) {
                lo = mid + 1;
            }

            // A number is missing before `mid` inclusive of `mid` itself.
            else {
                hi = mid;
            }
        }

        // Index `lo` will be the position with the first incorrect number.
        // Return the value that was supposed to be at this index.
        return arr.front() + difference * lo;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    missingNumber(arr) {
        const n = arr.length;

        // Get the difference `difference`.
        const difference = Math.floor((arr[n - 1] - arr[0]) / n);

        let lo = 0;
        let hi = n - 1;

        // Basic binary search template.
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);

            // All numbers up to `mid` have no missing number, so search on the right side.
            if (arr[mid] === arr[0] + mid * difference) {
                lo = mid + 1;
            }

            // A number is missing before `mid` inclusive of `mid` itself.
            else {
                hi = mid;
            }

        }

        // Index `lo` will be the position with the first incorrect number.
        // Return the value that was supposed to be at this index.
        return arr[0] + difference * lo;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of array `arr`.
