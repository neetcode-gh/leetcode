## 1. Priority Queue

### Intuition

The key insight is that we should always place the character with the highest remaining frequency next. This greedy approach maximizes our chances of success because using up high-frequency characters early gives us more flexibility later.

However, after placing a character, we cannot use it again until at least `k` positions have passed. To handle this constraint, we use a "cooldown" queue that holds recently used characters along with the index where they were placed. Once enough positions have passed, the character becomes available again and returns to the priority queue.

If at any point we have no available characters to place (the priority queue is empty while we still need more characters), it means rearrangement is impossible.

### Algorithm

1. Count the frequency of each character in the string.
2. Insert all characters with their frequencies into a max heap (priority queue), prioritized by frequency.
3. Initialize an empty result string and a "busy" queue to track characters in their cooldown period.
4. While the result is not complete:
   - Check if the character at the front of the busy queue has completed its cooldown (at least `k` positions since last use). If so, move it back to the priority queue.
   - If the priority queue is empty, return an empty string (rearrangement is impossible).
   - Pop the character with the highest frequency from the priority queue and append it to the result.
   - Decrement its frequency. If it still has remaining occurrences, add it to the busy queue with the current index.
5. Return the constructed result string.

::tabs-start

```java
class Solution {
    public String rearrangeString(String s, int k) {
        Map<Character, Integer> freq = new HashMap<>();
        // Store the frequency for each character.
        for (char c : s.toCharArray()){
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        
        PriorityQueue<Pair<Integer, Character>> free=
                    new PriorityQueue<Pair<Integer, Character>>((a, b) -> b.getKey() - a.getKey());

        // Insert the characters with their frequencies in the max heap.
        for (char c : freq.keySet()){
            free.offer(new Pair<>(freq.get(c), c));
        }
        
        StringBuffer ans = new StringBuffer();
        // This queue stores the characters that cannot be used now.
        Queue<Pair<Integer, Character>> busy = new LinkedList<>();
        while (ans.length() != s.length()) {
            int index = ans.length();
            
            // Insert the character that could be used now into the free heap.
            if (!busy.isEmpty() && (index - busy.peek().getKey()) >= k) {
                Pair<Integer, Character> q = busy.remove();
                free.offer(new Pair<>(freq.get(q.getValue()), q.getValue()));
            }
            
            // If the free heap is empty, it implies no character can be used at this index.
            if (free.isEmpty()) {
                return "";
            }
            
            Character currChar = free.peek().getValue();
            free.remove();
            ans.append(currChar);
            
            // Insert the used character into busy queue with the current index.
            freq.put(currChar, freq.get(currChar) - 1);
            if (freq.get(currChar) > 0) {
                busy.add(new Pair<>(index, currChar));
            }
        }
        
        return ans.toString();
    }
}
```

```cpp
class Solution {
public:
    string rearrangeString(string s, int k) {
        int freq[26] = {0};
        // Store the frequency for each character.
        for (int i = 0; i < s.size(); i++) {
            freq[s[i] - 'a']++;
        }

        priority_queue<pair<int, int>> free;
        // Insert the characters with their frequencies in the max heap.
        for (int i = 0; i < 26; i++) {
            if (freq[i]) {
                free.push({freq[i], i});
            }
        }

        string ans;
        // This queue stores the characters that cannot be used now.
        queue<pair<int, int>>  busy;
        while (ans.size() != s.size()) {
            int index = ans.size();

            // Insert the character that could be used now into the free heap.
            if (!busy.empty() && (index - busy.front().first) >= k) {
                auto q = busy.front(); busy.pop();
                free.push({freq[q.second], q.second});
            }

            // If the free heap is empty, it implies no character can be used at this index.
            if (free.empty()) {
                return "";
            }

            int currChar = free.top().second; free.pop();
            ans += currChar + 'a';

            // Insert the used character into busy queue with the current index.
            freq[currChar]--;
            if (freq[currChar] > 0) {
                busy.push({index, currChar});
            }
        }

        return ans;
    }
};
```

```csharp
public class Solution {
    public string RearrangeString(string s, int k) {
        var freq = new Dictionary<char, int>();
        foreach (char c in s) {
            freq[c] = freq.GetValueOrDefault(c, 0) + 1;
        }

        var free = new PriorityQueue<char, int>(Comparer<int>.Create((a, b) => b - a));
        foreach (var kvp in freq) {
            free.Enqueue(kvp.Key, kvp.Value);
        }

        var ans = new StringBuilder();
        var busy = new Queue<(int index, char c)>();

        while (ans.Length != s.Length) {
            int index = ans.Length;

            if (busy.Count > 0 && (index - busy.Peek().index) >= k) {
                var q = busy.Dequeue();
                free.Enqueue(q.c, freq[q.c]);
            }

            if (free.Count == 0) return "";

            char currChar = free.Dequeue();
            ans.Append(currChar);

            freq[currChar]--;
            if (freq[currChar] > 0) {
                busy.Enqueue((index, currChar));
            }
        }

        return ans.ToString();
    }
}
```

```go
import (
    "container/heap"
)

type CharFreq struct {
    freq int
    char int
}

type MaxHeap []CharFreq

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].freq > h[j].freq }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.(CharFreq)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func rearrangeString(s string, k int) string {
    freq := make([]int, 26)
    for _, c := range s {
        freq[c-'a']++
    }

    free := &MaxHeap{}
    heap.Init(free)
    for i := 0; i < 26; i++ {
        if freq[i] > 0 {
            heap.Push(free, CharFreq{freq[i], i})
        }
    }

    ans := []byte{}
    busy := []struct{ index, char int }{}

    for len(ans) != len(s) {
        index := len(ans)

        if len(busy) > 0 && (index-busy[0].index) >= k {
            q := busy[0]
            busy = busy[1:]
            heap.Push(free, CharFreq{freq[q.char], q.char})
        }

        if free.Len() == 0 {
            return ""
        }

        cf := heap.Pop(free).(CharFreq)
        ans = append(ans, byte(cf.char+'a'))

        freq[cf.char]--
        if freq[cf.char] > 0 {
            busy = append(busy, struct{ index, char int }{index, cf.char})
        }
    }

    return string(ans)
}
```

```kotlin
import java.util.*

class Solution {
    fun rearrangeString(s: String, k: Int): String {
        val freq = mutableMapOf<Char, Int>()
        for (c in s) {
            freq[c] = freq.getOrDefault(c, 0) + 1
        }

        val free = PriorityQueue<Pair<Int, Char>>(compareByDescending { it.first })
        for ((c, f) in freq) {
            free.offer(f to c)
        }

        val ans = StringBuilder()
        val busy = LinkedList<Pair<Int, Char>>()

        while (ans.length != s.length) {
            val index = ans.length

            if (busy.isNotEmpty() && (index - busy.peek().first) >= k) {
                val q = busy.poll()
                free.offer(freq[q.second]!! to q.second)
            }

            if (free.isEmpty()) return ""

            val (_, currChar) = free.poll()
            ans.append(currChar)

            freq[currChar] = freq[currChar]!! - 1
            if (freq[currChar]!! > 0) {
                busy.offer(index to currChar)
            }
        }

        return ans.toString()
    }
}
```

```swift
class Solution {
    func rearrangeString(_ s: String, _ k: Int) -> String {
        var freq = [Character: Int]()
        for c in s {
            freq[c, default: 0] += 1
        }

        var free = [(freq: Int, char: Character)]()
        for (c, f) in freq {
            free.append((f, c))
        }
        free.sort { $0.freq > $1.freq }

        var ans = ""
        var busy = [(index: Int, char: Character)]()

        while ans.count != s.count {
            let index = ans.count

            if !busy.isEmpty && (index - busy[0].index) >= k {
                let q = busy.removeFirst()
                free.append((freq[q.char]!, q.char))
                free.sort { $0.freq > $1.freq }
            }

            if free.isEmpty { return "" }

            let currChar = free.removeFirst().char
            ans.append(currChar)

            freq[currChar]! -= 1
            if freq[currChar]! > 0 {
                busy.append((index, currChar))
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((N + K) \log K)$
- Space complexity: $O(K)$

>  Where $N$ is the length of the string `s`, and $K$ is the number of unique characters in the string `s`.

---

## 2. Greedy

### Intuition

Instead of simulating character placement one by one, we can think of the problem in terms of segments. If the maximum frequency of any character is `maxFreq`, we need at least `maxFreq` segments. Characters with the highest frequency must appear in every segment, while those with lower frequencies can be distributed across fewer segments.

The idea is to first place all high-frequency characters (those appearing `maxFreq` or `maxFreq - 1` times) into their respective segments, ensuring they are spaced apart. Then, distribute the remaining characters in a round-robin fashion across the first `maxFreq - 1` segments.

For the arrangement to be valid, each of the first `maxFreq - 1` segments must have at least `k` characters. The last segment can be shorter since no character needs to maintain distance after it.

### Algorithm

1. Count the frequency of each character and find the maximum frequency `maxFreq`.
2. Identify characters with frequency equal to `maxFreq` (most frequent) and `maxFreq - 1` (second most frequent).
3. Create `maxFreq` segments. Place one instance of each "most frequent" character in every segment, and one instance of each "second most frequent" character in all but the last segment.
4. Distribute the remaining characters (those with frequency less than `maxFreq - 1`) across the first `maxFreq - 1` segments in round-robin order.
5. Verify that each of the first `maxFreq - 1` segments has at least `k` characters. If not, return an empty string.
6. Concatenate all segments and return the result.

::tabs-start

```python
class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        freqs = Counter(s)
        max_freq = max(freqs.values()) if freqs else 0
        
        # Store all the characters with the highest and second highest frequency
        most_chars = set()
        second_chars = set()
        
        for char, freq in freqs.items():
            if freq == max_freq:
                most_chars.add(char)
            elif freq == max_freq - 1:
                second_chars.add(char)
        
        # Create max_freq number of different strings
        segments = [[] for _ in range(max_freq)]
        
        # Insert one instance of characters with frequency max_freq & max_freq - 1 in each segment
        for i in range(max_freq):
            for c in most_chars:
                segments[i].append(c)
            
            # Skip the last segment as the frequency is only max_freq - 1
            if i < max_freq - 1:
                for c in second_chars:
                    segments[i].append(c)
        
        segment_id = 0
        
        # Iterate over the remaining characters and distribute instances over segments
        for char, freq in freqs.items():
            # Skip characters with max_freq or max_freq - 1 frequency
            if char in most_chars or char in second_chars:
                continue
            
            # Distribute the instances over segments in round-robin manner
            for _ in range(freq):
                segments[segment_id].append(char)
                segment_id = (segment_id + 1) % (max_freq - 1)
        
        # Each segment except the last should have exactly k elements
        for i in range(max_freq - 1):
            if len(segments[i]) < k:
                return ""
        
        # Join all segments and return
        return ''.join(''.join(segment) for segment in segments)
```

```java
class Solution {
    public String rearrangeString(String s, int k) {
        Map<Character, Integer> freqs = new HashMap<>();
        int maxFreq = 0;
        // Store the frequency, and find the highest frequency.
        for (char c : s.toCharArray()) {
            freqs.put(c, freqs.getOrDefault(c, 0) + 1);
            maxFreq = Math.max(maxFreq, freqs.get(c));
        }

        Set<Character> mostChars = new HashSet<>();
        Set<Character> secondChars = new HashSet<>();
        // Store all the characters with the highest and second-highest frequency - 1.
        for (char c: freqs.keySet()) {
            if (freqs.get(c) == maxFreq) {
                mostChars.add(c);
            } else if (freqs.get(c) == maxFreq - 1) {
                secondChars.add(c);
            }
        }

        // Create maxFreq number of different strings.
        StringBuilder[] segments = new StringBuilder[maxFreq];
        // Insert one instance of characters with frequency maxFreq & maxFreq - 1 in each segment.
        for (int i = 0; i < maxFreq; i++) {
            segments[i] = new StringBuilder();

            for (char c: mostChars) {
                segments[i].append(c);
            }

            // Skip the last segment as the frequency is only maxFreq - 1.
            if (i < maxFreq - 1) {
                for (char c: secondChars) {
                    segments[i].append(c);
                }
            }
        }

        int segmentId = 0;
        // Iterate over the remaining characters, and for each, distribute the instances over the segments.
        for (char c: freqs.keySet()) {
            // Skip characters with maxFreq or maxFreq - 1 
            // frequency as they have already been inserted.
            if (mostChars.contains(c) || secondChars.contains(c)) {
                continue;
            }

            // Distribute the instances of these characters over the segments in a round-robin manner.
            for (int freq = freqs.get(c); freq > 0; freq--) {
                segments[segmentId].append(c);
                segmentId = (segmentId + 1) % (maxFreq - 1);
            }
        }

        // Each segment except the last should have exactly K elements; else, return "".
        for (int i = 0; i < maxFreq - 1; i++) {
            if (segments[i].length() < k) {
                return "";
            }
        }

        // Join all the segments and return them.
        return String.join("", segments);
    }
}
```

```cpp
class Solution {
public:
    string rearrangeString(string s, int k) {
        unordered_map<char, int> freqs;
        int maxFreq = 0;
        // Store the frequency, and find the highest frequency.
        for (char c : s) {
            freqs[c]++;
            maxFreq = max(maxFreq, freqs[c]);
        }
        
        unordered_set<char> mostChars;
        unordered_set<char> secondChars;
        // Store all the characters with the highest and second highest frequency - 1.
        for (pair<char, int> charPair: freqs) {
            if (charPair.second == maxFreq) {
                mostChars.insert(charPair.first);
            } else if (charPair.second == maxFreq - 1) {
                secondChars.insert(charPair.first);
            }
        }

        // Create maxFreq number of different strings.
        string segments[maxFreq];
        // Insert one instance of characters with frequency maxFreq & maxFreq - 1 in each segment.
        for (int i = 0; i < maxFreq; i++) {
            for (char c: mostChars) {
                segments[i] += c;
            }
            
            // Skip the last segment as the frequency is only maxFreq - 1.
            if (i < maxFreq - 1) {
                for (char c: secondChars) {
                    segments[i] += c;
                }
            }
        }

        int segmentId = 0;
        // Iterate over the remaining characters, and for each, distribute the instances over the segments.
        for (pair<char, int> charPair: freqs) {
            char currChar = charPair.first;
            
            // Skip characters with maxFreq or maxFreq - 1 
            // frequency as they have already been inserted.
            if (mostChars.find(currChar)  != mostChars.end() 
                || secondChars.find(currChar) != secondChars.end()) {
                continue;
            }
            
            // Distribute the instances of these characters over the segments in a round-robin manner.
            for (int freq = freqs[currChar]; freq > 0; freq--) {
                segments[segmentId] += charPair.first;
                segmentId = (segmentId + 1) % (maxFreq - 1);
            }
        }

        // Each segment except the last should have exactly K elements; else, return "".
        for (int i = 0; i < maxFreq - 1; i++) {
            if (segments[i].size() < k) {
                return "";
            }
        }
        
        string ans;
        // Join all the segments and return them.
        for (string s : segments) {
            ans += s;
        }
        
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {string}
     */
    rearrangeString(s, k) {
        const freqs = new Map();
        let maxFreq = 0;

        // Store the frequency and find the highest frequency
        for (const c of s) {
            freqs.set(c, (freqs.get(c) || 0) + 1);
            maxFreq = Math.max(maxFreq, freqs.get(c));
        }

        const mostChars = new Set();
        const secondChars = new Set();

        // Store all characters with highest and second highest frequency
        for (const [char, freq] of freqs) {
            if (freq === maxFreq) {
                mostChars.add(char);
            } else if (freq === maxFreq - 1) {
                secondChars.add(char);
            }
        }

        // Create maxFreq number of different strings
        const segments = Array.from({ length: maxFreq }, () => []);

        // Insert one instance of characters with frequency maxFreq & maxFreq - 1 in each segment
        for (let i = 0; i < maxFreq; i++) {
            for (const c of mostChars) {
                segments[i].push(c);
            }

            // Skip the last segment as the frequency is only maxFreq - 1
            if (i < maxFreq - 1) {
                for (const c of secondChars) {
                    segments[i].push(c);
                }
            }
        }

        let segmentId = 0;

        // Iterate over remaining characters and distribute instances over segments
        for (const [char, freq] of freqs) {
            // Skip characters with maxFreq or maxFreq - 1 frequency
            if (mostChars.has(char) || secondChars.has(char)) {
                continue;
            }

            // Distribute instances over segments in round-robin manner
            for (let f = 0; f < freq; f++) {
                segments[segmentId].push(char);
                segmentId = (segmentId + 1) % (maxFreq - 1);
            }
        }

        // Each segment except the last should have exactly k elements
        for (let i = 0; i < maxFreq - 1; i++) {
            if (segments[i].length < k) {
                return "";
            }
        }

        // Join all segments and return
        return segments.map(seg => seg.join('')).join('');
    }
}
```

```csharp
public class Solution {
    public string RearrangeString(string s, int k) {
        var freqs = new Dictionary<char, int>();
        int maxFreq = 0;

        foreach (char c in s) {
            freqs[c] = freqs.GetValueOrDefault(c, 0) + 1;
            maxFreq = Math.Max(maxFreq, freqs[c]);
        }

        var mostChars = new HashSet<char>();
        var secondChars = new HashSet<char>();

        foreach (var kvp in freqs) {
            if (kvp.Value == maxFreq) {
                mostChars.Add(kvp.Key);
            } else if (kvp.Value == maxFreq - 1) {
                secondChars.Add(kvp.Key);
            }
        }

        var segments = new StringBuilder[maxFreq];
        for (int i = 0; i < maxFreq; i++) {
            segments[i] = new StringBuilder();
            foreach (char c in mostChars) {
                segments[i].Append(c);
            }
            if (i < maxFreq - 1) {
                foreach (char c in secondChars) {
                    segments[i].Append(c);
                }
            }
        }

        int segmentId = 0;
        foreach (var kvp in freqs) {
            if (mostChars.Contains(kvp.Key) || secondChars.Contains(kvp.Key)) {
                continue;
            }
            for (int f = kvp.Value; f > 0; f--) {
                segments[segmentId].Append(kvp.Key);
                segmentId = (segmentId + 1) % (maxFreq - 1);
            }
        }

        for (int i = 0; i < maxFreq - 1; i++) {
            if (segments[i].Length < k) return "";
        }

        return string.Join("", segments.Select(sb => sb.ToString()));
    }
}
```

```go
func rearrangeString(s string, k int) string {
    freqs := make(map[rune]int)
    maxFreq := 0

    for _, c := range s {
        freqs[c]++
        if freqs[c] > maxFreq {
            maxFreq = freqs[c]
        }
    }

    mostChars := make(map[rune]bool)
    secondChars := make(map[rune]bool)

    for c, freq := range freqs {
        if freq == maxFreq {
            mostChars[c] = true
        } else if freq == maxFreq-1 {
            secondChars[c] = true
        }
    }

    segments := make([][]rune, maxFreq)
    for i := 0; i < maxFreq; i++ {
        segments[i] = []rune{}
        for c := range mostChars {
            segments[i] = append(segments[i], c)
        }
        if i < maxFreq-1 {
            for c := range secondChars {
                segments[i] = append(segments[i], c)
            }
        }
    }

    segmentId := 0
    for c, freq := range freqs {
        if mostChars[c] || secondChars[c] {
            continue
        }
        for f := 0; f < freq; f++ {
            segments[segmentId] = append(segments[segmentId], c)
            segmentId = (segmentId + 1) % (maxFreq - 1)
        }
    }

    for i := 0; i < maxFreq-1; i++ {
        if len(segments[i]) < k {
            return ""
        }
    }

    var result []rune
    for _, seg := range segments {
        result = append(result, seg...)
    }
    return string(result)
}
```

```kotlin
class Solution {
    fun rearrangeString(s: String, k: Int): String {
        val freqs = mutableMapOf<Char, Int>()
        var maxFreq = 0

        for (c in s) {
            freqs[c] = freqs.getOrDefault(c, 0) + 1
            maxFreq = maxOf(maxFreq, freqs[c]!!)
        }

        val mostChars = mutableSetOf<Char>()
        val secondChars = mutableSetOf<Char>()

        for ((c, freq) in freqs) {
            when (freq) {
                maxFreq -> mostChars.add(c)
                maxFreq - 1 -> secondChars.add(c)
            }
        }

        val segments = Array(maxFreq) { StringBuilder() }
        for (i in 0 until maxFreq) {
            for (c in mostChars) {
                segments[i].append(c)
            }
            if (i < maxFreq - 1) {
                for (c in secondChars) {
                    segments[i].append(c)
                }
            }
        }

        var segmentId = 0
        for ((c, freq) in freqs) {
            if (c in mostChars || c in secondChars) continue
            repeat(freq) {
                segments[segmentId].append(c)
                segmentId = (segmentId + 1) % (maxFreq - 1)
            }
        }

        for (i in 0 until maxFreq - 1) {
            if (segments[i].length < k) return ""
        }

        return segments.joinToString("")
    }
}
```

```swift
class Solution {
    func rearrangeString(_ s: String, _ k: Int) -> String {
        var freqs = [Character: Int]()
        var maxFreq = 0

        for c in s {
            freqs[c, default: 0] += 1
            maxFreq = max(maxFreq, freqs[c]!)
        }

        var mostChars = Set<Character>()
        var secondChars = Set<Character>()

        for (c, freq) in freqs {
            if freq == maxFreq {
                mostChars.insert(c)
            } else if freq == maxFreq - 1 {
                secondChars.insert(c)
            }
        }

        var segments = [[Character]](repeating: [], count: maxFreq)
        for i in 0..<maxFreq {
            for c in mostChars {
                segments[i].append(c)
            }
            if i < maxFreq - 1 {
                for c in secondChars {
                    segments[i].append(c)
                }
            }
        }

        var segmentId = 0
        for (c, freq) in freqs {
            if mostChars.contains(c) || secondChars.contains(c) { continue }
            for _ in 0..<freq {
                segments[segmentId].append(c)
                segmentId = (segmentId + 1) % (maxFreq - 1)
            }
        }

        for i in 0..<(maxFreq - 1) {
            if segments[i].count < k { return "" }
        }

        return segments.map { String($0) }.joined()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(K)$

>  Where $N$ is the length of the string `s`, and $K$ is the number of unique characters in the string `s`.
