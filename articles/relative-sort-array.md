## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Counting element frequencies and mapping values to their ordering priorities
- **Sorting** - Understanding built-in sort functions and custom comparators
- **Counting Sort** - Linear time sorting when the value range is bounded

---

## 1. Brute Force

### Intuition

The straightforward approach is to process each element in `arr2` in order and find all matching elements in `arr1`. For each value in `arr2`, we scan through `arr1`, collect all occurrences, and mark them as used. After processing all elements from `arr2`, any remaining elements in `arr1` are sorted and appended to the result.

This approach directly mimics the problem requirements: first place elements in the order specified by `arr2`, then append the rest in sorted order.

### Algorithm

1. Create an empty result list.
2. For each number in `arr2`:
   - Scan through `arr1` and find all occurrences of this number.
   - Add each occurrence to the result and mark the position in `arr1` as used (e.g., set to `-1`).
3. Sort the modified `arr1` (marked positions will sort to the beginning).
4. Append all unmarked elements (those not equal to `-1`) from `arr1` to the result.
5. Return the result.

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        res = []

        for num2 in arr2:
            for i, num1 in enumerate(arr1):
                if num1 == num2:
                    res.append(num1)
                    arr1[i] = -1

        arr1.sort()
        for i in range(len(res), len(arr1)):
            res.append(arr1[i])

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        List<Integer> res = new ArrayList<>();

        for (int num2 : arr2) {
            for (int i = 0; i < arr1.length; i++) {
                if (arr1[i] == num2) {
                    res.add(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        Arrays.sort(arr1);
        for (int i = res.size(); i < arr1.length; i++) {
            res.add(arr1[i]);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        vector<int> res;

        for (int num2 : arr2) {
            for (int i = 0; i < arr1.size(); i++) {
                if (arr1[i] == num2) {
                    res.push_back(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        sort(arr1.begin(), arr1.end());
        for (int i = res.size(); i < arr1.size(); i++) {
            res.push_back(arr1[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const res = [];

        for (let num2 of arr2) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] === num2) {
                    res.push(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        arr1.sort((a, b) => a - b);
        for (let i = res.length; i < arr1.length; i++) {
            res.push(arr1[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] RelativeSortArray(int[] arr1, int[] arr2) {
        var res = new List<int>();

        foreach (int num2 in arr2) {
            for (int i = 0; i < arr1.Length; i++) {
                if (arr1[i] == num2) {
                    res.Add(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        Array.Sort(arr1);
        for (int i = res.Count; i < arr1.Length; i++) {
            res.Add(arr1[i]);
        }

        return res.ToArray();
    }
}
```

```go
func relativeSortArray(arr1 []int, arr2 []int) []int {
    res := []int{}

    for _, num2 := range arr2 {
        for i := 0; i < len(arr1); i++ {
            if arr1[i] == num2 {
                res = append(res, arr1[i])
                arr1[i] = -1
            }
        }
    }

    sort.Ints(arr1)
    for i := len(res); i < len(arr1); i++ {
        res = append(res, arr1[i])
    }

    return res
}
```

```kotlin
class Solution {
    fun relativeSortArray(arr1: IntArray, arr2: IntArray): IntArray {
        val res = mutableListOf<Int>()

        for (num2 in arr2) {
            for (i in arr1.indices) {
                if (arr1[i] == num2) {
                    res.add(arr1[i])
                    arr1[i] = -1
                }
            }
        }

        arr1.sort()
        for (i in res.size until arr1.size) {
            res.add(arr1[i])
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func relativeSortArray(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        var arr1 = arr1
        var res = [Int]()

        for num2 in arr2 {
            for i in 0..<arr1.count {
                if arr1[i] == num2 {
                    res.append(arr1[i])
                    arr1[i] = -1
                }
            }
        }

        arr1.sort()
        for i in res.count..<arr1.count {
            res.append(arr1[i])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n + n \log n)$
- Space complexity:
    - $O(1)$ or $O(n)$ depending on the sorting algorithm.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 2. Hash Map

### Intuition

Instead of repeatedly scanning `arr1` for each element in `arr2`, we can first count the frequency of each element in `arr1` using a hash map. This allows O(1) lookups when building the result.

We also use a set to quickly identify which elements from `arr1` are not in `arr2`. These "extra" elements are collected separately, sorted, and appended to the end of the result.

### Algorithm

1. Create a set from `arr2` for `O(1)` membership checks.
2. Count the frequency of each element in `arr1` using a hash map. While counting, collect elements not in `arr2` into a separate list.
3. Sort the list of extra elements.
4. Build the result: for each number in `arr2`, append it to the result as many times as it appears in `arr1`.
5. Append the sorted extra elements to the result.
6. Return the result.

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        arr2_set = set(arr2)
        arr1_count = defaultdict(int)
        end = []

        for num in arr1:
            if num not in arr2_set:
                end.append(num)
            arr1_count[num] += 1
        end.sort()

        res = []
        for num in arr2:
            for _ in range(arr1_count[num]):
                res.append(num)
        return res + end
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Set<Integer> arr2Set = new HashSet<>();
        for (int num : arr2) arr2Set.add(num);

        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> end = new ArrayList<>();
        for (int num : arr1) {
            if (!arr2Set.contains(num)) end.add(num);
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        Collections.sort(end);

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            int freq = count.get(num);
            for (int i = 0; i < freq; i++) res.add(num);
        }
        res.addAll(end);

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_set<int> arr2Set(arr2.begin(), arr2.end());
        unordered_map<int, int> count;
        vector<int> end;

        for (int num : arr1) {
            if (!arr2Set.count(num)) end.push_back(num);
            count[num]++;
        }

        sort(end.begin(), end.end());
        vector<int> res;

        for (int num : arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.push_back(num);
            }
        }

        res.insert(res.end(), end.begin(), end.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const arr2Set = new Set(arr2);
        const count = {};
        const end = [];

        for (let num of arr1) {
            if (!arr2Set.has(num)) end.push(num);
            count[num] = (count[num] || 0) + 1;
        }

        end.sort((a, b) => a - b);
        const res = [];

        for (let num of arr2) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
        }

        return res.concat(end);
    }
}
```

```csharp
public class Solution {
    public int[] RelativeSortArray(int[] arr1, int[] arr2) {
        var arr2Set = new HashSet<int>(arr2);
        var count = new Dictionary<int, int>();
        var end = new List<int>();

        foreach (int num in arr1) {
            if (!arr2Set.Contains(num)) end.Add(num);
            count[num] = count.GetValueOrDefault(num, 0) + 1;
        }

        end.Sort();
        var res = new List<int>();

        foreach (int num in arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.Add(num);
            }
        }

        res.AddRange(end);
        return res.ToArray();
    }
}
```

```go
func relativeSortArray(arr1 []int, arr2 []int) []int {
    arr2Set := make(map[int]bool)
    for _, num := range arr2 {
        arr2Set[num] = true
    }

    count := make(map[int]int)
    var end []int
    for _, num := range arr1 {
        if !arr2Set[num] {
            end = append(end, num)
        }
        count[num]++
    }

    sort.Ints(end)
    var res []int
    for _, num := range arr2 {
        for i := 0; i < count[num]; i++ {
            res = append(res, num)
        }
    }

    return append(res, end...)
}
```

```kotlin
class Solution {
    fun relativeSortArray(arr1: IntArray, arr2: IntArray): IntArray {
        val arr2Set = arr2.toSet()
        val count = mutableMapOf<Int, Int>()
        val end = mutableListOf<Int>()

        for (num in arr1) {
            if (num !in arr2Set) end.add(num)
            count[num] = count.getOrDefault(num, 0) + 1
        }

        end.sort()
        val res = mutableListOf<Int>()

        for (num in arr2) {
            repeat(count[num]!!) {
                res.add(num)
            }
        }

        res.addAll(end)
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func relativeSortArray(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        let arr2Set = Set(arr2)
        var count = [Int: Int]()
        var end = [Int]()

        for num in arr1 {
            if !arr2Set.contains(num) {
                end.append(num)
            }
            count[num, default: 0] += 1
        }

        end.sort()
        var res = [Int]()

        for num in arr2 {
            for _ in 0..<count[num]! {
                res.append(num)
            }
        }

        res.append(contentsOf: end)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 3. Hash Map (Optimal)

### Intuition

This is a cleaner version of the hash map approach. Instead of tracking elements separately, we count all elements first, then process them in two phases: first by `arr2` order, then by remaining keys in sorted order.

By removing keys from the hash map as we process `arr2`, whatever remains in the map represents elements not in `arr2`. We sort these remaining keys and append their occurrences to complete the result.

### Algorithm

1. Count the frequency of each element in `arr1` using a hash map.
2. Build the result: for each number in `arr2`, append it to the result according to its count, then remove it from the map.
3. Get the remaining keys from the map (elements not in `arr2`) and sort them.
4. For each remaining key in sorted order, append it to the result according to its count.
5. Return the result.

Note: This approach uses `O(1)` to `O(n)` depending on how elements are processed.

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        count = {}
        for num in arr1:
            count[num] = count.get(num, 0) + 1

        res = []
        for num in arr2:
            res += [num] * count.pop(num)

        for num in sorted(count):
            res += [num] * count[num]

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : arr1) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            int freq = count.remove(num);
            for (int i = 0; i < freq; i++) {
                res.add(num);
            }
        }

        List<Integer> remaining = new ArrayList<>(count.keySet());
        Collections.sort(remaining);
        for (int num : remaining) {
            int freq = count.get(num);
            for (int i = 0; i < freq; i++) {
                res.add(num);
            }
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_map<int, int> count;
        for (int num : arr1) {
            count[num]++;
        }

        vector<int> res;
        for (int num : arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.push_back(num);
            }
            count.erase(num);
        }

        vector<int> remaining;
        for (auto& [num, freq] : count) {
            for (int i = 0; i < freq; i++) {
                remaining.push_back(num);
            }
        }

        sort(remaining.begin(), remaining.end());
        res.insert(res.end(), remaining.begin(), remaining.end());

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const count = {};
        for (let num of arr1) {
            count[num] = (count[num] || 0) + 1;
        }

        const res = [];
        for (let num of arr2) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
            delete count[num];
        }

        const remaining = Object.keys(count)
            .map(Number)
            .sort((a, b) => a - b);
        for (let num of remaining) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] RelativeSortArray(int[] arr1, int[] arr2) {
        var count = new Dictionary<int, int>();
        foreach (int num in arr1) {
            count[num] = count.GetValueOrDefault(num, 0) + 1;
        }

        var res = new List<int>();
        foreach (int num in arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.Add(num);
            }
            count.Remove(num);
        }

        var remaining = count.Keys.ToList();
        remaining.Sort();
        foreach (int num in remaining) {
            for (int i = 0; i < count[num]; i++) {
                res.Add(num);
            }
        }

        return res.ToArray();
    }
}
```

```go
func relativeSortArray(arr1 []int, arr2 []int) []int {
    count := make(map[int]int)
    for _, num := range arr1 {
        count[num]++
    }

    var res []int
    for _, num := range arr2 {
        for i := 0; i < count[num]; i++ {
            res = append(res, num)
        }
        delete(count, num)
    }

    var remaining []int
    for num := range count {
        remaining = append(remaining, num)
    }
    sort.Ints(remaining)

    for _, num := range remaining {
        for i := 0; i < count[num]; i++ {
            res = append(res, num)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun relativeSortArray(arr1: IntArray, arr2: IntArray): IntArray {
        val count = mutableMapOf<Int, Int>()
        for (num in arr1) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val res = mutableListOf<Int>()
        for (num in arr2) {
            repeat(count[num]!!) {
                res.add(num)
            }
            count.remove(num)
        }

        val remaining = count.keys.sorted()
        for (num in remaining) {
            repeat(count[num]!!) {
                res.add(num)
            }
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func relativeSortArray(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        var count = [Int: Int]()
        for num in arr1 {
            count[num, default: 0] += 1
        }

        var res = [Int]()
        for num in arr2 {
            for _ in 0..<count[num]! {
                res.append(num)
            }
            count.removeValue(forKey: num)
        }

        let remaining = count.keys.sorted()
        for num in remaining {
            for _ in 0..<count[num]! {
                res.append(num)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 4. Counting Sort

### Intuition

When the range of values in `arr1` is bounded and relatively small, counting sort becomes very efficient. We create an array where the index represents the value and the content represents the count.

The beauty of this approach is that the "remaining elements" are automatically sorted by simply iterating through the count array from index 0 to the maximum value. Elements that appear in `arr2` are handled first, then we sweep through the count array for everything else.

### Algorithm

1. Find the maximum value in `arr1` to determine the size of the count array.
2. Create a count array and populate it with frequencies of elements in `arr1`.
3. Build the result: for each number in `arr2`, append it according to its count and set its count to `0`.
4. Iterate from `0` to the maximum value. For each index with a non-zero count, append that value to the result according to its count.
5. Return the result.

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        max_val = max(arr1)
        count = [0] * (max_val + 1)

        for num in arr1:
            count[num] += 1

        res = []
        for num in arr2:
            res += [num] * count[num]
            count[num] = 0

        for num in range(len(count)):
            res += [num] * count[num]

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int max = 0;
        for (int num : arr1) max = Math.max(max, num);

        int[] count = new int[max + 1];
        for (int num : arr1) count[num]++;

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            while (count[num]-- > 0) res.add(num);
        }

        for (int num = 0; num < count.length; num++) {
            while (count[num]-- > 0) res.add(num);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        int max_val = *max_element(arr1.begin(), arr1.end());
        vector<int> count(max_val + 1, 0);

        for (int num : arr1) count[num]++;

        vector<int> res;
        for (int num : arr2) {
            while (count[num]-- > 0) res.push_back(num);
        }

        for (int num = 0; num <= max_val; num++) {
            while (count[num]-- > 0) res.push_back(num);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        let max = Math.max(...arr1);
        let count = new Array(max + 1).fill(0);

        for (let num of arr1) count[num]++;

        let res = [];
        for (let num of arr2) {
            while (count[num]-- > 0) res.push(num);
        }

        for (let num = 0; num < count.length; num++) {
            while (count[num]-- > 0) res.push(num);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] RelativeSortArray(int[] arr1, int[] arr2) {
        int max = arr1.Max();
        int[] count = new int[max + 1];

        foreach (int num in arr1) count[num]++;

        var res = new List<int>();
        foreach (int num in arr2) {
            while (count[num]-- > 0) res.Add(num);
        }

        for (int num = 0; num < count.Length; num++) {
            while (count[num]-- > 0) res.Add(num);
        }

        return res.ToArray();
    }
}
```

```go
func relativeSortArray(arr1 []int, arr2 []int) []int {
    maxVal := 0
    for _, num := range arr1 {
        if num > maxVal {
            maxVal = num
        }
    }

    count := make([]int, maxVal+1)
    for _, num := range arr1 {
        count[num]++
    }

    var res []int
    for _, num := range arr2 {
        for count[num] > 0 {
            res = append(res, num)
            count[num]--
        }
    }

    for num := 0; num <= maxVal; num++ {
        for count[num] > 0 {
            res = append(res, num)
            count[num]--
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun relativeSortArray(arr1: IntArray, arr2: IntArray): IntArray {
        val max = arr1.maxOrNull()!!
        val count = IntArray(max + 1)

        for (num in arr1) count[num]++

        val res = mutableListOf<Int>()
        for (num in arr2) {
            while (count[num]-- > 0) res.add(num)
        }

        for (num in 0..max) {
            while (count[num]-- > 0) res.add(num)
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func relativeSortArray(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        let maxVal = arr1.max()!
        var count = [Int](repeating: 0, count: maxVal + 1)

        for num in arr1 {
            count[num] += 1
        }

        var res = [Int]()
        for num in arr2 {
            while count[num] > 0 {
                res.append(num)
                count[num] -= 1
            }
        }

        for num in 0...maxVal {
            while count[num] > 0 {
                res.append(num)
                count[num] -= 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + M)$
- Space complexity:
    - $O(M)$ extra space.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, $m$ is the size of the array $arr2$, and $M$ is the maximum value in the array $arr1$.

---

## 5. Custom Sort

### Intuition

Instead of manually placing elements, we can leverage the built-in sorting algorithm with a custom comparator. The key insight is to assign each element a "priority" based on its position in `arr2`.

Elements in `arr2` get their index as priority (lower index = higher priority in the result). Elements not in `arr2` get a large priority (like 1000 + value) so they sort after all `arr2` elements, and among themselves they sort by their actual value.

### Algorithm

1. Create a hash map that maps each element in `arr2` to its index.
2. Define a custom comparator: for each element, its sort key is its index in `arr2` if present, otherwise `1000 + element_value`.
3. Sort `arr1` using this custom comparator.
4. Return the sorted array.

This approach is elegant and leverages the natural sorting of `arr2`'s indices to determine the final order.

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        index = {num: i for i, num in enumerate(arr2)}
        return sorted(arr1, key=lambda x: (index.get(x, 1000 + x)))
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < arr2.length; i++) {
            index.put(arr2[i], i);
        }

        Integer[] boxed = Arrays.stream(arr1).boxed().toArray(Integer[]::new);
        Arrays.sort(boxed, (a, b) -> {
            int ia = index.getOrDefault(a, 1000 + a);
            int ib = index.getOrDefault(b, 1000 + b);
            return Integer.compare(ia, ib);
        });

        return Arrays.stream(boxed).mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_map<int, int> index;
        for (int i = 0; i < arr2.size(); i++) {
            index[arr2[i]] = i;
        }

        sort(arr1.begin(), arr1.end(), [&](int a, int b) {
            int ia = index.count(a) ? index[a] : 1000 + a;
            int ib = index.count(b) ? index[b] : 1000 + b;
            return ia < ib;
        });

        return arr1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const index = new Map();
        arr2.forEach((num, i) => index.set(num, i));

        return arr1.sort((a, b) => {
            const ia = index.has(a) ? index.get(a) : 1000 + a;
            const ib = index.has(b) ? index.get(b) : 1000 + b;
            return ia - ib;
        });
    }
}
```

```csharp
public class Solution {
    public int[] RelativeSortArray(int[] arr1, int[] arr2) {
        var index = new Dictionary<int, int>();
        for (int i = 0; i < arr2.Length; i++) {
            index[arr2[i]] = i;
        }

        return arr1.OrderBy(x => index.ContainsKey(x) ? index[x] : 1000 + x).ToArray();
    }
}
```

```go
func relativeSortArray(arr1 []int, arr2 []int) []int {
    index := make(map[int]int)
    for i, num := range arr2 {
        index[num] = i
    }

    sort.Slice(arr1, func(i, j int) bool {
        ia, okA := index[arr1[i]]
        ib, okB := index[arr1[j]]
        if !okA {
            ia = 1000 + arr1[i]
        }
        if !okB {
            ib = 1000 + arr1[j]
        }
        return ia < ib
    })

    return arr1
}
```

```kotlin
class Solution {
    fun relativeSortArray(arr1: IntArray, arr2: IntArray): IntArray {
        val index = mutableMapOf<Int, Int>()
        arr2.forEachIndexed { i, num -> index[num] = i }

        return arr1.sortedWith { a, b ->
            val ia = index[a] ?: (1000 + a)
            val ib = index[b] ?: (1000 + b)
            ia - ib
        }.toIntArray()
    }
}
```

```swift
class Solution {
    func relativeSortArray(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        var index = [Int: Int]()
        for (i, num) in arr2.enumerated() {
            index[num] = i
        }

        return arr1.sorted { a, b in
            let ia = index[a] ?? (1000 + a)
            let ib = index[b] ?? (1000 + b)
            return ia < ib
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## Common Pitfalls

### Forgetting to Sort Elements Not in arr2

After placing all elements that appear in `arr2` according to their relative order, the remaining elements must be sorted in ascending order and appended to the result. A common mistake is appending these leftover elements in their original order or in the order they were encountered, rather than sorting them first.

### Modifying arr1 While Iterating Over It

In brute force approaches that mark processed elements (e.g., setting them to -1), care must be taken to handle the iteration correctly. Modifying the array while iterating can lead to skipped elements or incorrect indexing. Using a separate data structure like a hash map to track counts avoids this issue entirely.
