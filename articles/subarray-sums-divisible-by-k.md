## 1. Brute Force

::tabs-start

```python
class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            curSum = 0
            for j in range(i, n):
                curSum += nums[j]
                if curSum % k == 0:
                    res += 1

        return res
```

```java
public class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum % k == 0) {
                    res++;
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
    int subarraysDivByK(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum % k == 0) {
                    res++;
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
     * @param {number} k
     * @return {number}
     */
    subarraysDivByK(nums, k) {
        const n = nums.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum % k === 0) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysDivByK(int[] nums, int k) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum % k == 0) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func subarraysDivByK(nums []int, k int) int {
    n, res := len(nums), 0

    for i := 0; i < n; i++ {
        curSum := 0
        for j := i; j < n; j++ {
            curSum += nums[j]
            if curSum%k == 0 {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysDivByK(nums: IntArray, k: Int): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            var curSum = 0
            for (j in i until n) {
                curSum += nums[j]
                if (curSum % k == 0) {
                    res++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysDivByK(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var curSum = 0
            for j in i..<n {
                curSum += nums[j]
                if curSum % k == 0 {
                    res += 1
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
- Space complexity: $O(1)$

---

## 2. Prefix Sum + Hash Map

::tabs-start

```python
class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        prefix_sum = 0
        res = 0
        prefix_cnt = defaultdict(int)
        prefix_cnt[0] = 1

        for n in nums:
            prefix_sum += n
            remain = prefix_sum % k

            res += prefix_cnt[remain]
            prefix_cnt[remain] += 1

        return res
```

```java
public class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int prefixSum = 0, res = 0;
        Map<Integer, Integer> prefixCnt = new HashMap<>();
        prefixCnt.put(0, 1);

        for (int n : nums) {
            prefixSum += n;
            int remain = prefixSum % k;
            if (remain < 0) remain += k;

            res += prefixCnt.getOrDefault(remain, 0);
            prefixCnt.put(remain, prefixCnt.getOrDefault(remain, 0) + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        int prefixSum = 0, res = 0;
        unordered_map<int, int> prefixCnt;
        prefixCnt[0] = 1;

        for (int n : nums) {
            prefixSum += n;
            int remain = prefixSum % k;
            if (remain < 0) remain += k;

            res += prefixCnt[remain];
            prefixCnt[remain]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysDivByK(nums, k) {
        let prefixSum = 0,
            res = 0;
        const prefixCnt = new Map();
        prefixCnt.set(0, 1);

        for (let n of nums) {
            prefixSum += n;
            let remain = prefixSum % k;
            if (remain < 0) remain += k;

            res += prefixCnt.get(remain) || 0;
            prefixCnt.set(remain, (prefixCnt.get(remain) || 0) + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysDivByK(int[] nums, int k) {
        int prefixSum = 0, res = 0;
        Dictionary<int, int> prefixCnt = new Dictionary<int, int>();
        prefixCnt[0] = 1;

        foreach (int n in nums) {
            prefixSum += n;
            int remain = prefixSum % k;
            if (remain < 0) remain += k;

            if (prefixCnt.ContainsKey(remain)) {
                res += prefixCnt[remain];
                prefixCnt[remain]++;
            } else {
                prefixCnt[remain] = 1;
            }
        }

        return res;
    }
}
```

```go
func subarraysDivByK(nums []int, k int) int {
    prefixSum, res := 0, 0
    prefixCnt := make(map[int]int)
    prefixCnt[0] = 1

    for _, n := range nums {
        prefixSum += n
        remain := prefixSum % k
        if remain < 0 {
            remain += k
        }

        res += prefixCnt[remain]
        prefixCnt[remain]++
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysDivByK(nums: IntArray, k: Int): Int {
        var prefixSum = 0
        var res = 0
        val prefixCnt = HashMap<Int, Int>()
        prefixCnt[0] = 1

        for (n in nums) {
            prefixSum += n
            var remain = prefixSum % k
            if (remain < 0) remain += k

            res += prefixCnt.getOrDefault(remain, 0)
            prefixCnt[remain] = prefixCnt.getOrDefault(remain, 0) + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysDivByK(_ nums: [Int], _ k: Int) -> Int {
        var prefixSum = 0
        var res = 0
        var prefixCnt: [Int: Int] = [0: 1]

        for n in nums {
            prefixSum += n
            var remain = prefixSum % k
            if remain < 0 { remain += k }

            res += prefixCnt[remain, default: 0]
            prefixCnt[remain, default: 0] += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

---

## 3. Prefix Sum + Array

::tabs-start

```python
class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        count = [0] * k
        count[0] = 1
        prefix = res = 0

        for num in nums:
            prefix = (prefix + num + k) % k
            res += count[prefix]
            count[prefix] += 1

        return res
```

```java
public class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int[] count = new int[k];
        count[0] = 1;
        int prefix = 0, res = 0;

        for (int num : nums) {
            prefix = (prefix + num % k + k) % k;
            res += count[prefix];
            count[prefix]++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        vector<int> count(k, 0);
        count[0] = 1;
        int prefix = 0, res = 0;

        for (int num : nums) {
            prefix = (prefix + num % k + k) % k;
            res += count[prefix];
            count[prefix]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraysDivByK(nums, k) {
        const count = Array(k).fill(0);
        count[0] = 1;
        let prefix = 0,
            res = 0;

        for (let num of nums) {
            prefix = (prefix + (num % k) + k) % k;
            res += count[prefix];
            count[prefix]++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysDivByK(int[] nums, int k) {
        int[] count = new int[k];
        count[0] = 1;
        int prefix = 0, res = 0;

        foreach (int num in nums) {
            prefix = (prefix + num % k + k) % k;
            res += count[prefix];
            count[prefix]++;
        }

        return res;
    }
}
```

```go
func subarraysDivByK(nums []int, k int) int {
    count := make([]int, k)
    count[0] = 1
    prefix, res := 0, 0

    for _, num := range nums {
        prefix = (prefix + num%k + k) % k
        res += count[prefix]
        count[prefix]++
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysDivByK(nums: IntArray, k: Int): Int {
        val count = IntArray(k)
        count[0] = 1
        var prefix = 0
        var res = 0

        for (num in nums) {
            prefix = (prefix + num % k + k) % k
            res += count[prefix]
            count[prefix]++
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysDivByK(_ nums: [Int], _ k: Int) -> Int {
        var count = [Int](repeating: 0, count: k)
        count[0] = 1
        var prefix = 0
        var res = 0

        for num in nums {
            prefix = (prefix + num % k + k) % k
            res += count[prefix]
            count[prefix] += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k)$
- Space complexity: $O(k)$
