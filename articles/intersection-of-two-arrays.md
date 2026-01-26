## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Set** - Using sets for O(1) lookups and storing unique elements
- **Hash Map** - Tracking element presence or counts with key-value pairs
- **Two Pointers** - Using two indices to traverse sorted arrays efficiently
- **Sorting** - Understanding how sorted order enables efficient comparison algorithms

---

## 1. Brute Force

### Intuition

The simplest approach is to check every element in the first array against every element in the second array. When we find a match, we add it to our result set. Using a set ensures we only include each common element once, even if it appears multiple times in both arrays.

### Algorithm

1. Initialize an empty set `res` to store unique intersection elements.
2. For each element `i` in `nums1`:
   - For each element `j` in `nums2`:
     - If `i == j`, add `i` to `res` and break the inner loop.
3. Convert `res` to a list and return it.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        res = set()
        for i in nums1:
            for j in nums2:
                if i == j:
                    res.add(i)
                    break
        return list(res)
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> res = new HashSet<>();
        for (int i : nums1) {
            for (int j : nums2) {
                if (i == j) {
                    res.add(i);
                    break;
                }
            }
        }
        int[] result = new int[res.size()];
        int idx = 0;
        for (int num : res) {
            result[idx++] = num;
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> res;
        for (int i : nums1) {
            for (int j : nums2) {
                if (i == j) {
                    res.insert(i);
                    break;
                }
            }
        }
        return vector<int>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const res = new Set();
        for (const i of nums1) {
            for (const j of nums2) {
                if (i === j) {
                    res.add(i);
                    break;
                }
            }
        }
        return Array.from(res);
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> res = new HashSet<int>();
        foreach (int i in nums1) {
            foreach (int j in nums2) {
                if (i == j) {
                    res.Add(i);
                    break;
                }
            }
        }
        return res.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    res := make(map[int]bool)
    for _, i := range nums1 {
        for _, j := range nums2 {
            if i == j {
                res[i] = true
                break
            }
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
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val res = mutableSetOf<Int>()
        for (i in nums1) {
            for (j in nums2) {
                if (i == j) {
                    res.add(i)
                    break
                }
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var res = Set<Int>()
        for i in nums1 {
            for j in nums2 {
                if i == j {
                    res.insert(i)
                    break
                }
            }
        }
        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 2. Sorting + Two Pointers

### Intuition

By sorting both arrays, we can use two pointers to efficiently find common elements. We advance the pointer pointing to the smaller element. When both pointers point to equal elements, we found an intersection. We skip duplicates to ensure each element appears only once in the result.

### Algorithm

1. Sort both `nums1` and `nums2`.
2. Initialize two pointers `i` and `j` at the start of each array.
3. While both pointers are in bounds:
   - Advance `j` while `nums2[j] < nums1[i]`.
   - If `nums1[i] == nums2[j]`, add to result.
   - Advance `i`, skipping any duplicates.
4. Return the result list.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        nums2.sort()

        n, m = len(nums1), len(nums2)
        res, i, j = [], 0, 0

        while i < n and j < m:
            while j < m and nums2[j] < nums1[i]:
                j += 1
            if j < m:
                if nums1[i] == nums2[j]:
                    res.append(nums1[i])
                i += 1
                while i < n and nums1[i] == nums1[i - 1]:
                    i += 1

        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);

        List<Integer> res = new ArrayList<>();
        int i = 0, j = 0;

        while (i < nums1.length && j < nums2.length) {
            while (j < nums2.length && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < nums2.length) {
                if (nums1[i] == nums2[j]) {
                    res.add(nums1[i]);
                }
                i++;
                while (i < nums1.length && nums1[i] == nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());

        int n = nums1.size(), m = nums2.size();
        vector<int> res;
        int i = 0, j = 0;

        while (i < n && j < m) {
            while (j < m && nums2[j] < nums1[i]) {
                ++j;
            }
            if (j < m) {
                if (nums1[i] == nums2[j]) {
                    res.push_back(nums1[i]);
                }
                ++i;
                while (i < n && nums1[i] == nums1[i - 1]) {
                    ++i;
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
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        const res = [];
        let i = 0,
            j = 0;

        while (i < nums1.length && j < nums2.length) {
            while (j < nums2.length && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < nums2.length) {
                if (nums1[i] === nums2[j]) {
                    res.push(nums1[i]);
                }
                i++;
                while (i < nums1.length && nums1[i] === nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        Array.Sort(nums1);
        Array.Sort(nums2);

        int n = nums1.Length, m = nums2.Length;
        List<int> res = new List<int>();
        int i = 0, j = 0;

        while (i < n && j < m) {
            while (j < m && nums2[j] < nums1[i]) {
                j++;
            }
            if (j < m) {
                if (nums1[i] == nums2[j]) {
                    res.Add(nums1[i]);
                }
                i++;
                while (i < n && nums1[i] == nums1[i - 1]) {
                    i++;
                }
            }
        }

        return res.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    sort.Ints(nums1)
    sort.Ints(nums2)

    n, m := len(nums1), len(nums2)
    res := []int{}
    i, j := 0, 0

    for i < n && j < m {
        for j < m && nums2[j] < nums1[i] {
            j++
        }
        if j < m {
            if nums1[i] == nums2[j] {
                res = append(res, nums1[i])
            }
            i++
            for i < n && nums1[i] == nums1[i-1] {
                i++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        nums1.sort()
        nums2.sort()

        val n = nums1.size
        val m = nums2.size
        val res = mutableListOf<Int>()
        var i = 0
        var j = 0

        while (i < n && j < m) {
            while (j < m && nums2[j] < nums1[i]) {
                j++
            }
            if (j < m) {
                if (nums1[i] == nums2[j]) {
                    res.add(nums1[i])
                }
                i++
                while (i < n && nums1[i] == nums1[i - 1]) {
                    i++
                }
            }
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var nums1 = nums1.sorted()
        var nums2 = nums2.sorted()

        let n = nums1.count, m = nums2.count
        var res = [Int]()
        var i = 0, j = 0

        while i < n && j < m {
            while j < m && nums2[j] < nums1[i] {
                j += 1
            }
            if j < m {
                if nums1[i] == nums2[j] {
                    res.append(nums1[i])
                }
                i += 1
                while i < n && nums1[i] == nums1[i - 1] {
                    i += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 3. Hash Set

### Intuition

Converting both arrays to sets removes duplicates and enables O(1) lookup. We then iterate through one set and check membership in the other. Any element present in both sets belongs to the intersection.

### Algorithm

1. Convert `nums1` to a set `set1`.
2. Convert `nums2` to a set `set2`.
3. Iterate through `set1`:
   - If the element exists in `set2`, add it to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        set2 = set(nums2)

        res = []
        for num in set1:
            if num in set2:
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int num : nums1) {
            set1.add(num);
        }

        Set<Integer> set2 = new HashSet<>();
        for (int num : nums2) {
            set2.add(num);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : set1) {
            if (set2.contains(num)) {
                res.add(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1(nums1.begin(), nums1.end());
        unordered_set<int> set2(nums2.begin(), nums2.end());

        vector<int> res;
        for (int num : set1) {
            if (set2.find(num) != set2.end()) {
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const set1 = new Set(nums1);
        const set2 = new Set(nums2);

        const res = [];
        for (const num of set1) {
            if (set2.has(num)) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);
        List<int> res = new List<int>();

        foreach (int num in set1) {
            if (set2.Contains(num)) {
                res.Add(num);
            }
        }

        return res.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    set1 := make(map[int]bool)
    for _, num := range nums1 {
        set1[num] = true
    }

    set2 := make(map[int]bool)
    for _, num := range nums2 {
        set2[num] = true
    }

    res := []int{}
    for num := range set1 {
        if set2[num] {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val set1 = nums1.toSet()
        val set2 = nums2.toSet()

        val res = mutableListOf<Int>()
        for (num in set1) {
            if (num in set2) {
                res.add(num)
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        let set1 = Set(nums1)
        let set2 = Set(nums2)

        var res = [Int]()
        for num in set1 {
            if set2.contains(num) {
                res.append(num)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 4. Hash Map

### Intuition

We use a hash map to track which elements from `nums1` we have seen. We mark each element with value `1`. When iterating through `nums2`, if we find a marked element, we add it to the result and set its value to `0` to prevent duplicates.

### Algorithm

1. Create a hash map `seen` and mark all elements in `nums1` with value `1`.
2. Initialize an empty result list.
3. For each element in `nums2`:
   - If `seen[num] == 1`, add `num` to result and set `seen[num] = 0`.
4. Return the result list.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen = defaultdict(int)
        for num in nums1:
            seen[num] = 1

        res = []
        for num in nums2:
            if seen[num] == 1:
                seen[num] = 0
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int num : nums1) {
            seen.put(num, 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : nums2) {
            if (seen.getOrDefault(num, 0) == 1) {
                seen.put(num, 0);
                res.add(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> seen;
        for (int num : nums1) {
            seen[num] = 1;
        }

        vector<int> res;
        for (int num : nums2) {
            if (seen[num] == 1) {
                seen[num] = 0;
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const seen = {};
        for (const num of nums1) {
            seen[num] = 1;
        }

        const res = [];
        for (const num of nums2) {
            if (seen[num] === 1) {
                seen[num] = 0;
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        Dictionary<int, int> seen = new Dictionary<int, int>();
        foreach (int num in nums1) {
            seen[num] = 1;
        }

        List<int> res = new List<int>();
        foreach (int num in nums2) {
            if (seen.ContainsKey(num) && seen[num] == 1) {
                seen[num] = 0;
                res.Add(num);
            }
        }

        return res.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    seen := make(map[int]int)
    for _, num := range nums1 {
        seen[num] = 1
    }

    res := []int{}
    for _, num := range nums2 {
        if seen[num] == 1 {
            seen[num] = 0
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val seen = mutableMapOf<Int, Int>()
        for (num in nums1) {
            seen[num] = 1
        }

        val res = mutableListOf<Int>()
        for (num in nums2) {
            if (seen[num] == 1) {
                seen[num] = 0
                res.add(num)
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var seen = [Int: Int]()
        for num in nums1 {
            seen[num] = 1
        }

        var res = [Int]()
        for num in nums2 {
            if seen[num] == 1 {
                seen[num] = 0
                res.append(num)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 5. Hash Set (Optimal)

### Intuition

We can improve on the two-set approach by using only one set. Store all elements from `nums1` in a set, then iterate through `nums2`. When we find a match, add it to the result and remove it from the set to avoid duplicates.

### Algorithm

1. Create a set `seen` from all elements in `nums1`.
2. Initialize an empty result list.
3. For each element in `nums2`:
   - If the element is in `seen`, add it to the result and remove it from `seen`.
4. Return the result list.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen = set(nums1)

        res = []
        for num in nums2:
            if num in seen:
                res.append(num)
                seen.remove(num)
        return res
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums1) {
            seen.add(num);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : nums2) {
            if (seen.contains(num)) {
                res.add(num);
                seen.remove(num);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> seen(nums1.begin(), nums1.end());
        vector<int> res;

        for (int num : nums2) {
            if (seen.count(num)) {
                res.push_back(num);
                seen.erase(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const seen = new Set(nums1);
        const res = [];

        for (const num of nums2) {
            if (seen.has(num)) {
                res.push(num);
                seen.delete(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> seen = new HashSet<int>(nums1);
        List<int> res = new List<int>();

        foreach (int num in nums2) {
            if (seen.Contains(num)) {
                res.Add(num);
                seen.Remove(num);
            }
        }

        return res.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    seen := make(map[int]bool)
    for _, num := range nums1 {
        seen[num] = true
    }

    res := []int{}
    for _, num := range nums2 {
        if seen[num] {
            res = append(res, num)
            delete(seen, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val seen = nums1.toMutableSet()
        val res = mutableListOf<Int>()

        for (num in nums2) {
            if (num in seen) {
                res.add(num)
                seen.remove(num)
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var seen = Set(nums1)
        var res = [Int]()

        for num in nums2 {
            if seen.contains(num) {
                res.append(num)
                seen.remove(num)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 6. Built-In Functions

### Intuition

Most programming languages provide built-in set intersection operations. By converting both arrays to sets and using the intersection function, we get a clean one-liner solution. The implementation details are handled by the language's standard library.

### Algorithm

1. Convert `nums1` to a set.
2. Convert `nums2` to a set.
3. Compute the intersection of the two sets using the built-in function.
4. Convert the result to an array and return it.

::tabs-start

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
            return list(set(nums1) & set(nums2))
```

```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (Integer n : nums1) {
            set1.add(n);
        }

        Set<Integer> set2 = new HashSet<>();
        for (Integer n : nums2) {
            set2.add(n);
        }

        set1.retainAll(set2);
        int[] res= new int[set1.size()];
        int idx = 0;
        for (int s : set1) {
            res[idx++] = s;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        set<int> set1(nums1.begin(), nums1.end()), set2(nums2.begin(), nums2.end());
        vector<int> res;
        set_intersection(set1.begin(), set1.end(), set2.begin(), set2.end(), back_inserter(res));
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    intersection(nums1, nums2) {
        const set2 = new Set(nums2);
        return [...new Set(nums1)].filter((num) => set2.has(num));
    }
}
```

```csharp
public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);
        set1.IntersectWith(set2);
        return set1.ToArray();
    }
}
```

```go
func intersection(nums1 []int, nums2 []int) []int {
    set1 := make(map[int]bool)
    for _, num := range nums1 {
        set1[num] = true
    }

    set2 := make(map[int]bool)
    for _, num := range nums2 {
        set2[num] = true
    }

    res := []int{}
    for num := range set1 {
        if set2[num] {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val set1 = nums1.toSet()
        val set2 = nums2.toSet()
        return set1.intersect(set2).toIntArray()
    }
}
```

```swift
class Solution {
    func intersection(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        let set1 = Set(nums1)
        let set2 = Set(nums2)
        return Array(set1.intersection(set2))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$ in average case, $O(n * m)$ in worst case.
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## Common Pitfalls

### Including Duplicates in the Result

The intersection should contain each common element only once, even if it appears multiple times in both arrays. For example, if `nums1 = [1, 1, 2]` and `nums2 = [1, 1]`, the result should be `[1]`, not `[1, 1]`. Using a set for the result or marking elements as "already added" prevents this issue.

### Comparing Values Instead of Using Efficient Lookups

A brute force approach comparing every pair of elements is O(n * m), which is inefficient for large arrays. The optimal approach uses a hash set for O(1) lookups, reducing time complexity to O(n + m). Always consider converting one array to a set before checking membership.
