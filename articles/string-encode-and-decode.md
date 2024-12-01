## 1. Encoding & Decoding

::tabs-start

```python
class Solution:
    def encode(self, strs: List[str]) -> str:
        if not strs:
            return ""
        sizes, res = [], ""
        for s in strs:
            sizes.append(len(s))
        for sz in sizes:
            res += str(sz)
            res += ','
        res += '#'
        for s in strs:
            res += s
        return res

    def decode(self, s: str) -> List[str]:
        if not s:
            return []
        sizes, res, i = [], [], 0
        while s[i] != '#':
            cur = ""
            while s[i] != ',':
                cur += s[i]
                i += 1
            sizes.append(int(cur))
            i += 1
        i += 1
        for sz in sizes:
            res.append(s[i:i + sz])
            i += sz
        return res
```

```java
public class Solution {
    
    public String encode(List<String> strs) {
        if (strs.isEmpty()) return "";
        StringBuilder res = new StringBuilder();
        List<Integer> sizes = new ArrayList<>();
        for (String str : strs) {
            sizes.add(str.length());
        }
        for (int size : sizes) {
            res.append(size).append(',');
        }
        res.append('#');
        for (String str : strs) {
            res.append(str);
        }
        return res.toString();
    }

    public List<String> decode(String str) {
        if (str.length() == 0) {
            return new ArrayList<>();
        }
        List<String> res = new ArrayList<>();
        List<Integer> sizes = new ArrayList<>();
        int i = 0;
        while (str.charAt(i) != '#') {
            StringBuilder cur = new StringBuilder();
            while (str.charAt(i) != ',') {
                cur.append(str.charAt(i));
                i++;
            }
            sizes.add(Integer.parseInt(cur.toString()));
            i++;
        }
        i++;
        for (int sz : sizes) {
            res.add(str.substring(i, i + sz));
            i += sz;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    string encode(vector<string>& strs) {
        if (strs.empty()) return "";
        vector<int> sizes;
        string res = "";
        for (string& s : strs) {
            sizes.push_back(s.size());
        }
        for (int sz : sizes) {
            res += to_string(sz) + ',';
        }
        res += '#';
        for (string& s : strs) {
            res += s;
        }
        return res;
    }

    vector<string> decode(string s) {
        if (s.empty()) return {};
        vector<int> sizes;
        vector<string> res;
        int i = 0;
        while (s[i] != '#') {
            string cur = "";
            while (s[i] != ',') {
                cur += s[i];
                i++;
            }
            sizes.push_back(stoi(cur));
            i++;
        }
        i++;
        for (int sz : sizes) {
            res.push_back(s.substr(i, sz));
            i += sz;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        if (strs.length === 0) return "";
        let sizes = [], res = "";
        for (let s of strs) {
            sizes.push(s.length);
        }
        for (let sz of sizes) {
            res += sz + ',';
        }
        res += '#';
        for (let s of strs) {
            res += s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        if (str.length === 0) return [];
        let sizes = [], res = [], i = 0;
        while (str[i] !== '#') {
            let cur = "";
            while (str[i] !== ',') {
                cur += str[i];
                i++;
            }
            sizes.push(parseInt(cur));
            i++;
        }
        i++;
        for (let sz of sizes) {
            res.push(str.substr(i, sz));
            i += sz;
        }
        return res;
    }
}
```

```csharp
public class Solution {

    public string Encode(IList<string> strs) {
        if (strs.Count == 0) return "";
        List<int> sizes = new List<int>();
        string res = "";
        foreach (string s in strs) {
            sizes.Add(s.Length);
        }
        foreach (int sz in sizes) {
            res += sz.ToString() + ',';
        }
        res += '#';
        foreach (string s in strs) {
            res += s;
        }
        return res;
    }

    public List<string> Decode(string s) {
        if (s.Length == 0) {
            return new List<string>();
        }
        List<int> sizes = new List<int>();
        List<string> res = new List<string>();
        int i = 0;
        while (s[i] != '#') {
            string cur = "";
            while (s[i] != ',') {
                cur += s[i];
                i++;
            }
            sizes.Add(int.Parse(cur));
            i++;
        }
        i++;
        foreach (int sz in sizes) {
            res.Add(s.Substring(i, sz));
            i += sz;
        }
        return res;
    }
}
```

```go
type Solution struct{}

func (s *Solution) Encode(strs []string) string {
	if len(strs) == 0 {
		return ""
	}
	var sizes []string
	for _, str := range strs {
		sizes = append(sizes, strconv.Itoa(len(str)))
	}
	return strings.Join(sizes, ",") + "#" + strings.Join(strs, "")
}

func (s *Solution) Decode(encoded string) []string {
	if encoded == "" {
		return []string{}
	}
	parts := strings.SplitN(encoded, "#", 2)
	sizes := strings.Split(parts[0], ",")
	var res []string
	i := 0
	for _, sz := range sizes {
		if sz == "" {
			continue
		}
		length, _ := strconv.Atoi(sz)
		res = append(res, parts[1][i:i+length])
		i += length
	}
	return res
}
```

```kotlin
class Solution {
    fun encode(strs: List<String>): String {
        if (strs.isEmpty()) return ""
        val sizes = mutableListOf<String>()
        for (str in strs) {
            sizes.add(str.length.toString())
        }
        return sizes.joinToString(",") + "#" + strs.joinToString("")
    }

    fun decode(encoded: String): List<String> {
        if (encoded.isEmpty()) return emptyList()
        val parts = encoded.split("#", limit = 2)
        val sizes = parts[0].split(",")
        val res = mutableListOf<String>()
        var i = 0
        for (sz in sizes) {
            if (sz.isEmpty()) continue
            val length = sz.toInt()
            res.add(parts[1].substring(i, i + length))
            i += length
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m)$ for $encode()$ and $decode()$.
* Space complexity: $O(n)$ for $encode()$ and $decode()$.

> Where $m$ is the sum of lengths of all the strings and $n$ is the number of strings.

---

## 2. Encoding & Decoding (Optimal)

::tabs-start

```python
class Solution:
    
    def encode(self, strs: List[str]) -> str:
        res = ""
        for s in strs:
            res += str(len(s)) + "#" + s
        return res

    def decode(self, s: str) -> List[str]:
        res = []
        i = 0
        
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            i = j + 1
            j = i + length
            res.append(s[i:j])
            i = j
            
        return res
```

```java
public class Solution {
    
    public String encode(List<String> strs) {
        StringBuilder res = new StringBuilder();
        for (String s : strs) {
            res.append(s.length()).append('#').append(s);
        }
        return res.toString();
    }

    public List<String> decode(String str) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < str.length()) {
            int j = i;
            while (str.charAt(j) != '#') {
                j++;
            }
            int length = Integer.parseInt(str.substring(i, j));
            i = j + 1;
            j = i + length;
            res.add(str.substring(i, j));
            i = j;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    string encode(vector<string>& strs) {
        string res;
        for (const string& s : strs) {
            res += to_string(s.size()) + "#" + s;
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        int i = 0;
        while (i < s.size()) {
            int j = i;
            while (s[j] != '#') {
                j++;
            }
            int length = stoi(s.substr(i, j - i));
            i = j + 1;
            j = i + length;
            res.push_back(s.substr(i, length));
            i = j;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let res = "";
        for (let s of strs) {
            res += s.length + "#" + s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        let res = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (str[j] !== '#') {
                j++;
            }
            let length = parseInt(str.substring(i, j));
            i = j + 1;
            j = i + length;
            res.push(str.substring(i, j));
            i = j;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string Encode(IList<string> strs) {
        string res = "";
        foreach (string s in strs) {
            res += s.Length + "#" + s;
        }
        return res;
    }

    public List<string> Decode(string s) {
        List<string> res = new List<string>();
        int i = 0;
        while (i < s.Length) {
            int j = i;
            while (s[j] != '#') {
                j++;
            }
            int length = int.Parse(s.Substring(i, j - i));
            i = j + 1;
            j = i + length;
            res.Add(s.Substring(i, length));
            i = j;
        }
        return res;
    }
}
```

```go
type Solution struct{}

func (s *Solution) Encode(strs []string) string {
	res := ""
	for _, str := range strs {
		res += strconv.Itoa(len(str)) + "#" + str
	}
	return res
}

func (s *Solution) Decode(encoded string) []string {
	res := []string{}
	i := 0
	for i < len(encoded) {
		j := i
		for encoded[j] != '#' {
			j++
		}
		length, _ := strconv.Atoi(encoded[i:j])
		i = j + 1
		res = append(res, encoded[i:i+length])
		i += length
	}
	return res
}
```

```kotlin
class Solution {
    
    fun encode(strs: List<String>): String {
        val res = StringBuilder()
        for (str in strs) {
            res.append(str.length).append('#').append(str)
        }
        return res.toString()
    }

    fun decode(encoded: String): List<String> {
        val res = mutableListOf<String>()
        var i = 0
        while (i < encoded.length) {
            var j = i
            while (encoded[j] != '#') {
                j++
            }
            val length = encoded.substring(i, j).toInt()
            i = j + 1
            res.add(encoded.substring(i, i + length))
            i += length
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m)$ for $encode()$ and $decode()$.
* Space complexity: $O(1)$ for $encode()$ and $decode()$.

> Where $m$ is the sum of lengths of all the strings and $n$ is the number of strings.