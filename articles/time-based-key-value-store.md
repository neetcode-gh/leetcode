## 1. Brute Force

::tabs-start

```python
class TimeMap:

    def __init__(self):
        self.keyStore = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.keyStore:
            self.keyStore[key] = {}
        if timestamp not in self.keyStore[key]:
            self.keyStore[key][timestamp] = []
        self.keyStore[key][timestamp].append(value)

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.keyStore:
            return ""
        seen = 0

        for time in self.keyStore[key]:
            if time <= timestamp:
                seen = max(seen, time)
        return "" if seen == 0 else self.keyStore[key][seen][-1]
```

```java
public class TimeMap {
    private Map<String, Map<Integer, List<String>>> keyStore;

    public TimeMap() {
        keyStore = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        if (!keyStore.containsKey(key)) {
            keyStore.put(key, new HashMap<>());
        }
        if (!keyStore.get(key).containsKey(timestamp)) {
            keyStore.get(key).put(timestamp, new ArrayList<>());
        }
        keyStore.get(key).get(timestamp).add(value);
    }

    public String get(String key, int timestamp) {
        if (!keyStore.containsKey(key)) {
            return "";
        }
        int seen = 0;

        for (int time : keyStore.get(key).keySet()) {
            if (time <= timestamp) {
                seen = Math.max(seen, time);
            }
        }
        if (seen == 0) return "";
        int back = keyStore.get(key).get(seen).size() - 1;
        return keyStore.get(key).get(seen).get(back);
    }
}
```

```cpp
class TimeMap {
public:
    unordered_map<string, unordered_map<int, vector<string>>> keyStore;
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        keyStore[key][timestamp].push_back(value);
    }

    string get(string key, int timestamp) {
        if (keyStore.find(key) == keyStore.end()) {
            return "";
        }
        int seen = 0;
        for (const auto& [time, _] : keyStore[key]) {
            if (time <= timestamp) {
                seen = max(seen, time);
            }
        }
        return seen == 0 ? "" : keyStore[key][seen].back();
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, new Map());
        }
        if (!this.keyStore.get(key).has(timestamp)) {
            this.keyStore.get(key).set(timestamp, []);
        }
        this.keyStore.get(key).get(timestamp).push(value);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        if (!this.keyStore.has(key)) {
            return "";
        }
        let seen = 0;

        for (let time of this.keyStore.get(key).keys()) {
            if (time <= timestamp) {
                seen = Math.max(seen, time);
            }
        }
        return seen === 0 ? "" : this.keyStore.get(key).get(seen).at(-1);
    }
}
```

```csharp
public class TimeMap {
    private Dictionary<string, Dictionary<int, List<string>>> keyStore;

    public TimeMap() {
        keyStore = new Dictionary<string, Dictionary<int, List<string>>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            keyStore[key] = new Dictionary<int, List<string>>();
        }
        if (!keyStore[key].ContainsKey(timestamp)) {
            keyStore[key][timestamp] = new List<string>();
        }
        keyStore[key][timestamp].Add(value);
    }

    public string Get(string key, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            return "";
        }
        var timestamps = keyStore[key];
        int seen = 0;

        foreach (var time in timestamps.Keys) {
            if (time <= timestamp) {
                seen = time;
            }
        }
        return seen == 0 ? "" : timestamps[seen][^1];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of unique timestamps associated with a key and $m$ is the total number of keys.

---

## 2. Binary Search (Sorted Map)

::tabs-start

```python
from sortedcontainers import SortedDict

class TimeMap:
    def __init__(self):
        self.m = defaultdict(SortedDict)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.m[key][timestamp] = value

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.m:
            return ""
        
        timestamps = self.m[key]
        idx = timestamps.bisect_right(timestamp) - 1
        
        if idx >= 0:
            closest_time = timestamps.iloc[idx]
            return timestamps[closest_time]
        return ""
```

```java
public class TimeMap {
    private Map<String, TreeMap<Integer, String>> m;

    public TimeMap() {
        m = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        m.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);
    }

    public String get(String key, int timestamp) {
        if (!m.containsKey(key)) return "";
        TreeMap<Integer, String> timestamps = m.get(key);
        Map.Entry<Integer, String> entry = timestamps.floorEntry(timestamp);
        return entry == null ? "" : entry.getValue();
    }
}
```

```cpp
class TimeMap {
public:
    unordered_map<string, map<int, string>> m;

    TimeMap() {}

    void set(string key, string value, int timestamp) {
        m[key].insert({timestamp, value});
    }

    string get(string key, int timestamp) {
        auto it = m[key].upper_bound(timestamp);
        return it == m[key].begin() ? "" : prev(it)->second;
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

```csharp
public class TimeMap {
    private Dictionary<string, SortedList<int, string>> m;

    public TimeMap() {
        m = new Dictionary<string, SortedList<int, string>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!m.ContainsKey(key)) {
            m[key] = new SortedList<int, string>();
        }
        m[key][timestamp] = value;
    }

    public string Get(string key, int timestamp) {
        if (!m.ContainsKey(key)) return "";
        var timestamps = m[key];
        int left = 0;
        int right = timestamps.Count - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (timestamps.Keys[mid] == timestamp) {
                return timestamps.Values[mid];
            } else if (timestamps.Keys[mid] < timestamp) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        if (right >= 0) {
            return timestamps.Values[right];
        }
        return "";
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(\log n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of values associated with a key and $m$ is the total number of keys.

---

## 3. Binary Search (Array)

::tabs-start

```python
class TimeMap:

    def __init__(self):
        self.keyStore = {}  # key : list of [val, timestamp]

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.keyStore:
            self.keyStore[key] = []
        self.keyStore[key].append([value, timestamp])

    def get(self, key: str, timestamp: int) -> str:
        res, values = "", self.keyStore.get(key, [])
        l, r = 0, len(values) - 1
        while l <= r:
            m = (l + r) // 2
            if values[m][1] <= timestamp:
                res = values[m][0]
                l = m + 1
            else:
                r = m - 1
        return res
```

```java
public class TimeMap {
    
    private Map<String, List<Pair<Integer, String>>> keyStore;

    public TimeMap() {
        keyStore = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        keyStore.computeIfAbsent(key, k -> new ArrayList<>()).add(new Pair<>(timestamp, value));
    }

    public String get(String key, int timestamp) {
        List<Pair<Integer, String>> values = keyStore.getOrDefault(key, new ArrayList<>());
        int left = 0, right = values.size() - 1;
        String result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values.get(mid).getKey() <= timestamp) {
                result = values.get(mid).getValue();
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    private static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }
}
```

```cpp
class TimeMap {
private:
    unordered_map<string, vector<pair<int, string>>> keyStore;

public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        keyStore[key].emplace_back(timestamp, value);
    }

    string get(string key, int timestamp) {
        auto& values = keyStore[key];
        int left = 0, right = values.size() - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values[mid].first <= timestamp) {
                result = values[mid].second;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

```csharp
public class TimeMap {
    
    private Dictionary<string, List<Tuple<int, string>>> keyStore;

    public TimeMap() {
        keyStore = new Dictionary<string, List<Tuple<int, string>>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            keyStore[key] = new List<Tuple<int, string>>();
        }
        keyStore[key].Add(Tuple.Create(timestamp, value));
    }

    public string Get(string key, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            return "";
        }

        var values = keyStore[key];
        int left = 0, right = values.Count - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values[mid].Item1 <= timestamp) {
                result = values[mid].Item2;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(\log n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of values associated with a key and $m$ is the total number of keys.