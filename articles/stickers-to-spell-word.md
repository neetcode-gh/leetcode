## 1. Dynamic Programming (Top-Down) - I

::tabs-start

```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        stickCount = []
        for s in stickers:
            stickCount.append({})
            for c in s:
                stickCount[-1][c] = 1 + stickCount[-1].get(c, 0)

        dp = {}

        def dfs(t, stick):
            if t in dp:
                return dp[t]
            res = 1 if stick else 0
            remainT = ""
            for c in t:
                if c in stick and stick[c] > 0:
                    stick[c] -= 1
                else:
                    remainT += c
            if remainT:
                used = float("inf")
                for s in stickCount:
                    if remainT[0] not in s:
                        continue
                    used = min(used, dfs(remainT, s.copy()))
                dp[remainT] = used
                res += used
            return res

        res = dfs(target, {})
        return res if res != float("inf") else -1
```

```java
public class Solution {
    private List<Map<Character, Integer>> stickCount;
    private Map<String, Integer> dp;

    public int minStickers(String[] stickers, String target) {
        stickCount = new ArrayList<>();
        dp = new HashMap<>();

        for (String s : stickers) {
            Map<Character, Integer> countMap = new HashMap<>();
            for (char c : s.toCharArray()) {
                countMap.put(c, countMap.getOrDefault(c, 0) + 1);
            }
            stickCount.add(countMap);
        }

        int res = dfs(target, new HashMap<>());
        return res == Integer.MAX_VALUE ? -1 : res;
    }

    private int dfs(String t, Map<Character, Integer> stick) {
        if (t.isEmpty()) return 0;
        if (dp.containsKey(t)) return dp.get(t);

        int res = stick.isEmpty() ? 0 : 1;
        StringBuilder remainT = new StringBuilder();

        for (char c : t.toCharArray()) {
            if (stick.containsKey(c) && stick.get(c) > 0) {
                stick.put(c, stick.get(c) - 1);
            } else {
                remainT.append(c);
            }
        }

        if (remainT.length() > 0) {
            int used = Integer.MAX_VALUE;
            for (Map<Character, Integer> s : stickCount) {
                if (!s.containsKey(remainT.charAt(0))) continue;
                int curr = dfs(remainT.toString(), new HashMap<>(s));
                if (curr != Integer.MAX_VALUE) {
                    used = Math.min(used, curr);
                }
            }
            dp.put(remainT.toString(), used);
            if (used != Integer.MAX_VALUE && res != Integer.MAX_VALUE) {
                res += used;
            } else {
                res = Integer.MAX_VALUE;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
    vector<unordered_map<char, int>> stickCount;
    unordered_map<string, int> dp;

public:
    int minStickers(vector<string>& stickers, string target) {
        stickCount.clear();
        dp.clear();

        for (const string& s : stickers) {
            unordered_map<char, int> countMap;
            for (char c : s) {
                countMap[c]++;
            }
            stickCount.push_back(countMap);
        }

        int res = dfs(target, unordered_map<char, int>());
        return res == INT_MAX ? -1 : res;
    }

private:
    int dfs(const string& t, unordered_map<char, int> stick) {
        if (t.empty()) return 0;
        if (dp.count(t)) return dp[t];

        int res = stick.empty() ? 0 : 1;
        string remainT;

        for (char c : t) {
            if (stick.count(c) && stick[c] > 0) {
                stick[c]--;
            } else {
                remainT += c;
            }
        }

        if (!remainT.empty()) {
            int used = INT_MAX;
            for (const auto& s : stickCount) {
                if (!s.count(remainT[0])) continue;
                int curr = dfs(remainT, unordered_map<char, int>(s));
                if (curr != INT_MAX) {
                    used = min(used, curr);
                }
            }
            dp[remainT] = used;
            if (used != INT_MAX && res != INT_MAX) {
                res += used;
            } else {
                res = INT_MAX;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} stickers
     * @param {string} target
     * @return {number}
     */
    minStickers(stickers, target) {
        const stickCount = [];
        const dp = new Map();

        for (const s of stickers) {
            const countMap = new Map();
            for (const c of s) {
                countMap.set(c, (countMap.get(c) || 0) + 1);
            }
            stickCount.push(countMap);
        }

        const dfs = (t, stick) => {
            if (t === '') return 0;
            if (dp.has(t)) return dp.get(t);

            let res = stick.size === 0 ? 0 : 1;
            let remainT = '';

            for (const c of t) {
                if (stick.has(c) && stick.get(c) > 0) {
                    stick.set(c, stick.get(c) - 1);
                } else {
                    remainT += c;
                }
            }

            if (remainT.length > 0) {
                let used = Infinity;
                for (const s of stickCount) {
                    if (!s.has(remainT[0])) continue;
                    const newStick = new Map(s);
                    const curr = dfs(remainT, newStick);
                    used = Math.min(used, curr);
                }
                dp.set(remainT, used);
                if (used !== Infinity && res !== Infinity) {
                    res += used;
                } else {
                    res = Infinity;
                }
            }

            return res;
        };

        const res = dfs(target, new Map());
        return res === Infinity ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k *2 ^ n)$
- Space complexity: $O(m * k + 2 ^ n)$

> Where $n$ is the length of the target string, $m$ is the number of stickers and $k$ is the average length of each sticker.

---

## 2. Dynamic Programming (Top-Down) - II

::tabs-start

```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        tmp = [c for c in target]
        target = ''.join(sorted(tmp))
        stickCount = []
        for s in stickers:
            stickCount.append(Counter(s))

        dp = {}
        dp[""] = 0

        def dfs(t):
            if t in dp:
                return dp[t]

            tarMp = Counter(t)
            res = float("inf")
            for s in stickCount:
                if t[0] not in s:
                    continue
                remainT = []
                for c in tarMp:
                    if tarMp[c] > s[c]:
                        remainT.extend([c] * (tarMp[c] - s[c]))

                remainT = ''.join(sorted(remainT))
                res = min(res, 1 + dfs(remainT))

            dp[t] = res
            return res

        ans = dfs(target)
        return -1 if ans == float("inf") else ans
```

```java
public class Solution {
    private Map<String, Integer> dp = new HashMap<>();
    private List<Map<Character, Integer>> stickCount = new ArrayList<>();

    public int minStickers(String[] stickers, String target) {
        dp.put("", 0);
        for (String s : stickers) {
            Map<Character, Integer> counter = new HashMap<>();
            for (char c : s.toCharArray()) {
                counter.put(c, counter.getOrDefault(c, 0) + 1);
            }
            stickCount.add(counter);
        }
        char[] targetArray = target.toCharArray();
        Arrays.sort(targetArray);
        target = new String(targetArray);

        int ans = dfs(target);
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }

    private int dfs(String t) {
        if (dp.containsKey(t)) {
            return dp.get(t);
        }

        Map<Character, Integer> tarMp = new HashMap<>();
        for (char c : t.toCharArray()) {
            tarMp.put(c, tarMp.getOrDefault(c, 0) + 1);
        }

        int res = Integer.MAX_VALUE;
        for (Map<Character, Integer> s : stickCount) {
            if (!s.containsKey(t.charAt(0))) {
                continue;
            }

            StringBuilder remainT = new StringBuilder();
            for (Map.Entry<Character, Integer> entry : tarMp.entrySet()) {
                char c = entry.getKey();
                int need = entry.getValue() - s.getOrDefault(c, 0);
                for (int i = 0; i < Math.max(0, need); i++) {
                    remainT.append(c);
                }
            }
            char[] remainArray = remainT.toString().toCharArray();
            Arrays.sort(remainArray);
            int cur = dfs(new String(remainArray));
            if (cur == Integer.MAX_VALUE) cur--;
            res = Math.min(res, 1 + cur);
        }

        dp.put(t, res);
        return res;
    }
}
```

```cpp
class Solution {
private:
    unordered_map<string, int> dp;
    vector<unordered_map<char, int>> stickCount;

public:
    int minStickers(vector<string>& stickers, string target) {
        dp[""] = 0;
        for (const string& s : stickers) {
            unordered_map<char, int> counter;
            for (char c : s) {
                counter[c]++;
            }
            stickCount.push_back(counter);
        }

        sort(target.begin(), target.end());
        int ans = dfs(target);
        return ans == INT_MAX ? -1 : ans;
    }

    int dfs(const string& t) {
        if (dp.find(t) != dp.end()) {
            return dp[t];
        }

        unordered_map<char, int> tarMp;
        for (char c : t) {
            tarMp[c]++;
        }

        int res = INT_MAX;
        for (auto& s : stickCount) {
            if (s.find(t[0]) == s.end()) {
                continue;
            }

            string remainT;
            for (const auto& [c, count] : tarMp) {
                int need = count - (s.count(c) ? s.at(c) : 0);
                remainT.append(max(0, need), c);
            }

            sort(remainT.begin(), remainT.end());
            int cur = dfs(remainT);
            if (cur == INT_MAX) cur--;
            res = min(res, 1 + cur);
        }

        dp[t] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} stickers
     * @param {string} target
     * @return {number}
     */
    minStickers(stickers, target) {
        const dp = { '': 0 };
        const stickCount = stickers.map((s) => {
            const counter = {};
            for (const c of s) {
                counter[c] = (counter[c] || 0) + 1;
            }
            return counter;
        });

        const dfs = (t) => {
            if (dp[t] !== undefined) return dp[t];

            const tarMp = {};
            for (const c of t) {
                tarMp[c] = (tarMp[c] || 0) + 1;
            }

            let res = Infinity;
            for (const s of stickCount) {
                if (!s[t[0]]) continue;

                let remainT = [];
                for (const [c, count] of Object.entries(tarMp)) {
                    let need = count - (s[c] || 0);
                    while (need > 0) {
                        remainT.push(c);
                        need--;
                    }
                }

                remainT = remainT.sort().join('');
                res = Math.min(res, 1 + dfs(remainT));
            }

            dp[t] = res;
            return res;
        };

        const ans = dfs(target.split('').sort().join(''));
        return ans === Infinity ? -1 : ans;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k *2 ^ n)$
- Space complexity: $O(m * k + 2 ^ n)$

> Where $n$ is the length of the target string, $m$ is the number of stickers and $k$ is the average length of each sticker.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        n = len(target)
        N = 1 << n
        dp = [-1] * N
        dp[0] = 0

        for t in range(N):
            if dp[t] == -1:
                continue
            for s in stickers:
                nextT = t
                for c in s:
                    for i in range(n):
                        if target[i] == c and not ((nextT >> i) & 1):
                            nextT |= 1 << i
                            break
                if dp[nextT] == -1 or dp[nextT] > dp[t] + 1:
                    dp[nextT] = dp[t] + 1
        return dp[N - 1]
```

```java
public class Solution {
    public int minStickers(String[] stickers, String target) {
        int n = target.length();
        int N = 1 << n;
        int[] dp = new int[N];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int t = 0; t < N; t++) {
            if (dp[t] == -1) continue;
            for (String s : stickers) {
                int nextT = t;
                for (char c : s.toCharArray()) {
                    for (int i = 0; i < n; i++) {
                        if (target.charAt(i) == c && ((nextT >> i) & 1) == 0) {
                            nextT |= 1 << i;
                            break;
                        }
                    }
                }
                if (dp[nextT] == -1 || dp[nextT] > dp[t] + 1) {
                    dp[nextT] = dp[t] + 1;
                }
            }
        }

        return dp[N - 1];
    }
}
```

```cpp
class Solution {
public:
    int minStickers(vector<string>& stickers, string target) {
        int n = target.length();
        int N = 1 << n;
        vector<int> dp(N, -1);
        dp[0] = 0;

        for (int t = 0; t < N; t++) {
            if (dp[t] == -1) continue;
            for (string& s : stickers) {
                int nextT = t;
                for (char c : s) {
                    for (int i = 0; i < n; i++) {
                        if (target[i] == c && ((nextT >> i) & 1) == 0) {
                            nextT |= 1 << i;
                            break;
                        }
                    }
                }
                if (dp[nextT] == -1 || dp[nextT] > dp[t] + 1) {
                    dp[nextT] = dp[t] + 1;
                }
            }
        }

        return dp[N - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} stickers
     * @param {string} target
     * @return {number}
     */
    minStickers(stickers, target) {
        const n = target.length;
        const N = 1 << n;
        const dp = Array(N).fill(-1);
        dp[0] = 0;

        for (let t = 0; t < N; t++) {
            if (dp[t] === -1) continue;
            for (let s of stickers) {
                let nextT = t;
                for (let c of s) {
                    for (let i = 0; i < n; i++) {
                        if (target[i] === c && ((nextT >> i) & 1) === 0) {
                            nextT |= 1 << i;
                            break;
                        }
                    }
                }
                if (dp[nextT] === -1 || dp[nextT] > dp[t] + 1) {
                    dp[nextT] = dp[t] + 1;
                }
            }
        }

        return dp[N - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k *2 ^ n)$
- Space complexity: $O(2 ^ n)$

> Where $n$ is the length of the target string, $m$ is the number of stickers and $k$ is the average length of each sticker.
