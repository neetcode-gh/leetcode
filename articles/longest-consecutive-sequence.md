## 1. Brute Force

### Intuition

A consecutive sequence grows by checking whether the next number (`num + 1`, `num + 2`, …) exists in the set.
The brute-force approach simply starts from every number in the list and tries to extend a consecutive streak as far as possible.
For each number, we repeatedly check if the next number exists, increasing the streak length until the sequence breaks.
Even though this method works, it does unnecessary repeated work because many sequences get recomputed multiple times.

### Algorithm

1. Convert the input list to a set for **O(1)** lookups.
2. Initialize `res` to store the maximum streak length.
3. For each number `num` in the original list:
   - Start a new streak count at 0.
   - Set `curr = num`.
   - While `curr` exists in the set:
     - Increase the streak count.
     - Move to the next number (`curr += 1`).
   - Update `res` with the longest streak found so far.
4. Return `res` after checking all numbers.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        res = 0
        store = set(nums)

        for num in nums:
            streak, curr = 0, num
            while curr in store:
                streak += 1
                curr += 1
            res = max(res, streak)
        return res
```

```java
public class Solution {
    public int longestConsecutive(int[] nums) {
        int res = 0;
        Set<Integer> store = new HashSet<>();
        for (int num : nums) {
            store.add(num);
        }

        for (int num : nums) {
            int streak = 0, curr = num;
            while (store.contains(curr)) {
                streak++;
                curr++;
            }
            res = Math.max(res, streak);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int res = 0;
        unordered_set<int> store(nums.begin(), nums.end());

        for (int num : nums) {
            int streak = 0, curr = num;
            while (store.find(curr) != store.end()) {
                streak++;
                curr++;
            }
            res = max(res, streak);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        let res = 0;
        const store = new Set(nums);

        for (let num of nums) {
            let streak = 0,
                curr = num;
            while (store.has(curr)) {
                streak++;
                curr++;
            }
            res = Math.max(res, streak);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestConsecutive(int[] nums) {
        int res = 0;
        HashSet<int> store = new HashSet<int>(nums);

        foreach (int num in nums) {
            int streak = 0, curr = num;
            while (store.Contains(curr)) {
                streak++;
                curr++;
            }
            res = Math.Max(res, streak);
        }
        return res;
    }
}
```

```go
func longestConsecutive(nums []int) int {
    res := 0
    store := make(map[int]struct{})
    for _, num := range nums {
        store[num] = struct{}{}
    }

    for _, num := range nums {
        streak, curr := 0, num
        for _, ok := store[curr]; ok; _, ok = store[curr] {
            streak++
            curr++
        }
        if streak > res {
            res = streak
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        var res = 0
        val store = nums.toSet()

        for (num in nums) {
            var streak = 0
            var curr = num
            while (curr in store) {
                streak++
                curr++
            }
            res = maxOf(res, streak)
        }
        return res
    }
}
```

```swift
class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        var res = 0
        let store = Set(nums)

        for num in nums {
            var streak = 0
            var curr = num

            while store.contains(curr) {
                streak += 1
                curr += 1
            }

            res = max(res, streak)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sorting

### Intuition

If we sort the numbers first, then all consecutive values will appear next to each other.  
This makes it easy to walk through the sorted list and count how long each consecutive sequence is.  
We simply move forward while the current number matches the expected next value in the sequence.  
Duplicates don’t affect the result—they are just skipped—while gaps reset the streak count.  
This approach is simpler and more organized than the brute force method because sorting places all potential sequences in order.

### Algorithm

1. If the input list is empty, return `0`.
2. Sort the array in non-decreasing order.
3. Initialize:
   - `res` to track the longest streak,
   - `curr` as the first number,
   - `streak` as `0`,
   - index `i = 0`.
4. While `i` is within bounds:
   - If `nums[i]` does not match `curr`, reset:
     - `curr = nums[i]`
     - `streak = 0`
   - Skip over all duplicates of `curr` by advancing `i` while `nums[i] == curr`.
   - Increase `streak` by `1` since we found the expected number.
   - Increase `curr` by `1` to expect the next number in the sequence.
   - Update `res` with the maximum streak found so far.
5. Return `res` after scanning the entire list.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0
        res = 0
        nums.sort()

        curr, streak = nums[0], 0
        i = 0
        while i < len(nums):
            if curr != nums[i]:
                curr = nums[i]
                streak = 0
            while i < len(nums) and nums[i] == curr:
                i += 1
            streak += 1
            curr += 1
            res = max(res, streak)
        return res
```

```java
public class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        Arrays.sort(nums);
        int res = 0, curr = nums[0], streak = 0, i = 0;

        while (i < nums.length) {
            if (curr != nums[i]) {
                curr = nums[i];
                streak = 0;
            }
            while (i < nums.length && nums[i] == curr) {
                i++;
            }
            streak++;
            curr++;
            res = Math.max(res, streak);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        sort(nums.begin(), nums.end());

        int res = 0, curr = nums[0], streak = 0, i = 0;

        while (i < nums.size()) {
            if (curr != nums[i]) {
                curr = nums[i];
                streak = 0;
            }
            while (i < nums.size() && nums[i] == curr) {
                i++;
            }
            streak++;
            curr++;
            res = max(res, streak);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        if (nums.length === 0) {
            return 0;
        }
        nums.sort((a, b) => a - b);

        let res = 0,
            curr = nums[0],
            streak = 0,
            i = 0;

        while (i < nums.length) {
            if (curr !== nums[i]) {
                curr = nums[i];
                streak = 0;
            }
            while (i < nums.length && nums[i] === curr) {
                i++;
            }
            streak++;
            curr++;
            res = Math.max(res, streak);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestConsecutive(int[] nums) {
        if (nums.Length == 0) {
            return 0;
        }
        Array.Sort(nums);

        int res = 0, curr = nums[0], streak = 0, i = 0;

        while (i < nums.Length) {
            if (curr != nums[i]) {
                curr = nums[i];
                streak = 0;
            }
            while (i < nums.Length && nums[i] == curr) {
                i++;
            }
            streak++;
            curr++;
            res = Math.Max(res, streak);
        }
        return res;
    }
}
```

```go
func longestConsecutive(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    sort.Ints(nums)

    res := 0
    curr, streak := nums[0], 0
    i := 0
    for i < len(nums) {
        if curr != nums[i] {
            curr = nums[i]
            streak = 0
        }
        for i < len(nums) && nums[i] == curr {
            i++
        }
        streak++
        curr++
        if streak > res {
            res = streak
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        if (nums.isEmpty()) return 0
        nums.sort()

        var res = 0
        var curr = nums[0]
        var streak = 0
        var i = 0
        while (i < nums.size) {
            if (curr != nums[i]) {
                curr = nums[i]
                streak = 0
            }
            while (i < nums.size && nums[i] == curr) {
                i++
            }
            streak++
            curr++
            res = maxOf(res, streak)
        }
        return res
    }
}
```

```swift
class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        if nums.isEmpty {
            return 0
        }

        var res = 0
        var nums = nums.sorted()

        var curr = nums[0]
        var streak = 0
        var i = 0

        while i < nums.count {
            if curr != nums[i] {
                curr = nums[i]
                streak = 0
            }
            while i < nums.count && nums[i] == curr {
                i += 1
            }
            streak += 1
            curr += 1
            res = max(res, streak)
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

## 3. Hash Set

### Intuition

To avoid repeatedly recounting the same sequences, we only want to start counting when we find the **beginning** of a consecutive sequence.
A number is the start of a sequence if `num - 1` is **not** in the set.
This guarantees that each consecutive sequence is counted exactly once.

Once we identify such a starting number, we simply keep checking if `num + 1`, `num + 2`, … exist in the set and extend the streak as far as possible.
This makes the solution efficient and clean because each number contributes to the sequence only one time.

### Algorithm

1. Convert the list into a set `numSet` for O(1) lookups.
2. Initialize `longest` to track the length of the longest consecutive sequence.
3. For each number `num` in `numSet`:
   - Check if `num - 1` is **not** in the set:
     - If true, `num` is the start of a sequence.
     - Initialize `length = 1`.
     - While `num + length` exists in the set, increase `length`.
   - Update `longest` with the maximum length found.
4. Return `longest` after scanning all numbers.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        numSet = set(nums)
        longest = 0

        for num in numSet:
            if (num - 1) not in numSet:
                length = 1
                while (num + length) in numSet:
                    length += 1
                longest = max(length, longest)
        return longest
```

```java
public class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        int longest = 0;

        for (int num : numSet) {
            if (!numSet.contains(num - 1)) {
                int length = 1;
                while (numSet.contains(num + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;

        for (int num : numSet) {
            if (numSet.find(num - 1) == numSet.end()) {
                int length = 1;
                while (numSet.find(num + length) != numSet.end()) {
                    length++;
                }
                longest = max(longest, length);
            }
        }
        return longest;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const numSet = new Set(nums);
        let longest = 0;

        for (let num of numSet) {
            if (!numSet.has(num - 1)) {
                let length = 1;
                while (numSet.has(num + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}
```

```csharp
public class Solution {
    public int LongestConsecutive(int[] nums) {
        HashSet<int> numSet = new HashSet<int>(nums);
        int longest = 0;

        foreach (int num in numSet) {
            if (!numSet.Contains(num - 1)) {
                int length = 1;
                while (numSet.Contains(num + length)) {
                    length++;
                }
                longest = Math.Max(longest, length);
            }
        }
        return longest;
    }
}
```

```go
func longestConsecutive(nums []int) int {
    numSet := make(map[int]struct{})
    for _, num := range nums {
        numSet[num] = struct{}{}
    }

    longest := 0
    for num := range numSet {
        if _, found := numSet[num-1]; !found {
            length := 1
            for {
                if _, exists := numSet[num+length]; exists {
                    length++
                } else {
                    break
                }
            }
            if length > longest {
                longest = length
            }
        }
    }
    return longest
}
```

```kotlin
class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        val numSet = nums.toSet()
        var longest = 0

        for (num in numSet) {
            if ((num - 1) !in numSet) {
                var length = 1
                while ((num + length) in numSet) {
                    length++
                }
                longest = maxOf(longest, length)
            }
        }
        return longest
    }
}
```

```swift
class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        let numSet = Set(nums)
        var longest = 0

        for num in numSet {
            if !numSet.contains(num - 1) {
                var length = 1
                while numSet.contains(num + length) {
                    length += 1
                }
                longest = max(length, longest)
            }
        }

        return longest
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Hash Map

### Intuition

When we place a new number into the map, it may connect two existing sequences or extend one of them.
Instead of scanning forward or backward, we only look at the lengths stored at the **neighbors**:

- `mp[num - 1]` gives the length of the sequence ending right before `num`
- `mp[num + 1]` gives the length of the sequence starting right after `num`

By adding these together and including the current number, we know the total length of the new merged sequence.
We then update the **left boundary** and **right boundary** of this sequence so the correct length can be retrieved later.
This keeps the whole operation very efficient and avoids repeated work.

### Algorithm

1. Create a hash map `mp` that stores sequence lengths at boundary positions.
2. Initialize `res = 0` to store the longest sequence found.
3. For each number `num` in the input:
   - If `num` is already in `mp`, skip it.
   - Compute the new sequence length:
     - `length = mp[num - 1] + mp[num + 1] + 1`
   - Store this length at `num`.
   - Update the boundaries:
     - Left boundary: `mp[num - mp[num - 1]] = length`
     - Right boundary: `mp[num + mp[num + 1]] = length`
   - Update `res` to keep track of the longest sequence.
4. Return `res` after processing all numbers.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        mp = defaultdict(int)
        res = 0

        for num in nums:
            if not mp[num]:
                mp[num] = mp[num - 1] + mp[num + 1] + 1
                mp[num - mp[num - 1]] = mp[num]
                mp[num + mp[num + 1]] = mp[num]
                res = max(res, mp[num])
        return res
```

```java
public class Solution {
    public int longestConsecutive(int[] nums) {
        Map<Integer, Integer> mp = new HashMap<>();
        int res = 0;

        for (int num : nums) {
            if (!mp.containsKey(num)) {
                mp.put(num, mp.getOrDefault(num - 1, 0) + mp.getOrDefault(num + 1, 0) + 1);
                mp.put(num - mp.getOrDefault(num - 1, 0), mp.get(num));
                mp.put(num + mp.getOrDefault(num + 1, 0), mp.get(num));
                res = Math.max(res, mp.get(num));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, int> mp;
        int res = 0;

        for (int num : nums) {
            if (!mp[num]) {
                mp[num] = mp[num - 1] + mp[num + 1] + 1;
                mp[num - mp[num - 1]] = mp[num];
                mp[num + mp[num + 1]] = mp[num];
                res = max(res, mp[num]);
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
     * @return {number}
     */
    longestConsecutive(nums) {
        const mp = new Map();
        let res = 0;

        for (let num of nums) {
            if (!mp.has(num)) {
                mp.set(
                    num,
                    (mp.get(num - 1) || 0) + (mp.get(num + 1) || 0) + 1,
                );
                mp.set(num - (mp.get(num - 1) || 0), mp.get(num));
                mp.set(num + (mp.get(num + 1) || 0), mp.get(num));
                res = Math.max(res, mp.get(num));
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestConsecutive(int[] nums) {
        Dictionary<int, int> mp = new Dictionary<int, int>();
        int res = 0;

        foreach (int num in nums) {
            if (!mp.ContainsKey(num)) {
                mp[num] = (mp.ContainsKey(num - 1) ? mp[num - 1] : 0) +
                          (mp.ContainsKey(num + 1) ? mp[num + 1] : 0) + 1;

                mp[num - (mp.ContainsKey(num - 1) ? mp[num - 1] : 0)] = mp[num];
                mp[num + (mp.ContainsKey(num + 1) ? mp[num + 1] : 0)] = mp[num];

                res = Math.Max(res, mp[num]);
            }
        }
        return res;
    }
}
```

```go
func longestConsecutive(nums []int) int {
    mp := make(map[int]int)
    res := 0

    for _, num := range nums {
        if mp[num] == 0 {
            left := mp[num - 1]
            right := mp[num + 1]
            sum := left + right + 1
            mp[num] = sum
            mp[num - left] = sum
            mp[num + right] = sum
            if sum > res {
                res = sum
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        val mp = HashMap<Int, Int>()
        var res = 0

        for (num in nums) {
            if (mp[num] == null) {
                val left = mp[num - 1] ?: 0
                val right = mp[num + 1] ?: 0
                val sum = left + right + 1
                mp[num] = sum
                mp[num - left] = sum
                mp[num + right] = sum
                res = maxOf(res, sum)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        var mp = [Int: Int]()
        var res = 0

        for num in nums {
            if mp[num] == nil {
                let left = mp[num - 1] ?? 0
                let right = mp[num + 1] ?? 0
                let length = left + right + 1

                mp[num] = length
                mp[num - left] = length
                mp[num + right] = length

                res = max(res, length)
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
