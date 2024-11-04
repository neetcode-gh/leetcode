## 1. Brute Force

::tabs-start

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if t == "":
            return ""

        countT = {}
        for c in t:
            countT[c] = 1 + countT.get(c, 0)

        res, resLen = [-1, -1], float("infinity")
        for i in range(len(s)):
            countS = {}
            for j in range(i, len(s)):
                countS[s[j]] = 1 + countS.get(s[j], 0)

                flag = True
                for c in countT:
                    if countT[c] > countS.get(c, 0):
                        flag = False
                        break
                
                if flag and (j - i + 1) < resLen:
                    resLen = j - i + 1
                    res = [i, j]

        l, r = res
        return s[l : r + 1] if resLen != float("infinity") else ""
```

```java
public class Solution {
    public String minWindow(String s, String t) {
        if (t.isEmpty()) return "";

        Map<Character, Integer> countT = new HashMap<>();
        for (char c : t.toCharArray()) {
            countT.put(c, countT.getOrDefault(c, 0) + 1);
        }

        int[] res = {-1, -1};
        int resLen = Integer.MAX_VALUE;

        for (int i = 0; i < s.length(); i++) {
            Map<Character, Integer> countS = new HashMap<>();
            for (int j = i; j < s.length(); j++) {
                countS.put(s.charAt(j), countS.getOrDefault(s.charAt(j), 0) + 1);

                boolean flag = true;
                for (char c : countT.keySet()) {
                    if (countS.getOrDefault(c, 0) < countT.get(c)) {
                        flag = false;
                        break;
                    }
                }

                if (flag && (j - i + 1) < resLen) {
                    resLen = j - i + 1;
                    res[0] = i;
                    res[1] = j;
                }
            }
        }

        return resLen == Integer.MAX_VALUE ? "" : s.substring(res[0], res[1] + 1);
    }
}
```

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (t.empty()) return "";

        unordered_map<char, int> countT;
        for (char c : t) {
            countT[c]++;
        }

        pair<int, int> res = {-1, -1};
        int resLen = INT_MAX;

        for (int i = 0; i < s.length(); i++) {
            unordered_map<char, int> countS;
            for (int j = i; j < s.length(); j++) {
                countS[s[j]]++;

                bool flag = true;
                for (auto &[c, cnt] : countT) {
                    if (countS[c] < cnt) {
                        flag = false;
                        break;
                    }
                }

                if (flag && (j - i + 1) < resLen) {
                    resLen = j - i + 1;
                    res = {i, j};
                }
            }
        }

        return resLen == INT_MAX ? "" : s.substr(res.first, resLen);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        if (t === "") return "";

        let countT = {};
        for (let c of t) {
            countT[c] = (countT[c] || 0) + 1;
        }

        let res = [-1, -1];
        let resLen = Infinity;

        for (let i = 0; i < s.length; i++) {
            let countS = {};
            for (let j = i; j < s.length; j++) {
                countS[s[j]] = (countS[s[j]] || 0) + 1;

                let flag = true;
                for (let c in countT) {
                    if ((countS[c] || 0) < countT[c]) {
                        flag = false;
                        break;
                    }
                }

                if (flag && (j - i + 1) < resLen) {
                    resLen = j - i + 1;
                    res = [i, j];
                }
            }
        }

        return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
    }
}
```

```csharp
public class Solution {
    public string MinWindow(string s, string t) {
        if (t == "") return "";

        Dictionary<char, int> countT = new Dictionary<char, int>();
        foreach (char c in t) {
            if (countT.ContainsKey(c)) {
                countT[c]++;
            } else {
                countT[c] = 1;
            }
        }

        int[] res = { -1, -1 };
        int resLen = int.MaxValue;

        for (int i = 0; i < s.Length; i++) {
            Dictionary<char, int> countS = new Dictionary<char, int>();
            for (int j = i; j < s.Length; j++) {
                if (countS.ContainsKey(s[j])) {
                    countS[s[j]]++;
                } else {
                    countS[s[j]] = 1;
                }

                bool flag = true;
                foreach (var c in countT.Keys) {
                    if (!countS.ContainsKey(c) || countS[c] < countT[c]) {
                        flag = false;
                        break;
                    }
                }

                if (flag && (j - i + 1) < resLen) {
                    resLen = j - i + 1;
                    res[0] = i;
                    res[1] = j;
                }
            }
        }

        return resLen == int.MaxValue ? "" : s.Substring(res[0], resLen);
    }
}
```

```go
func minWindow(s string, t string) string {
	if t == "" {
		return ""
	}

	countT := make(map[rune]int)
	for _, c := range t {
		countT[c]++
	}

	res := []int{-1, -1}
	resLen := int(^uint(0) >> 1) 
	for i := 0; i < len(s); i++ {
		countS := make(map[rune]int)
		for j := i; j < len(s); j++ {
			countS[rune(s[j])]++

			flag := true
			for c, cnt := range countT {
				if cnt > countS[c] {
					flag = false
					break
				}
			}

			if flag && (j-i+1) < resLen {
				resLen = j - i + 1
				res = []int{i, j}
			}
		}
	}

	if res[0] == -1 {
		return ""
	}
	return s[res[0]:res[1]+1]
}
```

```kotlin
class Solution {
    fun minWindow(s: String, t: String): String {
        if (t.isEmpty()) return ""

        val countT = HashMap<Char, Int>()
        for (c in t) {
            countT[c] = countT.getOrDefault(c, 0) + 1
        }

        var res = IntArray(2) {-1}
        var resLen = Int.MAX_VALUE
        
        for (i in s.indices) {
            val countS = HashMap<Char, Int>()
            for (j in i until s.length) {
                countS[s[j]] = countS.getOrDefault(s[j], 0) + 1

                var flag = true
                for (c in countT.keys) {
                    if (countT[c]!! > countS.getOrDefault(c, 0)) {
                        flag = false
                        break
                    }
                }

                if (flag && (j - i + 1) < resLen) {
                    resLen = j - i + 1
                    res[0] = i
                    res[1] = j
                }
            }
        }

        return if (res[0] == -1) "" else s.substring(res[0], res[1] + 1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique characters in the strings $t$ and $s$.

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if t == "":
            return ""

        countT, window = {}, {}
        for c in t:
            countT[c] = 1 + countT.get(c, 0)

        have, need = 0, len(countT)
        res, resLen = [-1, -1], float("infinity")
        l = 0
        for r in range(len(s)):
            c = s[r]
            window[c] = 1 + window.get(c, 0)

            if c in countT and window[c] == countT[c]:
                have += 1

            while have == need:
                if (r - l + 1) < resLen:
                    res = [l, r]
                    resLen = r - l + 1
                    
                window[s[l]] -= 1
                if s[l] in countT and window[s[l]] < countT[s[l]]:
                    have -= 1
                l += 1
        l, r = res
        return s[l : r + 1] if resLen != float("infinity") else ""
```

```java
public class Solution {
    public String minWindow(String s, String t) {
        if (t.isEmpty()) return "";

        Map<Character, Integer> countT = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();
        for (char c : t.toCharArray()) {
            countT.put(c, countT.getOrDefault(c, 0) + 1);
        }

        int have = 0, need = countT.size();
        int[] res = {-1, -1};
        int resLen = Integer.MAX_VALUE;
        int l = 0;

        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            window.put(c, window.getOrDefault(c, 0) + 1);

            if (countT.containsKey(c) && window.get(c).equals(countT.get(c))) {
                have++;
            }

            while (have == need) {
                if ((r - l + 1) < resLen) {
                    resLen = r - l + 1;
                    res[0] = l;
                    res[1] = r;
                }

                char leftChar = s.charAt(l);
                window.put(leftChar, window.get(leftChar) - 1);
                if (countT.containsKey(leftChar) && window.get(leftChar) < countT.get(leftChar)) {
                    have--;
                }
                l++;
            }
        }

        return resLen == Integer.MAX_VALUE ? "" : s.substring(res[0], res[1] + 1);
    }
}
```

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (t.empty()) return "";

        unordered_map<char, int> countT, window;
        for (char c : t) {
            countT[c]++;
        }

        int have = 0, need = countT.size();
        pair<int, int> res = {-1, -1};
        int resLen = INT_MAX;
        int l = 0;

        for (int r = 0; r < s.length(); r++) {
            char c = s[r];
            window[c]++;

            if (countT.count(c) && window[c] == countT[c]) {
                have++;
            }

            while (have == need) {
                if ((r - l + 1) < resLen) {
                    resLen = r - l + 1;
                    res = {l, r};
                }

                window[s[l]]--;
                if (countT.count(s[l]) && window[s[l]] < countT[s[l]]) {
                    have--;
                }
                l++;
            }
        }

        return resLen == INT_MAX ? "" : s.substr(res.first, resLen);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        if (t === "") return "";

        let countT = {};
        let window = {};
        for (let c of t) {
            countT[c] = (countT[c] || 0) + 1;
        }

        let have = 0, need = Object.keys(countT).length;
        let res = [-1, -1];
        let resLen = Infinity;
        let l = 0;

        for (let r = 0; r < s.length; r++) {
            let c = s[r];
            window[c] = (window[c] || 0) + 1;

            if (countT[c] && window[c] === countT[c]) {
                have++;
            }

            while (have === need) {
                if ((r - l + 1) < resLen) {
                    resLen = r - l + 1;
                    res = [l, r];
                }

                window[s[l]]--;
                if (countT[s[l]] && window[s[l]] < countT[s[l]]) {
                    have--;
                }
                l++;
            }
        }

        return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
    }
}
```

```csharp
public class Solution {
    public string MinWindow(string s, string t) {
        if (t == "") return "";

        Dictionary<char, int> countT = new Dictionary<char, int>();
        Dictionary<char, int> window = new Dictionary<char, int>();

        foreach (char c in t) {
            if (countT.ContainsKey(c)) {
                countT[c]++;
            } else {
                countT[c] = 1;
            }
        }

        int have = 0, need = countT.Count;
        int[] res = { -1, -1 };
        int resLen = int.MaxValue;
        int l = 0;

        for (int r = 0; r < s.Length; r++) {
            char c = s[r];
            if (window.ContainsKey(c)) {
                window[c]++;
            } else {
                window[c] = 1;
            }

            if (countT.ContainsKey(c) && window[c] == countT[c]) {
                have++;
            }

            while (have == need) {
                if ((r - l + 1) < resLen) {
                    resLen = r - l + 1;
                    res[0] = l;
                    res[1] = r;
                }

                char leftChar = s[l];
                window[leftChar]--;
                if (countT.ContainsKey(leftChar) && window[leftChar] < countT[leftChar]) {
                    have--;
                }
                l++;
            }
        }

        return resLen == int.MaxValue ? "" : s.Substring(res[0], resLen);
    }
}
```

```go
func minWindow(s string, t string) string {
	if t == "" {
		return ""
	}

	countT := make(map[rune]int)
	for _, c := range t {
		countT[c]++
	}

	have, need := 0, len(countT)
	res := []int{-1, -1}
	resLen := math.MaxInt32
	l := 0
	window := make(map[rune]int)

	for r := 0; r < len(s); r++ {
		c := rune(s[r])
		window[c]++

		if countT[c] > 0 && window[c] == countT[c] {
			have++
		}

		for have == need {
			if (r - l + 1) < resLen {
				res = []int{l, r}
				resLen = r - l + 1
			}

			window[rune(s[l])]--
			if countT[rune(s[l])] > 0 && window[rune(s[l])] < countT[rune(s[l])] {
				have--
			}
			l++
		}
	}

	if res[0] == -1 {
		return ""
	}
	return s[res[0]:res[1]+1]
}
```

```kotlin
class Solution {
    fun minWindow(s: String, t: String): String {
        if (t.isEmpty()) return ""

        val countT = HashMap<Char, Int>()
        for (c in t) {
            countT[c] = countT.getOrDefault(c, 0) + 1
        }

        var have = 0
        val need = countT.size
        val res = IntArray(2) {-1}
        var resLen = Int.MAX_VALUE
        var l = 0
        val window = HashMap<Char, Int>()

        for (r in s.indices) {
            val c = s[r]
            window[c] = window.getOrDefault(c, 0) + 1

            if (countT.containsKey(c) && window[c] == countT[c]) {
                have++
            }

            while (have == need) {
                if ((r - l + 1) < resLen) {
                    res[0] = l
                    res[1] = r
                    resLen = r - l + 1
                }

                window[s[l]] = window.getOrDefault(s[l], 0) - 1
                if (countT.containsKey(s[l]) && (window[s[l]] ?: 0) < countT[s[l]]!!) {
                    have--
                }
                l++
            }
        }

        return if (res[0] == -1) "" else s.substring(res[0], res[1] + 1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the total number of unique characters in the strings $t$ and $s$.