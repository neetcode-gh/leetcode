## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Arithmetic Progression** - Understanding how to calculate the common difference and expected values at each position in a sequence
- **Binary Search** - The optimal solution uses binary search to locate the missing element by comparing actual vs expected values

---

## 1. Linear search

### Intuition

An arithmetic progression has a constant difference between consecutive elements. Since exactly one element is missing, we can compute what the common difference should be using the first and last elements: `difference = (arr[n-1] - arr[0]) / n`. Then we walk through the array, checking if each element matches the expected value. The first mismatch reveals the missing number.

### Algorithm

1. Calculate the common difference: `difference = (arr[n - 1] - arr[0]) / n`.
2. Initialize `expected = arr[0]`.
3. Iterate through each element in the array:
   - If the current element does not equal `expected`, return `expected` as the missing number.
   - Otherwise, increment `expected` by `difference`.
4. If no mismatch is found during iteration, return the final `expected` value as the missing number.

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

```csharp
public class Solution {
    public int MissingNumber(int[] arr) {
        int n = arr.Length;

        // Get the difference `difference`.
        int difference = (arr[n - 1] - arr[0]) / n;

        // The expected element equals the starting element.
        int expected = arr[0];

        foreach (int val in arr) {
            // Return the expected value that doesn't match val.
            if (val != expected) return expected;

            // Next element will be expected element + `difference`.
            expected += difference;
        }
        return expected;
    }
}
```

```go
func missingNumber(arr []int) int {
    n := len(arr)

    // Get the difference `difference`.
    difference := (arr[n-1] - arr[0]) / n

    // The expected element equals the starting element.
    expected := arr[0]

    for _, val := range arr {
        // Return the expected value that doesn't match val.
        if val != expected {
            return expected
        }

        // Next element will be expected element + `difference`.
        expected += difference
    }
    return expected
}
```

```kotlin
class Solution {
    fun missingNumber(arr: IntArray): Int {
        val n = arr.size

        // Get the difference `difference`.
        val difference = (arr[n - 1] - arr[0]) / n

        // The expected element equals the starting element.
        var expected = arr[0]

        for (value in arr) {
            // Return the expected value that doesn't match val.
            if (value != expected) return expected

            // Next element will be expected element + `difference`.
            expected += difference
        }
        return expected
    }
}
```

```swift
class Solution {
    func missingNumber(_ arr: [Int]) -> Int {
        let n = arr.count

        // Get the difference `difference`.
        let difference = (arr[n - 1] - arr[0]) / n

        // The expected element equals the starting element.
        var expected = arr[0]

        for val in arr {
            // Return the expected value that doesn't match val.
            if val != expected {
                return expected
            }

            // Next element will be expected element + `difference`.
            expected += difference
        }
        return expected
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

### Intuition

Since the array is sorted and follows an arithmetic progression, we can use binary search to locate the missing element faster. At any index `i`, the expected value is `arr[0] + i * difference`. If the actual value matches, all elements up to that index are correct, so the missing number is to the right. If there is a mismatch, the missing number is at or before that index. This allows us to narrow down the search space logarithmically.

### Algorithm

1. Calculate the common difference: `difference = (arr[n - 1] - arr[0]) / n`.
2. Initialize `lo = 0` and `hi = n - 1`.
3. While `lo < hi`:
   - Compute `mid = (lo + hi) / 2`.
   - If `arr[mid]` equals the expected value `arr[0] + mid * difference`, the missing element is after `mid`, so set `lo = mid + 1`.
   - Otherwise, the missing element is at or before `mid`, so set `hi = mid`.
4. Return `arr[0] + difference * lo` as the missing number that should be at index `lo`.

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

```csharp
public class Solution {
    public int MissingNumber(int[] arr) {
        int n = arr.Length;

        // Get the difference `difference`.
        int difference = (arr[n - 1] - arr[0]) / n;
        int lo = 0;
        int hi = n - 1;

        // Basic binary search template.
        while (lo < hi) {
            int mid = (lo + hi) / 2;

            // All numbers up to `mid` have no missing number, so search on the right side.
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

```go
func missingNumber(arr []int) int {
    n := len(arr)

    // Get the difference `difference`.
    difference := (arr[n-1] - arr[0]) / n
    lo := 0
    hi := n - 1

    // Basic binary search template.
    for lo < hi {
        mid := (lo + hi) / 2

        // All numbers up to `mid` have no missing number, so search on the right side.
        if arr[mid] == arr[0]+mid*difference {
            lo = mid + 1
        } else {
            // A number is missing before `mid` inclusive of `mid` itself.
            hi = mid
        }
    }

    // Index `lo` will be the position with the first incorrect number.
    // Return the value that was supposed to be at this index.
    return arr[0] + difference*lo
}
```

```kotlin
class Solution {
    fun missingNumber(arr: IntArray): Int {
        val n = arr.size

        // Get the difference `difference`.
        val difference = (arr[n - 1] - arr[0]) / n
        var lo = 0
        var hi = n - 1

        // Basic binary search template.
        while (lo < hi) {
            val mid = (lo + hi) / 2

            // All numbers up to `mid` have no missing number, so search on the right side.
            if (arr[mid] == arr[0] + mid * difference) {
                lo = mid + 1
            }
            // A number is missing before `mid` inclusive of `mid` itself.
            else {
                hi = mid
            }
        }

        // Index `lo` will be the position with the first incorrect number.
        // Return the value that was supposed to be at this index.
        return arr[0] + difference * lo
    }
}
```

```swift
class Solution {
    func missingNumber(_ arr: [Int]) -> Int {
        let n = arr.count

        // Get the difference `difference`.
        let difference = (arr[n - 1] - arr[0]) / n
        var lo = 0
        var hi = n - 1

        // Basic binary search template.
        while lo < hi {
            let mid = (lo + hi) / 2

            // All numbers up to `mid` have no missing number, so search on the right side.
            if arr[mid] == arr[0] + mid * difference {
                lo = mid + 1
            }
            // A number is missing before `mid` inclusive of `mid` itself.
            else {
                hi = mid
            }
        }

        // Index `lo` will be the position with the first incorrect number.
        // Return the value that was supposed to be at this index.
        return arr[0] + difference * lo
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of array `arr`.

---

## Common Pitfalls

### Incorrect Common Difference Calculation

The common difference must be calculated as `(arr[n-1] - arr[0]) / n`, not `(arr[n-1] - arr[0]) / (n-1)`. Since one element is missing, the full sequence would have `n+1` elements with `n` gaps, making the divisor `n`.

### Not Handling Zero Difference

When the common difference is zero (all elements are the same), any position could be the "missing" element since the missing value equals all existing values. The linear search returns the first element in this case, which is correct.

### Integer Division Truncation

In languages where division truncates toward zero, negative arithmetic progressions may produce incorrect common differences. Ensure the division correctly handles both positive and negative sequences.
