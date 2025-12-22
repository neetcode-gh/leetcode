## 1. Priority Queue

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((N + K) \log K)$
- Space complexity: $O(K)$

>  Where $N$ is the length of the string `s`, and $K$ is the number of unique characters in the string `s`.

---

## 2. Greedy

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(K)$

>  Where $N$ is the length of the string `s`, and $K$ is the number of unique characters in the string `s`.
