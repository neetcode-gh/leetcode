## 1. Hashing

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot K)$
- Space complexity: $O(N \cdot K)$

>  Where $N$ is the length of `strings` and $K$ is the maximum length of a string in `strings`.
