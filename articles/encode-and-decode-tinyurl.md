## 1. List

::tabs-start

```python
class Codec:

    def __init__(self):
        self.urls = []

    def encode(self, longUrl: str) -> str:
        self.urls.append(longUrl)
        return 'http://tinyurl.com/' + str(len(self.urls) - 1)

    def decode(self, shortUrl: str) -> str:
        return self.urls[int(shortUrl.split('/')[-1])]
```

```java
public class Codec {
    private List<String> urls;

    public Codec() {
        urls = new ArrayList<>();
    }

    public String encode(String longUrl) {
        urls.add(longUrl);
        return "http://tinyurl.com/" + (urls.size() - 1);
    }

    public String decode(String shortUrl) {
        int index = Integer.parseInt(shortUrl.substring(shortUrl.lastIndexOf('/') + 1));
        return urls.get(index);
    }
}
```

```cpp
class Solution {
public:
    vector<string> urls;

    string encode(string longUrl) {
        urls.push_back(longUrl);
        return "http://tinyurl.com/" + to_string(urls.size() - 1);
    }

    string decode(string shortUrl) {
        int index = stoi(shortUrl.substr(shortUrl.find_last_of('/') + 1));
        return urls[index];
    }
};
```

```javascript
class Codec {
    constructor() {
        this.urls = [];
    }

    /**
     * Encodes a URL to a shortened URL.
     *
     * @param {string} longUrl
     * @return {string}
     */
    encode(longUrl) {
        this.urls.push(longUrl);
        return 'http://tinyurl.com/' + (this.urls.length - 1);
    }

    /**
     * Decodes a shortened URL to its original URL.
     *
     * @param {string} shortUrl
     * @return {string}
     */
    decode(shortUrl) {
        const index = parseInt(shortUrl.split('/').pop());
        return this.urls[index];
    }
}
```

```csharp
public class Codec {
    private List<string> urls = new List<string>();

    public string encode(string longUrl) {
        urls.Add(longUrl);
        return "http://tinyurl.com/" + (urls.Count - 1);
    }

    public string decode(string shortUrl) {
        int index = int.Parse(shortUrl.Substring(shortUrl.LastIndexOf('/') + 1));
        return urls[index];
    }
}
```

```go
type Codec struct {
    urls []string
}

func Constructor() Codec {
    return Codec{urls: []string{}}
}

func (this *Codec) encode(longUrl string) string {
    this.urls = append(this.urls, longUrl)
    return "http://tinyurl.com/" + strconv.Itoa(len(this.urls)-1)
}

func (this *Codec) decode(shortUrl string) string {
    parts := strings.Split(shortUrl, "/")
    index, _ := strconv.Atoi(parts[len(parts)-1])
    return this.urls[index]
}
```

```kotlin
class Codec {
    private val urls = mutableListOf<String>()

    fun encode(longUrl: String): String {
        urls.add(longUrl)
        return "http://tinyurl.com/${urls.size - 1}"
    }

    fun decode(shortUrl: String): String {
        val index = shortUrl.substringAfterLast('/').toInt()
        return urls[index]
    }
}
```

```swift
class Codec {
    private var urls = [String]()

    func encode(_ longUrl: String) -> String {
        urls.append(longUrl)
        return "http://tinyurl.com/\(urls.count - 1)"
    }

    func decode(_ shortUrl: String) -> String {
        let index = Int(shortUrl.split(separator: "/").last!)!
        return urls[index]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for $encode()$ and $decode()$.
- Space complexity: $O(n * m)$

> Where $n$ is the number of $longUrls$, $m$ is the average length of the URLs.

---

## 2. Hash Map - I

::tabs-start

```python
class Codec:

    def __init__(self):
        self.url_map = {}
        self.id = 0

    def encode(self, longUrl: str) -> str:
        self.url_map[self.id] = longUrl
        short_url = f"http://tinyurl.com/{self.id}"
        self.id += 1
        return short_url

    def decode(self, shortUrl: str) -> str:
        url_id = int(shortUrl.split('/')[-1])
        return self.url_map[url_id]
```

```java
public class Codec {
    private HashMap<Integer, String> urlMap;
    private int id;

    public Codec() {
        urlMap = new HashMap<>();
        id = 0;
    }

    public String encode(String longUrl) {
        urlMap.put(id, longUrl);
        return "http://tinyurl.com/" + id++;
    }

    public String decode(String shortUrl) {
        int urlId = Integer.parseInt(shortUrl.substring(shortUrl.lastIndexOf('/') + 1));
        return urlMap.get(urlId);
    }
}
```

```cpp
class Solution {
    unordered_map<int, string> urlMap;
    int id;

public:
    Solution() : id(0) {}

    string encode(string longUrl) {
        urlMap[id] = longUrl;
        return "http://tinyurl.com/" + to_string(id++);
    }

    string decode(string shortUrl) {
        int urlId = stoi(shortUrl.substr(shortUrl.find_last_of('/') + 1));
        return urlMap[urlId];
    }
};
```

```javascript
class Codec {
    constructor() {
        this.urlMap = {};
        this.id = 0;
    }

    /**
     * Encodes a URL to a shortened URL.
     *
     * @param {string} longUrl
     * @return {string}
     */
    encode(longUrl) {
        this.urlMap[this.id] = longUrl;
        return `http://tinyurl.com/${this.id++}`;
    }

    /**
     * Decodes a shortened URL to its original URL.
     *
     * @param {string} shortUrl
     * @return {string}
     */
    decode(shortUrl) {
        const urlId = parseInt(shortUrl.split('/').pop(), 10);
        return this.urlMap[urlId];
    }
}
```

```csharp
public class Codec {
    private Dictionary<int, string> urlMap = new Dictionary<int, string>();
    private int id = 0;

    public string encode(string longUrl) {
        urlMap[id] = longUrl;
        return "http://tinyurl.com/" + id++;
    }

    public string decode(string shortUrl) {
        int urlId = int.Parse(shortUrl.Substring(shortUrl.LastIndexOf('/') + 1));
        return urlMap[urlId];
    }
}
```

```go
type Codec struct {
    urlMap map[int]string
    id     int
}

func Constructor() Codec {
    return Codec{urlMap: make(map[int]string), id: 0}
}

func (this *Codec) encode(longUrl string) string {
    this.urlMap[this.id] = longUrl
    this.id++
    return "http://tinyurl.com/" + strconv.Itoa(this.id-1)
}

func (this *Codec) decode(shortUrl string) string {
    parts := strings.Split(shortUrl, "/")
    urlId, _ := strconv.Atoi(parts[len(parts)-1])
    return this.urlMap[urlId]
}
```

```kotlin
class Codec {
    private val urlMap = mutableMapOf<Int, String>()
    private var id = 0

    fun encode(longUrl: String): String {
        urlMap[id] = longUrl
        return "http://tinyurl.com/${id++}"
    }

    fun decode(shortUrl: String): String {
        val urlId = shortUrl.substringAfterLast('/').toInt()
        return urlMap[urlId]!!
    }
}
```

```swift
class Codec {
    private var urlMap = [Int: String]()
    private var id = 0

    func encode(_ longUrl: String) -> String {
        urlMap[id] = longUrl
        let shortUrl = "http://tinyurl.com/\(id)"
        id += 1
        return shortUrl
    }

    func decode(_ shortUrl: String) -> String {
        let urlId = Int(shortUrl.split(separator: "/").last!)!
        return urlMap[urlId]!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for $encode()$ and $decode()$.
- Space complexity: $O(n * m)$

> Where $n$ is the number of $longUrls$, $m$ is the average length of the URLs.

---

## 3. Hash Map - II

::tabs-start

```python
class Codec:

    def __init__(self):
        self.encodeMap = {}
        self.decodeMap = {}
        self.base = "http://tinyurl.com/"

    def encode(self, longUrl: str) -> str:
        if longUrl not in self.encodeMap:
            shortUrl = self.base + str(len(self.encodeMap) + 1)
            self.encodeMap[longUrl] = shortUrl
            self.decodeMap[shortUrl] = longUrl
        return self.encodeMap[longUrl]

    def decode(self, shortUrl: str) -> str:
        return self.decodeMap[shortUrl]
```

```java
public class Codec {
    private HashMap<String, String> encodeMap = new HashMap<>();
    private HashMap<String, String> decodeMap = new HashMap<>();
    private String base = "http://tinyurl.com/";

    public String encode(String longUrl) {
        if (!encodeMap.containsKey(longUrl)) {
            String shortUrl = base + (encodeMap.size() + 1);
            encodeMap.put(longUrl, shortUrl);
            decodeMap.put(shortUrl, longUrl);
        }
        return encodeMap.get(longUrl);
    }

    public String decode(String shortUrl) {
        return decodeMap.get(shortUrl);
    }
}
```

```cpp
class Solution {
private:
    unordered_map<string, string> encodeMap;
    unordered_map<string, string> decodeMap;
    string base = "http://tinyurl.com/";

public:
    string encode(string longUrl) {
        if (encodeMap.find(longUrl) == encodeMap.end()) {
            string shortUrl = base + to_string(encodeMap.size() + 1);
            encodeMap[longUrl] = shortUrl;
            decodeMap[shortUrl] = longUrl;
        }
        return encodeMap[longUrl];
    }

    string decode(string shortUrl) {
        return decodeMap[shortUrl];
    }
};
```

```javascript
class Codec {
    constructor() {
        this.encodeMap = new Map();
        this.decodeMap = new Map();
        this.base = 'http://tinyurl.com/';
    }

    /**
     * Encodes a URL to a shortened URL.
     *
     * @param {string} longUrl
     * @return {string}
     */
    encode(longUrl) {
        if (!this.encodeMap.has(longUrl)) {
            const shortUrl = this.base + (this.encodeMap.size + 1);
            this.encodeMap.set(longUrl, shortUrl);
            this.decodeMap.set(shortUrl, longUrl);
        }
        return this.encodeMap.get(longUrl);
    }

    /**
     * Decodes a shortened URL to its original URL.
     *
     * @param {string} shortUrl
     * @return {string}
     */
    decode(shortUrl) {
        return this.decodeMap.get(shortUrl);
    }
}
```

```csharp
public class Codec {
    private Dictionary<string, string> encodeMap = new Dictionary<string, string>();
    private Dictionary<string, string> decodeMap = new Dictionary<string, string>();
    private string baseUrl = "http://tinyurl.com/";

    public string encode(string longUrl) {
        if (!encodeMap.ContainsKey(longUrl)) {
            string shortUrl = baseUrl + (encodeMap.Count + 1);
            encodeMap[longUrl] = shortUrl;
            decodeMap[shortUrl] = longUrl;
        }
        return encodeMap[longUrl];
    }

    public string decode(string shortUrl) {
        return decodeMap[shortUrl];
    }
}
```

```go
type Codec struct {
    encodeMap map[string]string
    decodeMap map[string]string
    base      string
}

func Constructor() Codec {
    return Codec{
        encodeMap: make(map[string]string),
        decodeMap: make(map[string]string),
        base:      "http://tinyurl.com/",
    }
}

func (this *Codec) encode(longUrl string) string {
    if _, exists := this.encodeMap[longUrl]; !exists {
        shortUrl := this.base + strconv.Itoa(len(this.encodeMap)+1)
        this.encodeMap[longUrl] = shortUrl
        this.decodeMap[shortUrl] = longUrl
    }
    return this.encodeMap[longUrl]
}

func (this *Codec) decode(shortUrl string) string {
    return this.decodeMap[shortUrl]
}
```

```kotlin
class Codec {
    private val encodeMap = mutableMapOf<String, String>()
    private val decodeMap = mutableMapOf<String, String>()
    private val base = "http://tinyurl.com/"

    fun encode(longUrl: String): String {
        if (longUrl !in encodeMap) {
            val shortUrl = base + (encodeMap.size + 1)
            encodeMap[longUrl] = shortUrl
            decodeMap[shortUrl] = longUrl
        }
        return encodeMap[longUrl]!!
    }

    fun decode(shortUrl: String): String {
        return decodeMap[shortUrl]!!
    }
}
```

```swift
class Codec {
    private var encodeMap = [String: String]()
    private var decodeMap = [String: String]()
    private let base = "http://tinyurl.com/"

    func encode(_ longUrl: String) -> String {
        if encodeMap[longUrl] == nil {
            let shortUrl = base + String(encodeMap.count + 1)
            encodeMap[longUrl] = shortUrl
            decodeMap[shortUrl] = longUrl
        }
        return encodeMap[longUrl]!
    }

    func decode(_ shortUrl: String) -> String {
        return decodeMap[shortUrl]!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for $encode()$ and $decode()$.
- Space complexity: $O(n * m)$

> Where $n$ is the number of $longUrls$, $m$ is the average length of the URLs.
