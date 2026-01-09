## 1. Hash Set

### Intuition

For frequencies to be unique, no two characters can have the same count. When we encounter a frequency that already exists, we must delete characters until we reach an unused frequency (or zero). A hash set tracks which frequencies are already taken. For each character's frequency, we decrement it until we find an available slot, counting each decrement as a deletion.

### Algorithm

1. Count the frequency of each character.
2. Create a hash set to track used frequencies.
3. For each frequency:
   - While the frequency is positive and already in the set, decrement it and count a deletion.
   - Add the resulting frequency to the set.
4. Return the total deletion count.

::tabs-start

```python
class Solution:
    def minDeletions(self, s: str) -> int:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1

        used_freq = set()
        res = 0
        for freq in count:
            while freq > 0 and freq in used_freq:
                freq -= 1
                res += 1
            used_freq.add(freq)

        return res
```

```java
class Solution {
    public int minDeletions(String s) {
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
        }

        Set<Integer> usedFreq = new HashSet<>();
        int res = 0;

        for (int freq : count) {
            while (freq > 0 && usedFreq.contains(freq)) {
                freq--;
                res++;
            }
            usedFreq.add(freq);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minDeletions(string s) {
        vector<int> count(26, 0);
        for (char& c : s) {
            count[c - 'a']++;
        }

        unordered_set<int> usedFreq;
        int res = 0;

        for (int& freq : count) {
            while (freq > 0 && usedFreq.count(freq)) {
                freq--;
                res++;
            }
            usedFreq.insert(freq);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minDeletions(s) {
        let count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let usedFreq = new Set();
        let res = 0;

        for (let freq of count) {
            while (freq > 0 && usedFreq.has(freq)) {
                freq--;
                res++;
            }
            usedFreq.add(freq);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinDeletions(string s) {
        int[] count = new int[26];
        foreach (char c in s) {
            count[c - 'a']++;
        }

        HashSet<int> usedFreq = new HashSet<int>();
        int res = 0;

        foreach (int f in count) {
            int freq = f;
            while (freq > 0 && usedFreq.Contains(freq)) {
                freq--;
                res++;
            }
            usedFreq.Add(freq);
        }

        return res;
    }
}
```

```go
func minDeletions(s string) int {
    count := make([]int, 26)
    for _, c := range s {
        count[c-'a']++
    }

    usedFreq := make(map[int]bool)
    res := 0

    for _, freq := range count {
        for freq > 0 && usedFreq[freq] {
            freq--
            res++
        }
        usedFreq[freq] = true
    }

    return res
}
```

```kotlin
class Solution {
    fun minDeletions(s: String): Int {
        val count = IntArray(26)
        for (c in s) {
            count[c - 'a']++
        }

        val usedFreq = HashSet<Int>()
        var res = 0

        for (f in count) {
            var freq = f
            while (freq > 0 && freq in usedFreq) {
                freq--
                res++
            }
            usedFreq.add(freq)
        }

        return res
    }
}
```

```swift
class Solution {
    func minDeletions(_ s: String) -> Int {
        var count = [Int](repeating: 0, count: 26)
        let aVal = Character("a").asciiValue!
        for c in s {
            count[Int(c.asciiValue! - aVal)] += 1
        }

        var usedFreq = Set<Int>()
        var res = 0

        for f in count {
            var freq = f
            while freq > 0 && usedFreq.contains(freq) {
                freq -= 1
                res += 1
            }
            usedFreq.insert(freq)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m ^ 2)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.

---

## 2. Max-Heap

### Intuition

Using a max-heap, we process frequencies from largest to smallest. When the top two frequencies are equal, we have a conflict. We resolve it by decrementing one of them and pushing the reduced value back (if still positive). This greedy approach ensures we minimize deletions by keeping larger frequencies intact when possible.

### Algorithm

1. Count character frequencies and build a max-heap.
2. While more than one frequency remains:
   - Pop the largest frequency.
   - If it equals the next largest, decrement it, count a deletion, and push back if positive.
3. Return the total deletion count.

::tabs-start

```python
class Solution:
    def minDeletions(self, s: str) -> int:
        freq = Counter(s)
        maxHeap = [-f for f in freq.values()]
        heapq.heapify(maxHeap)

        res = 0
        while len(maxHeap) > 1:
            top = -heapq.heappop(maxHeap)
            if top == -maxHeap[0]:
                if top - 1 > 0:
                    heapq.heappush(maxHeap, -(top - 1))
                res += 1

        return res
```

```java
public class Solution {
    public int minDeletions(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        maxHeap.addAll(freq.values());

        int res = 0;
        while (maxHeap.size() > 1) {
            int top = maxHeap.poll();
            if (top == maxHeap.peek()) {
                if (top - 1 > 0) {
                    maxHeap.add(top - 1);
                }
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minDeletions(string s) {
        unordered_map<char, int> freq;
        for (char& c : s) {
            freq[c]++;
        }

        priority_queue<int> maxHeap;
        for (auto& f : freq) {
            maxHeap.push(f.second);
        }

        int res = 0;
        while (maxHeap.size() > 1) {
            int top = maxHeap.top();
            maxHeap.pop();
            if (top == maxHeap.top()) {
                if (top - 1 > 0) {
                    maxHeap.push(top - 1);
                }
                res++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minDeletions(s) {
        let freq = new Map();
        for (let c of s) {
            freq.set(c, (freq.get(c) || 0) + 1);
        }

        const maxHeap = new MaxPriorityQueue();
        for (let value of freq.values()) {
            maxHeap.enqueue(value);
        }

        let res = 0;
        while (maxHeap.size() > 1) {
            let top = maxHeap.dequeue().element;
            if (maxHeap.front().element === top) {
                if (top - 1 > 0) {
                    maxHeap.enqueue(top - 1);
                }
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinDeletions(string s) {
        Dictionary<char, int> freq = new Dictionary<char, int>();
        foreach (char c in s) {
            if (!freq.ContainsKey(c)) freq[c] = 0;
            freq[c]++;
        }

        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        foreach (int f in freq.Values) {
            maxHeap.Enqueue(f, f);
        }

        int res = 0;
        while (maxHeap.Count > 1) {
            int top = maxHeap.Dequeue();
            maxHeap.TryPeek(out int peek, out _);
            if (top == peek) {
                if (top - 1 > 0) {
                    maxHeap.Enqueue(top - 1, top - 1);
                }
                res++;
            }
        }

        return res;
    }
}
```

```go
func minDeletions(s string) int {
    freq := make(map[rune]int)
    for _, c := range s {
        freq[c]++
    }

    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    for _, f := range freq {
        heap.Push(maxHeap, f)
    }

    res := 0
    for maxHeap.Len() > 1 {
        top := heap.Pop(maxHeap).(int)
        if (*maxHeap)[0] == top {
            if top-1 > 0 {
                heap.Push(maxHeap, top-1)
            }
            res++
        }
    }

    return res
}

type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun minDeletions(s: String): Int {
        val freq = HashMap<Char, Int>()
        for (c in s) {
            freq[c] = freq.getOrDefault(c, 0) + 1
        }

        val maxHeap = PriorityQueue<Int>(Collections.reverseOrder())
        maxHeap.addAll(freq.values)

        var res = 0
        while (maxHeap.size > 1) {
            val top = maxHeap.poll()
            if (top == maxHeap.peek()) {
                if (top - 1 > 0) {
                    maxHeap.add(top - 1)
                }
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minDeletions(_ s: String) -> Int {
        var freq = [Character: Int]()
        for c in s {
            freq[c, default: 0] += 1
        }

        var maxHeap = Heap<Int>(sort: >)
        for f in freq.values {
            maxHeap.insert(f)
        }

        var res = 0
        while maxHeap.count > 1 {
            let top = maxHeap.remove()!
            if let peek = maxHeap.peek(), peek == top {
                if top - 1 > 0 {
                    maxHeap.insert(top - 1)
                }
                res += 1
            }
        }

        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) { self.sort = sort }
    var count: Int { elements.count }
    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && sort(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1, right = 2 * parent + 2
            var candidate = parent
            if left < count && sort(elements[left], elements[candidate]) { candidate = left }
            if right < count && sort(elements[right], elements[candidate]) { candidate = right }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m ^ 2 \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.

---

## 3. Sorting

### Intuition

By sorting frequencies in descending order, we process them from highest to lowest. We track the maximum allowed frequency for the next character. If a frequency exceeds this limit, we delete down to the limit. After each character, the next allowed frequency decreases by one (minimum `0`). This ensures all final frequencies are distinct.

### Algorithm

1. Count character frequencies and sort in descending order.
2. Set `maxAllowedFreq` to the highest frequency.
3. For each frequency:
   - If it exceeds `maxAllowedFreq`, add the difference to deletions.
   - Update `maxAllowedFreq` to `max(0, current_frequency - 1)`.
4. Return the total deletion count.

::tabs-start

```python
class Solution:
    def minDeletions(self, s: str) -> int:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1

        count.sort(reverse=True)
        res = 0
        maxAllowedFreq = count[0]

        for freq in count:
            if freq > maxAllowedFreq:
                res += freq - maxAllowedFreq
                freq = maxAllowedFreq
            maxAllowedFreq = max(0, freq - 1)

        return res
```

```java
public class Solution {
    public int minDeletions(String s) {
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
        }

        Arrays.sort(count);
        int res = 0;
        int maxAllowedFreq = count[25];

        for (int i = 25; i >= 0; i--) {
            if (count[i] > maxAllowedFreq) {
                res += count[i] - maxAllowedFreq;
                count[i] = maxAllowedFreq;
            }
            maxAllowedFreq = Math.max(0, count[i] - 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minDeletions(string s) {
        vector<int> count(26, 0);
        for (char& c : s) {
            count[c - 'a']++;
        }

        sort(count.begin(), count.end(), greater<int>());
        int res = 0;
        int maxAllowedFreq = count[0];

        for (int& freq : count) {
            if (freq > maxAllowedFreq) {
                res += freq - maxAllowedFreq;
                freq = maxAllowedFreq;
            }
            maxAllowedFreq = max(0, freq - 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minDeletions(s) {
        let count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        count.sort((a, b) => b - a);

        let res = 0;
        let maxAllowedFreq = count[0];

        for (let i = 0; i < 26; i++) {
            if (count[i] > maxAllowedFreq) {
                res += count[i] - maxAllowedFreq;
                count[i] = maxAllowedFreq;
            }
            maxAllowedFreq = Math.max(0, count[i] - 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinDeletions(string s) {
        int[] count = new int[26];
        foreach (char c in s) {
            count[c - 'a']++;
        }

        Array.Sort(count);
        Array.Reverse(count);

        int res = 0;
        int maxAllowedFreq = count[0];

        for (int i = 0; i < 26; i++) {
            if (count[i] > maxAllowedFreq) {
                res += count[i] - maxAllowedFreq;
                count[i] = maxAllowedFreq;
            }
            maxAllowedFreq = Math.Max(0, count[i] - 1);
        }

        return res;
    }
}
```

```go
func minDeletions(s string) int {
    count := make([]int, 26)
    for _, c := range s {
        count[c-'a']++
    }

    sort.Sort(sort.Reverse(sort.IntSlice(count)))

    res := 0
    maxAllowedFreq := count[0]

    for i := 0; i < 26; i++ {
        if count[i] > maxAllowedFreq {
            res += count[i] - maxAllowedFreq
            count[i] = maxAllowedFreq
        }
        maxAllowedFreq = max(0, count[i]-1)
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minDeletions(s: String): Int {
        val count = IntArray(26)
        for (c in s) {
            count[c - 'a']++
        }

        count.sortDescending()

        var res = 0
        var maxAllowedFreq = count[0]

        for (i in 0 until 26) {
            if (count[i] > maxAllowedFreq) {
                res += count[i] - maxAllowedFreq
                count[i] = maxAllowedFreq
            }
            maxAllowedFreq = maxOf(0, count[i] - 1)
        }

        return res
    }
}
```

```swift
class Solution {
    func minDeletions(_ s: String) -> Int {
        var count = [Int](repeating: 0, count: 26)
        let aVal = Character("a").asciiValue!
        for c in s {
            count[Int(c.asciiValue! - aVal)] += 1
        }

        count.sort(by: >)

        var res = 0
        var maxAllowedFreq = count[0]

        for i in 0..<26 {
            if count[i] > maxAllowedFreq {
                res += count[i] - maxAllowedFreq
                count[i] = maxAllowedFreq
            }
            maxAllowedFreq = max(0, count[i] - 1)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.
