## 1. Depth-first search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot l)$
- Space complexity: $O(m \cdot l)$

>  Where $m$ is the number of edges in the graph, and $l$ is the maximum length of a URL (`urls[i].length`).

---

## 2. Breadth-first search

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
::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot l)$
- Space complexity: $O(n \cdot l)$

>  Where $m$ is the number of edges in the graph, $l$ is the maximum length of a URL (`urls[i].length`), and $n$ is the total number of URLs (`urls.length`).
