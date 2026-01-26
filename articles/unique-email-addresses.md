## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Set** - Used to store and count unique email addresses efficiently
- **String Manipulation** - Splitting strings, replacing characters, and extracting substrings

---

## 1. Built-In Functions

### Intuition

Each email consists of a local name and domain separated by `@`. For the local name, periods are ignored and everything after `+` is discarded. The domain remains unchanged. Two emails are the same if they resolve to the same address after applying these rules.

We can leverage built-in string functions to parse and normalize each `e` mail, then use a set to count unique addresses.

### Algorithm

1. Initialize an empty set `unique` to store unique email addresses.
2. For each email `e`:
   - Split by `@` to get `local` and `domain`.
   - Split `local` by `+` and take only the first part.
   - Remove all periods from `local`.
   - Combine the normalized `local` with `domain` and add to `unique`.
3. Return the size of `unique`.

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

```kotlin
class Solution {
    fun numUniqueEmails(emails: Array<String>): Int {
        val unique = HashSet<String>()

        for (e in emails) {
            val parts = e.split("@")
            var local = parts[0]
            val domain = parts[1]

            local = local.split("+")[0]
            local = local.replace(".", "")
            unique.add("$local@$domain")
        }
        return unique.size
    }
}
```

```swift
class Solution {
    func numUniqueEmails(_ emails: [String]) -> Int {
        var unique = Set<String>()

        for e in emails {
            let parts = e.split(separator: "@")
            var local = String(parts[0])
            let domain = String(parts[1])

            local = String(local.split(separator: "+")[0])
            local = local.replacingOccurrences(of: ".", with: "")
            unique.insert("\(local)@\(domain)")
        }
        return unique.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings in the array, and $m$ is the average length of these strings.

---

## 2. Iteration

### Intuition

Instead of using built-in string functions, we can manually iterate through each character of the email. This gives us more control and can be slightly more efficient since we process each character exactly once.

### Algorithm

1. Initialize an empty set `unique` to store unique email addresses.
2. For each email `e`:
   - Initialize an empty string `local` and set index `i = 0`.
   - While the current character is not `@` or `+`:
     - If the character is not `.`, append it to `local`.
     - Increment `i`.
   - Skip characters until we reach `@`.
   - Extract `domain` as the substring after `@`.
   - Add the normalized email (`local` + `domain`) to `unique`.
3. Return the size of `unique`.

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

```kotlin
class Solution {
    fun numUniqueEmails(emails: Array<String>): Int {
        val unique = HashSet<String>()

        for (e in emails) {
            var i = 0
            val local = StringBuilder()
            while (i < e.length && e[i] != '@' && e[i] != '+') {
                if (e[i] != '.') {
                    local.append(e[i])
                }
                i++
            }

            while (i < e.length && e[i] != '@') {
                i++
            }
            val domain = e.substring(i + 1)
            unique.add("$local@$domain")
        }
        return unique.size
    }
}
```

```swift
class Solution {
    func numUniqueEmails(_ emails: [String]) -> Int {
        var unique = Set<String>()

        for e in emails {
            let chars = Array(e)
            var i = 0
            var local = ""

            while i < chars.count && chars[i] != "@" && chars[i] != "+" {
                if chars[i] != "." {
                    local.append(chars[i])
                }
                i += 1
            }

            while i < chars.count && chars[i] != "@" {
                i += 1
            }
            let domain = String(chars[(i + 1)...])
            unique.insert("\(local)@\(domain)")
        }
        return unique.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings in the array, and $m$ is the average length of these strings.

---

## Common Pitfalls

### Applying Local Name Rules to the Domain

A common mistake is applying the period-removal and plus-sign rules to the entire email address instead of just the local name. The domain portion (after the `@` symbol) must remain unchanged. Periods in domain names like `gmail.com` are meaningful and should never be removed.

### Incorrect Handling of the Plus Sign

Some solutions incorrectly remove only the `+` character itself rather than everything from `+` to the `@`. The rule states that everything after the first `+` in the local name should be ignored, not just the plus character. For example, in `test+spam@gmail.com`, the entire `+spam` portion must be discarded.
