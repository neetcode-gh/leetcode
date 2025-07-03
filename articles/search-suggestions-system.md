## 1. Brute Force

::tabs-start

```python
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        res = []
        m = len(searchWord)
        products.sort()

        for i in range(m):
            cur = []
            for w in products:
                if len(w) <= i:
                    continue

                flag = True
                for j in range(i + 1):
                    if w[j] != searchWord[j]:
                        flag = False
                        break

                if flag:
                    cur.append(w)
                    if len(cur) == 3:
                        break

            if not cur:
                for j in range(i, m):
                    res.append([])
                break
            res.append(cur)

        return res
```

```java
public class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        List<List<String>> res = new ArrayList<>();
        int m = searchWord.length();
        Arrays.sort(products);

        for (int i = 0; i < m; i++) {
            List<String> cur = new ArrayList<>();
            for (String w : products) {
                if (w.length() <= i) continue;

                boolean flag = true;
                for (int j = 0; j <= i; j++) {
                    if (w.charAt(j) != searchWord.charAt(j)) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    cur.add(w);
                    if (cur.size() == 3) break;
                }
            }

            if (cur.isEmpty()) {
                while (i < m) {
                    res.add(new ArrayList<>());
                    i++;
                }
                break;
            }

            res.add(cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        vector<vector<string>> res;
        int m = searchWord.size();
        sort(products.begin(), products.end());

        for (int i = 0; i < m; i++) {
            vector<string> cur;
            for (const string& w : products) {
                if (w.size() <= i) continue;

                bool flag = true;
                for (int j = 0; j <= i; j++) {
                    if (w[j] != searchWord[j]) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    cur.push_back(w);
                    if (cur.size() == 3) break;
                }
            }

            if (cur.empty()) {
                while (i < m) {
                    res.push_back({});
                    i++;
                }
                break;
            }

            res.push_back(cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} products
     * @param {string} searchWord
     * @return {string[][]}
     */
    suggestedProducts(products, searchWord) {
        let res = [];
        let m = searchWord.length;
        products.sort();

        for (let i = 0; i < m; i++) {
            let cur = [];
            for (let w of products) {
                if (w.length <= i) continue;

                let flag = true;
                for (let j = 0; j <= i; j++) {
                    if (w[j] !== searchWord[j]) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    cur.push(w);
                    if (cur.length === 3) break;
                }
            }

            if (cur.length === 0) {
                while (i < m) {
                    res.push([]);
                    i++;
                }
                break;
            }

            res.push(cur);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m * n)$
- Space complexity:
    - $O(n)$ or $O(1)$ space for the sorting algorithm.
    - $O(m * w)$ space for the output array.

> Where $n$ is the total number of characters in the string array $products$, $m$ is the length of the string $searchWord$, and $w$ is the average length of each word in the given string array.

---

## 2. Sorting + Binary Search

::tabs-start

```python
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        res = []
        m = len(searchWord)
        products.sort()

        prefix = []
        start = 0

        def binary_search(target, start):
            l, r = start, len(products)
            while l < r:
                mid = l + (r - l) // 2
                if products[mid] >= target:
                    r = mid
                else:
                    l = mid + 1
            return l

        for i in range(m):
            prefix.append(searchWord[i])
            start = binary_search("".join(prefix), start)

            cur = []
            for j in range(start, min(start + 3, len(products))):
                if products[j].startswith("".join(prefix)):
                    cur.append(products[j])
                else:
                    break

            res.append(cur)

        return res
```

```java
public class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        List<List<String>> res = new ArrayList<>();
        int m = searchWord.length();
        Arrays.sort(products);

        StringBuilder prefix = new StringBuilder();
        int start = 0;

        for (int i = 0; i < m; i++) {
            prefix.append(searchWord.charAt(i));
            start = binarySearch(products, prefix.toString(), start);

            List<String> cur = new ArrayList<>();
            for (int j = start; j < Math.min(start + 3, products.length); j++) {
                if (products[j].startsWith(prefix.toString())) {
                    cur.add(products[j]);
                } else {
                    break;
                }
            }

            res.add(cur);
        }

        return res;
    }

    private int binarySearch(String[] products, String target, int start) {
        int l = start, r = products.length;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (products[mid].compareTo(target) >= 0) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        vector<vector<string>> res;
        int m = searchWord.size();
        sort(products.begin(), products.end());

        string prefix = "";
        int start = 0;

        for (int i = 0; i < m; i++) {
            prefix += searchWord[i];
            start = binarySearch(products, prefix, start);

            vector<string> cur;
            for (int j = start; j < min(start + 3, (int)products.size()); j++) {
                if (products[j].substr(0, prefix.size()) == prefix) {
                    cur.push_back(products[j]);
                } else {
                    break;
                }
            }

            res.push_back(cur);
        }

        return res;
    }

private:
    int binarySearch(vector<string>& products, string target, int start) {
        int l = start, r = products.size();
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (products[mid] >= target) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} products
     * @param {string} searchWord
     * @return {string[][]}
     */
    suggestedProducts(products, searchWord) {
        let res = [];
        let m = searchWord.length;
        products.sort();

        let prefix = [];
        let start = 0;

        for (let i = 0; i < m; i++) {
            prefix.push(searchWord[i]);
            start = this.binarySearch(products, prefix.join(''), start);

            let cur = [];
            for (let j = start; j < Math.min(start + 3, products.length); j++) {
                if (products[j].startsWith(prefix.join(''))) {
                    cur.push(products[j]);
                } else {
                    break;
                }
            }

            res.push(cur);
        }

        return res;
    }

    /**
     * @param {string[]} products
     * @param {string} target
     * @param {number} start
     * @return {number}
     */
    binarySearch(products, target, start) {
        let l = start,
            r = products.length;
        while (l < r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (products[mid] >= target) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m * w * \log N)$
- Space complexity:
    - $O(n)$ or $O(1)$ space for the sorting algorithm.
    - $O(m * w)$ space for the output array.

> Where $n$ is the total number of characters in the string array $products$, $N$ is the size of the array $products$, $m$ is the length of the string $searchWord$, and $w$ is the average length of each word in the given string array.

---

## 3. Sorting + Binary Search (Built-In Function)

::tabs-start

```python
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        res = []
        m = len(searchWord)
        products.sort()

        prefix = ""
        start = 0
        for i in range(m):
            prefix += searchWord[i]
            start = bisect_left(products, prefix, start)

            cur = []
            for j in range(start, min(start + 3, len(products))):
                if products[j].startswith(prefix):
                    cur.append(products[j])
                else:
                    break

            res.append(cur)

        return res
```

```cpp
class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        vector<vector<string>> res;
        int m = searchWord.size();
        sort(products.begin(), products.end());

        string prefix = "";
        int start = 0;
        for (int i = 0; i < m; i++) {
            prefix += searchWord[i];
            start = lower_bound(products.begin() + start, products.end(), prefix) - products.begin();

            vector<string> cur;
            for (int j = start; j < min(start + 3, (int)products.size()); j++) {
                if (products[j].find(prefix) == 0) {
                    cur.push_back(products[j]);
                } else {
                    break;
                }
            }

            res.push_back(cur);
        }

        return res;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m * w * \log N)$
- Space complexity:
    - $O(n)$ or $O(1)$ space for the sorting algorithm.
    - $O(m * w)$ space for the output array.

> Where $n$ is the total number of characters in the string array $products$, $N$ is the size of the array $products$, $m$ is the length of the string $searchWord$, and $w$ is the average length of each word in the given string array.

---

## 4. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        res = []
        products.sort()

        l, r = 0, len(products) - 1
        for i in range(len(searchWord)):
            c = searchWord[i]

            while l <= r and (len(products[l]) <= i or products[l][i] != c):
                l += 1
            while l <= r and (len(products[r]) <= i or products[r][i] != c):
                r -= 1

            res.append([])
            remain = r - l + 1
            for j in range(min(3, remain)):
                res[-1].append(products[l + j])

        return res
```

```java
public class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        List<List<String>> res = new ArrayList<>();
        Arrays.sort(products);

        int l = 0, r = products.length - 1;
        for (int i = 0; i < searchWord.length(); i++) {
            char c = searchWord.charAt(i);

            while (l <= r && (products[l].length() <= i || products[l].charAt(i) != c)) {
                l++;
            }
            while (l <= r && (products[r].length() <= i || products[r].charAt(i) != c)) {
                r--;
            }

            List<String> cur = new ArrayList<>();
            int remain = r - l + 1;
            for (int j = 0; j < Math.min(3, remain); j++) {
                cur.add(products[l + j]);
            }

            res.add(cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        vector<vector<string>> res;
        sort(products.begin(), products.end());

        int l = 0, r = products.size() - 1;
        for (int i = 0; i < searchWord.size(); i++) {
            char c = searchWord[i];

            while (l <= r && (products[l].size() <= i || products[l][i] != c)) {
                l++;
            }
            while (l <= r && (products[r].size() <= i || products[r][i] != c)) {
                r--;
            }

            vector<string> cur;
            int remain = r - l + 1;
            for (int j = 0; j < min(3, remain); j++) {
                cur.push_back(products[l + j]);
            }

            res.push_back(cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} products
     * @param {string} searchWord
     * @return {string[][]}
     */
    suggestedProducts(products, searchWord) {
        let res = [];
        products.sort();

        let l = 0,
            r = products.length - 1;
        for (let i = 0; i < searchWord.length; i++) {
            let c = searchWord[i];

            while (
                l <= r &&
                (products[l].length <= i || products[l][i] !== c)
            ) {
                l++;
            }
            while (
                l <= r &&
                (products[r].length <= i || products[r][i] !== c)
            ) {
                r--;
            }

            let cur = [];
            let remain = r - l + 1;
            for (let j = 0; j < Math.min(3, remain); j++) {
                cur.push(products[l + j]);
            }

            res.push(cur);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m * w + N)$
- Space complexity:
    - $O(n)$ or $O(1)$ space for the sorting algorithm.
    - $O(m * w)$ space for the output array.

> Where $n$ is the total number of characters in the string array $products$, $N$ is the size of the array $products$, $m$ is the length of the string $searchWord$, and $w$ is the average length of each word in the given string array.
