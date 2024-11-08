## 1. Brute Force

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
            let streak = 0, curr = num;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Sorting

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
        
        let res = 0, curr = nums[0], streak = 0, i = 0;

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$

---

## 3. Hash Set

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Hash Map

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
                mp.set(num, (mp.get(num - 1) || 0) + (mp.get(num + 1) || 0) + 1);
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$