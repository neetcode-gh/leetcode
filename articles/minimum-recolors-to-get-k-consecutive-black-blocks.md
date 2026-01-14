## 1. Brute Force

### Intuition

We need to find a window of `k` consecutive blocks that requires the fewest recolors to become all black. A recolor is needed for each white block ('W') in the window. We can check every possible window of size `k` and count the white blocks in each, keeping track of the minimum count.

### Algorithm

1. Initialize `res` to the length of the string (worst case).
2. For each starting position `i` from `0` to `n - k`:
   - Count the number of 'W' characters in the window from `i` to `i + k - 1`.
   - Update `res` with the minimum count seen.
3. Return `res`.

::tabs-start

```python
class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        res = len(blocks)
        for i in range(len(blocks) - k + 1):
            count_w = 0
            for j in range(i, i + k):
                if blocks[j] == 'W':
                    count_w += 1
            res = min(res, count_w)
        return res
```

```java
public class Solution {
    public int minimumRecolors(String blocks, int k) {
        int res = blocks.length();
        for (int i = 0; i <= blocks.length() - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks.charAt(j) == 'W') {
                    count_w++;
                }
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int res = blocks.length();
        for (int i = 0; i <= blocks.length() - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks[j] == 'W') {
                    count_w++;
                }
            }
            res = min(res, count_w);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} blocks
     * @param {number} k
     * @return {number}
     */
    minimumRecolors(blocks, k) {
        let res = blocks.length;
        for (let i = 0; i <= blocks.length - k; i++) {
            let count_w = 0;
            for (let j = i; j < i + k; j++) {
                if (blocks[j] === 'W') {
                    count_w++;
                }
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumRecolors(string blocks, int k) {
        int res = blocks.Length;
        for (int i = 0; i <= blocks.Length - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks[j] == 'W') {
                    count_w++;
                }
            }
            res = Math.Min(res, count_w);
        }
        return res;
    }
}
```

```go
func minimumRecolors(blocks string, k int) int {
    res := len(blocks)
    for i := 0; i <= len(blocks)-k; i++ {
        countW := 0
        for j := i; j < i+k; j++ {
            if blocks[j] == 'W' {
                countW++
            }
        }
        if countW < res {
            res = countW
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minimumRecolors(blocks: String, k: Int): Int {
        var res = blocks.length
        for (i in 0..blocks.length - k) {
            var countW = 0
            for (j in i until i + k) {
                if (blocks[j] == 'W') {
                    countW++
                }
            }
            res = minOf(res, countW)
        }
        return res
    }
}
```

```swift
class Solution {
    func minimumRecolors(_ blocks: String, _ k: Int) -> Int {
        let chars = Array(blocks)
        var res = blocks.count
        for i in 0...(blocks.count - k) {
            var countW = 0
            for j in i..<(i + k) {
                if chars[j] == "W" {
                    countW += 1
                }
            }
            res = min(res, countW)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$

---

## 2. Sliding Window

### Intuition

When sliding the window one position to the right, most of the count stays the same. We only need to subtract the contribution of the element leaving the window and add the contribution of the new element entering. This avoids recounting the entire window each time, reducing time from O(n*k) to O(n).

### Algorithm

1. Count 'W' characters in the first window (positions `0` to `k-1`). Set this as the initial result.
2. Slide the window from position `k` to `n-1`:
   - If the element leaving (at position `i - k`) is 'W', decrement the count.
   - If the element entering (at position `i`) is 'W', increment the count.
   - Update `res` with the minimum count seen.
3. Return `res`.

::tabs-start

```python
class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        count_w = 0
        for i in range(k):
            if blocks[i] == 'W':
                count_w += 1

        res = count_w
        for i in range(k, len(blocks)):
            if blocks[i - k] == 'W':
                count_w -= 1
            if blocks[i] == 'W':
                count_w += 1
            res = min(res, count_w)
        return res
```

```java
public class Solution {
    public int minimumRecolors(String blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks.charAt(i) == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.length(); i++) {
            if (blocks.charAt(i - k) == 'W') {
                count_w--;
            }
            if (blocks.charAt(i) == 'W') {
                count_w++;
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks[i] == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.size(); i++) {
            if (blocks[i - k] == 'W') {
                count_w--;
            }
            if (blocks[i] == 'W') {
                count_w++;
            }
            res = min(res, count_w);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} blocks
     * @param {number} k
     * @return {number}
     */
    minimumRecolors(blocks, k) {
        let count_w = 0;
        for (let i = 0; i < k; i++) {
            if (blocks[i] === 'W') {
                count_w++;
            }
        }

        let res = count_w;
        for (let i = k; i < blocks.length; i++) {
            if (blocks[i - k] === 'W') {
                count_w--;
            }
            if (blocks[i] === 'W') {
                count_w++;
            }
            res = Math.min(res, count_w);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumRecolors(string blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks[i] == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.Length; i++) {
            if (blocks[i - k] == 'W') {
                count_w--;
            }
            if (blocks[i] == 'W') {
                count_w++;
            }
            res = Math.Min(res, count_w);
        }

        return res;
    }
}
```

```go
func minimumRecolors(blocks string, k int) int {
    countW := 0
    for i := 0; i < k; i++ {
        if blocks[i] == 'W' {
            countW++
        }
    }

    res := countW
    for i := k; i < len(blocks); i++ {
        if blocks[i-k] == 'W' {
            countW--
        }
        if blocks[i] == 'W' {
            countW++
        }
        if countW < res {
            res = countW
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumRecolors(blocks: String, k: Int): Int {
        var countW = 0
        for (i in 0 until k) {
            if (blocks[i] == 'W') {
                countW++
            }
        }

        var res = countW
        for (i in k until blocks.length) {
            if (blocks[i - k] == 'W') {
                countW--
            }
            if (blocks[i] == 'W') {
                countW++
            }
            res = minOf(res, countW)
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumRecolors(_ blocks: String, _ k: Int) -> Int {
        let chars = Array(blocks)
        var countW = 0
        for i in 0..<k {
            if chars[i] == "W" {
                countW += 1
            }
        }

        var res = countW
        for i in k..<chars.count {
            if chars[i - k] == "W" {
                countW -= 1
            }
            if chars[i] == "W" {
                countW += 1
            }
            res = min(res, countW)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## Common Pitfalls

### Off-by-One in Window Boundaries

The sliding window must have exactly `k` elements. A common bug is using `i <= len(blocks) - k` vs `i < len(blocks) - k + 1` incorrectly, causing either one too few or one too many windows to be checked. Trace through a small example like `blocks = "WBB", k = 2` to verify your loop bounds.

### Forgetting to Update Count When Sliding

When sliding the window, you must both remove the contribution of the element leaving the window and add the contribution of the element entering. Forgetting either update causes the count to drift from the actual number of white blocks in the current window.