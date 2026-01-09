## 1. Custom Comparator

::tabs-start

```python
class Solution:
    def customSortString(self, order: str, s: str) -> str:
        rank = {c: i for i, c in enumerate(order)}
        return ''.join(sorted(s, key=lambda c: rank.get(c, 26)))
```

```java
public class Solution {
    public String customSortString(String order, String s) {
        int[] rank = new int[26];
        for (int i = 0; i < order.length(); i++) {
            rank[order.charAt(i) - 'a'] = i + 1;
        }

        Character[] arr = new Character[s.length()];
        for (int i = 0; i < s.length(); i++) {
            arr[i] = s.charAt(i);
        }

        Arrays.sort(arr, (a, b) -> rank[a - 'a'] - rank[b - 'a']);

        StringBuilder sb = new StringBuilder();
        for (char c : arr) {
            sb.append(c);
        }
        return sb.toString();
    }
}
```

```cpp
class Solution {
public:
    string customSortString(string order, string s) {
        vector<int> rank(26, 26);
        for (int i = 0; i < order.size(); ++i) {
            rank[order[i] - 'a'] = i;
        }

        sort(s.begin(), s.end(), [&](char a, char b) {
            return rank[a - 'a'] < rank[b - 'a'];
        });

        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} order
     * @param {string} s
     * @return {string}
     */
    customSortString(order, s) {
        const rank = {};
        for (let i = 0; i < order.length; i++) {
            rank[order[i]] = i;
        }

        return [...s].sort((a, b) => {
            const ra = rank[a] ?? 26;
            const rb = rank[b] ?? 26;
            return ra - rb;
        }).join('');
    }
}
```

```csharp
public class Solution {
    public string CustomSortString(string order, string s) {
        Dictionary<char, int> rank = new Dictionary<char, int>();
        for (int i = 0; i < order.Length; i++) {
            rank[order[i]] = i;
        }

        char[] arr = s.ToCharArray();
        Array.Sort(arr, (a, b) => {
            int ra = rank.ContainsKey(a) ? rank[a] : 26;
            int rb = rank.ContainsKey(b) ? rank[b] : 26;
            return ra - rb;
        });

        return new string(arr);
    }
}
```

```go
func customSortString(order string, s string) string {
    rank := make(map[byte]int)
    for i := 0; i < len(order); i++ {
        rank[order[i]] = i
    }

    arr := []byte(s)
    sort.Slice(arr, func(i, j int) bool {
        ri, oki := rank[arr[i]]
        rj, okj := rank[arr[j]]
        if !oki {
            ri = 26
        }
        if !okj {
            rj = 26
        }
        return ri < rj
    })

    return string(arr)
}
```

```kotlin
class Solution {
    fun customSortString(order: String, s: String): String {
        val rank = mutableMapOf<Char, Int>()
        for (i in order.indices) {
            rank[order[i]] = i
        }

        return s.toCharArray()
            .sortedBy { rank.getOrDefault(it, 26) }
            .joinToString("")
    }
}
```

```swift
class Solution {
    func customSortString(_ order: String, _ s: String) -> String {
        var rank = [Character: Int]()
        for (i, c) in order.enumerated() {
            rank[c] = i
        }

        return String(s.sorted { rank[$0, default: 26] < rank[$1, default: 26] })
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Frequency Count

::tabs-start

```python
class Solution:
    def customSortString(self, order: str, s: str) -> str:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1

        res = []
        for c in order:
            idx = ord(c) - ord('a')
            while count[idx]:
                res.append(c)
                count[idx] -= 1

        for idx in range(26):
            c = chr(ord('a') + idx)
            while count[idx]:
                count[idx] -= 1
                res.append(c)

        return ''.join(res)
```

```java
public class Solution {
    public String customSortString(String order, String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) {
            count[c - 'a']++;
        }

        StringBuilder res = new StringBuilder();
        for (char c : order.toCharArray()) {
            int idx = c - 'a';
            while (count[idx] > 0) {
                res.append(c);
                count[idx]--;
            }
        }

        for (int idx = 0; idx < 26; idx++) {
            char c = (char) ('a' + idx);
            while (count[idx] > 0) {
                res.append(c);
                count[idx]--;
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string customSortString(string order, string s) {
        vector<int> count(26, 0);
        for (char c : s) {
            count[c - 'a']++;
        }

        string res;
        for (char c : order) {
            int idx = c - 'a';
            while (count[idx] > 0) {
                res += c;
                count[idx]--;
            }
        }

        for (int idx = 0; idx < 26; ++idx) {
            char c = 'a' + idx;
            while (count[idx] > 0) {
                res += c;
                count[idx]--;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} order
     * @param {string} s
     * @return {string}
     */
    customSortString(order, s) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 97]++;
        }

        const res = [];
        for (let c of order) {
            let idx = c.charCodeAt(0) - 97;
            while (count[idx] > 0) {
                res.push(c);
                count[idx]--;
            }
        }

        for (let idx = 0; idx < 26; idx++) {
            let c = String.fromCharCode(97 + idx);
            while (count[idx] > 0) {
                res.push(c);
                count[idx]--;
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string CustomSortString(string order, string s) {
        int[] count = new int[26];
        foreach (char c in s) {
            count[c - 'a']++;
        }

        StringBuilder res = new StringBuilder();
        foreach (char c in order) {
            int idx = c - 'a';
            while (count[idx] > 0) {
                res.Append(c);
                count[idx]--;
            }
        }

        for (int idx = 0; idx < 26; idx++) {
            char c = (char)('a' + idx);
            while (count[idx] > 0) {
                res.Append(c);
                count[idx]--;
            }
        }

        return res.ToString();
    }
}
```

```go
func customSortString(order string, s string) string {
    count := make([]int, 26)
    for i := 0; i < len(s); i++ {
        count[s[i]-'a']++
    }

    var res []byte
    for i := 0; i < len(order); i++ {
        idx := order[i] - 'a'
        for count[idx] > 0 {
            res = append(res, order[i])
            count[idx]--
        }
    }

    for idx := 0; idx < 26; idx++ {
        c := byte('a' + idx)
        for count[idx] > 0 {
            res = append(res, c)
            count[idx]--
        }
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun customSortString(order: String, s: String): String {
        val count = IntArray(26)
        for (c in s) {
            count[c - 'a']++
        }

        val res = StringBuilder()
        for (c in order) {
            val idx = c - 'a'
            while (count[idx] > 0) {
                res.append(c)
                count[idx]--
            }
        }

        for (idx in 0 until 26) {
            val c = ('a' + idx)
            while (count[idx] > 0) {
                res.append(c)
                count[idx]--
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func customSortString(_ order: String, _ s: String) -> String {
        var count = [Int](repeating: 0, count: 26)
        for c in s {
            count[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        var res = ""
        for c in order {
            let idx = Int(c.asciiValue! - Character("a").asciiValue!)
            while count[idx] > 0 {
                res.append(c)
                count[idx] -= 1
            }
        }

        for idx in 0..<26 {
            let c = Character(UnicodeScalar(Int(Character("a").asciiValue!) + idx)!)
            while count[idx] > 0 {
                res.append(c)
                count[idx] -= 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$