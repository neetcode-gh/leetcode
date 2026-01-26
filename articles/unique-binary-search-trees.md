## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search Tree Properties** - Understanding that left subtree values are smaller and right subtree values are larger than the root
- **Recursion** - Breaking down the problem by choosing each node as the root and solving for left and right subtrees
- **Dynamic Programming** - Using memoization or bottom-up tabulation to avoid redundant calculations
- **Catalan Numbers** - Optional but helpful for understanding the mathematical formula behind the count of unique BSTs

---

## 1. Recursion

### Intuition

To count all unique BSTs with values `1` to `n`, we need to consider each value as the root. When we choose `i` as the root, all values less than `i` must go in the left subtree, and all values greater than `i` go in the right subtree. The total number of unique BSTs with root `i` is the product of unique BSTs that can be formed from the left and right subtrees.

This gives us a recursive structure: the count for `n` nodes equals the sum over all possible roots of (count for left subtree) times (count for right subtree).

### Algorithm

1. Base case: If `n <= 1`, there's exactly one BST (empty tree or single node), so return `1`.
2. Initialize `res = 0` to accumulate the total count.
3. For each potential root `i` from `1` to `n`:
   - Left subtree has `i - 1` nodes.
   - Right subtree has `n - i` nodes.
   - Add `numTrees(i - 1) * numTrees(n - i)` to `res`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        if n <= 1:
            return 1

        res = 0
        for i in range(1, n + 1):
            res += self.numTrees(i - 1) * self.numTrees(n - i)
        return res
```

```java
public class Solution {
    public int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        if (n <= 1) {
            return 1;
        }

        let res = 0;
        for (let i = 1; i <= n; i++) {
            res += this.numTrees(i - 1) * this.numTrees(n - i);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumTrees(int n) {
        if (n <= 1) {
            return 1;
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += NumTrees(i - 1) * NumTrees(n - i);
        }
        return res;
    }
}
```

```go
func numTrees(n int) int {
    if n <= 1 {
        return 1
    }

    res := 0
    for i := 1; i <= n; i++ {
        res += numTrees(i-1) * numTrees(n-i)
    }
    return res
}
```

```kotlin
class Solution {
    fun numTrees(n: Int): Int {
        if (n <= 1) {
            return 1
        }

        var res = 0
        for (i in 1..n) {
            res += numTrees(i - 1) * numTrees(n - i)
        }
        return res
    }
}
```

```swift
class Solution {
    func numTrees(_ n: Int) -> Int {
        if n <= 1 {
            return 1
        }

        var res = 0
        for i in 1...n {
            res += numTrees(i - 1) * numTrees(n - i)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recalculates the same values multiple times. For instance, `numTrees(3)` might be computed several times when calculating `numTrees(5)`. We can use memoization to cache results and avoid redundant work.

### Algorithm

1. Create a hash map or dictionary `dp` to store computed results.
2. Base case: If `n <= 1`, return `1`.
3. If `n` is already in `dp`, return the cached value.
4. Compute `res` by summing `numTrees(i - 1) * numTrees(n - i)` for all `i` from `1` to `n`.
5. Store `res` in `dp[n]` and return it.

::tabs-start

```python
class Solution:

    def __init__(self):
        self.dp = {}

    def numTrees(self, n: int) -> int:
        if n <= 1:
            return 1
        if n in self.dp:
            return self.dp[n]

        res = 0
        for i in range(1, n + 1):
            res += self.numTrees(i - 1) * self.numTrees(n - i)

        self.dp[n] = res
        return res
```

```java
public class Solution {
    private Map<Integer, Integer> dp = new HashMap<>();

    public int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }
        if (dp.containsKey(n)) {
            return dp.get(n);
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }

        dp.put(n, res);
        return res;
    }
}
```

```cpp
class Solution {
private:
    unordered_map<int, int> dp;

public:
    int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }
        if (dp.find(n) != dp.end()) {
            return dp[n];
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }

        dp[n] = res;
        return res;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.dp = new Map();
    }

    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        if (n <= 1) {
            return 1;
        }
        if (this.dp.has(n)) {
            return this.dp.get(n);
        }

        let res = 0;
        for (let i = 1; i <= n; i++) {
            res += this.numTrees(i - 1) * this.numTrees(n - i);
        }

        this.dp.set(n, res);
        return res;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> dp = new Dictionary<int, int>();

    public int NumTrees(int n) {
        if (n <= 1) {
            return 1;
        }
        if (dp.ContainsKey(n)) {
            return dp[n];
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += NumTrees(i - 1) * NumTrees(n - i);
        }

        dp[n] = res;
        return res;
    }
}
```

```go
func numTrees(n int) int {
    dp := make(map[int]int)

    var helper func(n int) int
    helper = func(n int) int {
        if n <= 1 {
            return 1
        }
        if val, ok := dp[n]; ok {
            return val
        }

        res := 0
        for i := 1; i <= n; i++ {
            res += helper(i-1) * helper(n-i)
        }

        dp[n] = res
        return res
    }

    return helper(n)
}
```

```kotlin
class Solution {
    private val dp = HashMap<Int, Int>()

    fun numTrees(n: Int): Int {
        if (n <= 1) {
            return 1
        }
        dp[n]?.let { return it }

        var res = 0
        for (i in 1..n) {
            res += numTrees(i - 1) * numTrees(n - i)
        }

        dp[n] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp = [Int: Int]()

    func numTrees(_ n: Int) -> Int {
        if n <= 1 {
            return 1
        }
        if let val = dp[n] {
            return val
        }

        var res = 0
        for i in 1...n {
            res += numTrees(i - 1) * numTrees(n - i)
        }

        dp[n] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion, we can build the solution iteratively from smaller subproblems. Since the count for `n` nodes depends only on counts for fewer nodes, we compute `numTree[0]`, `numTree[1]`, ..., `numTree[n]` in order.

### Algorithm

1. Create an array `numTree` of size `n + 1`, initialized with `1` (base cases for 0 and 1 node).
2. For each number of `nodes` from `2` to `n`:
   - Initialize `total = 0`.
   - For each `root` choice from `1` to `nodes`:
     - `left = root - 1` (nodes in left subtree).
     - `right = nodes - root` (nodes in right subtree).
     - Add `numTree[left] * numTree[right]` to `total`.
   - Set `numTree[nodes] = total`.
3. Return `numTree[n]`.

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        numTree = [1] * (n + 1)

        for nodes in range(2, n + 1):
            total = 0
            for root in range(1, nodes + 1):
                left = root - 1
                right = nodes - root
                total += numTree[left] * numTree[right]
            numTree[nodes] = total

        return numTree[n]
```

```java
public class Solution {
    public int numTrees(int n) {
        int[] numTree = new int[n + 1];
        numTree[0] = 1;
        numTree[1] = 1;

        for (int nodes = 2; nodes <= n; nodes++) {
            int total = 0;
            for (int root = 1; root <= nodes; root++) {
                int left = root - 1;
                int right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> numTree(n + 1, 1);

        for (int nodes = 2; nodes <= n; ++nodes) {
            int total = 0;
            for (int root = 1; root <= nodes; ++root) {
                int left = root - 1;
                int right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        const numTree = Array(n + 1).fill(1);

        for (let nodes = 2; nodes <= n; nodes++) {
            let total = 0;
            for (let root = 1; root <= nodes; root++) {
                let left = root - 1;
                let right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
}
```

```csharp
public class Solution {
    public int NumTrees(int n) {
        int[] numTree = new int[n + 1];
        numTree[0] = 1;
        numTree[1] = 1;

        for (int nodes = 2; nodes <= n; nodes++) {
            int total = 0;
            for (int root = 1; root <= nodes; root++) {
                int left = root - 1;
                int right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
}
```

```go
func numTrees(n int) int {
    numTree := make([]int, n+1)
    for i := range numTree {
        numTree[i] = 1
    }

    for nodes := 2; nodes <= n; nodes++ {
        total := 0
        for root := 1; root <= nodes; root++ {
            left := root - 1
            right := nodes - root
            total += numTree[left] * numTree[right]
        }
        numTree[nodes] = total
    }

    return numTree[n]
}
```

```kotlin
class Solution {
    fun numTrees(n: Int): Int {
        val numTree = IntArray(n + 1) { 1 }

        for (nodes in 2..n) {
            var total = 0
            for (root in 1..nodes) {
                val left = root - 1
                val right = nodes - root
                total += numTree[left] * numTree[right]
            }
            numTree[nodes] = total
        }

        return numTree[n]
    }
}
```

```swift
class Solution {
    func numTrees(_ n: Int) -> Int {
        var numTree = [Int](repeating: 1, count: n + 1)

        for nodes in 2...n {
            var total = 0
            for root in 1...nodes {
                let left = root - 1
                let right = nodes - root
                total += numTree[left] * numTree[right]
            }
            numTree[nodes] = total
        }

        return numTree[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Catalan Numbers - I

### Intuition

The number of unique BSTs with `n` nodes is the nth Catalan number. Catalan numbers have a closed-form formula that can be computed directly without iterating through all subproblems. The formula involves calculating a product of fractions.

### Algorithm

1. Initialize `res = 1`.
2. For `i` from `1` to `n - 1`:
   - Multiply `res` by `(n + i + 1)`.
   - Divide `res` by `i`.
3. Return `res / n`.

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        res = 1
        for i in range(1, n):
            res *= (n + i + 1)
            res //= i
        return res // n
```

```java
public class Solution {
    public int numTrees(int n) {
        long res = 1;
        for (int i = 1; i < n; i++) {
            res *= (n + i + 1);
            res /= i;
        }
        return (int) (res / n);
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        long long res = 1;
        for (int i = 1; i < n; i++) {
            res *= (n + i + 1);
            res /= i;
        }
        return res / n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        let res = 1n;
        for (let i = 1n; i < BigInt(n); i++) {
            res *= BigInt(n) + i + 1n;
            res /= i;
        }
        return Number(res / BigInt(n));
    }
}
```

```csharp
public class Solution {
    public int NumTrees(int n) {
        long res = 1;
        for (int i = 1; i < n; i++) {
            res *= (n + i + 1);
            res /= i;
        }
        return (int)(res / n);
    }
}
```

```go
func numTrees(n int) int {
    res := int64(1)
    for i := 1; i < n; i++ {
        res *= int64(n + i + 1)
        res /= int64(i)
    }
    return int(res / int64(n))
}
```

```kotlin
class Solution {
    fun numTrees(n: Int): Int {
        var res = 1L
        for (i in 1 until n) {
            res *= (n + i + 1)
            res /= i
        }
        return (res / n).toInt()
    }
}
```

```swift
class Solution {
    func numTrees(_ n: Int) -> Int {
        var res: Int64 = 1
        for i in 1..<n {
            res *= Int64(n + i + 1)
            res /= Int64(i)
        }
        return Int(res / Int64(n))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Catalan Numbers - II

### Intuition

Another formula for Catalan numbers uses a recurrence relation: `C(n+1) = C(n) * (4n + 2) / (n + 2)`. This allows us to compute each Catalan number from the previous one with a single multiplication and division.

### Algorithm

1. Initialize `res = 1`.
2. For `i` from `0` to `n - 1`:
   - Multiply `res` by `(4 * i + 2) / (i + 2)`.
3. Return `res` as an integer.

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        res = 1
        for i in range(n):
            res *= (4 * i + 2) / (i + 2)
        return int(res)
```

```java
public class Solution {
    public int numTrees(int n) {
        long res = 1;
        for (int i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2.0);
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        long long res = 1;
        for (int i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2.0);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        let res = 1;
        for (let i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2);
        }
        return Math.floor(res);
    }
}
```

```csharp
public class Solution {
    public int NumTrees(int n) {
        long res = 1;
        for (int i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2.0);
        }
        return (int)res;
    }
}
```

```go
func numTrees(n int) int {
    res := 1.0
    for i := 0; i < n; i++ {
        res *= float64(4*i+2) / float64(i+2)
    }
    return int(res)
}
```

```kotlin
class Solution {
    fun numTrees(n: Int): Int {
        var res = 1L
        for (i in 0 until n) {
            res = (res * (4 * i + 2) / (i + 2.0)).toLong()
        }
        return res.toInt()
    }
}
```

```swift
class Solution {
    func numTrees(_ n: Int) -> Int {
        var res = 1.0
        for i in 0..<n {
            res *= Double(4 * i + 2) / Double(i + 2)
        }
        return Int(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting the Base Case for Zero Nodes

When implementing the recursive or DP solution, failing to handle the case where `n = 0` leads to incorrect results. An empty tree (zero nodes) has exactly one valid structure (the empty structure), so `numTrees(0)` must return `1`. Without this, the multiplication in the recurrence breaks down since multiplying by zero eliminates valid combinations.

### Integer Overflow in Catalan Number Formulas

The Catalan number approach involves multiplying large numbers before dividing. In languages like Java, C++, or Go, intermediate products can overflow standard `int` types even for moderate values of `n`. Always use `long` or `long long` for intermediate calculations, and be careful about the order of operations to minimize overflow risk.

### Confusing Node Count with Node Values

The problem asks for the count of structurally unique BSTs with nodes numbered `1` to `n`, but the actual values do not matter for counting structures. What matters is how many nodes go in the left versus right subtree. Some solutions incorrectly try to track specific node values rather than just counting nodes, leading to unnecessarily complex code or wrong answers.
