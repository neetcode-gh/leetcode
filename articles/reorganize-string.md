## 1. Frequency Count

### Intuition

To avoid adjacent duplicates, we should always place the most frequent remaining character, then the second most frequent. This greedy approach works because alternating between the two most common characters maximizes our ability to separate identical characters. If any character appears more than `(n + 1) / 2`, reorganization is impossible.

### Algorithm

1. Count the frequency of each character in `freq` array.
2. If the max frequency exceeds `(n + 1) / 2`, return an empty string.
3. While building the `res`:
   - Find the character with the highest frequency at index `maxIdx` and append it.
   - If that character's `freq[maxIdx]` still has remaining count, temporarily hide it and find the next highest frequency character.
   - Append the second character and restore the first character's count.
4. Return the `res` string.

::tabs-start

```python
class Solution:
    def reorganizeString(self, s: str) -> str:
        freq = [0] * 26
        for char in s:
            freq[ord(char) - ord('a')] += 1

        max_freq = max(freq)
        if max_freq > (len(s) + 1) // 2:
            return ""

        res = []
        while len(res) < len(s):
            maxIdx = freq.index(max(freq))
            char = chr(maxIdx + ord('a'))
            res.append(char)
            freq[maxIdx] -= 1
            if freq[maxIdx] == 0:
                continue

            tmp = freq[maxIdx]
            freq[maxIdx] = float("-inf")
            nextMaxIdx = freq.index(max(freq))
            char = chr(nextMaxIdx + ord('a'))
            res.append(char)
            freq[maxIdx] = tmp
            freq[nextMaxIdx] -= 1

        return ''.join(res)
```

```java
public class Solution {
    public String reorganizeString(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        int maxFreq = Arrays.stream(freq).max().getAsInt();
        if (maxFreq > (s.length() + 1) / 2) {
            return "";
        }

        StringBuilder res = new StringBuilder();
        while (res.length() < s.length()) {
            int maxIdx = findMaxIndex(freq);
            char maxChar = (char) (maxIdx + 'a');
            res.append(maxChar);
            freq[maxIdx]--;

            if (freq[maxIdx] == 0) {
                continue;
            }

            int tmp = freq[maxIdx];
            freq[maxIdx] = Integer.MIN_VALUE;
            int nextMaxIdx = findMaxIndex(freq);
            char nextMaxChar = (char) (nextMaxIdx + 'a');
            res.append(nextMaxChar);
            freq[maxIdx] = tmp;
            freq[nextMaxIdx]--;
        }

        return res.toString();
    }

    private int findMaxIndex(int[] freq) {
        int maxIdx = 0;
        for (int i = 1; i < freq.length; i++) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }
}
```

```cpp
class Solution {
public:
    string reorganizeString(string s) {
        vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }

        int maxFreq = *max_element(freq.begin(), freq.end());
        if (maxFreq > (s.size() + 1) / 2) {
            return "";
        }

        string res;
        while (res.size() < s.size()) {
            int maxIdx = findMaxIndex(freq);
            char maxChar = 'a' + maxIdx;
            res += maxChar;
            freq[maxIdx]--;

            if (freq[maxIdx] == 0) {
                continue;
            }

            int tmp = freq[maxIdx];
            freq[maxIdx] = INT_MIN;
            int nextMaxIdx = findMaxIndex(freq);
            char nextMaxChar = 'a' + nextMaxIdx;
            res += nextMaxChar;
            freq[maxIdx] = tmp;
            freq[nextMaxIdx]--;
        }

        return res;
    }

private:
    int findMaxIndex(const vector<int>& freq) {
        int maxIdx = 0;
        for (int i = 1; i < freq.size(); i++) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    reorganizeString(s) {
        const freq = new Array(26).fill(0);
        for (const char of s) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const maxFreq = Math.max(...freq);
        if (maxFreq > Math.floor((s.length + 1) / 2)) {
            return '';
        }

        const findMaxIndex = () => {
            let maxIdx = 0;
            for (let i = 1; i < freq.length; i++) {
                if (freq[i] > freq[maxIdx]) {
                    maxIdx = i;
                }
            }
            return maxIdx;
        };

        const res = [];
        while (res.length < s.length) {
            const maxIdx = findMaxIndex();
            const maxChar = String.fromCharCode(maxIdx + 'a'.charCodeAt(0));
            res.push(maxChar);
            freq[maxIdx]--;

            if (freq[maxIdx] === 0) {
                continue;
            }

            const tmp = freq[maxIdx];
            freq[maxIdx] = -Infinity;
            const nextMaxIdx = findMaxIndex();
            const nextMaxChar = String.fromCharCode(
                nextMaxIdx + 'a'.charCodeAt(0),
            );
            res.push(nextMaxChar);
            freq[maxIdx] = tmp;
            freq[nextMaxIdx]--;
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string ReorganizeString(string s) {
        int[] freq = new int[26];
        foreach (char c in s) {
            freq[c - 'a']++;
        }

        int maxFreq = freq.Max();
        if (maxFreq > (s.Length + 1) / 2) {
            return "";
        }

        List<char> res = new List<char>();
        while (res.Count < s.Length) {
            int maxIdx = Array.IndexOf(freq, freq.Max());
            char ch = (char)(maxIdx + 'a');
            res.Add(ch);
            freq[maxIdx]--;

            if (freq[maxIdx] == 0) continue;

            int tmp = freq[maxIdx];
            freq[maxIdx] = int.MinValue;
            int nextMaxIdx = Array.IndexOf(freq, freq.Max());
            char nextCh = (char)(nextMaxIdx + 'a');
            res.Add(nextCh);
            freq[maxIdx] = tmp;
            freq[nextMaxIdx]--;
        }

        return new string(res.ToArray());
    }
}
```

```go
func reorganizeString(s string) string {
    freq := make([]int, 26)
    for _, c := range s {
        freq[c-'a']++
    }

    maxFreq := 0
    for _, f := range freq {
        if f > maxFreq {
            maxFreq = f
        }
    }
    if maxFreq > (len(s)+1)/2 {
        return ""
    }

    findMaxIndex := func() int {
        maxIdx := 0
        for i := 1; i < 26; i++ {
            if freq[i] > freq[maxIdx] {
                maxIdx = i
            }
        }
        return maxIdx
    }

    res := []byte{}
    for len(res) < len(s) {
        maxIdx := findMaxIndex()
        res = append(res, byte(maxIdx+'a'))
        freq[maxIdx]--

        if freq[maxIdx] == 0 {
            continue
        }

        tmp := freq[maxIdx]
        freq[maxIdx] = -1 << 31
        nextMaxIdx := findMaxIndex()
        res = append(res, byte(nextMaxIdx+'a'))
        freq[maxIdx] = tmp
        freq[nextMaxIdx]--
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun reorganizeString(s: String): String {
        val freq = IntArray(26)
        for (c in s) {
            freq[c - 'a']++
        }

        val maxFreq = freq.maxOrNull() ?: 0
        if (maxFreq > (s.length + 1) / 2) {
            return ""
        }

        fun findMaxIndex(): Int {
            var maxIdx = 0
            for (i in 1 until 26) {
                if (freq[i] > freq[maxIdx]) {
                    maxIdx = i
                }
            }
            return maxIdx
        }

        val res = StringBuilder()
        while (res.length < s.length) {
            val maxIdx = findMaxIndex()
            res.append(('a' + maxIdx))
            freq[maxIdx]--

            if (freq[maxIdx] == 0) continue

            val tmp = freq[maxIdx]
            freq[maxIdx] = Int.MIN_VALUE
            val nextMaxIdx = findMaxIndex()
            res.append(('a' + nextMaxIdx))
            freq[maxIdx] = tmp
            freq[nextMaxIdx]--
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func reorganizeString(_ s: String) -> String {
        var freq = [Int](repeating: 0, count: 26)
        for c in s {
            freq[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        let maxFreq = freq.max() ?? 0
        if maxFreq > (s.count + 1) / 2 {
            return ""
        }

        func findMaxIndex() -> Int {
            var maxIdx = 0
            for i in 1..<26 {
                if freq[i] > freq[maxIdx] {
                    maxIdx = i
                }
            }
            return maxIdx
        }

        var res = [Character]()
        while res.count < s.count {
            let maxIdx = findMaxIndex()
            res.append(Character(UnicodeScalar(maxIdx + Int(Character("a").asciiValue!))!))
            freq[maxIdx] -= 1

            if freq[maxIdx] == 0 { continue }

            let tmp = freq[maxIdx]
            freq[maxIdx] = Int.min
            let nextMaxIdx = findMaxIndex()
            res.append(Character(UnicodeScalar(nextMaxIdx + Int(Character("a").asciiValue!))!))
            freq[maxIdx] = tmp
            freq[nextMaxIdx] -= 1
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.

---

## 2. Frequency Count (Max-Heap)

### Intuition

A `maxHeap` efficiently gives us the most frequent character at any time. We pop the top character, add it to `res`, then push it back with decremented count after processing the next character. This delay ensures we never place the same character twice in a row. If the heap is empty but we still have a `prev` pending character, reorganization failed.

### Algorithm

1. Count frequencies and build a `maxHeap` of `(count, character)` pairs.
2. Track a `prev` element that was just used and cannot be immediately reused.
3. While the `maxHeap` is not empty or `prev` exists:
   - If `prev` exists but the `maxHeap` is empty, return an empty string.
   - Pop the top element `cnt`, append its character, and decrement `cnt`.
   - Push `prev` back to the `maxHeap` if it exists.
   - Set `prev` to the current element if its count is still positive.
4. Return the `res` string.

::tabs-start

```python
class Solution:
    def reorganizeString(self, s: str) -> str:
        count = Counter(s)
        maxHeap = [[-cnt, char] for char, cnt in count.items()]
        heapq.heapify(maxHeap)

        prev = None
        res = ""
        while maxHeap or prev:
            if prev and not maxHeap:
                return ""

            cnt, char = heapq.heappop(maxHeap)
            res += char
            cnt += 1

            if prev:
                heapq.heappush(maxHeap, prev)
                prev = None

            if cnt != 0:
                prev = [cnt, char]

        return res
```

```java
public class Solution {
    public String reorganizeString(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                maxHeap.offer(new int[]{freq[i], i});
            }
        }

        StringBuilder res = new StringBuilder();
        int[] prev = null;
        while (!maxHeap.isEmpty() || prev != null) {
            if (prev != null && maxHeap.isEmpty()) {
                return "";
            }

            int[] curr = maxHeap.poll();
            res.append((char) (curr[1] + 'a'));
            curr[0]--;

            if (prev != null) {
                maxHeap.offer(prev);
                prev = null;
            }

            if (curr[0] > 0) {
                prev = curr;
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string reorganizeString(string s) {
        vector<int> freq(26, 0);
        for (char& c : s) {
            freq[c - 'a']++;
        }

        priority_queue<pair<int, char>> maxHeap;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                maxHeap.push({freq[i], 'a' + i});
            }
        }

        string res = "";
        pair<int, char> prev = {0, ' '};
        while (!maxHeap.empty() || prev.first > 0) {
            if (prev.first > 0 && maxHeap.empty()) {
                return "";
            }

            auto [count, char_] = maxHeap.top();
            maxHeap.pop();
            res += char_;
            count--;

            if (prev.first > 0) {
                maxHeap.push(prev);
            }

            prev = {count, char_};
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    reorganizeString(s) {
        const freq = new Array(26).fill(0);
        for (const char of s) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const maxHeap = new MaxPriorityQueue({
            priority: ([count]) => count,
        });
        for (let i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                maxHeap.enqueue([
                    freq[i],
                    String.fromCharCode(i + 'a'.charCodeAt(0)),
                ]);
            }
        }

        let res = '';
        let prev = null;

        while (!maxHeap.isEmpty() || prev) {
            if (prev && maxHeap.isEmpty()) {
                return '';
            }

            const [count, char] = maxHeap.dequeue().element;
            res += char;

            if (prev) {
                maxHeap.enqueue(prev);
                prev = null;
            }
            if (count > 1) {
                prev = [count - 1, char];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string ReorganizeString(string s) {
        Dictionary<char, int> count = new();
        foreach (char c in s) {
            if (!count.ContainsKey(c)) count[c] = 0;
            count[c]++;
        }

        PriorityQueue<int[], int> maxHeap = new();
        foreach (var kvp in count) {
            maxHeap.Enqueue(new int[] { kvp.Value, kvp.Key }, -kvp.Value);
        }

        string res = "";
        int[] prev = null;

        while (maxHeap.Count > 0 || prev != null) {
            if (prev != null && maxHeap.Count == 0) return "";

            int[] curr = maxHeap.Dequeue();
            res += (char)curr[1];
            curr[0]--;

            if (prev != null) {
                maxHeap.Enqueue(prev, -prev[0]);
                prev = null;
            }

            if (curr[0] > 0) {
                prev = curr;
            }
        }

        return res;
    }
}
```

```go
import "container/heap"

type MaxHeap [][]int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.([]int)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func reorganizeString(s string) string {
    freq := make([]int, 26)
    for _, c := range s {
        freq[c-'a']++
    }

    h := &MaxHeap{}
    heap.Init(h)
    for i := 0; i < 26; i++ {
        if freq[i] > 0 {
            heap.Push(h, []int{freq[i], i})
        }
    }

    res := []byte{}
    var prev []int

    for h.Len() > 0 || prev != nil {
        if prev != nil && h.Len() == 0 {
            return ""
        }

        curr := heap.Pop(h).([]int)
        res = append(res, byte(curr[1]+'a'))
        curr[0]--

        if prev != nil {
            heap.Push(h, prev)
            prev = nil
        }

        if curr[0] > 0 {
            prev = curr
        }
    }

    return string(res)
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun reorganizeString(s: String): String {
        val freq = IntArray(26)
        for (c in s) {
            freq[c - 'a']++
        }

        val maxHeap = PriorityQueue<IntArray> { a, b -> b[0] - a[0] }
        for (i in 0 until 26) {
            if (freq[i] > 0) {
                maxHeap.offer(intArrayOf(freq[i], i))
            }
        }

        val res = StringBuilder()
        var prev: IntArray? = null

        while (maxHeap.isNotEmpty() || prev != null) {
            if (prev != null && maxHeap.isEmpty()) return ""

            val curr = maxHeap.poll()
            res.append(('a' + curr[1]))
            curr[0]--

            if (prev != null) {
                maxHeap.offer(prev)
                prev = null
            }

            if (curr[0] > 0) {
                prev = curr
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func reorganizeString(_ s: String) -> String {
        var freq = [Int](repeating: 0, count: 26)
        for c in s {
            freq[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        var heap = [(Int, Int)]()
        for i in 0..<26 {
            if freq[i] > 0 {
                heap.append((freq[i], i))
            }
        }
        heap.sort { $0.0 > $1.0 }

        var res = [Character]()
        var prev: (Int, Int)? = nil

        while !heap.isEmpty || prev != nil {
            if prev != nil && heap.isEmpty { return "" }

            let curr = heap.removeFirst()
            res.append(Character(UnicodeScalar(curr.1 + Int(Character("a").asciiValue!))!))
            let newCount = curr.0 - 1

            if let p = prev {
                heap.append(p)
                heap.sort { $0.0 > $1.0 }
                prev = nil
            }

            if newCount > 0 {
                prev = (newCount, curr.1)
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.

---

## 3. Frequency Count (Greedy)

### Intuition

Instead of building the string character by character, we can place characters at alternating indices. First, fill all even indices (0, 2, 4, ...) with the most frequent character. This guarantees no two identical characters are adjacent since they are separated by at least one position. Then fill the remaining positions with other characters, wrapping to odd indices when even slots are exhausted. We use `idx` to track the current position and update it using `idx += 2`.

### Algorithm

1. Count frequencies in `freq` and find the most frequent character at `maxIdx`.
2. If the max frequency exceeds `(n + 1) / 2`, return an empty string.
3. Place the most frequent character at indices 0, 2, 4, ... until exhausted.
4. For all remaining characters `i`:
   - Place them at the current `idx`, incrementing by 2 each time.
   - When the `idx` exceeds `n`, wrap to `idx = 1` and continue with odd positions.
5. Return the `res` string.

::tabs-start

```python
class Solution:
    def reorganizeString(self, s: str) -> str:
        freq = [0] * 26
        for char in s:
            freq[ord(char) - ord('a')] += 1

        max_idx = freq.index(max(freq))
        max_freq = freq[max_idx]
        if max_freq > (len(s) + 1) // 2:
            return ""

        res = [''] * len(s)
        idx = 0
        max_char = chr(max_idx + ord('a'))

        while freq[max_idx] > 0:
            res[idx] = max_char
            idx += 2
            freq[max_idx] -= 1

        for i in range(26):
            while freq[i] > 0:
                if idx >= len(s):
                    idx = 1
                res[idx] = chr(i + ord('a'))
                idx += 2
                freq[i] -= 1

        return ''.join(res)
```

```java
public class Solution {
    public String reorganizeString(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        int maxIdx = 0;
        for (int i = 1; i < 26; i++) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i;
            }
        }

        int maxFreq = freq[maxIdx];
        if (maxFreq > (s.length() + 1) / 2) {
            return "";
        }

        char[] res = new char[s.length()];
        int idx = 0;
        char maxChar = (char) (maxIdx + 'a');

        while (freq[maxIdx] > 0) {
            res[idx] = maxChar;
            idx += 2;
            freq[maxIdx]--;
        }

        for (int i = 0; i < 26; i++) {
            while (freq[i] > 0) {
                if (idx >= s.length()) {
                    idx = 1;
                }
                res[idx] = (char) (i + 'a');
                idx += 2;
                freq[i]--;
            }
        }

        return new String(res);
    }
}
```

```cpp
class Solution {
public:
    string reorganizeString(string s) {
        vector<int> freq(26, 0);
        for (char& c : s) {
            freq[c - 'a']++;
        }

        int maxIdx = max_element(freq.begin(), freq.end()) - freq.begin();
        int maxFreq = freq[maxIdx];
        if (maxFreq > (s.size() + 1) / 2) {
            return "";
        }

        string res(s.size(), ' ');
        int idx = 0;
        char maxChar = 'a' + maxIdx;

        while (freq[maxIdx] > 0) {
            res[idx] = maxChar;
            idx += 2;
            freq[maxIdx]--;
        }

        for (int i = 0; i < 26; i++) {
            while (freq[i] > 0) {
                if (idx >= s.size()) {
                    idx = 1;
                }
                res[idx] = 'a' + i;
                idx += 2;
                freq[i]--;
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
     * @return {string}
     */
    reorganizeString(s) {
        const freq = new Array(26).fill(0);
        for (const char of s) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let maxIdx = 0;
        for (let i = 1; i < 26; i++) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i;
            }
        }

        const maxFreq = freq[maxIdx];
        if (maxFreq > Math.floor((s.length + 1) / 2)) {
            return '';
        }

        const res = new Array(s.length).fill('');
        let idx = 0;
        const maxChar = String.fromCharCode(maxIdx + 'a'.charCodeAt(0));

        while (freq[maxIdx] > 0) {
            res[idx] = maxChar;
            idx += 2;
            freq[maxIdx]--;
        }

        for (let i = 0; i < 26; i++) {
            while (freq[i] > 0) {
                if (idx >= s.length) {
                    idx = 1;
                }
                res[idx] = String.fromCharCode(i + 'a'.charCodeAt(0));
                idx += 2;
                freq[i]--;
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string ReorganizeString(string s) {
        int[] freq = new int[26];
        foreach (char c in s) {
            freq[c - 'a']++;
        }

        int maxIdx = 0;
        for (int i = 1; i < 26; i++) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i;
            }
        }

        int maxFreq = freq[maxIdx];
        if (maxFreq > (s.Length + 1) / 2) return "";

        char[] res = new char[s.Length];
        int idx = 0;
        char maxChar = (char)(maxIdx + 'a');

        while (freq[maxIdx] > 0) {
            res[idx] = maxChar;
            idx += 2;
            freq[maxIdx]--;
        }

        for (int i = 0; i < 26; i++) {
            while (freq[i] > 0) {
                if (idx >= s.Length) idx = 1;
                res[idx] = (char)(i + 'a');
                idx += 2;
                freq[i]--;
            }
        }

        return new string(res);
    }
}
```

```go
func reorganizeString(s string) string {
    freq := make([]int, 26)
    for _, c := range s {
        freq[c-'a']++
    }

    maxIdx := 0
    for i := 1; i < 26; i++ {
        if freq[i] > freq[maxIdx] {
            maxIdx = i
        }
    }

    maxFreq := freq[maxIdx]
    if maxFreq > (len(s)+1)/2 {
        return ""
    }

    res := make([]byte, len(s))
    idx := 0
    maxChar := byte(maxIdx + 'a')

    for freq[maxIdx] > 0 {
        res[idx] = maxChar
        idx += 2
        freq[maxIdx]--
    }

    for i := 0; i < 26; i++ {
        for freq[i] > 0 {
            if idx >= len(s) {
                idx = 1
            }
            res[idx] = byte(i + 'a')
            idx += 2
            freq[i]--
        }
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun reorganizeString(s: String): String {
        val freq = IntArray(26)
        for (c in s) {
            freq[c - 'a']++
        }

        var maxIdx = 0
        for (i in 1 until 26) {
            if (freq[i] > freq[maxIdx]) {
                maxIdx = i
            }
        }

        val maxFreq = freq[maxIdx]
        if (maxFreq > (s.length + 1) / 2) return ""

        val res = CharArray(s.length)
        var idx = 0
        val maxChar = ('a' + maxIdx)

        while (freq[maxIdx] > 0) {
            res[idx] = maxChar
            idx += 2
            freq[maxIdx]--
        }

        for (i in 0 until 26) {
            while (freq[i] > 0) {
                if (idx >= s.length) idx = 1
                res[idx] = ('a' + i)
                idx += 2
                freq[i]--
            }
        }

        return String(res)
    }
}
```

```swift
class Solution {
    func reorganizeString(_ s: String) -> String {
        var freq = [Int](repeating: 0, count: 26)
        for c in s {
            freq[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        var maxIdx = 0
        for i in 1..<26 {
            if freq[i] > freq[maxIdx] {
                maxIdx = i
            }
        }

        let maxFreq = freq[maxIdx]
        if maxFreq > (s.count + 1) / 2 { return "" }

        var res = [Character](repeating: " ", count: s.count)
        var idx = 0
        let maxChar = Character(UnicodeScalar(maxIdx + Int(Character("a").asciiValue!))!)

        while freq[maxIdx] > 0 {
            res[idx] = maxChar
            idx += 2
            freq[maxIdx] -= 1
        }

        for i in 0..<26 {
            while freq[i] > 0 {
                if idx >= s.count { idx = 1 }
                res[idx] = Character(UnicodeScalar(i + Int(Character("a").asciiValue!))!)
                idx += 2
                freq[i] -= 1
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.

---

## Common Pitfalls

### Incorrect Impossibility Check

The condition for impossibility is when the most frequent character appears more than `(n + 1) / 2` times. Using `n / 2` or forgetting the ceiling division leads to incorrect rejection of valid inputs or acceptance of impossible cases.

### Placing Characters at Wrong Indices in Greedy Approach

When using the index-based greedy approach, characters must be placed at even indices first (0, 2, 4, ...) before wrapping to odd indices. Failing to reset the index to 1 after exceeding the array length results in index out-of-bounds errors or incorrect placements.

### Re-inserting the Same Character into the Heap Immediately

In the heap-based approach, the just-used character must be held back for one iteration before reinsertion. Pushing it back immediately allows it to be selected again on the next pop, creating adjacent duplicates.