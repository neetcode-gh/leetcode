## 1. Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m ^ 2)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.

---

## 2. Max-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m ^ 2 \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.

---

## 3. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique frequncies possible.
