## 1. Hashing

### Intuition

Two strings belong to the same shifting sequence if the relative differences between consecutive characters are identical. For example, "abc" and "xyz" both have differences of +1 between each pair of adjacent letters. By computing these differences for each string and using them as a hash key, we can group all strings that share the same shifting pattern together.

The key insight is that we normalize differences using modulo 26 to handle wrap-around cases (like 'z' shifting to 'a'). This way, strings that can be shifted into one another will produce the same hash key.

### Algorithm

1. For each string, compute a hash key by calculating the difference between consecutive characters. Use modulo 26 to handle wrap-around.
2. Use a hash map where the key is this computed hash and the value is a list of strings that share this pattern.
3. Iterate through all input strings, compute their hash key, and add each string to the corresponding group in the hash map.
4. Return all the grouped lists from the hash map.

::tabs-start

```python
class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:

        def get_hash(string: str):
            key = []
            for a, b in zip(string, string[1:]):
                key.append(chr((ord(b) - ord(a)) % 26 + ord('a')))
            return ''.join(key)
        
        # Create a hash value (hash_key) for each string and append the string
        # to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        groups = collections.defaultdict(list)
        for string in strings:
            hash_key = get_hash(string)
            groups[hash_key].append(string)
        
        # Return a list of all of the grouped strings
        return list(groups.values())
```

```java
class Solution {
    String getHash(String s) {
        char[] chars = s.toCharArray();
        StringBuilder hashKey = new StringBuilder();
        
        for (int i = 1; i < chars.length; i++) {
            hashKey.append((char) ((chars[i] - chars[i - 1] + 26) % 26 + 'a'));
        }
        
        return hashKey.toString();
    }
    
    public List<List<String>> groupStrings(String[] strings) {
        Map<String, List<String>> mapHashToList = new HashMap<>();
        
        // Create a hash_value (hashKey) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        for (String str : strings ) {
            String hashKey = getHash(str);
            if (mapHashToList.get(hashKey) == null) {
                mapHashToList.put(hashKey, new ArrayList<>());
            } 
            mapHashToList.get(hashKey).add(str);
        }
        
        // Iterate over the map, and add the values to groups
        List<List<String>> groups = new ArrayList<>();
        for (List<String> group : mapHashToList.values()) {
            groups.add(group);
        }
        
        // Return a list of all of the grouped strings
        return groups;
    }
}
```

```cpp
class Solution {
public:
    string getHash(string &s) {
        string hashKey;
        for (int i = 1; i < s.length(); i++) {
            hashKey += (s[i] - s[i - 1] + 26) % 26 + 'a';
        }
        
        return hashKey;
    }
    
    vector<vector<string>> groupStrings(vector<string>& strings) {
        unordered_map<string, vector<string>> mapHashToList;
        
        // Create a hash_value (hashKey) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        for (string str : strings) {
            string hashKey = getHash(str);
            mapHashToList[hashKey].push_back(str);
        }
        
        // Iterate over the map, and add the values to groups
        vector<vector<string>> groups;
        for (auto it : mapHashToList) {
            groups.push_back(it.second);
        }
        
        // Return a list of all of the grouped strings
        return groups;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strings
     * @return {string[][]}
     */
    groupStrings(strings) {
        function getHash(string) {
            const key = [];
            for (let i = 0; i < string.length - 1; i++) {
                const diff = (string.charCodeAt(i + 1) - string.charCodeAt(i) + 26) % 26;
                key.push(String.fromCharCode(diff + 'a'.charCodeAt(0)));
            }
            return key.join('');
        }

        // Create a hash value (hash_key) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        const groups = new Map();
        for (const string of strings) {
            const hashKey = getHash(string);
            if (!groups.has(hashKey)) {
                groups.set(hashKey, []);
            }
            groups.get(hashKey).push(string);
        }

        // Return a list of all of the grouped strings
        return Array.from(groups.values());
    }
}
```

```csharp
public class Solution {
    private string GetHash(string s) {
        var hashKey = new StringBuilder();
        for (int i = 1; i < s.Length; i++) {
            hashKey.Append((char)((s[i] - s[i - 1] + 26) % 26 + 'a'));
        }
        return hashKey.ToString();
    }

    public IList<IList<string>> GroupStrings(string[] strings) {
        var mapHashToList = new Dictionary<string, IList<string>>();

        // Create a hash_value (hashKey) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        foreach (var str in strings) {
            var hashKey = GetHash(str);
            if (!mapHashToList.ContainsKey(hashKey)) {
                mapHashToList[hashKey] = new List<string>();
            }
            mapHashToList[hashKey].Add(str);
        }

        // Return a list of all of the grouped strings
        return mapHashToList.Values.ToList<IList<string>>();
    }
}
```

```go
func groupStrings(strings []string) [][]string {
    getHash := func(s string) string {
        hashKey := make([]byte, 0, len(s)-1)
        for i := 1; i < len(s); i++ {
            hashKey = append(hashKey, byte((int(s[i])-int(s[i-1])+26)%26+'a'))
        }
        return string(hashKey)
    }

    // Create a hash value (hash_key) for each string and append the string
    // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
    mapHashToList := make(map[string][]string)
    for _, str := range strings {
        hashKey := getHash(str)
        mapHashToList[hashKey] = append(mapHashToList[hashKey], str)
    }

    // Return a list of all of the grouped strings
    groups := make([][]string, 0, len(mapHashToList))
    for _, v := range mapHashToList {
        groups = append(groups, v)
    }
    return groups
}
```

```kotlin
class Solution {
    private fun getHash(s: String): String {
        val hashKey = StringBuilder()
        for (i in 1 until s.length) {
            hashKey.append(((s[i] - s[i - 1] + 26) % 26 + 'a'.code).toChar())
        }
        return hashKey.toString()
    }

    fun groupStrings(strings: Array<String>): List<List<String>> {
        // Create a hash value (hash_key) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        val mapHashToList = HashMap<String, MutableList<String>>()
        for (str in strings) {
            val hashKey = getHash(str)
            mapHashToList.getOrPut(hashKey) { mutableListOf() }.add(str)
        }

        // Return a list of all of the grouped strings
        return mapHashToList.values.toList()
    }
}
```

```swift
class Solution {
    func groupStrings(_ strings: [String]) -> [[String]] {
        func getHash(_ s: String) -> String {
            let chars = Array(s)
            var hashKey = ""
            for i in 1..<chars.count {
                let diff = (Int(chars[i].asciiValue!) - Int(chars[i-1].asciiValue!) + 26) % 26
                hashKey.append(Character(UnicodeScalar(diff + Int(Character("a").asciiValue!))!))
            }
            return hashKey
        }

        // Create a hash value (hash_key) for each string and append the string
        // to the list of hash values i.e. mapHashToList["cd"] = ["acf", "gil", "xzc"]
        var mapHashToList = [String: [String]]()
        for str in strings {
            let hashKey = getHash(str)
            mapHashToList[hashKey, default: []].append(str)
        }

        // Return a list of all of the grouped strings
        return Array(mapHashToList.values)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot K)$
- Space complexity: $O(N \cdot K)$

>  Where $N$ is the length of `strings` and $K$ is the maximum length of a string in `strings`.
