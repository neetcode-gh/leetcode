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

```csharp
public class Solution {
    public int MaximumElementAfterDecrementingAndRearranging(int[] arr) {
        Array.Sort(arr);
        int prev = 0;
        foreach (int num in arr) {
            prev = Math.Min(prev + 1, num);
        }
        return prev;
    }
}
```

```go
func maximumElementAfterDecrementingAndRearranging(arr []int) int {
    sort.Ints(arr)
    prev := 0
    for _, num := range arr {
        if prev+1 < num {
            prev = prev + 1
        } else {
            prev = num
        }
    }
    return prev
}
```

```kotlin
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray): Int {
        arr.sort()
        var prev = 0
        for (num in arr) {
            prev = minOf(prev + 1, num)
        }
        return prev
    }
}
```

```swift
class Solution {
    func maximumElementAfterDecrementingAndRearranging(_ arr: [Int]) -> Int {
        let sorted = arr.sorted()
        var prev = 0
        for num in sorted {
            prev = min(prev + 1, num)
        }
        return prev
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

```csharp
public class Solution {
    public int MaximumElementAfterDecrementingAndRearranging(int[] arr) {
        int n = arr.Length;
        int[] count = new int[n + 1];

        foreach (int num in arr) {
            count[Math.Min(num, n)]++;
        }

        int prev = 1;
        for (int num = 2; num <= n; num++) {
            prev = Math.Min(prev + count[num], num);
        }

        return prev;
    }
}
```

```go
func maximumElementAfterDecrementingAndRearranging(arr []int) int {
    n := len(arr)
    count := make([]int, n+1)

    for _, num := range arr {
        if num < n {
            count[num]++
        } else {
            count[n]++
        }
    }

    prev := 1
    for num := 2; num <= n; num++ {
        if prev+count[num] < num {
            prev = prev + count[num]
        } else {
            prev = num
        }
    }

    return prev
}
```

```kotlin
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray): Int {
        val n = arr.size
        val count = IntArray(n + 1)

        for (num in arr) {
            count[minOf(num, n)]++
        }

        var prev = 1
        for (num in 2..n) {
            prev = minOf(prev + count[num], num)
        }

        return prev
    }
}
```

```swift
class Solution {
    func maximumElementAfterDecrementingAndRearranging(_ arr: [Int]) -> Int {
        let n = arr.count
        var count = [Int](repeating: 0, count: n + 1)

        for num in arr {
            count[min(num, n)] += 1
        }

        var prev = 1
        for num in 2...n {
            prev = min(prev + count[num], num)
        }

        return prev
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
