## 1. Depth-first search

### Intuition
Web crawling naturally fits a graph traversal problem where URLs are nodes and links between them are edges. The key insight is that we need to explore all reachable URLs from the starting URL while staying within the same hostname. `dfs` allows us to follow links deeply before backtracking, using a `visited` set to avoid infinite loops from cycles.

### Algorithm
1. Create a helper function to extract the hostname from a URL by splitting on slashes and taking the third element.
2. Extract the starting hostname and initialize an empty `visited` set.
3. Define a recursive `dfs` function that marks the current URL as visited.
4. For each URL returned by `htmlParser.getUrls()`, check if it has the same hostname and has not been visited.
5. Recursively call `dfs` on unvisited URLs with matching hostname.
6. Return the `visited` set containing all crawled URLs.

::tabs-start

```python
class Solution:
    def crawl(self, startUrl: str, htmlParser: 'HtmlParser') -> List[str]:
        def get_hostname(url):
            # split url by slashes
            # for instance, "http://example.org/foo/bar" will be split into
            # "http:", "", "example.org", "foo", "bar"
            # the hostname is the 2-nd (0-indexed) element
            return url.split('/')[2]

        start_hostname = get_hostname(startUrl)
        visited = set()

        def dfs(url, htmlParser):
            visited.add(url)
            for next_url in htmlParser.getUrls(url):
                if get_hostname(next_url) == start_hostname and next_url not in visited:
                    dfs(next_url, htmlParser)

        dfs(startUrl, htmlParser)
        return visited
```

```java
class Solution {

    private String startHostname;
    private HashSet<String> visited = new HashSet<String>();

    private String getHostname(String url) {
        // split url by slashes
        // for instance, "http://example.org/foo/bar" will be split into
        // "http:", "", "example.org", "foo", "bar"
        // the hostname is the 2-nd (0-indexed) element
        return url.split("/")[2];
    }

    private void dfs(String url, HtmlParser htmlParser) {
        visited.add(url);
        for (String nextUrl : htmlParser.getUrls(url)) {
            if (getHostname(nextUrl).equals(startHostname) && !visited.contains(nextUrl)) {
                dfs(nextUrl, htmlParser);
            }
        }
    }

    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        startHostname = getHostname(startUrl);
        dfs(startUrl, htmlParser);
        return new ArrayList<>(visited);
    }
}
```

```cpp
class Solution {
public:
    vector<string> crawl(string startUrl, HtmlParser htmlParser) {
        function<string(string)> getHostname = [](string url) -> string {
            // find the next slash in the url after "http://"
            // that is after the 7-th position inclusively
            // if there is no such slash, pos will be equal to url.size()
            int pos = min(url.size(), url.find('/', 7));
            // return the substring that starts after "http://" and ends
            // before the next slash of at the end of the string
            return url.substr(7, pos - 7);
        };

        string startHostname = getHostname(startUrl);
        unordered_set<string> visited;

        function<void(string)> dfs = [&](string url) -> void {
            visited.insert(url);
            for (string nextUrl : htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) == startHostname && !visited.count(nextUrl)) {
                    dfs(nextUrl);
                }
            }
        };

        dfs(startUrl);
        return vector<string>(visited.begin(), visited.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} startUrl
     * @param {HtmlParser} htmlParser
     * @return {string[]}
    */
    crawl(startUrl, htmlParser) {
        function getHostname(url) {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split('/')[2];
        }

        const startHostname = getHostname(startUrl);
        const visited = new Set();

        function dfs(url) {
            visited.add(url);

            for (const nextUrl of htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) === startHostname && !visited.has(nextUrl)) {
                    dfs(nextUrl);
                }
            }
        }

        dfs(startUrl);

        return Array.from(visited);
    }
}
```

```go
/**
 * // This is HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * type HtmlParser struct {
 *     func GetUrls(url string) []string {}
 * }
 */

func crawl(startUrl string, htmlParser HtmlParser) []string {
    getHostname := func(url string) string {
        // split url by slashes
        // for instance, "http://example.org/foo/bar" will be split into
        // "http:", "", "example.org", "foo", "bar"
        // the hostname is the 2nd (0-indexed) element
        return strings.Split(url, "/")[2]
    }

    startHostname := getHostname(startUrl)
    visited := make(map[string]bool)

    var dfs func(url string)
    dfs = func(url string) {
        visited[url] = true
        for _, nextUrl := range htmlParser.GetUrls(url) {
            if getHostname(nextUrl) == startHostname && !visited[nextUrl] {
                dfs(nextUrl)
            }
        }
    }

    dfs(startUrl)

    result := make([]string, 0, len(visited))
    for url := range visited {
        result = append(result, url)
    }
    return result
}
```

```kotlin
/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *     fun getUrls(url: String): List<String> {}
 * }
 */

class Solution {
    fun crawl(startUrl: String, htmlParser: HtmlParser): List<String> {
        fun getHostname(url: String): String {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split("/")[2]
        }

        val startHostname = getHostname(startUrl)
        val visited = mutableSetOf<String>()

        fun dfs(url: String) {
            visited.add(url)
            for (nextUrl in htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) == startHostname && nextUrl !in visited) {
                    dfs(nextUrl)
                }
            }
        }

        dfs(startUrl)
        return visited.toList()
    }
}
```

```swift
/**
 * // This is HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *     func getUrls(_ url: String) -> [String] {}
 * }
 */

class Solution {
    func crawl(_ startUrl: String, _ htmlParser: HtmlParser) -> [String] {
        func getHostname(_ url: String) -> String {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split(separator: "/")[1].description
        }

        let startHostname = getHostname(startUrl)
        var visited = Set<String>()

        func dfs(_ url: String) {
            visited.insert(url)
            for nextUrl in htmlParser.getUrls(url) {
                if getHostname(nextUrl) == startHostname && !visited.contains(nextUrl) {
                    dfs(nextUrl)
                }
            }
        }

        dfs(startUrl)
        return Array(visited)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot l)$
- Space complexity: $O(m \cdot l)$

>  Where $m$ is the number of edges in the graph, and $l$ is the maximum length of a URL (`urls[i].length`).

---

## 2. Breadth-first search

### Intuition
`bfs` provides an alternative traversal that explores URLs level by level, visiting all URLs at distance 1 before distance 2, and so on. This approach uses a queue instead of recursion and naturally discovers URLs in order of their distance from the starting URL.

### Algorithm
1. Create a helper function to extract the hostname from a URL.
2. Extract the starting hostname, initialize a queue with the start URL, and create a `visited` set containing the start URL.
3. While the queue is not empty, dequeue a URL.
4. For each URL returned by `htmlParser.getUrls()`, check if it has the same hostname and has not been visited.
5. If valid, add the URL to both the queue and the `visited` set.
6. Return the `visited` set containing all crawled URLs after the queue is exhausted.

::tabs-start

```python
class Solution:
    def crawl(self, startUrl: str, htmlParser: 'HtmlParser') -> List[str]:
        def get_hostname(url):
            # split url by slashes
            # for instance, "http://example.org/foo/bar" will be split into
            # "http:", "", "example.org", "foo", "bar"
            # the hostname is the 2-nd (0-indexed) element
            return url.split('/')[2]

        start_hostname = get_hostname(startUrl)
        q = collections.deque([startUrl])
        visited = set([startUrl])
        while q:
            url = q.popleft()
            for next_url in htmlParser.getUrls(url):
                if get_hostname(next_url) == start_hostname and next_url not in visited:
                    q.append(next_url)
                    visited.add(next_url)
        return visited
```

```java
class Solution {
    private String getHostname(String url) {
        // split url by slashes
        // for instance, "http://example.org/foo/bar" will be split into
        // "http:", "", "example.org", "foo", "bar"
        // the hostname is the 2-nd (0-indexed) element
        return url.split("/")[2];
    }

    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String startHostname = getHostname(startUrl);
        Queue<String> q = new LinkedList<String>(Arrays.asList(startUrl));
        HashSet<String> visited = new HashSet<String>(Arrays.asList(startUrl));
        while (!q.isEmpty()) {
            String url = q.remove();
            for (String nextUrl : htmlParser.getUrls(url)) {
                if (getHostname(nextUrl).equals(startHostname) && !visited.contains(nextUrl)) {
                    q.add(nextUrl);
                    visited.add(nextUrl);
                }
            }
        }
        return new ArrayList<>(visited);
    }
}
```

```cpp
class Solution {
public:
    vector<string> crawl(string startUrl, HtmlParser htmlParser) {
        function<string(string)> getHostname = [](string url) -> string {
            // find the next slash in the url after "http://"
            // that is after the 7-th position inclusively
            // if there is no such slash, pos will be equal to url.size()
            int pos = min(url.size(), url.find('/', 7));
            // return the substring that starts after "http://" and ends
            // before the next slash or at the end of the string
            return url.substr(7, pos - 7);
        };

        queue<string> q;
        q.push(startUrl);
        unordered_set<string> visited{startUrl};
        string startHostname = getHostname(startUrl);
        while (!q.empty()) {
            string url = q.front();
            q.pop();
            for (string nextUrl : htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) == startHostname && !visited.count(nextUrl)) {
                    q.push(nextUrl);
                    visited.insert(nextUrl);
                }
            }
        }
        return vector<string>(visited.begin(), visited.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} startUrl
     * @param {HtmlParser} htmlParser
     * @return {string[]}
    */
    crawl(startUrl, htmlParser) {
        function getHostname(url) {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split('/')[2];
        }

        const startHostname = getHostname(startUrl);
        const visited = new Set([startUrl]);
        const queue = [startUrl];

        while (queue.length > 0) {
            const url = queue.shift();
            for (const nextUrl of htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) === startHostname && !visited.has(nextUrl)) {
                    queue.push(nextUrl);
                    visited.add(nextUrl);
                }
            }
        }

        return Array.from(visited);
    }
}
```

```csharp
/**
 * // This is HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *     public List<string> GetUrls(string url) {}
 * }
 */

public class Solution {
    public IList<string> Crawl(string startUrl, HtmlParser htmlParser) {
        string GetHostname(string url) {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.Split('/')[2];
        }

        string startHostname = GetHostname(startUrl);
        Queue<string> q = new Queue<string>();
        q.Enqueue(startUrl);
        HashSet<string> visited = new HashSet<string> { startUrl };

        while (q.Count > 0) {
            string url = q.Dequeue();
            foreach (string nextUrl in htmlParser.GetUrls(url)) {
                if (GetHostname(nextUrl) == startHostname && !visited.Contains(nextUrl)) {
                    q.Enqueue(nextUrl);
                    visited.Add(nextUrl);
                }
            }
        }

        return new List<string>(visited);
    }
}
```

```go
/**
 * // This is HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * type HtmlParser struct {
 *     func GetUrls(url string) []string {}
 * }
 */

func crawl(startUrl string, htmlParser HtmlParser) []string {
    getHostname := func(url string) string {
        // split url by slashes
        // for instance, "http://example.org/foo/bar" will be split into
        // "http:", "", "example.org", "foo", "bar"
        // the hostname is the 2nd (0-indexed) element
        return strings.Split(url, "/")[2]
    }

    startHostname := getHostname(startUrl)
    visited := make(map[string]bool)
    visited[startUrl] = true
    queue := []string{startUrl}

    for len(queue) > 0 {
        url := queue[0]
        queue = queue[1:]
        for _, nextUrl := range htmlParser.GetUrls(url) {
            if getHostname(nextUrl) == startHostname && !visited[nextUrl] {
                queue = append(queue, nextUrl)
                visited[nextUrl] = true
            }
        }
    }

    result := make([]string, 0, len(visited))
    for url := range visited {
        result = append(result, url)
    }
    return result
}
```

```kotlin
/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *     fun getUrls(url: String): List<String> {}
 * }
 */

class Solution {
    fun crawl(startUrl: String, htmlParser: HtmlParser): List<String> {
        fun getHostname(url: String): String {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split("/")[2]
        }

        val startHostname = getHostname(startUrl)
        val visited = mutableSetOf(startUrl)
        val queue = ArrayDeque<String>()
        queue.add(startUrl)

        while (queue.isNotEmpty()) {
            val url = queue.removeFirst()
            for (nextUrl in htmlParser.getUrls(url)) {
                if (getHostname(nextUrl) == startHostname && nextUrl !in visited) {
                    queue.add(nextUrl)
                    visited.add(nextUrl)
                }
            }
        }

        return visited.toList()
    }
}
```

```swift
/**
 * // This is HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *     func getUrls(_ url: String) -> [String] {}
 * }
 */

class Solution {
    func crawl(_ startUrl: String, _ htmlParser: HtmlParser) -> [String] {
        func getHostname(_ url: String) -> String {
            // split url by slashes
            // for instance, "http://example.org/foo/bar" will be split into
            // "http:", "", "example.org", "foo", "bar"
            // the hostname is the 2nd (0-indexed) element
            return url.split(separator: "/")[1].description
        }

        let startHostname = getHostname(startUrl)
        var visited = Set<String>([startUrl])
        var queue = [startUrl]

        while !queue.isEmpty {
            let url = queue.removeFirst()
            for nextUrl in htmlParser.getUrls(url) {
                if getHostname(nextUrl) == startHostname && !visited.contains(nextUrl) {
                    queue.append(nextUrl)
                    visited.insert(nextUrl)
                }
            }
        }

        return Array(visited)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot l)$
- Space complexity: $O(n \cdot l)$

>  Where $m$ is the number of edges in the graph, $l$ is the maximum length of a URL (`urls[i].length`), and $n$ is the total number of URLs (`urls.length`).
