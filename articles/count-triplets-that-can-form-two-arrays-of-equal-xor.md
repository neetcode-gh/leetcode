## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Bitwise XOR** - Understanding XOR properties like a XOR a = 0 and a XOR 0 = a
- **Prefix Sums/XOR** - Using cumulative operations to compute subarray results efficiently
- **Hash Maps** - Tracking counts and index sums for O(1) lookups in the optimal solution

---

## 1. Brute Force

### Intuition

We need to find triplets `(i, j, k)` where `a = arr[i] XOR arr[i+1] XOR ... XOR arr[j-1]` equals `b = arr[j] XOR arr[j+1] XOR ... XOR arr[k]`. The most direct approach is to try all valid combinations of `i`, `j`, and `k`, compute both XOR values for each triplet, and count when they match.

### Algorithm

1. Initialize a result counter `res` to `0`.
2. Iterate through all possible values of `i` from `0` to `N-2`.
3. For each `i`, iterate through all possible values of `j` from `i+1` to `N-1`.
4. For each `j`, iterate through all possible values of `k` from `j` to `N-1`.
5. Compute `a` by XORing elements from index `i` to `j-1`.
6. Compute `b` by XORing elements from index `j` to `k`.
7. If `a == b`, increment `res`.
8. Return `res`.

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            for j in range(i + 1, N):
                for k in range(j, N):
                    a = b = 0
                    for idx in range(i, j):
                        a ^= arr[idx]
                    for idx in range(j, k + 1):
                        b ^= arr[idx]
                    if a == b:
                        res += 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            for (int j = i + 1; j < N; j++) {
                for (int k = j; k < N; k++) {
                    int a = 0, b = 0;
                    for (int idx = i; idx < j; idx++) {
                        a ^= arr[idx];
                    }
                    for (int idx = j; idx <= k; idx++) {
                        b ^= arr[idx];
                    }
                    if (a == b) {
                        res++;
                    }
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
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            for (int j = i + 1; j < N; ++j) {
                for (int k = j; k < N; ++k) {
                    int a = 0, b = 0;
                    for (int idx = i; idx < j; ++idx) {
                        a ^= arr[idx];
                    }
                    for (int idx = j; idx <= k; ++idx) {
                        b ^= arr[idx];
                    }
                    if (a == b) {
                        res++;
                    }
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
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            for (let j = i + 1; j < N; j++) {
                for (let k = j; k < N; k++) {
                    let a = 0,
                        b = 0;
                    for (let idx = i; idx < j; idx++) {
                        a ^= arr[idx];
                    }
                    for (let idx = j; idx <= k; idx++) {
                        b ^= arr[idx];
                    }
                    if (a === b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountTriplets(int[] arr) {
        int N = arr.Length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            for (int j = i + 1; j < N; j++) {
                for (int k = j; k < N; k++) {
                    int a = 0, b = 0;
                    for (int idx = i; idx < j; idx++) {
                        a ^= arr[idx];
                    }
                    for (int idx = j; idx <= k; idx++) {
                        b ^= arr[idx];
                    }
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func countTriplets(arr []int) int {
    N := len(arr)
    res := 0

    for i := 0; i < N-1; i++ {
        for j := i + 1; j < N; j++ {
            for k := j; k < N; k++ {
                a, b := 0, 0
                for idx := i; idx < j; idx++ {
                    a ^= arr[idx]
                }
                for idx := j; idx <= k; idx++ {
                    b ^= arr[idx]
                }
                if a == b {
                    res++
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countTriplets(arr: IntArray): Int {
        val N = arr.size
        var res = 0

        for (i in 0 until N - 1) {
            for (j in i + 1 until N) {
                for (k in j until N) {
                    var a = 0
                    var b = 0
                    for (idx in i until j) {
                        a = a xor arr[idx]
                    }
                    for (idx in j..k) {
                        b = b xor arr[idx]
                    }
                    if (a == b) {
                        res++
                    }
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countTriplets(_ arr: [Int]) -> Int {
        let N = arr.count
        var res = 0

        for i in 0..<(N - 1) {
            for j in (i + 1)..<N {
                for k in j..<N {
                    var a = 0, b = 0
                    for idx in i..<j {
                        a ^= arr[idx]
                    }
                    for idx in j...k {
                        b ^= arr[idx]
                    }
                    if a == b {
                        res += 1
                    }
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$ extra space.

---

## 2. Brute Force (Optimized)

### Intuition

Instead of recomputing the XOR values from scratch for each triplet, we can build them incrementally. As we move `j` forward, we can extend `a` by XORing the next element. Similarly, as we move `k` forward, we can extend `b` by XORing the next element. This eliminates the innermost loops for computing XOR values.

### Algorithm

1. Initialize a result counter `res` to `0`.
2. Iterate through all possible values of `i` from `0` to `N-2`.
3. Initialize `a` to `0`.
4. For each `j` from `i+1` to `N-1`:
   - Update `a` by XORing it with `arr[j-1]`.
   - Initialize `b` to `0`.
   - For each `k` from `j` to `N-1`:
     - Update `b` by XORing it with `arr[k]`.
     - If `a == b`, increment `res`.
5. Return `res`.

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            a = 0
            for j in range(i + 1, N):
                a ^= arr[j - 1]
                b = 0
                for k in range(j, N):
                    b ^= arr[k]
                    if a == b:
                        res += 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int a = 0;
            for (int j = i + 1; j < N; j++) {
                a ^= arr[j - 1];
                int b = 0;
                for (int k = j; k < N; k++) {
                    b ^= arr[k];
                    if (a == b) {
                        res++;
                    }
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
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            int a = 0;
            for (int j = i + 1; j < N; ++j) {
                a ^= arr[j - 1];
                int b = 0;
                for (int k = j; k < N; ++k) {
                    b ^= arr[k];
                    if (a == b) {
                        res++;
                    }
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
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            let a = 0;
            for (let j = i + 1; j < N; j++) {
                a ^= arr[j - 1];
                let b = 0;
                for (let k = j; k < N; k++) {
                    b ^= arr[k];
                    if (a === b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountTriplets(int[] arr) {
        int N = arr.Length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int a = 0;
            for (int j = i + 1; j < N; j++) {
                a ^= arr[j - 1];
                int b = 0;
                for (int k = j; k < N; k++) {
                    b ^= arr[k];
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func countTriplets(arr []int) int {
    N := len(arr)
    res := 0

    for i := 0; i < N-1; i++ {
        a := 0
        for j := i + 1; j < N; j++ {
            a ^= arr[j-1]
            b := 0
            for k := j; k < N; k++ {
                b ^= arr[k]
                if a == b {
                    res++
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countTriplets(arr: IntArray): Int {
        val N = arr.size
        var res = 0

        for (i in 0 until N - 1) {
            var a = 0
            for (j in i + 1 until N) {
                a = a xor arr[j - 1]
                var b = 0
                for (k in j until N) {
                    b = b xor arr[k]
                    if (a == b) {
                        res++
                    }
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countTriplets(_ arr: [Int]) -> Int {
        let N = arr.count
        var res = 0

        for i in 0..<(N - 1) {
            var a = 0
            for j in (i + 1)..<N {
                a ^= arr[j - 1]
                var b = 0
                for k in j..<N {
                    b ^= arr[k]
                    if a == b {
                        res += 1
                    }
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$ extra space.

---

## 3. Math + Bitwise XOR

### Intuition

The key insight is that if `a == b`, then `a XOR b == 0`, which means `arr[i] XOR arr[i+1] XOR ... XOR arr[k] == 0`. So we need to find subarrays where the XOR of all elements is `0`. For any such subarray from index `i` to `k`, we can place `j` at any position from `i+1` to `k`, giving us `k - i` valid triplets. This reduces the problem to finding pairs `(i, k)` where the subarray XOR is `0`.

### Algorithm

1. Initialize a result counter `res` to `0`.
2. Iterate through all possible starting indices `i` from `0` to `N-2`.
3. Initialize `cur_xor` to `arr[i]`.
4. For each ending index `k` from `i+1` to `N-1`:
   - Update `cur_xor` by XORing it with `arr[k]`.
   - If `cur_xor == 0`, add `k - i` to `res` (representing all valid positions for `j`).
5. Return `res`.

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            cur_xor = arr[i]
            for k in range(i + 1, N):
                cur_xor ^= arr[k]
                if cur_xor == 0:
                    res += k - i

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int curXor = arr[i];
            for (int k = i + 1; k < N; k++) {
                curXor ^= arr[k];
                if (curXor == 0) {
                    res += k - i;
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
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            int curXor = arr[i];
            for (int k = i + 1; k < N; ++k) {
                curXor ^= arr[k];
                if (curXor == 0) {
                    res += k - i;
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
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            let curXor = arr[i];
            for (let k = i + 1; k < N; k++) {
                curXor ^= arr[k];
                if (curXor === 0) {
                    res += k - i;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountTriplets(int[] arr) {
        int N = arr.Length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int curXor = arr[i];
            for (int k = i + 1; k < N; k++) {
                curXor ^= arr[k];
                if (curXor == 0) {
                    res += k - i;
                }
            }
        }

        return res;
    }
}
```

```go
func countTriplets(arr []int) int {
    N := len(arr)
    res := 0

    for i := 0; i < N-1; i++ {
        curXor := arr[i]
        for k := i + 1; k < N; k++ {
            curXor ^= arr[k]
            if curXor == 0 {
                res += k - i
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countTriplets(arr: IntArray): Int {
        val N = arr.size
        var res = 0

        for (i in 0 until N - 1) {
            var curXor = arr[i]
            for (k in i + 1 until N) {
                curXor = curXor xor arr[k]
                if (curXor == 0) {
                    res += k - i
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countTriplets(_ arr: [Int]) -> Int {
        let N = arr.count
        var res = 0

        for i in 0..<(N - 1) {
            var curXor = arr[i]
            for k in (i + 1)..<N {
                curXor ^= arr[k]
                if curXor == 0 {
                    res += k - i
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 4. Math + Bitwise XOR (Optimal)

### Intuition

We can use prefix XOR to find subarrays with XOR equal to `0` in linear time. If `prefix[i] == prefix[k+1]`, then the XOR from index `i` to `k` is `0`. For each prefix value, we track how many times we have seen it and the sum of indices where it occurred. When we see the same prefix again at index `k`, the contribution to the result is `k * count - sum_of_indices`, where `count` is how many times this prefix appeared before, and the formula accounts for all `k - i` values.

### Algorithm

1. Initialize `res` and `prefix` to `0`.
2. Create two hash maps: `count` to store frequency of each prefix value, and `index_sum` to store sum of indices for each prefix value.
3. Initialize `count[0] = 1` to handle subarrays starting from index `0`.
4. For each index `i` from `0` to `N-1`:
   - Update `prefix` by XORing it with `arr[i]`.
   - If this prefix value has been seen before, add `i * count[prefix] - index_sum[prefix]` to `res`.
   - Increment `count[prefix]` by `1`.
   - Add `i + 1` to `index_sum[prefix]`.
5. Return `res`.

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = prefix = 0
        count = defaultdict(int)  # number of prefixes
        index_sum = defaultdict(int)  # sum of indices with that prefix
        count[0] = 1

        for i in range(N):
            prefix ^= arr[i]
            if prefix in count:
                res += i * count[prefix] - index_sum[prefix]
            count[prefix] += 1
            index_sum[prefix] += i + 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length, res = 0, prefix = 0;
        Map<Integer, Integer> count = new HashMap<>(); // number of prefixes
        Map<Integer, Integer> indexSum = new HashMap<>(); // sum of indices with that prefix
        count.put(0, 1);

        for (int i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.containsKey(prefix)) {
                res += i * count.get(prefix) - indexSum.getOrDefault(prefix, 0);
            }
            count.put(prefix, count.getOrDefault(prefix, 0) + 1);
            indexSum.put(prefix, indexSum.getOrDefault(prefix, 0) + i + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int N = arr.size(), res = 0, prefix = 0;
        unordered_map<int, int> count; // number of prefixes
        unordered_map<int, int> indexSum; // sum of indices with that prefix
        count[0] = 1;

        for (int i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.count(prefix)) {
                res += i * count[prefix] - indexSum[prefix];
            }
            count[prefix]++;
            indexSum[prefix] += i + 1;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0,
            prefix = 0;
        const count = new Map(); // number of prefixes
        const indexSum = new Map(); // sum of indices with that prefix
        count.set(0, 1);

        for (let i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.has(prefix)) {
                res += i * count.get(prefix) - (indexSum.get(prefix) || 0);
            }
            count.set(prefix, (count.get(prefix) || 0) + 1);
            indexSum.set(prefix, (indexSum.get(prefix) || 0) + i + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountTriplets(int[] arr) {
        int N = arr.Length, res = 0, prefix = 0;
        Dictionary<int, int> count = new Dictionary<int, int>();
        Dictionary<int, int> indexSum = new Dictionary<int, int>();
        count[0] = 1;

        for (int i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.ContainsKey(prefix)) {
                res += i * count[prefix] - (indexSum.ContainsKey(prefix) ? indexSum[prefix] : 0);
            }
            count[prefix] = count.GetValueOrDefault(prefix, 0) + 1;
            indexSum[prefix] = indexSum.GetValueOrDefault(prefix, 0) + i + 1;
        }

        return res;
    }
}
```

```go
func countTriplets(arr []int) int {
    N := len(arr)
    res, prefix := 0, 0
    count := make(map[int]int)
    indexSum := make(map[int]int)
    count[0] = 1

    for i := 0; i < N; i++ {
        prefix ^= arr[i]
        if c, ok := count[prefix]; ok {
            res += i*c - indexSum[prefix]
        }
        count[prefix]++
        indexSum[prefix] += i + 1
    }

    return res
}
```

```kotlin
class Solution {
    fun countTriplets(arr: IntArray): Int {
        val N = arr.size
        var res = 0
        var prefix = 0
        val count = mutableMapOf(0 to 1)
        val indexSum = mutableMapOf<Int, Int>()

        for (i in 0 until N) {
            prefix = prefix xor arr[i]
            if (prefix in count) {
                res += i * count[prefix]!! - (indexSum[prefix] ?: 0)
            }
            count[prefix] = (count[prefix] ?: 0) + 1
            indexSum[prefix] = (indexSum[prefix] ?: 0) + i + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func countTriplets(_ arr: [Int]) -> Int {
        let N = arr.count
        var res = 0, prefix = 0
        var count = [0: 1]
        var indexSum = [Int: Int]()

        for i in 0..<N {
            prefix ^= arr[i]
            if let c = count[prefix] {
                res += i * c - (indexSum[prefix] ?? 0)
            }
            count[prefix, default: 0] += 1
            indexSum[prefix, default: 0] += i + 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Misunderstanding the Triplet Count Formula

When the XOR from index `i` to `k` equals zero, beginners often count it as just 1 triplet. However, `j` can be placed at any position from `i+1` to `k`, yielding `k - i` valid triplets for each such pair.

```python
# Incorrect - counts only one triplet per zero-XOR subarray
if cur_xor == 0:
    res += 1

# Correct - counts all valid j positions
if cur_xor == 0:
    res += k - i
```

### Off-by-One Errors in Index Sum Tracking

In the optimal solution, the index sum needs to track `i + 1` (not `i`) because we want the sum of starting positions for subarrays, and the formula `i * count - index_sum` requires this offset. Using just `i` leads to incorrect results.

```python
# Incorrect - missing the +1 offset
index_sum[prefix] += i

# Correct - accounts for 1-based position in contribution formula
index_sum[prefix] += i + 1
```

### Forgetting to Initialize count[0] = 1

The prefix XOR of 0 needs to be pre-initialized to handle subarrays starting from index 0. Without this initialization, valid triplets where the XOR from index 0 to some `k` equals zero will be missed.

```python
# Incorrect - misses subarrays starting from index 0
count = defaultdict(int)

# Correct - handles prefix XOR that equals a previously seen value at index 0
count = defaultdict(int)
count[0] = 1
```
