## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming (Memoization)** - The core technique used to avoid recomputing subproblems when exploring different sticker combinations
- **Hash Maps / Frequency Counting** - Used to track character counts in stickers and remaining target characters
- **Recursion with State** - Building solutions by recursively trying different sticker choices
- **Bitmask DP (for bottom-up approach)** - Representing which characters have been covered using binary representation

---

## 1. Dynamic Programming (Top-Down) - I

### Intuition

We need to find the minimum number of stickers to spell the target string, where each sticker can be used multiple times. This is a classic memoization problem where we track which characters from the target still need to be covered. At each step, we pick a sticker that can help (contains the first remaining character) and recursively solve for the remaining characters.

### Algorithm

1. Preprocess each sticker into a character frequency map.
2. Use memoization with the remaining target string as the key.
3. For the current state, use the provided sticker's characters to cover as many target characters as possible, building a remaining target string.
4. If characters remain, try each sticker that contains the first remaining character and recursively find the minimum.
5. Cache and return the result (`1` for using current sticker plus the minimum for remaining).
6. Return `-1` if no valid solution exists.

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

```csharp
public class Solution {
    private List<Dictionary<char, int>> stickCount;
    private Dictionary<string, int> dp;

    public int MinStickers(string[] stickers, string target) {
        stickCount = new List<Dictionary<char, int>>();
        dp = new Dictionary<string, int>();

        foreach (var s in stickers) {
            var countMap = new Dictionary<char, int>();
            foreach (var c in s) {
                if (!countMap.ContainsKey(c)) countMap[c] = 0;
                countMap[c]++;
            }
            stickCount.Add(countMap);
        }

        int res = Dfs(target, new Dictionary<char, int>());
        return res == int.MaxValue ? -1 : res;
    }

    private int Dfs(string t, Dictionary<char, int> stick) {
        if (t.Length == 0) return 0;
        if (dp.ContainsKey(t)) return dp[t];

        int res = stick.Count == 0 ? 0 : 1;
        var remainT = new System.Text.StringBuilder();

        foreach (var c in t) {
            if (stick.ContainsKey(c) && stick[c] > 0) {
                stick[c]--;
            } else {
                remainT.Append(c);
            }
        }

        if (remainT.Length > 0) {
            int used = int.MaxValue;
            foreach (var s in stickCount) {
                if (!s.ContainsKey(remainT[0])) continue;
                int curr = Dfs(remainT.ToString(), new Dictionary<char, int>(s));
                if (curr != int.MaxValue) {
                    used = Math.Min(used, curr);
                }
            }
            dp[remainT.ToString()] = used;
            if (used != int.MaxValue && res != int.MaxValue) {
                res += used;
            } else {
                res = int.MaxValue;
            }
        }

        return res;
    }
}
```

```go
func minStickers(stickers []string, target string) int {
    stickCount := make([]map[byte]int, len(stickers))
    for i, s := range stickers {
        stickCount[i] = make(map[byte]int)
        for j := 0; j < len(s); j++ {
            stickCount[i][s[j]]++
        }
    }

    dp := make(map[string]int)

    var dfs func(t string, stick map[byte]int) int
    dfs = func(t string, stick map[byte]int) int {
        if len(t) == 0 {
            return 0
        }
        if val, ok := dp[t]; ok {
            return val
        }

        res := 0
        if len(stick) > 0 {
            res = 1
        }
        remainT := ""

        for i := 0; i < len(t); i++ {
            c := t[i]
            if stick[c] > 0 {
                stick[c]--
            } else {
                remainT += string(c)
            }
        }

        if len(remainT) > 0 {
            used := math.MaxInt32
            for _, s := range stickCount {
                if _, ok := s[remainT[0]]; !ok {
                    continue
                }
                newStick := make(map[byte]int)
                for k, v := range s {
                    newStick[k] = v
                }
                curr := dfs(remainT, newStick)
                if curr != math.MaxInt32 {
                    used = min(used, curr)
                }
            }
            dp[remainT] = used
            if used != math.MaxInt32 && res != math.MaxInt32 {
                res += used
            } else {
                res = math.MaxInt32
            }
        }

        return res
    }

    result := dfs(target, make(map[byte]int))
    if result == math.MaxInt32 {
        return -1
    }
    return result
}
```

```kotlin
class Solution {
    private lateinit var stickCount: List<MutableMap<Char, Int>>
    private lateinit var dp: MutableMap<String, Int>

    fun minStickers(stickers: Array<String>, target: String): Int {
        stickCount = stickers.map { s ->
            val countMap = mutableMapOf<Char, Int>()
            for (c in s) {
                countMap[c] = countMap.getOrDefault(c, 0) + 1
            }
            countMap
        }
        dp = mutableMapOf()

        val res = dfs(target, mutableMapOf())
        return if (res == Int.MAX_VALUE) -1 else res
    }

    private fun dfs(t: String, stick: MutableMap<Char, Int>): Int {
        if (t.isEmpty()) return 0
        dp[t]?.let { return it }

        var res = if (stick.isEmpty()) 0 else 1
        val remainT = StringBuilder()

        for (c in t) {
            if ((stick[c] ?: 0) > 0) {
                stick[c] = stick[c]!! - 1
            } else {
                remainT.append(c)
            }
        }

        if (remainT.isNotEmpty()) {
            var used = Int.MAX_VALUE
            for (s in stickCount) {
                if (!s.containsKey(remainT[0])) continue
                val curr = dfs(remainT.toString(), s.toMutableMap())
                if (curr != Int.MAX_VALUE) {
                    used = minOf(used, curr)
                }
            }
            dp[remainT.toString()] = used
            res = if (used != Int.MAX_VALUE && res != Int.MAX_VALUE) {
                res + used
            } else {
                Int.MAX_VALUE
            }
        }

        return res
    }
}
```

```swift
class Solution {
    private var stickCount = [[Character: Int]]()
    private var dp = [String: Int]()

    func minStickers(_ stickers: [String], _ target: String) -> Int {
        stickCount = stickers.map { s in
            var countMap = [Character: Int]()
            for c in s {
                countMap[c, default: 0] += 1
            }
            return countMap
        }
        dp = [:]

        let res = dfs(target, [:])
        return res == Int.max ? -1 : res
    }

    private func dfs(_ t: String, _ stick: [Character: Int]) -> Int {
        if t.isEmpty { return 0 }
        if let cached = dp[t] { return cached }

        var stick = stick
        var res = stick.isEmpty ? 0 : 1
        var remainT = ""

        for c in t {
            if let count = stick[c], count > 0 {
                stick[c] = count - 1
            } else {
                remainT.append(c)
            }
        }

        if !remainT.isEmpty {
            var used = Int.max
            let firstChar = remainT.first!
            for s in stickCount {
                guard s[firstChar] != nil else { continue }
                let curr = dfs(remainT, s)
                if curr != Int.max {
                    used = min(used, curr)
                }
            }
            dp[remainT] = used
            if used != Int.max && res != Int.max {
                res += used
            } else {
                res = Int.max
            }
        }

        return res
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

### Intuition

This approach improves on the previous one by sorting the target string. When we sort the target, strings with the same character composition map to the same state, reducing the number of unique states. Instead of tracking the exact order of remaining characters, we only care about which characters and how many of each are needed.

### Algorithm

1. Sort the target string to normalize character order.
2. Create frequency maps for each sticker.
3. Use memoization with the sorted remaining string as the key.
4. For each recursive call, build a frequency map of the current target.
5. Try each sticker containing the first character. Subtract sticker characters from target frequency and build the remaining string.
6. Sort the remaining string and recurse.
7. Return `1` plus the minimum result from all valid sticker choices.

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

```csharp
public class Solution {
    private Dictionary<string, int> dp = new Dictionary<string, int>();
    private List<Dictionary<char, int>> stickCount = new List<Dictionary<char, int>>();

    public int MinStickers(string[] stickers, string target) {
        dp[""] = 0;
        foreach (var s in stickers) {
            var counter = new Dictionary<char, int>();
            foreach (var c in s) {
                if (!counter.ContainsKey(c)) counter[c] = 0;
                counter[c]++;
            }
            stickCount.Add(counter);
        }

        char[] targetArray = target.ToCharArray();
        Array.Sort(targetArray);
        target = new string(targetArray);

        int ans = Dfs(target);
        return ans == int.MaxValue ? -1 : ans;
    }

    private int Dfs(string t) {
        if (dp.ContainsKey(t)) return dp[t];

        var tarMp = new Dictionary<char, int>();
        foreach (var c in t) {
            if (!tarMp.ContainsKey(c)) tarMp[c] = 0;
            tarMp[c]++;
        }

        int res = int.MaxValue;
        foreach (var s in stickCount) {
            if (!s.ContainsKey(t[0])) continue;

            var remainT = new System.Text.StringBuilder();
            foreach (var entry in tarMp) {
                char c = entry.Key;
                int need = entry.Value - (s.ContainsKey(c) ? s[c] : 0);
                for (int i = 0; i < Math.Max(0, need); i++) {
                    remainT.Append(c);
                }
            }
            char[] remainArray = remainT.ToString().ToCharArray();
            Array.Sort(remainArray);
            int cur = Dfs(new string(remainArray));
            if (cur == int.MaxValue) cur--;
            res = Math.Min(res, 1 + cur);
        }

        dp[t] = res;
        return res;
    }
}
```

```go
func minStickers(stickers []string, target string) int {
    dp := make(map[string]int)
    dp[""] = 0

    stickCount := make([]map[byte]int, len(stickers))
    for i, s := range stickers {
        stickCount[i] = make(map[byte]int)
        for j := 0; j < len(s); j++ {
            stickCount[i][s[j]]++
        }
    }

    targetBytes := []byte(target)
    sort.Slice(targetBytes, func(i, j int) bool { return targetBytes[i] < targetBytes[j] })
    target = string(targetBytes)

    var dfs func(t string) int
    dfs = func(t string) int {
        if val, ok := dp[t]; ok {
            return val
        }

        tarMp := make(map[byte]int)
        for i := 0; i < len(t); i++ {
            tarMp[t[i]]++
        }

        res := math.MaxInt32
        for _, s := range stickCount {
            if _, ok := s[t[0]]; !ok {
                continue
            }

            remainT := []byte{}
            for c, count := range tarMp {
                need := count - s[c]
                for i := 0; i < max(0, need); i++ {
                    remainT = append(remainT, c)
                }
            }

            sort.Slice(remainT, func(i, j int) bool { return remainT[i] < remainT[j] })
            cur := dfs(string(remainT))
            if cur == math.MaxInt32 {
                cur--
            }
            res = min(res, 1+cur)
        }

        dp[t] = res
        return res
    }

    ans := dfs(target)
    if ans == math.MaxInt32 {
        return -1
    }
    return ans
}
```

```kotlin
class Solution {
    private val dp = mutableMapOf<String, Int>()
    private lateinit var stickCount: List<Map<Char, Int>>

    fun minStickers(stickers: Array<String>, target: String): Int {
        dp[""] = 0
        stickCount = stickers.map { s ->
            val counter = mutableMapOf<Char, Int>()
            for (c in s) {
                counter[c] = counter.getOrDefault(c, 0) + 1
            }
            counter
        }

        val sortedTarget = target.toCharArray().sorted().joinToString("")
        val ans = dfs(sortedTarget)
        return if (ans == Int.MAX_VALUE) -1 else ans
    }

    private fun dfs(t: String): Int {
        dp[t]?.let { return it }

        val tarMp = mutableMapOf<Char, Int>()
        for (c in t) {
            tarMp[c] = tarMp.getOrDefault(c, 0) + 1
        }

        var res = Int.MAX_VALUE
        for (s in stickCount) {
            if (!s.containsKey(t[0])) continue

            val remainT = StringBuilder()
            for ((c, count) in tarMp) {
                val need = count - (s[c] ?: 0)
                repeat(maxOf(0, need)) {
                    remainT.append(c)
                }
            }

            val sortedRemain = remainT.toString().toCharArray().sorted().joinToString("")
            var cur = dfs(sortedRemain)
            if (cur == Int.MAX_VALUE) cur--
            res = minOf(res, 1 + cur)
        }

        dp[t] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp = [String: Int]()
    private var stickCount = [[Character: Int]]()

    func minStickers(_ stickers: [String], _ target: String) -> Int {
        dp[""] = 0
        stickCount = stickers.map { s in
            var counter = [Character: Int]()
            for c in s {
                counter[c, default: 0] += 1
            }
            return counter
        }

        let sortedTarget = String(target.sorted())
        let ans = dfs(sortedTarget)
        return ans == Int.max ? -1 : ans
    }

    private func dfs(_ t: String) -> Int {
        if let cached = dp[t] { return cached }

        var tarMp = [Character: Int]()
        for c in t {
            tarMp[c, default: 0] += 1
        }

        var res = Int.max
        for s in stickCount {
            guard s[t.first!] != nil else { continue }

            var remainT = [Character]()
            for (c, count) in tarMp {
                let need = count - (s[c] ?? 0)
                for _ in 0..<max(0, need) {
                    remainT.append(c)
                }
            }

            let sortedRemain = String(remainT.sorted())
            var cur = dfs(sortedRemain)
            if cur == Int.max { cur -= 1 }
            res = min(res, 1 + cur)
        }

        dp[t] = res
        return res
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

### Intuition

We can represent the state as a bitmask where each bit indicates whether a character in the target has been covered. Starting from state `0` (no characters covered), we iterate through all states and for each sticker, compute which new state we can reach. This bottom-up approach systematically explores all possible ways to build the target.

### Algorithm

1. Initialize a DP array of size `2^n` (where `n` is target length), all set to `-1` except `dp[0] = 0`.
2. Iterate through all states from `0` to `2^n - 1`.
3. For each reachable state (`dp[t] != -1`), try applying each sticker.
4. For each sticker, compute the next state by marking which target characters get covered.
5. Update `dp[nextState]` to be the minimum of its current value and `dp[t] + 1`.
6. Return `dp[2^n - 1]`, which represents all characters covered.

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

```csharp
public class Solution {
    public int MinStickers(string[] stickers, string target) {
        int n = target.Length;
        int N = 1 << n;
        int[] dp = new int[N];
        Array.Fill(dp, -1);
        dp[0] = 0;

        for (int t = 0; t < N; t++) {
            if (dp[t] == -1) continue;
            foreach (string s in stickers) {
                int nextT = t;
                foreach (char c in s) {
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
}
```

```go
func minStickers(stickers []string, target string) int {
    n := len(target)
    N := 1 << n
    dp := make([]int, N)
    for i := range dp {
        dp[i] = -1
    }
    dp[0] = 0

    for t := 0; t < N; t++ {
        if dp[t] == -1 {
            continue
        }
        for _, s := range stickers {
            nextT := t
            for _, c := range s {
                for i := 0; i < n; i++ {
                    if rune(target[i]) == c && ((nextT >> i) & 1) == 0 {
                        nextT |= 1 << i
                        break
                    }
                }
            }
            if dp[nextT] == -1 || dp[nextT] > dp[t]+1 {
                dp[nextT] = dp[t] + 1
            }
        }
    }

    return dp[N-1]
}
```

```kotlin
class Solution {
    fun minStickers(stickers: Array<String>, target: String): Int {
        val n = target.length
        val N = 1 shl n
        val dp = IntArray(N) { -1 }
        dp[0] = 0

        for (t in 0 until N) {
            if (dp[t] == -1) continue
            for (s in stickers) {
                var nextT = t
                for (c in s) {
                    for (i in 0 until n) {
                        if (target[i] == c && ((nextT shr i) and 1) == 0) {
                            nextT = nextT or (1 shl i)
                            break
                        }
                    }
                }
                if (dp[nextT] == -1 || dp[nextT] > dp[t] + 1) {
                    dp[nextT] = dp[t] + 1
                }
            }
        }

        return dp[N - 1]
    }
}
```

```swift
class Solution {
    func minStickers(_ stickers: [String], _ target: String) -> Int {
        let target = Array(target)
        let n = target.count
        let N = 1 << n
        var dp = [Int](repeating: -1, count: N)
        dp[0] = 0

        for t in 0..<N {
            if dp[t] == -1 { continue }
            for s in stickers {
                var nextT = t
                for c in s {
                    for i in 0..<n {
                        if target[i] == c && ((nextT >> i) & 1) == 0 {
                            nextT |= 1 << i
                            break
                        }
                    }
                }
                if dp[nextT] == -1 || dp[nextT] > dp[t] + 1 {
                    dp[nextT] = dp[t] + 1
                }
            }
        }

        return dp[N - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k *2 ^ n)$
- Space complexity: $O(2 ^ n)$

> Where $n$ is the length of the target string, $m$ is the number of stickers and $k$ is the average length of each sticker.

---

## Common Pitfalls

### Forgetting That Stickers Can Be Reused

A common mistake is treating each sticker as a one-time use item. The problem explicitly states that stickers can be used infinitely many times. Your solution must allow revisiting the same sticker multiple times to cover repeated characters in the target.

### Inefficient State Representation

Using the raw target string as the memoization key without normalization leads to redundant computation. Two different orderings of remaining characters (e.g., "abc" and "bac") represent the same problem state. Sorting the remaining string or using character frequency counts as the key significantly reduces the state space.

### Not Pruning Useless Stickers

Trying every sticker at each step without filtering wastes time. If a sticker does not contain the first remaining character of the target, it cannot make progress toward completion. Always check that a sticker can contribute before recursing with it.

### Incorrect Handling of the Impossible Case

Failing to detect when the target cannot be spelled leads to incorrect results or infinite loops. Before starting, verify that every character in the target appears in at least one sticker. During recursion, properly propagate infinity values when no valid solution exists for a subproblem.

### Mutating Shared Data Structures

Modifying the sticker's character count map in place without creating a copy causes incorrect results across recursive branches. Always work with a fresh copy of the frequency map when simulating the use of a sticker to avoid corrupting state for sibling recursive calls.
