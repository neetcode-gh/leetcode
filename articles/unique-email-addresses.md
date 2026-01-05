## 1. Built-In Functions

::tabs-start

```python
class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        unique = set()

        for e in emails:
            local, domain = e.split('@')
            local = local.split("+")[0]
            local = local.replace(".", "")
            unique.add((local, domain))
        return len(unique)
```

```java
public class Solution {
    public int numUniqueEmails(String[] emails) {
        Set<String> unique = new HashSet<>();

        for (String e : emails) {
            String[] parts = e.split("@");
            String local = parts[0];
            String domain = parts[1];

            local = local.split("\\+")[0];
            local = local.replace(".", "");
            unique.add(local + "@" + domain);
        }
        return unique.size();
    }
}
```

```cpp
class Solution {
public:
    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> unique;

        for (string e : emails) {
            string local = e.substr(0, e.find('@'));
            local = local.substr(0, local.find('+'));
            local.erase(remove(local.begin(), local.end(), '.'), local.end());
            unique.insert(local + e.substr(e.find('@')));
        }
        return unique.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} emails
     * @return {number}
     */
    numUniqueEmails(emails) {
        const unique = new Set();

        for (let e of emails) {
            let [local, domain] = e.split('@');
            local = local.split('+')[0];
            local = local.replace(/\./g, '');
            unique.add(`${local}@${domain}`);
        }
        return unique.size;
    }
}
```

```csharp
public class Solution {
    public int NumUniqueEmails(string[] emails) {
        HashSet<string> unique = new HashSet<string>();

        foreach (string e in emails) {
            string[] parts = e.Split('@');
            string local = parts[0];
            string domain = parts[1];

            local = local.Split('+')[0];
            local = local.Replace(".", "");
            unique.Add(local + "@" + domain);
        }

        return unique.Count;
    }
}
```

```go
func numUniqueEmails(emails []string) int {
    unique := make(map[string]bool)

    for _, e := range emails {
        parts := strings.Split(e, "@")
        local, domain := parts[0], parts[1]

        local = strings.Split(local, "+")[0]
        local = strings.ReplaceAll(local, ".", "")

        key := local + "@" + domain
        unique[key] = true
    }

    return len(unique)
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings in the array, and $m$ is the average length of these strings.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        unique = set()

        for e in emails:
            i, local = 0, ""
            while e[i] not in ["@", "+"]:
                if e[i] != ".":
                    local += e[i]
                i += 1

            while e[i] != "@":
                i += 1
            domain = e[i + 1:]
            unique.add((local, domain))
        return len(unique)
```

```java
public class Solution {
    public int numUniqueEmails(String[] emails) {
        Set<String> unique = new HashSet<>();

        for (String e : emails) {
            int i = 0;
            StringBuilder local = new StringBuilder();
            while (i < e.length() && e.charAt(i) != '@' && e.charAt(i) != '+') {
                if (e.charAt(i) != '.') {
                    local.append(e.charAt(i));
                }
                i++;
            }

            while (i < e.length() && e.charAt(i) != '@') {
                i++;
            }
            String domain = e.substring(i + 1);
            unique.add(local.toString() + "@" + domain);
        }
        return unique.size();
    }
}
```

```cpp
class Solution {
public:
    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> unique;

        for (string e : emails) {
            int i = 0;
            string local = "";
            while (i < e.length() && e[i] != '@' && e[i] != '+') {
                if (e[i] != '.') {
                    local += e[i];
                }
                i++;
            }

            while (i < e.length() && e[i] != '@') {
                i++;
            }
            string domain = e.substr(i + 1);
            unique.insert(local + "@" + domain);
        }
        return unique.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} emails
     * @return {number}
     */
    numUniqueEmails(emails) {
        const unique = new Set();

        for (let e of emails) {
            let i = 0,
                local = '';
            while (i < e.length && e[i] !== '@' && e[i] !== '+') {
                if (e[i] !== '.') {
                    local += e[i];
                }
                i++;
            }

            while (i < e.length && e[i] !== '@') {
                i++;
            }
            const domain = e.slice(i + 1);
            unique.add(`${local}@${domain}`);
        }
        return unique.size;
    }
}
```

```csharp
public class Solution {
    public int NumUniqueEmails(string[] emails) {
        HashSet<string> unique = new HashSet<string>();

        foreach (string e in emails) {
            int i = 0;
            StringBuilder local = new StringBuilder();

            while (i < e.Length && e[i] != '@' && e[i] != '+') {
                if (e[i] != '.') {
                    local.Append(e[i]);
                }
                i++;
            }

            while (i < e.Length && e[i] != '@') {
                i++;
            }

            string domain = e.Substring(i + 1);
            unique.Add(local.ToString() + "@" + domain);
        }

        return unique.Count;
    }
}
```

```go
func numUniqueEmails(emails []string) int {
    unique := make(map[string]bool)

    for _, e := range emails {
        i := 0
        local := ""

        for e[i] != '@' && e[i] != '+' {
            if e[i] != '.' {
                local += string(e[i])
            }
            i++
        }

        for e[i] != '@' {
            i++
        }
        domain := e[i+1:]

        key := local + "@" + domain
        unique[key] = true
    }

    return len(unique)
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings in the array, and $m$ is the average length of these strings.
