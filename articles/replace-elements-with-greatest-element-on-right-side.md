## 1. Brute Force

::tabs-start

```python
class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        n = len(arr)
        ans = [0] * n
        for i in range(n):
            rightMax = -1
            for j in range(i + 1, n):
                rightMax = max(rightMax, arr[j])
            ans[i] = rightMax
        return ans
```

```java
public class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            int rightMax = -1;
            for (int j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n);
        for (int i = 0; i < n; ++i) {
            int rightMax = -1;
            for (int j = i + 1; j < n; ++j) {
                rightMax = max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    replaceElements(arr) {
        let n = arr.length;
        let ans = new Array(n);
        for (let i = 0; i < n; i++) {
            let rightMax = -1;
            for (let j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    public int[] ReplaceElements(int[] arr) {
        int n = arr.Length;
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            int rightMax = -1;
            for (int j = i + 1; j < n; j++) {
                rightMax = Math.Max(rightMax, arr[j]);
            }
            ans[i] = rightMax;
        }
        return ans;
    }
}
```

```go
func replaceElements(arr []int) []int {
    n := len(arr)
    ans := make([]int, n)
    for i := 0; i < n; i++ {
        rightMax := -1
        for j := i + 1; j < n; j++ {
            if arr[j] > rightMax {
                rightMax = arr[j]
            }
        }
        ans[i] = rightMax
    }
    return ans
}
```

```kotlin
class Solution {
    fun replaceElements(arr: IntArray): IntArray {
        val n = arr.size
        val ans = IntArray(n)
        for (i in 0 until n) {
            var rightMax = -1
            for (j in i + 1 until n) {
                rightMax = maxOf(rightMax, arr[j])
            }
            ans[i] = rightMax
        }
        return ans
    }
}
```

```swift
class Solution {
    func replaceElements(_ arr: [Int]) -> [Int] {
        let n = arr.count
        var ans = [Int](repeating: 0, count: n)
        for i in 0..<n {
            var rightMax = -1
            for j in (i + 1)..<n {
                rightMax = max(rightMax, arr[j])
            }
            ans[i] = rightMax
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Suffix Max

::tabs-start

```python
class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        n = len(arr)
        ans = [0] * n
        rightMax = -1
        for i in range(n - 1, -1, -1):
            ans[i] = rightMax
            rightMax = max(arr[i], rightMax)
        return ans
```

```java
public class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        int rightMax = -1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] = rightMax;
            rightMax = Math.max(rightMax, arr[i]);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n);
        int rightMax = -1;
        for (int i = n - 1; i >= 0; --i) {
            ans[i] = rightMax;
            rightMax = max(rightMax, arr[i]);
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    replaceElements(arr) {
        let n = arr.length;
        let ans = new Array(n);
        let rightMax = -1;
        for (let i = n - 1; i >= 0; i--) {
            ans[i] = rightMax;
            rightMax = Math.max(rightMax, arr[i]);
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    public int[] ReplaceElements(int[] arr) {
        int n = arr.Length;
        int[] ans = new int[n];
        int rightMax = -1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] = rightMax;
            rightMax = Math.Max(arr[i], rightMax);
        }
        return ans;
    }
}
```

```go
func replaceElements(arr []int) []int {
    n := len(arr)
    ans := make([]int, n)
    rightMax := -1
    for i := n - 1; i >= 0; i-- {
        ans[i] = rightMax
        if arr[i] > rightMax {
            rightMax = arr[i]
        }
    }
    return ans
}
```

```kotlin
class Solution {
    fun replaceElements(arr: IntArray): IntArray {
        val n = arr.size
        val ans = IntArray(n)
        var rightMax = -1
        for (i in n - 1 downTo 0) {
            ans[i] = rightMax
            rightMax = maxOf(rightMax, arr[i])
        }
        return ans
    }
}
```

```swift
class Solution {
    func replaceElements(_ arr: [Int]) -> [Int] {
        let n = arr.count
        var ans = [Int](repeating: 0, count: n)
        var rightMax = -1
        for i in stride(from: n - 1, through: 0, by: -1) {
            ans[i] = rightMax
            rightMax = max(rightMax, arr[i])
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
