## 1. Brute Force

### Intuition

The problem generates rows where each row is built from the previous one: `0` becomes `01` and `1` becomes `10`. The most straightforward approach is to actually build each row until we reach row `n`, then return the character at position `k`. While simple to understand, this approach becomes impractical for large `n` since each row doubles in size.

### Algorithm

1. Start with the first row containing just `0`.
2. For each subsequent row up to `n`:
   - Create a new row by replacing each `0` with `01` and each `1` with `10`.
3. Return the character at index `k - 1` from the final row.

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        prev = ['0']
        for i in range(2, n + 1):
            cur = []
            for c in prev:
                if c == '0':
                    cur.append('0')
                    cur.append('1')
                else:
                    cur.append('1')
                    cur.append('0')
            prev = cur
        return int(prev[k - 1])
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        List<Character> prev = new ArrayList<>();
        prev.add('0');
        for (int i = 2; i <= n; i++) {
            List<Character> cur = new ArrayList<>();
            for (char c : prev) {
                if (c == '0') {
                    cur.add('0');
                    cur.add('1');
                } else {
                    cur.add('1');
                    cur.add('0');
                }
            }
            prev = cur;
        }
        return prev.get(k - 1) - '0';
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        vector<char> prev = {'0'};
        for (int i = 2; i <= n; i++) {
            vector<char> cur;
            for (char c : prev) {
                if (c == '0') {
                    cur.push_back('0');
                    cur.push_back('1');
                } else {
                    cur.push_back('1');
                    cur.push_back('0');
                }
            }
            prev = cur;
        }
        return prev[k - 1] - '0';
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        let prev = ['0'];
        for (let i = 2; i <= n; i++) {
            let cur = [];
            for (let c of prev) {
                if (c === '0') {
                    cur.push('0');
                    cur.push('1');
                } else {
                    cur.push('1');
                    cur.push('0');
                }
            }
            prev = cur;
        }
        return parseInt(prev[k - 1]);
    }
}
```

```csharp
public class Solution {
    public int KthGrammar(int n, int k) {
        var prev = new List<char> { '0' };
        for (int i = 2; i <= n; i++) {
            var cur = new List<char>();
            foreach (char c in prev) {
                if (c == '0') {
                    cur.Add('0');
                    cur.Add('1');
                } else {
                    cur.Add('1');
                    cur.Add('0');
                }
            }
            prev = cur;
        }
        return prev[k - 1] - '0';
    }
}
```

```go
func kthGrammar(n int, k int) int {
    prev := []byte{'0'}
    for i := 2; i <= n; i++ {
        cur := []byte{}
        for _, c := range prev {
            if c == '0' {
                cur = append(cur, '0', '1')
            } else {
                cur = append(cur, '1', '0')
            }
        }
        prev = cur
    }
    return int(prev[k-1] - '0')
}
```

```kotlin
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        var prev = mutableListOf('0')
        for (i in 2..n) {
            val cur = mutableListOf<Char>()
            for (c in prev) {
                if (c == '0') {
                    cur.add('0')
                    cur.add('1')
                } else {
                    cur.add('1')
                    cur.add('0')
                }
            }
            prev = cur
        }
        return prev[k - 1] - '0'
    }
}
```

```swift
class Solution {
    func kthGrammar(_ n: Int, _ k: Int) -> Int {
        var prev: [Character] = ["0"]
        for _ in 2...n {
            var cur: [Character] = []
            for c in prev {
                if c == "0" {
                    cur.append("0")
                    cur.append("1")
                } else {
                    cur.append("1")
                    cur.append("0")
                }
            }
            prev = cur
        }
        return prev[k - 1] == "0" ? 0 : 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(2 ^ n)$

---

## 2. Binary Tree Traversal (Recursion)

### Intuition

We can visualize the grammar as a binary tree where each node generates two children. The key insight is that the position `k` in row `n` has a parent at position `ceil(k/2)` in row `n-1`. If `k` is in the left half of the current row, it inherits the parent's value directly. If `k` is in the right half, its value is the flip of the parent. This lets us trace from position `k` back to the root without building any rows.

### Algorithm

1. Define a recursive function `dfs(n, k, root)` where `root` tracks the current value.
2. Base case: if `n == 1`, return the current `root` value.
3. Calculate `total = 2^(n-1)`, the size of row `n`.
4. If `k > total / 2`, we're in the right half:
   - Recurse with `n - 1`, adjust `k` by subtracting half, and flip `root` using XOR.
5. Otherwise, recurse with the same `root` value.
6. Start with `dfs(n, k, 0)` since row 1 starts with `0`.

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        def dfs(n, k, root):
            if n == 1:
                return root

            total = 1 << (n - 1)
            if k > (total // 2):
                return dfs(n - 1, k - (total // 2), root ^ 1)
            else:
                return dfs(n - 1, k, root)

        return dfs(n, k, 0)
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        return dfs(n, k, 0);
    }

    private int dfs(int n, int k, int root) {
        if (n == 1) {
            return root;
        }

        int total = 1 << (n - 1);
        if (k > total / 2) {
            return dfs(n - 1, k - total / 2, root ^ 1);
        } else {
            return dfs(n - 1, k, root);
        }
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        return dfs(n, k, 0);
    }

    int dfs(int n, int k, int root){
        if (n == 1) return root;

        int total = 1 << (n - 1);
        if (k > total / 2) {
            return dfs(n - 1, k - total / 2, root ^ 1);
        } else {
            return dfs(n - 1, k, root);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        const dfs = (n, k, root) => {
            if (n === 1) return root;

            const total = 1 << (n - 1);
            if (k > total / 2) {
                return dfs(n - 1, k - total / 2, root ^ 1);
            } else {
                return dfs(n - 1, k, root);
            }
        };

        return dfs(n, k, 0);
    }
}
```

```csharp
public class Solution {
    public int KthGrammar(int n, int k) {
        return Dfs(n, k, 0);
    }

    private int Dfs(int n, int k, int root) {
        if (n == 1) return root;

        int total = 1 << (n - 1);
        if (k > total / 2) {
            return Dfs(n - 1, k - total / 2, root ^ 1);
        } else {
            return Dfs(n - 1, k, root);
        }
    }
}
```

```go
func kthGrammar(n int, k int) int {
    var dfs func(n, k, root int) int
    dfs = func(n, k, root int) int {
        if n == 1 {
            return root
        }

        total := 1 << (n - 1)
        if k > total/2 {
            return dfs(n-1, k-total/2, root^1)
        }
        return dfs(n-1, k, root)
    }

    return dfs(n, k, 0)
}
```

```kotlin
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        fun dfs(n: Int, k: Int, root: Int): Int {
            if (n == 1) return root

            val total = 1 shl (n - 1)
            return if (k > total / 2) {
                dfs(n - 1, k - total / 2, root xor 1)
            } else {
                dfs(n - 1, k, root)
            }
        }

        return dfs(n, k, 0)
    }
}
```

```swift
class Solution {
    func kthGrammar(_ n: Int, _ k: Int) -> Int {
        func dfs(_ n: Int, _ k: Int, _ root: Int) -> Int {
            if n == 1 { return root }

            let total = 1 << (n - 1)
            if k > total / 2 {
                return dfs(n - 1, k - total / 2, root ^ 1)
            } else {
                return dfs(n - 1, k, root)
            }
        }

        return dfs(n, k, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Binary Tree Traversal (Iteration)

### Intuition

This is the iterative version of the binary tree approach. Instead of recursion, we use a loop to perform binary search on the position. We maintain a range `[left, right]` representing the current segment and track whether the value flips as we narrow down to position `k`. Each iteration halves the search space until we've processed all `n - 1` levels.

### Algorithm

1. Initialize `cur = 0` (the root value) and set `left = 1`, `right = 2^(n-1)`.
2. Loop `n - 1` times:
   - Calculate `mid = (left + right) / 2`.
   - If `k <= mid`, narrow to the left half by setting `right = mid`.
   - Otherwise, narrow to the right half, set `left = mid + 1`, and flip `cur`.
3. Return `cur` as the final answer.

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        cur = 0
        left, right = 1, 2 ** (n - 1)

        for _ in range(n - 1):
            mid = (left + right) // 2
            if k <= mid:
                right = mid
            else:
                left = mid + 1
                cur = 0 if cur else 1

        return cur
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        int cur = 0;
        int left = 1, right = 1 << (n - 1);

        for (int i = 0; i < n - 1; i++) {
            int mid = (left + right) / 2;
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = (cur == 0) ? 1 : 0;
            }
        }

        return cur;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        int cur = 0;
        int left = 1, right = 1 << (n - 1);

        for (int i = 0; i < n - 1; i++) {
            int mid = (left + right) / 2;
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = (cur == 0) ? 1 : 0;
            }
        }

        return cur;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        let cur = 0;
        let left = 1,
            right = 1 << (n - 1);

        for (let i = 0; i < n - 1; i++) {
            let mid = Math.floor((left + right) / 2);
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = cur === 0 ? 1 : 0;
            }
        }

        return cur;
    }
}
```

```csharp
public class Solution {
    public int KthGrammar(int n, int k) {
        int cur = 0;
        int left = 1, right = 1 << (n - 1);

        for (int i = 0; i < n - 1; i++) {
            int mid = (left + right) / 2;
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = (cur == 0) ? 1 : 0;
            }
        }

        return cur;
    }
}
```

```go
func kthGrammar(n int, k int) int {
    cur := 0
    left, right := 1, 1<<(n-1)

    for i := 0; i < n-1; i++ {
        mid := (left + right) / 2
        if k <= mid {
            right = mid
        } else {
            left = mid + 1
            if cur == 0 {
                cur = 1
            } else {
                cur = 0
            }
        }
    }

    return cur
}
```

```kotlin
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        var cur = 0
        var left = 1
        var right = 1 shl (n - 1)

        for (i in 0 until n - 1) {
            val mid = (left + right) / 2
            if (k <= mid) {
                right = mid
            } else {
                left = mid + 1
                cur = if (cur == 0) 1 else 0
            }
        }

        return cur
    }
}
```

```swift
class Solution {
    func kthGrammar(_ n: Int, _ k: Int) -> Int {
        var cur = 0
        var left = 1
        var right = 1 << (n - 1)

        for _ in 0..<(n - 1) {
            let mid = (left + right) / 2
            if k <= mid {
                right = mid
            } else {
                left = mid + 1
                cur = (cur == 0) ? 1 : 0
            }
        }

        return cur
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Recursion (Traverse Towards Root)

### Intuition

Each position in row `n` comes from a parent position in row `n-1`. If position `k` is odd, it's a left child and has the same value as its parent at position `(k+1)/2`. If `k` is even, it's a right child and has the opposite value. We recursively trace back to row 1 (which is always `0`) and determine the value based on how many flips occurred.

### Algorithm

1. Base case: if `n == 1`, return `0`.
2. If `k` is odd, return `kthGrammar(n - 1, (k + 1) / 2)` since left children inherit parent value.
3. If `k` is even, return `kthGrammar(n - 1, k / 2) XOR 1` since right children flip.

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        if n == 1:
            return 0
        if k & 1:
            return self.kthGrammar(n - 1, (k + 1) // 2)
        return self.kthGrammar(n - 1, k // 2) ^ 1
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        if (n == 1) {
            return 0;
        }
        if ((k & 1) == 1) {
            return kthGrammar(n - 1, (k + 1) / 2);
        }
        return kthGrammar(n - 1, k / 2) ^ 1;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        if (n == 1) {
            return 0;
        }
        if (k & 1) {
            return kthGrammar(n - 1, (k + 1) / 2);
        }
        return kthGrammar(n - 1, k / 2) ^ 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        if (n === 1) {
            return 0;
        }
        if (k % 2 === 1) {
            return this.kthGrammar(n - 1, Math.floor((k + 1) / 2));
        }
        return this.kthGrammar(n - 1, Math.floor(k / 2)) ^ 1;
    }
}
```

```csharp
public class Solution {
    public int KthGrammar(int n, int k) {
        if (n == 1) return 0;
        if ((k & 1) == 1) {
            return KthGrammar(n - 1, (k + 1) / 2);
        }
        return KthGrammar(n - 1, k / 2) ^ 1;
    }
}
```

```go
func kthGrammar(n int, k int) int {
    if n == 1 {
        return 0
    }
    if k&1 == 1 {
        return kthGrammar(n-1, (k+1)/2)
    }
    return kthGrammar(n-1, k/2) ^ 1
}
```

```kotlin
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        if (n == 1) return 0
        if (k and 1 == 1) {
            return kthGrammar(n - 1, (k + 1) / 2)
        }
        return kthGrammar(n - 1, k / 2) xor 1
    }
}
```

```swift
class Solution {
    func kthGrammar(_ n: Int, _ k: Int) -> Int {
        if n == 1 { return 0 }
        if k & 1 == 1 {
            return kthGrammar(n - 1, (k + 1) / 2)
        }
        return kthGrammar(n - 1, k / 2) ^ 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 5. Math

### Intuition

There's an elegant mathematical pattern here. The value at position `k` depends on how many times we flip while tracing from `k` back to the root. Each flip happens when we're a right child, which corresponds to a `1` bit in the binary representation of `k - 1`. So the answer is simply the parity (odd or even) of the number of `1` bits in `k - 1`.

### Algorithm

1. Convert `k - 1` to binary.
2. Count the number of `1` bits.
3. Return the count modulo 2 (i.e., `count & 1`).

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        return bin(k - 1).count('1') & 1
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        return Integer.bitCount(k - 1) & 1;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        return __builtin_popcount(k - 1) & 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        return ((k - 1).toString(2).split('1').length - 1) & 1;
    }
}
```

```csharp
public class Solution {
    public int KthGrammar(int n, int k) {
        return BitOperations.PopCount((uint)(k - 1)) & 1;
    }
}
```

```go
func kthGrammar(n int, k int) int {
    return bits.OnesCount(uint(k-1)) & 1
}
```

```kotlin
class Solution {
    fun kthGrammar(n: Int, k: Int): Int {
        return Integer.bitCount(k - 1) and 1
    }
}
```

```swift
class Solution {
    func kthGrammar(_ n: Int, _ k: Int) -> Int {
        return (k - 1).nonzeroBitCount & 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ or $O(\log n)$ depending on the language.

---

## Common Pitfalls

### Using 0-Indexed vs 1-Indexed Position

The problem uses 1-indexed positions for `k`, but many solutions require converting to 0-indexed logic. A common mistake is forgetting to subtract 1 when counting bits or when comparing positions. For the bit-counting solution, you must use `k - 1` (not `k`) to correctly count the number of flips from the root.

### Integer Overflow When Computing Row Size

When calculating the size of row `n` as `2^(n-1)`, this can overflow for large values of `n` (up to 30 in the constraints). Using `1 << (n - 1)` is safe in most languages for n <= 30, but be careful with signed 32-bit integers when `n = 31` or higher. Always ensure your bit-shift operations use appropriate integer types.

### Confusing Left Child vs Right Child Logic

In the recursive solutions, the logic for determining whether a position is a left child or right child is subtle. Left children (odd `k` values) inherit the parent's value, while right children (even `k` values) flip it. Mixing up this logic or incorrectly computing the parent position `(k + 1) / 2` vs `k / 2` leads to wrong answers.
