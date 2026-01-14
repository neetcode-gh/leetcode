## 1. Sorting

### Intuition

To find the `k` most frequent elements, we first need to know how often each number appears.
Once we count the frequencies, we can sort the unique numbers based on how many times they occur.
After sorting, the numbers with the highest frequencies will naturally appear at the end of the list.
By taking the last `k` entries, we get the `k` most frequent elements.

This approach is easy to reason about:
**count the frequencies → sort by frequency → take the top `k`.**

### Algorithm

1. Create a hash map to store the frequency of each number.
2. Build a list of `[frequency, number]` pairs from the map.
3. Sort this list in ascending order based on frequency.
4. Create an empty result list.
5. Repeatedly pop from the end of the sorted list (highest frequency) and append the number to the result.
6. Stop when the result contains `k` elements.
7. Return the result list.

::tabs-start

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = {}
        for num in nums:
            count[num] = 1 + count.get(num, 0)

        arr = []
        for num, cnt in count.items():
            arr.append([cnt, num])
        arr.sort()

        res = []
        while len(res) < k:
            res.append(arr.pop()[1])
        return res
```

```java
public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<int[]> arr = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            arr.add(new int[] {entry.getValue(), entry.getKey()});
        }
        arr.sort((a, b) -> b[0] - a[0]);

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = arr.get(i)[1];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        vector<pair<int, int>> arr;
        for (const auto& p : count) {
            arr.push_back({p.second, p.first});
        }
        sort(arr.rbegin(), arr.rend());

        vector<int> res;
        for (int i = 0; i < k; ++i) {
            res.push_back(arr[i].second);
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
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        const arr = Object.entries(count).map(([num, freq]) => [
            freq,
            parseInt(num),
        ]);
        arr.sort((a, b) => b[0] - a[0]);

        return arr.slice(0, k).map((pair) => pair[1]);
    }
}
```

```csharp
public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (count.ContainsKey(num)) count[num]++;
            else count[num] = 1;
        }

        List<int[]> arr = count.Select(entry => new int[] {entry.Value, entry.Key}).ToList();
        arr.Sort((a, b) => b[0].CompareTo(a[0]));

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = arr[i][1];
        }
        return res;
    }
}
```

```go
func topKFrequent(nums []int, k int) []int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    arr := make([][2]int, 0, len(count))
    for num, cnt := range count {
        arr = append(arr, [2]int{cnt, num})
    }

    sort.Slice(arr, func(i, j int) bool {
        return arr[i][0] > arr[j][0]
    })

    res := make([]int, k)
    for i := 0; i < k; i++ {
        res[i] = arr[i][1]
    }
    return res
}
```

```kotlin
class Solution {
    fun topKFrequent(nums: IntArray, k: Int): IntArray {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val arr = mutableListOf<Pair<Int, Int>>()
        for ((num, freq) in count) {
            arr.add(Pair(freq, num))
        }
        arr.sortByDescending { it.first }

        val res = IntArray(k)
        for (i in 0 until k) {
            res[i] = arr[i].second
        }
        return res
    }
}
```

```swift
class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var arr = [(Int, Int)]()
        for (num, cnt) in count {
            arr.append((cnt, num))
        }
        arr.sort { $0.0 < $1.0 }

        var res = [Int]()
        while res.count < k {
            res.append(arr.removeLast().1)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Min-Heap

### Intuition

After counting how often each number appears, we want to efficiently keep track of only the `k` most frequent elements.
A **min-heap** is perfect for this because it always keeps the smallest element at the top.
By pushing `(frequency, value)` pairs into the heap and removing the smallest whenever the heap grows beyond size `k`, we ensure that the heap always contains the top `k` most frequent elements.
In the end, the heap holds exactly the `k` values with the highest frequencies.

### Algorithm

1. Build a frequency map that counts how many times each number appears.
2. Create an empty min-heap.
3. For each number in the frequency map:
   - Push `(frequency, number)` into the heap.
   - If the heap size becomes greater than `k`, pop once to remove the smallest frequency.
4. After processing all numbers, the heap contains the `k` most frequent elements.
5. Pop all elements from the heap and collect their numbers into the result list.
6. Return the result.

::tabs-start

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = {}
        for num in nums:
            count[num] = 1 + count.get(num, 0)

        heap = []
        for num in count.keys():
            heapq.heappush(heap, (count[num], num))
            if len(heap) > k:
                heapq.heappop(heap)

        res = []
        for i in range(k):
            res.append(heapq.heappop(heap)[1])
        return res
```

```java
public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            heap.offer(new int[]{entry.getValue(), entry.getKey()});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.poll()[1];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        for (auto& entry : count) {
            heap.push({entry.second, entry.first});
            if (heap.size() > k) {
                heap.pop();
            }
        }

        vector<int> res;
        for (int i = 0; i < k; i++) {
            res.push_back(heap.top().second);
            heap.pop();
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
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        const heap = new MinPriorityQueue((x) => x[1]);
        for (const [num, cnt] of Object.entries(count)) {
            heap.enqueue([num, cnt]);
            if (heap.size() > k) heap.dequeue();
        }

        const res = [];
        for (let i = 0; i < k; i++) {
            const [num, cnt] = heap.dequeue();
            res.push(num);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        var count = new Dictionary<int, int>();
        foreach (var num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }
        }

        var heap = new PriorityQueue<int, int>();
        foreach (var entry in count) {
            heap.Enqueue(entry.Key, entry.Value);
            if (heap.Count > k) {
                heap.Dequeue();
            }
        }

        var res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.Dequeue();
        }
        return res;
    }
}
```

```go
func topKFrequent(nums []int, k int) []int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    heap := priorityqueue.NewWith(func(a, b interface{}) int {
        freqA := a.([2]int)[0]
        freqB := b.([2]int)[0]
        return utils.IntComparator(freqA, freqB)
    })

    for num, freq := range count {
        heap.Enqueue([2]int{freq, num})
        if heap.Size() > k {
            heap.Dequeue()
        }
    }

    res := make([]int, k)
    for i := k - 1; i >= 0; i-- {
        value, _ := heap.Dequeue()
        res[i] = value.([2]int)[1]
    }
    return res
}
```

```kotlin
class Solution {
    fun topKFrequent(nums: IntArray, k: Int): IntArray {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val heap = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })
        for ((num, freq) in count) {
            heap.add(Pair(freq, num))
            if (heap.size > k) {
                heap.poll()
            }
        }

        val res = IntArray(k)
        for (i in k - 1 downTo 0) {
            res[i] = heap.poll().second
        }
        return res
    }
}
```

```swift
struct NumFreq: Comparable {
    let num: Int
    let freq: Int

    static func < (lhs: NumFreq, rhs: NumFreq) -> Bool {
        return lhs.freq < rhs.freq
    }
}

class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var heap: Heap<NumFreq> = []
        for (num, freq) in count {
            heap.insert(NumFreq(num: num, freq: freq))
            if heap.count > k {
                heap.removeMin()
            }
        }

        var res = [Int]()
        while !heap.isEmpty {
            res.append(heap.removeMin().num)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity: $O(n + k)$

> Where $n$ is the length of the array and $k$ is the number of top frequent elements.

---

## 3. Bucket Sort

### Intuition

Each number in the array appears a certain number of times, and the maximum possible frequency is the length of the array.
We can use this idea by creating a list where the index represents a frequency, and at each index we store all numbers that appear exactly that many times.

For example:
- All numbers that appear `1` time go into group `freq[1]`.
- All numbers that appear `2` times go into group `freq[2]`.
- And so on.

After we build these groups, we look from the highest possible frequency down to the lowest and collect numbers from these groups until we have `k` of them.
This way, we directly jump to the most frequent numbers without sorting all the elements by frequency.

### Algorithm

1. Build a frequency map that counts how many times each number appears.
2. Create a list of groups `freq`, where `freq[i]` will store all numbers that appear exactly `i` times.
3. For each number and its frequency in the map, add the number to `freq[frequency]`.
4. Initialize an empty result list.
5. Loop from the largest possible frequency down to `1`:
   - For each number in `freq[i]`, add it to the result list.
   - Once the result contains `k` numbers, return it.

::tabs-start

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = {}
        freq = [[] for i in range(len(nums) + 1)]

        for num in nums:
            count[num] = 1 + count.get(num, 0)
        for num, cnt in count.items():
            freq[cnt].append(num)

        res = []
        for i in range(len(freq) - 1, 0, -1):
            for num in freq[i]:
                res.append(num)
                if len(res) == k:
                    return res
```

```java
public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer>[] freq = new List[nums.length + 1];

        for (int i = 0; i < freq.length; i++) {
            freq[i] = new ArrayList<>();
        }

        for (int n : nums) {
            count.put(n, count.getOrDefault(n, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            freq[entry.getValue()].add(entry.getKey());
        }

        int[] res = new int[k];
        int index = 0;
        for (int i = freq.length - 1; i > 0 && index < k; i--) {
            for (int n : freq[i]) {
                res[index++] = n;
                if (index == k) {
                    return res;
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
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        vector<vector<int>> freq(nums.size() + 1);

        for (int n : nums) {
            count[n] = 1 + count[n];
        }
        for (const auto& entry : count) {
            freq[entry.second].push_back(entry.first);
        }

        vector<int> res;
        for (int i = freq.size() - 1; i > 0; --i) {
            for (int n : freq[i]) {
                res.push_back(n);
                if (res.size() == k) {
                    return res;
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
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        const freq = Array.from({ length: nums.length + 1 }, () => []);

        for (const n of nums) {
            count[n] = (count[n] || 0) + 1;
        }
        for (const n in count) {
            freq[count[n]].push(parseInt(n));
        }

        const res = [];
        for (let i = freq.length - 1; i > 0; i--) {
            for (const n of freq[i]) {
                res.push(n);
                if (res.length === k) {
                    return res;
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        List<int>[] freq = new List<int>[nums.Length + 1];
        for (int i = 0; i < freq.Length; i++) {
            freq[i] = new List<int>();
        }

        foreach (int n in nums) {
            if (count.ContainsKey(n)) {
                count[n]++;
            } else {
                count[n] = 1;
            }
        }
        foreach (var entry in count){
            freq[entry.Value].Add(entry.Key);
        }

        int[] res = new int[k];
        int index = 0;
        for (int i = freq.Length - 1; i > 0 && index < k; i--) {
            foreach (int n in freq[i]) {
                res[index++] = n;
                if (index == k) {
                    return res;
                }
            }
        }
        return res;
    }
}
```

```go
func topKFrequent(nums []int, k int) []int {
    count := make(map[int]int)
    freq := make([][]int, len(nums)+1)

    for _, num := range nums {
        count[num]++
    }
    for num, cnt := range count {
        freq[cnt] = append(freq[cnt], num)
    }

    res := []int{}
    for i := len(freq) - 1; i > 0; i-- {
        for _, num := range freq[i] {
            res = append(res, num)
            if len(res) == k {
                return res
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun topKFrequent(nums: IntArray, k: Int): IntArray {
        val count = HashMap<Int, Int>()
        val freq = List(nums.size + 1) { mutableListOf<Int>() }

        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }
        for ((num, cnt) in count) {
            freq[cnt].add(num)
        }

        val res = mutableListOf<Int>()
        for (i in freq.size - 1 downTo 1) {
            for (num in freq[i]) {
                res.add(num)
                if (res.size == k) {
                    return res.toIntArray()
                }
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        var count = [Int: Int]()
        var freq = [[Int]](repeating: [], count: nums.count + 1)

        for num in nums {
            count[num, default: 0] += 1
        }

        for (num, cnt) in count {
            freq[cnt].append(num)
        }

        var res = [Int]()
        for i in stride(from: freq.count - 1, through: 1, by: -1) {
            for num in freq[i] {
                res.append(num)
                if res.count == k {
                    return res
                }
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

## Common Pitfalls

### Using a Max-Heap Instead of Min-Heap

When keeping track of the top `k` elements, a min-heap of size `k` is needed so you can efficiently remove the smallest frequency when the heap exceeds size `k`. Using a max-heap requires storing all elements and then extracting `k` times, which is less efficient. The min-heap approach maintains only the `k` largest frequencies at any time.

### Forgetting to Handle Ties in Frequency

When multiple numbers have the same frequency, the order in which they appear in the result may vary. Most problem statements accept any valid ordering, but some solutions incorrectly assume a specific order or break when frequencies are equal. Ensure your comparison function handles equal frequencies gracefully.

### Off-By-One in Bucket Sort Index

In bucket sort, frequencies range from `1` to `n` (the array length), so you need `n + 1` buckets indexed `0` to `n`. A common mistake is creating only `n` buckets, causing an index out of bounds error when an element appears `n` times. Always allocate `len(nums) + 1` buckets to accommodate all possible frequencies.
