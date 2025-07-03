## 1. Greedy

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        count = [a, b, c]
        res = []

        def getMax(repeated):
            idx = -1
            maxCnt = 0
            for i in range(3):
                if i == repeated or count[i] == 0:
                    continue
                if maxCnt < count[i]:
                    maxCnt = count[i]
                    idx = i
            return idx

        repeated = -1
        while True:
            maxChar = getMax(repeated)
            if maxChar == -1:
                break
            res.append(chr(maxChar + ord('a')))
            count[maxChar] -= 1
            if len(res) > 1 and res[-1] == res[-2]:
                repeated = maxChar
            else:
                repeated = -1

        return ''.join(res)
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        int[] count = {a, b, c};
        StringBuilder res = new StringBuilder();

        int repeated = -1;
        while (true) {
            int maxChar = getMax(count, repeated);
            if (maxChar == -1) {
                break;
            }
            res.append((char) (maxChar + 'a'));
            count[maxChar]--;

            if (res.length() > 1 && res.charAt(res.length() - 1) == res.charAt(res.length() - 2)) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res.toString();
    }

    private int getMax(int[] count, int repeated) {
        int idx = -1, maxCnt = 0;
        for (int i = 0; i < 3; i++) {
            if (i == repeated || count[i] == 0) {
                continue;
            }
            if (maxCnt < count[i]) {
                maxCnt = count[i];
                idx = i;
            }
        }
        return idx;
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        vector<int> count = {a, b, c};
        string res;

        int repeated = -1;
        while (true) {
            int maxChar = getMax(count, repeated);
            if (maxChar == -1) {
                break;
            }
            res += (char)(maxChar + 'a');
            count[maxChar]--;

            if (res.size() > 1 && res.back() == res[res.size() - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res;
    }

private:
    int getMax(const vector<int>& count, int repeated) {
        int idx = -1, maxCnt = 0;
        for (int i = 0; i < 3; i++) {
            if (i == repeated || count[i] == 0) {
                continue;
            }
            if (maxCnt < count[i]) {
                maxCnt = count[i];
                idx = i;
            }
        }
        return idx;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const count = [a, b, c];
        const res = [];

        const getMax = (repeated) => {
            let idx = -1;
            let maxCnt = 0;
            for (let i = 0; i < 3; i++) {
                if (i === repeated || count[i] === 0) {
                    continue;
                }
                if (maxCnt < count[i]) {
                    maxCnt = count[i];
                    idx = i;
                }
            }
            return idx;
        };

        let repeated = -1;
        while (true) {
            const maxChar = getMax(repeated);
            if (maxChar === -1) {
                break;
            }
            res.push(String.fromCharCode(maxChar + 97));
            count[maxChar]--;

            if (res.length > 1 && res[res.length - 1] === res[res.length - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        int[] count = new int[] { a, b, c };
        List<char> res = new List<char>();

        int GetMax(int repeated) {
            int idx = -1;
            int maxCnt = 0;
            for (int i = 0; i < 3; i++) {
                if (i == repeated || count[i] == 0) continue;
                if (maxCnt < count[i]) {
                    maxCnt = count[i];
                    idx = i;
                }
            }
            return idx;
        }

        int repeated = -1;
        while (true) {
            int maxChar = GetMax(repeated);
            if (maxChar == -1) break;

            res.Add((char)(maxChar + 'a'));
            count[maxChar]--;

            if (res.Count > 1 && res[res.Count - 1] == res[res.Count - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return new string(res.ToArray());
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 2. Greedy (Max-Heap)

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        res = ""
        maxHeap = []
        for count, char in [(-a, "a"), (-b, "b"), (-c, "c")]:
            if count != 0:
                heapq.heappush(maxHeap, (count, char))

        while maxHeap:
            count, char = heapq.heappop(maxHeap)
            if len(res) > 1 and res[-1] == res[-2] == char:
                if not maxHeap:
                    break
                count2, char2 = heapq.heappop(maxHeap)
                res += char2
                count2 += 1
                if count2:
                    heapq.heappush(maxHeap, (count2, char2))
                heapq.heappush(maxHeap, (count, char))
            else:
                res += char
                count += 1
                if count:
                    heapq.heappush(maxHeap, (count, char))

        return res
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        StringBuilder res = new StringBuilder();
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((x, y) -> y[0] - x[0]);

        if (a > 0) maxHeap.offer(new int[]{a, 'a'});
        if (b > 0) maxHeap.offer(new int[]{b, 'b'});
        if (c > 0) maxHeap.offer(new int[]{c, 'c'});

        while (!maxHeap.isEmpty()) {
            int[] first = maxHeap.poll();
            if (res.length() > 1 && res.charAt(res.length() - 1) == first[1] && res.charAt(res.length() - 2) == first[1]) {
                if (maxHeap.isEmpty()) break;
                int[] second = maxHeap.poll();
                res.append((char) second[1]);
                second[0]--;
                if (second[0] > 0) maxHeap.offer(second);
                maxHeap.offer(first);
            } else {
                res.append((char) first[1]);
                first[0]--;
                if (first[0] > 0) maxHeap.offer(first);
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        string res;
        priority_queue<pair<int, char>> maxHeap;
        if (a > 0) maxHeap.push({a, 'a'});
        if (b > 0) maxHeap.push({b, 'b'});
        if (c > 0) maxHeap.push({c, 'c'});

        while (!maxHeap.empty()) {
            auto [count, ch] = maxHeap.top();
            maxHeap.pop();

            if (res.size() > 1 && res[res.size() - 1] == ch && res[res.size() - 2] == ch) {
                if (maxHeap.empty()) break;
                auto [count2, ch2] = maxHeap.top();
                maxHeap.pop();
                res += ch2;
                if (--count2 > 0) maxHeap.push({count2, ch2});
                maxHeap.push({count, ch});
            } else {
                res += ch;
                if (--count > 0) maxHeap.push({count, ch});
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const res = [];
        const maxHeap = new MaxPriorityQueue((x) => x[0]);

        if (a > 0) maxHeap.enqueue([a, 'a']);
        if (b > 0) maxHeap.enqueue([b, 'b']);
        if (c > 0) maxHeap.enqueue([c, 'c']);

        while (!maxHeap.isEmpty()) {
            const [count, char] = maxHeap.dequeue();

            if (
                res.length > 1 &&
                res[res.length - 1] === char &&
                res[res.length - 2] === char
            ) {
                if (maxHeap.isEmpty()) break;
                const [count2, char2] = maxHeap.dequeue();
                res.push(char2);
                if (count2 - 1 > 0) maxHeap.enqueue([count2 - 1, char2]);
                maxHeap.enqueue([count, char]);
            } else {
                res.push(char);
                if (count - 1 > 0) maxHeap.enqueue([count - 1, char]);
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        string res = "";
        PriorityQueue<(int count, char ch), int> maxHeap = new PriorityQueue<(int, char), int>();

        void AddToHeap(int count, char ch) {
            if (count > 0) {
                maxHeap.Enqueue((count, ch), -count);
            }
        }

        AddToHeap(a, 'a');
        AddToHeap(b, 'b');
        AddToHeap(c, 'c');

        while (maxHeap.Count > 0) {
            var (count1, ch1) = maxHeap.Dequeue();
            if (res.Length >= 2 && res[^1] == ch1 && res[^2] == ch1) {
                if (maxHeap.Count == 0) break;
                var (count2, ch2) = maxHeap.Dequeue();
                res += ch2;
                count2--;
                if (count2 > 0) {
                    maxHeap.Enqueue((count2, ch2), -count2);
                }
                maxHeap.Enqueue((count1, ch1), -count1);
            } else {
                res += ch1;
                count1--;
                if (count1 > 0) {
                    maxHeap.Enqueue((count1, ch1), -count1);
                }
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
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 3. Greedy (Recursion)

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        def rec(max1, max2, max3, char1, char2, char3):
            if max1 < max2:
                return rec(max2, max1, max3, char2, char1, char3)
            if max2 < max3:
                return rec(max1, max3, max2, char1, char3, char2)
            if max2 == 0:
                return [char1] * min(2, max1)

            use1 = min(2, max1)
            use2 = 1 if max1 - use1 >= max2 else 0
            res = [char1] * use1 + [char2] * use2
            return res + rec(max1 - use1, max2 - use2, max3, char1, char2, char3)

        return ''.join(rec(a, b, c, 'a', 'b', 'c'))
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        return String.join("", rec(a, b, c, 'a', 'b', 'c'));
    }

    private List<String> rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) {
            return rec(max2, max1, max3, char2, char1, char3);
        }
        if (max2 < max3) {
            return rec(max1, max3, max2, char1, char3, char2);
        }
        if (max2 == 0) {
            List<String> result = new ArrayList<>();
            for (int i = 0; i < Math.min(2, max1); i++) {
                result.add(String.valueOf(char1));
            }
            return result;
        }

        int use1 = Math.min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        List<String> res = new ArrayList<>();
        for (int i = 0; i < use1; i++) {
            res.add(String.valueOf(char1));
        }
        for (int i = 0; i < use2; i++) {
            res.add(String.valueOf(char2));
        }

        res.addAll(rec(max1 - use1, max2 - use2, max3, char1, char2, char3));
        return res;
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        vector<char> res = rec(a, b, c, 'a', 'b', 'c');
        return string(res.begin(), res.end());
    }

private:
    vector<char> rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) {
            return rec(max2, max1, max3, char2, char1, char3);
        }
        if (max2 < max3) {
            return rec(max1, max3, max2, char1, char3, char2);
        }
        if (max2 == 0) {
            vector<char> result(min(2, max1), char1);
            return result;
        }

        int use1 = min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        vector<char> res(use1, char1);
        res.insert(res.end(), use2, char2);

        vector<char> rest = rec(max1 - use1, max2 - use2, max3, char1, char2, char3);
        res.insert(res.end(), rest.begin(), rest.end());

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const rec = (max1, max2, max3, char1, char2, char3) => {
            if (max1 < max2) {
                return rec(max2, max1, max3, char2, char1, char3);
            }
            if (max2 < max3) {
                return rec(max1, max3, max2, char1, char3, char2);
            }
            if (max2 === 0) {
                return Array(Math.min(2, max1)).fill(char1);
            }

            const use1 = Math.min(2, max1);
            const use2 = max1 - use1 >= max2 ? 1 : 0;

            const res = Array(use1).fill(char1).concat(Array(use2).fill(char2));
            return res.concat(
                rec(max1 - use1, max2 - use2, max3, char1, char2, char3),
            );
        };

        return rec(a, b, c, 'a', 'b', 'c').join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        return string.Join("", Rec(a, b, c, 'a', 'b', 'c'));
    }

    private List<char> Rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) return Rec(max2, max1, max3, char2, char1, char3);
        if (max2 < max3) return Rec(max1, max3, max2, char1, char3, char2);
        if (max2 == 0) {
            int use = Math.Min(2, max1);
            var res = new List<char>();
            for (int i = 0; i < use; i++) res.Add(char1);
            return res;
        }

        int use1 = Math.Min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        var result = new List<char>();
        for (int i = 0; i < use1; i++) result.Add(char1);
        for (int i = 0; i < use2; i++) result.Add(char2);

        result.AddRange(Rec(max1 - use1, max2 - use2, max3, char1, char2, char3));
        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(n)$ for recursion stack.
    - $O(n)$ space for the output string.
