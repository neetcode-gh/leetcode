## 1. Brute Force

### Intuition

The most straightforward approach is to check each element against every other element. If we find no duplicate for an element, it must be one of the two unique numbers. We collect these unique elements until we find both.

### Algorithm

1. Initialize an empty result list.
2. For each element at index `i`, check all other elements at index `j`.
3. If no match is found (the element is unique), add it to the result.
4. Stop once we have found two unique elements.
5. Return the result.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        n, res = len(nums), []

        for i in range(n):
            flag = True
            for j in range(n):
                if i != j and nums[i] == nums[j]:
                    flag = False
                    break

            if flag:
                res.append(nums[i])
                if len(res) == 2:
                    break

        return res
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int n = nums.length;
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            boolean flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.add(nums[i]);
                if (res.size() == 2) {
                    break;
                }
            }
        }

        return new int[] {res.get(0), res.get(1)};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.push_back(nums[i]);
                if (res.size() == 2) {
                    break;
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
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        const n = nums.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            let flag = true;
            for (let j = 0; j < n; j++) {
                if (i !== j && nums[i] === nums[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.push(nums[i]);
                if (res.length === 2) {
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int n = nums.Length;
        List<int> res = new List<int>();

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = 0; j < n; j++) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.Add(nums[i]);
                if (res.Count == 2) {
                    break;
                }
            }
        }

        return new int[] { res[0], res[1] };
    }
}
```

```go
func singleNumber(nums []int) []int {
    n := len(nums)
    res := []int{}

    for i := 0; i < n; i++ {
        flag := true
        for j := 0; j < n; j++ {
            if i != j && nums[i] == nums[j] {
                flag = false
                break
            }
        }
        if flag {
            res = append(res, nums[i])
            if len(res) == 2 {
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        val n = nums.size
        val res = mutableListOf<Int>()

        for (i in 0 until n) {
            var flag = true
            for (j in 0 until n) {
                if (i != j && nums[i] == nums[j]) {
                    flag = false
                    break
                }
            }
            if (flag) {
                res.add(nums[i])
                if (res.size == 2) break
            }
        }

        return intArrayOf(res[0], res[1])
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int]()

        for i in 0..<n {
            var flag = true
            for j in 0..<n {
                if i != j && nums[i] == nums[j] {
                    flag = false
                    break
                }
            }
            if flag {
                res.append(nums[i])
                if res.count == 2 { break }
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

## 2. Hash Map

### Intuition

We can count occurrences of each number using a hash map. Numbers that appear exactly once are our two unique elements. This trades space for time, reducing the time complexity from quadratic to linear.

### Algorithm

1. Create a hash map to count occurrences of each number.
2. Iterate through the array and update counts.
3. Collect all keys with a count of 1 into the result.
4. Return the result containing the two unique numbers.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        count = {}
        for num in nums:
            count[num] = 1 + count.get(num, 0)

        return [k for k in count if count[k] == 1]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        ArrayList<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            if (count.get(key) == 1) {
                res.add(key);
            }
        }

        return new int[] {res.get(0), res.get(1)};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        vector<int> res;
        for (const auto& pair : count) {
            if (pair.second == 1) {
                res.push_back(pair.first);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (const [key, value] of count) {
            if (value === 1) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }
        }

        List<int> res = new List<int>();
        foreach (var key in count.Keys) {
            if (count[key] == 1) {
                res.Add(key);
            }
        }

        return new int[] { res[0], res[1] };
    }
}
```

```go
func singleNumber(nums []int) []int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    res := []int{}
    for k, v := range count {
        if v == 1 {
            res = append(res, k)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val res = mutableListOf<Int>()
        for ((key, value) in count) {
            if (value == 1) {
                res.add(key)
            }
        }

        return intArrayOf(res[0], res[1])
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var res = [Int]()
        for (key, value) in count {
            if value == 1 {
                res.append(key)
            }
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

## 3. Hash Set

### Intuition

A hash set can track numbers we have seen. When we encounter a number for the first time, we add it. When we see it again, we remove it. After processing all numbers, only the two unique elements remain in the set.

### Algorithm

1. Initialize an empty hash set.
2. For each number in the array:
   - If the number is already in the set, remove it.
   - Otherwise, add it to the set.
3. Convert the set to a list and return it.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        seen = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return list(seen)
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                seen.remove(num);
            } else {
                seen.add(num);
            }
        }

        int[] res = new int[2];
        int index = 0;
        for (int num : seen) {
            res[index++] = num;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        unordered_set<int> seen;
        for (int& num : nums) {
            if (seen.count(num)) {
                seen.erase(num);
            } else {
                seen.insert(num);
            }
        }

        return vector<int>(seen.begin(), seen.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                seen.delete(num);
            } else {
                seen.add(num);
            }
        }

        return Array.from(seen);
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                seen.Remove(num);
            } else {
                seen.Add(num);
            }
        }

        int[] res = new int[2];
        int index = 0;
        foreach (int num in seen) {
            res[index++] = num;
        }

        return res;
    }
}
```

```go
func singleNumber(nums []int) []int {
    seen := make(map[int]bool)
    for _, num := range nums {
        if seen[num] {
            delete(seen, num)
        } else {
            seen[num] = true
        }
    }

    res := []int{}
    for num := range seen {
        res = append(res, num)
    }

    return res
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        val seen = HashSet<Int>()
        for (num in nums) {
            if (num in seen) {
                seen.remove(num)
            } else {
                seen.add(num)
            }
        }

        return seen.toIntArray()
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(num) {
                seen.remove(num)
            } else {
                seen.insert(num)
            }
        }

        return Array(seen)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sorting

### Intuition

Sorting the array groups duplicate numbers together. After sorting, each element should equal either its left or right neighbor if it has a duplicate. Elements that differ from both neighbors are the unique numbers we seek.

### Algorithm

1. Sort the array.
2. Iterate through each index `i`.
3. If `nums[i]` differs from both `nums[i-1]` (if exists) and `nums[i+1]` (if exists), it is unique.
4. Collect all unique elements and return them.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        res, n = [], len(nums)
        nums.sort()

        for i in range(n):
            if ((i > 0 and nums[i] == nums[i - 1]) or
                (i + 1 < n and nums[i] == nums[i + 1])):
                continue
            res.append(nums[i])

        return res
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.add(nums[i]);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.push_back(nums[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (
                (i > 0 && nums[i] === nums[i - 1]) ||
                (i + 1 < n && nums[i] === nums[i + 1])
            ) {
                continue;
            }
            res.push(nums[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        Array.Sort(nums);
        List<int> res = new List<int>();
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue;
            }
            res.Add(nums[i]);
        }

        return res.ToArray();
    }
}
```

```go
func singleNumber(nums []int) []int {
    sort.Ints(nums)
    res := []int{}
    n := len(nums)

    for i := 0; i < n; i++ {
        if (i > 0 && nums[i] == nums[i-1]) ||
            (i+1 < n && nums[i] == nums[i+1]) {
            continue
        }
        res = append(res, nums[i])
    }

    return res
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        nums.sort()
        val res = mutableListOf<Int>()
        val n = nums.size

        for (i in 0 until n) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1])) {
                continue
            }
            res.add(nums[i])
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        let nums = nums.sorted()
        var res = [Int]()
        let n = nums.count

        for i in 0..<n {
            if (i > 0 && nums[i] == nums[i - 1]) ||
                (i + 1 < n && nums[i] == nums[i + 1]) {
                continue
            }
            res.append(nums[i])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 5. Bitwise XOR (Least Significant Bit)

### Intuition

XORing all numbers gives us `a ^ b` where `a` and `b` are the two unique numbers. Since `a != b`, at least one bit in the XOR result is set. This bit position represents where `a` and `b` differ. We can use this differing bit to partition all numbers into two groups: one containing `a` and one containing `b`. XORing within each group isolates the unique numbers.

### Algorithm

1. XOR all numbers to get `a ^ b`.
2. Find any set bit in the result by iterating until we find a bit position where the XOR is 1.
3. Partition numbers: those with this bit set go to one group, others to another.
4. XOR within each group to isolate `a` and `b`.
5. Return both unique numbers.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for num in nums:
            xor ^= num

        diff_bit = 1
        while not (xor & diff_bit):
            diff_bit <<= 1

        a = b = 0
        for num in nums:
            if diff_bit & num:
                a ^= num
            else:
                b ^= num
        return [a, b]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }

        int diff_bit = 1;
        while ((xor & diff_bit) == 0) {
            diff_bit <<= 1;
        }

        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & diff_bit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{a, b};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int xor_all = 0;
        for (int& num : nums) {
            xor_all ^= num;
        }

        int diff_bit = 1;
        while ((xor_all & diff_bit) == 0) {
            diff_bit <<= 1;
        }

        int a = 0, b = 0;
        for (int& num : nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return {a, b};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        let xor = 0;
        for (const num of nums) {
            xor ^= num;
        }

        let diff_bit = 1;
        while ((xor & diff_bit) === 0) {
            diff_bit <<= 1;
        }

        let a = 0,
            b = 0;
        for (const num of nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return [a, b];
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int xor = 0;
        foreach (int num in nums) {
            xor ^= num;
        }

        int diffBit = 1;
        while ((xor & diffBit) == 0) {
            diffBit <<= 1;
        }

        int a = 0, b = 0;
        foreach (int num in nums) {
            if ((num & diffBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }

        return new int[] { a, b };
    }
}
```

```go
func singleNumber(nums []int) []int {
    xorVal := 0
    for _, num := range nums {
        xorVal ^= num
    }

    diffBit := 1
    for xorVal&diffBit == 0 {
        diffBit <<= 1
    }

    a, b := 0, 0
    for _, num := range nums {
        if num&diffBit != 0 {
            a ^= num
        } else {
            b ^= num
        }
    }

    return []int{a, b}
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        var xorVal = 0
        for (num in nums) {
            xorVal = xorVal xor num
        }

        var diffBit = 1
        while (xorVal and diffBit == 0) {
            diffBit = diffBit shl 1
        }

        var a = 0
        var b = 0
        for (num in nums) {
            if (num and diffBit != 0) {
                a = a xor num
            } else {
                b = b xor num
            }
        }

        return intArrayOf(a, b)
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        var xorVal = 0
        for num in nums {
            xorVal ^= num
        }

        var diffBit = 1
        while xorVal & diffBit == 0 {
            diffBit <<= 1
        }

        var a = 0, b = 0
        for num in nums {
            if num & diffBit != 0 {
                a ^= num
            } else {
                b ^= num
            }
        }

        return [a, b]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 6. Bitwise XOR (Most Significant Bit)

### Intuition

This approach is similar to the previous one but uses a neat trick to find the rightmost set bit. The expression `x & (-x)` isolates the lowest set bit in `x`. Using this on the XOR of all numbers immediately gives us a differing bit between the two unique numbers without looping.

### Algorithm

1. XOR all numbers to get `a ^ b`.
2. Compute `diff_bit = xor & (-xor)` to get the rightmost set bit.
3. Partition numbers based on whether they have this bit set.
4. XOR within each partition to find `a` and `b`.
5. Return both unique numbers.

::tabs-start

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for num in nums:
            xor ^= num

        diff_bit = xor & (-xor)

        a = b = 0
        for num in nums:
            if diff_bit & num:
                a ^= num
            else:
                b ^= num
        return [a, b]
```

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }

        int diff_bit = xor & (-xor);

        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & diff_bit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{a, b};
    }
}
```

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        uint xor_all = 0;
        for (int& num : nums) {
            xor_all ^= num;
        }

        int diff_bit = xor_all & (-xor_all);

        int a = 0, b = 0;
        for (int& num : nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return {a, b};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    singleNumber(nums) {
        let xor = 0;
        for (const num of nums) {
            xor ^= num;
        }

        let diff_bit = xor & -xor;

        let a = 0,
            b = 0;
        for (const num of nums) {
            if (num & diff_bit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return [a, b];
    }
}
```

```csharp
public class Solution {
    public int[] SingleNumber(int[] nums) {
        int xor = 0;
        foreach (int num in nums) {
            xor ^= num;
        }

        int diffBit = xor & -xor;

        int a = 0, b = 0;
        foreach (int num in nums) {
            if ((num & diffBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }

        return new int[] { a, b };
    }
}
```

```go
func singleNumber(nums []int) []int {
    xorVal := 0
    for _, num := range nums {
        xorVal ^= num
    }

    diffBit := xorVal & -xorVal

    a, b := 0, 0
    for _, num := range nums {
        if num&diffBit != 0 {
            a ^= num
        } else {
            b ^= num
        }
    }

    return []int{a, b}
}
```

```kotlin
class Solution {
    fun singleNumber(nums: IntArray): IntArray {
        var xorVal = 0
        for (num in nums) {
            xorVal = xorVal xor num
        }

        val diffBit = xorVal and -xorVal

        var a = 0
        var b = 0
        for (num in nums) {
            if (num and diffBit != 0) {
                a = a xor num
            } else {
                b = b xor num
            }
        }

        return intArrayOf(a, b)
    }
}
```

```swift
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        var xorVal = 0
        for num in nums {
            xorVal ^= num
        }

        let diffBit = xorVal & -xorVal

        var a = 0, b = 0
        for num in nums {
            if num & diffBit != 0 {
                a ^= num
            } else {
                b ^= num
            }
        }

        return [a, b]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
