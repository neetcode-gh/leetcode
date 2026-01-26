## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Map** - Used to count the frequency of each element in a single pass
- **Array Traversal** - Understanding how to iterate through arrays and track maximum values
- **Frequency Counting** - Concept of counting occurrences and comparing counts to values

---

## 1. Brute Force

### Intuition

A lucky integer is one whose value equals its frequency in the array. The simplest approach is to check each number by counting how many times it appears. If the count matches the number itself, it's a lucky integer. We track the largest one found.

### Algorithm

1. Initialize `res = -1` (no lucky integer found yet).
2. For each number `num` in the array:
   - Count how many times `num` appears by scanning the entire array.
   - If the count equals `num`, update `res` to the maximum of `res` and `num`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        res = -1

        for num in arr:
            cnt = 0
            for a in arr:
                if num == a:
                    cnt += 1
            if cnt == num:
                res = max(res, num)

        return res
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        int res = -1;

        for (int num : arr) {
            int cnt = 0;
            for (int a : arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = Math.max(res, num);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        int res = -1;

        for (int num : arr) {
            int cnt = 0;
            for (int a : arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = max(res, num);
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
    findLucky(arr) {
        let res = -1;

        for (let num of arr) {
            let cnt = 0;
            for (let a of arr) {
                if (num === a) {
                    cnt++;
                }
            }
            if (cnt === num) {
                res = Math.max(res, num);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        int res = -1;

        foreach (int num in arr) {
            int cnt = 0;
            foreach (int a in arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = Math.Max(res, num);
            }
        }

        return res;
    }
}
```

```go
func findLucky(arr []int) int {
    res := -1

    for _, num := range arr {
        cnt := 0
        for _, a := range arr {
            if num == a {
                cnt++
            }
        }
        if cnt == num {
            if num > res {
                res = num
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findLucky(arr: IntArray): Int {
        var res = -1

        for (num in arr) {
            var cnt = 0
            for (a in arr) {
                if (num == a) {
                    cnt++
                }
            }
            if (cnt == num) {
                res = maxOf(res, num)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findLucky(_ arr: [Int]) -> Int {
        var res = -1

        for num in arr {
            var cnt = 0
            for a in arr {
                if num == a {
                    cnt += 1
                }
            }
            if cnt == num {
                res = max(res, num)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Sorting

### Intuition

After sorting, identical numbers are grouped together. By traversing from right to left, we can count consecutive occurrences of each number. The first lucky integer we find (scanning from largest to smallest) is guaranteed to be the largest.

### Algorithm

1. Sort the array.
2. Traverse from right to left, counting consecutive equal elements (the streak).
3. When the current element differs from the previous one (or we reach the start):
   - Check if the streak count equals the element value.
   - If so, return that element immediately (it's the largest lucky integer).
   - Reset the streak counter.
4. If no lucky integer is found, return `-1`.

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        arr.sort()
        streak = 0
        for i in range(len(arr) - 1, -1, -1):
            streak += 1
            if i == 0 or (arr[i] != arr[i - 1]):
                if arr[i] == streak:
                    return arr[i]
                streak = 0
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        Arrays.sort(arr);
        int streak = 0;

        for (int i = arr.length - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int streak = 0;

        for (int i = arr.size() - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        arr.sort((a, b) => a - b);
        let streak = 0;

        for (let i = arr.length - 1; i >= 0; i--) {
            streak++;
            if (i === 0 || arr[i] !== arr[i - 1]) {
                if (arr[i] === streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        Array.Sort(arr);
        int streak = 0;

        for (int i = arr.Length - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

```go
func findLucky(arr []int) int {
    sort.Ints(arr)
    streak := 0

    for i := len(arr) - 1; i >= 0; i-- {
        streak++
        if i == 0 || arr[i] != arr[i-1] {
            if arr[i] == streak {
                return arr[i]
            }
            streak = 0
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findLucky(arr: IntArray): Int {
        arr.sort()
        var streak = 0

        for (i in arr.size - 1 downTo 0) {
            streak++
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i]
                }
                streak = 0
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func findLucky(_ arr: [Int]) -> Int {
        let arr = arr.sorted()
        var streak = 0

        for i in stride(from: arr.count - 1, through: 0, by: -1) {
            streak += 1
            if i == 0 || arr[i] != arr[i - 1] {
                if arr[i] == streak {
                    return arr[i]
                }
                streak = 0
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Hash Map

### Intuition

We can count the frequency of each number in one pass using a hash map. Then we iterate through the map to find numbers where the key equals its value (frequency). This avoids repeated counting and is more efficient than brute force.

### Algorithm

1. Build a frequency map by iterating through the array once.
2. Initialize `res = -1`.
3. For each (number, frequency) pair in the map:
   - If the number equals its frequency, update `res` to the maximum of `res` and `num`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        cnt = Counter(arr)
        res = -1

        for num in cnt:
            if num == cnt[num]:
                res = max(num, res)
        
        return res
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : arr) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = -1;
        for (int num : count.keySet()) {
            if (num == count.get(num)) {
                res = Math.max(res, num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> count;
        for (int num : arr) {
            count[num]++;
        }

        int res = -1;
        for (auto& [num, freq] : count) {
            if (num == freq) {
                res = max(res, num);
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
    findLucky(arr) {
        const count = new Map();
        for (const num of arr) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = -1;
        for (const [num, freq] of count.entries()) {
            if (num === freq) {
                res = Math.max(res, num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in arr) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        int res = -1;
        foreach (var kvp in count) {
            if (kvp.Key == kvp.Value) {
                res = Math.Max(res, kvp.Key);
            }
        }
        return res;
    }
}
```

```go
func findLucky(arr []int) int {
    count := make(map[int]int)
    for _, num := range arr {
        count[num]++
    }

    res := -1
    for num, freq := range count {
        if num == freq {
            if num > res {
                res = num
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findLucky(arr: IntArray): Int {
        val count = mutableMapOf<Int, Int>()
        for (num in arr) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        var res = -1
        for ((num, freq) in count) {
            if (num == freq) {
                res = maxOf(res, num)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findLucky(_ arr: [Int]) -> Int {
        var count = [Int: Int]()
        for num in arr {
            count[num, default: 0] += 1
        }

        var res = -1
        for (num, freq) in count {
            if num == freq {
                res = max(res, num)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Negative Marking

### Intuition

If we can modify the input array, we can use it as a frequency counter without extra space. For a number `num`, we use index `num - 1` to store its frequency by making that position negative and decrementing it. After processing, a position `i` with value `-x` means the number `i + 1` appeared `x` times.

### Algorithm

1. For each position `i`, follow the chain of values to increment counts:
   - Get the current number `num`.
   - If `num` is within bounds, decrement `arr[num - 1]` (making it negative if needed) to track frequency.
   - Follow the chain until we loop back or go out of bounds.
2. Traverse from the end of the array backward.
3. For each index `i`, check if `-arr[i] == i + 1` (frequency equals the number).
4. Return the first match found, or `-1` if none exists.

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        n = len(arr)
        for i in range(n):
            prev, num = i, arr[i]
            while 0 < num <= n:
                nxt = arr[num - 1]
                arr[num - 1] = min(0, arr[num - 1]) - 1
                if num - 1 <= i or num - 1 == prev:
                    break
                prev = num - 1
                num = nxt
        
        for i in range(n - 1, -1, -1):
            if -arr[i] == i + 1:
                return i + 1
        
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = Math.min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let prev = i, num = arr[i];
            while (0 < num && num <= n) {
                let nxt = arr[num - 1];
                arr[num - 1] = Math.min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 === prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (let i = n - 1; i >= 0; i--) {
            if (-arr[i] === i + 1) return i + 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = Math.Min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```go
func findLucky(arr []int) int {
    n := len(arr)
    for i := 0; i < n; i++ {
        prev, num := i, arr[i]
        for num > 0 && num <= n {
            nxt := arr[num-1]
            if arr[num-1] > 0 {
                arr[num-1] = -1
            } else {
                arr[num-1]--
            }
            if num-1 <= i || num-1 == prev {
                break
            }
            prev = num - 1
            num = nxt
        }
    }

    for i := n - 1; i >= 0; i-- {
        if -arr[i] == i+1 {
            return i + 1
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findLucky(arr: IntArray): Int {
        val n = arr.size
        for (i in 0 until n) {
            var prev = i
            var num = arr[i]
            while (num > 0 && num <= n) {
                val nxt = arr[num - 1]
                arr[num - 1] = minOf(0, arr[num - 1]) - 1
                if (num - 1 <= i || num - 1 == prev) break
                prev = num - 1
                num = nxt
            }
        }

        for (i in n - 1 downTo 0) {
            if (-arr[i] == i + 1) return i + 1
        }
        return -1
    }
}
```

```swift
class Solution {
    func findLucky(_ arr: [Int]) -> Int {
        var arr = arr
        let n = arr.count
        for i in 0..<n {
            var prev = i
            var num = arr[i]
            while num > 0 && num <= n {
                let nxt = arr[num - 1]
                arr[num - 1] = min(0, arr[num - 1]) - 1
                if num - 1 <= i || num - 1 == prev { break }
                prev = num - 1
                num = nxt
            }
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            if -arr[i] == i + 1 { return i + 1 }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 5. Bit Manipulation

### Intuition

We can use bit manipulation to store both the original value and the frequency count in the same array element. Since values are at most `500`, they fit in 10 bits. We use the lower 10 bits for the original value and the upper bits for the count. This allows in-place frequency tracking.

### Algorithm

1. For each number in the array:
   - Extract the original value using a bitmask (lower 10 bits).
   - If the value is within the array bounds, increment the count at that index by adding `1 << 10`.
2. Traverse the array from right to left.
3. For each index `i`, extract the count by right-shifting by 10 bits.
4. If the count equals `i + 1`, return `i + 1` (this is the largest lucky integer).
5. If no match is found, return `-1`.

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        for num in arr:
            idx = num & ((1 << 10) - 1)
            if idx <= len(arr):
                arr[idx - 1] += (1 << 10)

        for i in range(len(arr) - 1, -1, -1):
            cnt = arr[i] >> 10
            if cnt == i + 1:
                return i + 1
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        for (int num : arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.length - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        for (int num : arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.size()) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.size() - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        for (let num of arr) {
            const idx = num & ((1 << 10) - 1);
            if (idx <= arr.length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            const cnt = arr[i] >> 10;
            if (cnt === i + 1) return i + 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        foreach (int num in arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.Length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.Length - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```go
func findLucky(arr []int) int {
    for _, num := range arr {
        idx := num & ((1 << 10) - 1)
        if idx <= len(arr) {
            arr[idx-1] += (1 << 10)
        }
    }

    for i := len(arr) - 1; i >= 0; i-- {
        cnt := arr[i] >> 10
        if cnt == i+1 {
            return i + 1
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findLucky(arr: IntArray): Int {
        for (num in arr) {
            val idx = num and ((1 shl 10) - 1)
            if (idx <= arr.size) {
                arr[idx - 1] += (1 shl 10)
            }
        }

        for (i in arr.size - 1 downTo 0) {
            val cnt = arr[i] shr 10
            if (cnt == i + 1) return i + 1
        }
        return -1
    }
}
```

```swift
class Solution {
    func findLucky(_ arr: [Int]) -> Int {
        var arr = arr
        for num in arr {
            let idx = num & ((1 << 10) - 1)
            if idx <= arr.count {
                arr[idx - 1] += (1 << 10)
            }
        }

        for i in stride(from: arr.count - 1, through: 0, by: -1) {
            let cnt = arr[i] >> 10
            if cnt == i + 1 { return i + 1 }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Return -1 When No Lucky Integer Exists

A lucky integer only exists if a number's value equals its frequency. If no such number is found, the function must return `-1`. Forgetting to initialize the result to `-1` or failing to handle the case where no lucky integer exists will produce incorrect output for inputs like `[1, 1]` where no number satisfies the condition.

### Not Tracking the Maximum Lucky Integer

When multiple lucky integers exist in the array, you must return the largest one. Simply returning the first lucky integer found without comparing it to previously found ones produces wrong results. Always use `max(result, num)` when a lucky integer is found, or iterate from largest to smallest and return immediately upon finding one.