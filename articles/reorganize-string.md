## 1. Frequency Count

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.

---

## 2. Frequency Count (Max-Heap)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.

---

## 3. Frequency Count (Greedy)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n)$ space for the output string.
