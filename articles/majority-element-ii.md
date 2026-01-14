## 1. Brute Force

### Intuition

Elements appearing more than `n/3` times are rare. There can be at most two such elements. For each unique element, we count its occurrences and check if it exceeds `n/3`. We use a set to avoid adding duplicates to the result.

### Algorithm

1. For each element `num` in the array:
   - Count how many times `num` appears.
   - If the count exceeds `n / 3`, add it to the result set.
2. Convert the set to a list and return.

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        res = set()
        for num in nums:
            count = sum(1 for i in nums if i == num)
            if count > len(nums) // 3:
                res.add(num)
        return list(res)
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Set<Integer> res = new HashSet<>();
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) count++;
            }
            if (count > nums.length / 3) {
                res.add(num);
            }
        }
        return new ArrayList<>(res);
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_set<int> res;
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) count++;
            }
            if (count > nums.size() / 3) {
                res.insert(num);
            }
        }
        return vector<int>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    majorityElement(nums) {
        const res = new Set();
        for (const num of nums) {
            let count = 0;
            for (const i of nums) {
                if (i === num) count++;
            }
            if (count > Math.floor(nums.length / 3)) {
                res.add(num);
            }
        }
        return Array.from(res);
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        HashSet<int> res = new HashSet<int>();
        int n = nums.Length;

        foreach (int num in nums) {
            int count = nums.Count(x => x == num);
            if (count > n / 3) {
                res.Add(num);
            }
        }

        return res.ToList();
    }
}
```

```go
func majorityElement(nums []int) []int {
    res := make(map[int]bool)
    n := len(nums)

    for _, num := range nums {
        count := 0
        for _, i := range nums {
            if i == num {
                count++
            }
        }
        if count > n/3 {
            res[num] = true
        }
    }

    result := []int{}
    for k := range res {
        result = append(result, k)
    }
    return result
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): List<Int> {
        val res = HashSet<Int>()
        val n = nums.size

        for (num in nums) {
            var count = 0
            for (i in nums) {
                if (i == num) count++
            }
            if (count > n / 3) {
                res.add(num)
            }
        }

        return res.toList()
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> [Int] {
        var res = Set<Int>()
        let n = nums.count

        for num in nums {
            var count = 0
            for i in nums {
                if i == num {
                    count += 1
                }
            }
            if count > n / 3 {
                res.insert(num)
            }
        }

        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ since output array size will be at most $2$.

---

## 2. Sorting

### Intuition

After sorting, identical elements are grouped together. We can scan through and count consecutive runs of each element. If a run's length exceeds `n/3`, we add that element to our result. This approach avoids the nested loops of brute force.

### Algorithm

1. Sort the array.
2. Use two pointers `i` and `j` to identify consecutive groups of equal elements.
3. For each group, if `j - i > n / 3`, add the element to the result.
4. Move `i` to `j` and repeat until the array is exhausted.
5. Return the result list.

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        nums.sort()
        res, n = [], len(nums)

        i = 0
        while i < n:
            j = i + 1
            while j < n and nums[i] == nums[j]:
                j += 1
            if (j - i) > n // 3:
                res.append(nums[i])
            i = j

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();
        int n = nums.length;

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[i] == nums[j]) {
                j++;
            }
            if (j - i > n / 3) {
                res.add(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int n = nums.size();

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[i] == nums[j]) {
                j++;
            }
            if (j - i > n / 3) {
                res.push_back(nums[i]);
            }
            i = j;
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
    majorityElement(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        let i = 0;
        while (i < n) {
            let j = i + 1;
            while (j < n && nums[i] === nums[j]) {
                j++;
            }
            if (j - i > Math.floor(n / 3)) {
                res.push(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Array.Sort(nums);
        List<int> res = new List<int>();
        int n = nums.Length;

        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[j] == nums[i]) {
                j++;
            }
            if (j - i > n / 3) {
                res.Add(nums[i]);
            }
            i = j;
        }

        return res;
    }
}
```

```go
func majorityElement(nums []int) []int {
    sort.Ints(nums)
    res := []int{}
    n := len(nums)

    i := 0
    for i < n {
        j := i + 1
        for j < n && nums[i] == nums[j] {
            j++
        }
        if j-i > n/3 {
            res = append(res, nums[i])
        }
        i = j
    }

    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): List<Int> {
        nums.sort()
        val res = mutableListOf<Int>()
        val n = nums.size

        var i = 0
        while (i < n) {
            var j = i + 1
            while (j < n && nums[i] == nums[j]) {
                j++
            }
            if (j - i > n / 3) {
                res.add(nums[i])
            }
            i = j
        }

        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        var res = [Int]()
        let n = nums.count

        var i = 0
        while i < n {
            var j = i + 1
            while j < n && nums[i] == nums[j] {
                j += 1
            }
            if j - i > n / 3 {
                res.append(nums[i])
            }
            i = j
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

## 3. Frequency Count

### Intuition

We can count each element's frequency in a single pass using a hash map. Then we iterate through the map and collect all elements whose count exceeds `n/3`. This trades space for time compared to the brute force approach.

### Algorithm

1. Build a frequency map by counting occurrences of each element.
2. Iterate through the map entries.
3. For each entry with count greater than `n / 3`, add the element to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        count = Counter(nums)
        res = []

        for key in count:
            if count[key] > len(nums) // 3:
                res.append(key)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            if (count.get(key) > nums.length / 3) {
                res.add(key);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        vector<int> res;
        for (auto& pair : count) {
            if (pair.second > nums.size() / 3) {
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
    majorityElement(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (const [key, value] of count.entries()) {
            if (value > Math.floor(nums.length / 3)) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        List<int> res = new List<int>();
        int n = nums.Length;

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        foreach (var kvp in count) {
            if (kvp.Value > n / 3) {
                res.Add(kvp.Key);
            }
        }

        return res;
    }
}
```

```go
func majorityElement(nums []int) []int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    res := []int{}
    for key, val := range count {
        if val > len(nums)/3 {
            res = append(res, key)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): List<Int> {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val res = mutableListOf<Int>()
        for ((key, value) in count) {
            if (value > nums.size / 3) {
                res.add(key)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> [Int] {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var res = [Int]()
        for (key, value) in count {
            if value > nums.count / 3 {
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

## 4. Boyer-Moore Voting Algorithm

### Intuition

The Boyer-Moore algorithm extends to finding up to two majority elements. We maintain two candidates with their counts. When we see a candidate, we increment its count. When we see a different element and both counts are positive, we decrement both. When a count is `0`, we replace that candidate. After one pass, we verify the candidates by counting their actual occurrences.

### Algorithm

1. Initialize two candidates `num1`, `num2` and their counts `cnt1`, `cnt2` to `0`.
2. For each element:
   - If it matches `num1`, increment `cnt1`.
   - Else if it matches `num2`, increment `cnt2`.
   - Else if `cnt1 == 0`, set `num1 = num` and `cnt1 = 1`.
   - Else if `cnt2 == 0`, set `num2 = num` and `cnt2 = 1`.
   - Else decrement both counts.
3. Count actual occurrences of both candidates.
4. Add candidates with count greater than `n / 3` to the result.
5. Return the result.

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        n = len(nums)
        num1 = num2 = -1
        cnt1 = cnt2 = 0

        for num in nums:
            if num == num1:
                cnt1 += 1
            elif num == num2:
                cnt2 += 1
            elif cnt1 == 0:
                cnt1 = 1
                num1 = num
            elif cnt2 == 0:
                cnt2 = 1
                num2 = num
            else:
                cnt1 -= 1
                cnt2 -= 1

        cnt1 = cnt2 = 0
        for num in nums:
            if num == num1:
                cnt1 += 1
            elif num == num2:
                cnt2 += 1

        res = []
        if cnt1 > n // 3:
            res.append(num1)
        if cnt2 > n // 3:
            res.append(num2)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        int num1 = -1, num2 = -1, cnt1 = 0, cnt2 = 0;

        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                cnt1 = 1;
                num1 = num;
            } else if (cnt2 == 0) {
                cnt2 = 1;
                num2 = num;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            }
        }

        List<Integer> res = new ArrayList<>();
        if (cnt1 > n / 3) res.add(num1);
        if (cnt2 > n / 3) res.add(num2);

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int n = nums.size();
        int num1 = -1, num2 = -1, cnt1 = 0, cnt2 = 0;

        for (int num : nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                num1 = num;
                cnt1 = 1;
            } else if (cnt2 == 0) {
                num2 = num;
                cnt2 = 1;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (int num : nums) {
            if (num == num1) cnt1++;
            else if (num == num2) cnt2++;
        }

        vector<int> res;
        if (cnt1 > n / 3) res.push_back(num1);
        if (cnt2 > n / 3) res.push_back(num2);

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
    majorityElement(nums) {
        const n = nums.length;
        let num1 = -1,
            num2 = -1,
            cnt1 = 0,
            cnt2 = 0;

        for (const num of nums) {
            if (num === num1) {
                cnt1++;
            } else if (num === num2) {
                cnt2++;
            } else if (cnt1 === 0) {
                cnt1 = 1;
                num1 = num;
            } else if (cnt2 === 0) {
                cnt2 = 1;
                num2 = num;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        for (const num of nums) {
            if (num === num1) cnt1++;
            else if (num === num2) cnt2++;
        }

        const res = [];
        if (cnt1 > Math.floor(n / 3)) res.push(num1);
        if (cnt2 > Math.floor(n / 3)) res.push(num2);

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        int n = nums.Length;
        int num1 = -1, num2 = -1;
        int cnt1 = 0, cnt2 = 0;

        foreach (int num in nums) {
            if (num == num1) {
                cnt1++;
            } else if (num == num2) {
                cnt2++;
            } else if (cnt1 == 0) {
                num1 = num;
                cnt1 = 1;
            } else if (cnt2 == 0) {
                num2 = num;
                cnt2 = 1;
            } else {
                cnt1--;
                cnt2--;
            }
        }

        cnt1 = cnt2 = 0;
        foreach (int num in nums) {
            if (num == num1) cnt1++;
            else if (num == num2) cnt2++;
        }

        List<int> res = new List<int>();
        if (cnt1 > n / 3) res.Add(num1);
        if (cnt2 > n / 3) res.Add(num2);

        return res;
    }
}
```

```go
func majorityElement(nums []int) []int {
    n := len(nums)
    num1, num2 := -1, -1
    cnt1, cnt2 := 0, 0

    for _, num := range nums {
        if num == num1 {
            cnt1++
        } else if num == num2 {
            cnt2++
        } else if cnt1 == 0 {
            cnt1 = 1
            num1 = num
        } else if cnt2 == 0 {
            cnt2 = 1
            num2 = num
        } else {
            cnt1--
            cnt2--
        }
    }

    cnt1, cnt2 = 0, 0
    for _, num := range nums {
        if num == num1 {
            cnt1++
        } else if num == num2 {
            cnt2++
        }
    }

    res := []int{}
    if cnt1 > n/3 {
        res = append(res, num1)
    }
    if cnt2 > n/3 {
        res = append(res, num2)
    }

    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): List<Int> {
        val n = nums.size
        var num1 = -1
        var num2 = -1
        var cnt1 = 0
        var cnt2 = 0

        for (num in nums) {
            when {
                num == num1 -> cnt1++
                num == num2 -> cnt2++
                cnt1 == 0 -> { cnt1 = 1; num1 = num }
                cnt2 == 0 -> { cnt2 = 1; num2 = num }
                else -> { cnt1--; cnt2-- }
            }
        }

        cnt1 = 0
        cnt2 = 0
        for (num in nums) {
            if (num == num1) cnt1++
            else if (num == num2) cnt2++
        }

        val res = mutableListOf<Int>()
        if (cnt1 > n / 3) res.add(num1)
        if (cnt2 > n / 3) res.add(num2)

        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var num1 = -1, num2 = -1
        var cnt1 = 0, cnt2 = 0

        for num in nums {
            if num == num1 {
                cnt1 += 1
            } else if num == num2 {
                cnt2 += 1
            } else if cnt1 == 0 {
                cnt1 = 1
                num1 = num
            } else if cnt2 == 0 {
                cnt2 = 1
                num2 = num
            } else {
                cnt1 -= 1
                cnt2 -= 1
            }
        }

        cnt1 = 0
        cnt2 = 0
        for num in nums {
            if num == num1 { cnt1 += 1 }
            else if num == num2 { cnt2 += 1 }
        }

        var res = [Int]()
        if cnt1 > n / 3 { res.append(num1) }
        if cnt2 > n / 3 { res.append(num2) }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since output array size will be at most $2$.

---

## 5. Boyer-Moore Voting Algorithm (Hash Map)

### Intuition

This variation uses a hash map to track candidates instead of fixed variables. We allow at most 2 elements in the map. When a third element tries to enter, we decrement all counts and remove elements with count `0`. This generalizes the Boyer-Moore approach and can be extended to find elements appearing more than `n/k` times.

### Algorithm

1. Create a hash map to store candidate counts.
2. For each element, increment its count in the map.
3. If the map has more than 2 entries:
   - Decrement all counts by 1.
   - Remove entries with count `0`.
4. After processing, verify each remaining candidate by counting its actual occurrences.
5. Return candidates with count greater than `n / 3`.

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        count = defaultdict(int)

        for num in nums:
            count[num] += 1

            if len(count) <= 2:
                continue

            new_count = defaultdict(int)
            for num, c in count.items():
                if c > 1:
                    new_count[num] = c - 1
            count = new_count

        res = []
        for num in count:
            if nums.count(num) > len(nums) // 3:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);

            if (count.size() > 2) {
                Map<Integer, Integer> newCount = new HashMap<>();
                for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
                    if (entry.getValue() > 1) {
                        newCount.put(entry.getKey(), entry.getValue() - 1);
                    }
                }
                count = newCount;
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int key : count.keySet()) {
            int frequency = 0;
            for (int num : nums) {
                if (num == key) frequency++;
            }
            if (frequency > nums.length / 3) {
                res.add(key);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> count;

        for (int num : nums) {
            count[num]++;

            if (count.size() > 2) {
                unordered_map<int, int> newCount;
                for (auto& entry : count) {
                    if (entry.second > 1) {
                        newCount[entry.first] = entry.second - 1;
                    }
                }
                count = newCount;
            }
        }

        vector<int> res;
        for (auto& entry : count) {
            int frequency = 0;
            for (int num : nums) {
                if (num == entry.first) frequency++;
            }
            if (frequency > nums.size() / 3) {
                res.push_back(entry.first);
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
    majorityElement(nums) {
        let count = new Map();

        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);

            if (count.size > 2) {
                const newCount = new Map();
                for (const [key, value] of count.entries()) {
                    if (value > 1) {
                        newCount.set(key, value - 1);
                    }
                }
                count = newCount;
            }
        }

        const res = [];
        for (const [key] of count.entries()) {
            const frequency = nums.filter((num) => num === key).length;
            if (frequency > Math.floor(nums.length / 3)) {
                res.push(key);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> MajorityElement(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }

            if (count.Count <= 2) {
                continue;
            }

            Dictionary<int, int> newCount = new Dictionary<int, int>();
            foreach (var kvp in count) {
                if (kvp.Value > 1) {
                    newCount[kvp.Key] = kvp.Value - 1;
                }
            }
            count = newCount;
        }

        List<int> res = new List<int>();
        foreach (int candidate in count.Keys) {
            int freq = 0;
            foreach (int num in nums) {
                if (num == candidate) {
                    freq++;
                }
            }
            if (freq > nums.Length / 3) {
                res.Add(candidate);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since output array size will be at most $2$.

---

## Common Pitfalls

### Skipping the Verification Pass

The Boyer-Moore voting algorithm only identifies candidates that might appear more than `n/3` times. After the first pass, you must verify each candidate by counting its actual occurrences. Skipping this step returns incorrect results when candidates do not actually exceed the threshold. This verification pass is essential, not optional.

### Using Wrong Threshold Comparison

The problem asks for elements appearing more than `n/3` times, meaning strictly greater than (>), not greater than or equal to (>=). Using `count >= n/3` includes elements that appear exactly `n/3` times, which is incorrect. Be precise with the comparison operator.

### Incorrect Candidate Selection Order

When implementing Boyer-Moore with two candidates, the order of conditions matters. You must first check if the current element matches an existing candidate before checking if a slot is empty. If you check for empty slots first, you might assign the same element to both candidate slots, wasting one slot and missing potential majority elements.
