## 1. Iteration

::tabs-start

```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res = []
        line, length = [], 0
        i = 0

        while i < len(words):
            if length + len(words[i]) + len(line) <= maxWidth:
                line.append(words[i])
                length += len(words[i])
                i += 1
            else:
                # Line complete
                extra_space = maxWidth - length
                remainder = extra_space % max(1, (len(line) - 1))
                space = extra_space // max(1, (len(line) - 1))
                for j in range(max(1, len(line) - 1)):
                    line[j] += " " * space
                    if remainder:
                        line[j] += " "
                        remainder -= 1
                res.append("".join(line))
                line, length = [], 0

        # Handling last line
        last_line = " ".join(line)
        trail_space = maxWidth - len(last_line)
        res.append(last_line + " " * trail_space)
        return res
```

```java
public class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>();
        List<String> line = new ArrayList<>();
        int length = 0, i = 0;

        while (i < words.length) {
            // If the current word can fit in the line
            if (length + words[i].length() + line.size() <= maxWidth) {
                line.add(words[i]);
                length += words[i].length();
                i++;
            } else {
                // Line complete
                int extra_space = maxWidth - length;
                int remainder = extra_space % Math.max(1, (line.size() - 1));
                int space = extra_space / Math.max(1, (line.size() - 1));

                for (int j = 0; j < Math.max(1, line.size() - 1); j++) {
                    line.set(j, line.get(j) + " ".repeat(space));
                    if (remainder > 0) {
                        line.set(j, line.get(j) + " ");
                        remainder--;
                    }
                }

                res.add(String.join("", line));
                line.clear();
                length = 0;
            }
        }

        // Handling last line
        String last_line = String.join(" ", line);
        int trail_space = maxWidth - last_line.length();
        res.add(last_line + " ".repeat(trail_space));

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;
        vector<string> line;
        int length = 0, i = 0;

        while (i < words.size()) {
            if (length + words[i].size() + line.size() <= maxWidth) {
                line.push_back(words[i]);
                length += words[i].size();
                i++;
            } else {
                // Line complete
                int extra_space = maxWidth - length;
                int remainder = extra_space % max(1, (int)(line.size() - 1));
                int space = extra_space / max(1, (int)(line.size() - 1));

                for (int j = 0; j < max(1, (int)line.size() - 1); j++) {
                    line[j] += string(space, ' ');
                    if (remainder > 0) {
                        line[j] += " ";
                        remainder--;
                    }
                }

                string justified_line = accumulate(line.begin(), line.end(), string());
                res.push_back(justified_line);
                line.clear();
                length = 0;
            }
        }

        // Handling last line
        string last_line = accumulate(line.begin(), line.end(), string(),
                                      [](string a, string b) {
                                            return a.empty() ? b : a + " " + b;
                                        });
        int trail_space = maxWidth - last_line.size();
        last_line += string(trail_space, ' ');
        res.push_back(last_line);

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {number} maxWidth
     * @return {string[]}
     */
    fullJustify(words, maxWidth) {
        let res = [];
        let line = [],
            length = 0,
            i = 0;

        while (i < words.length) {
            if (length + words[i].length + line.length <= maxWidth) {
                line.push(words[i]);
                length += words[i].length;
                i++;
            } else {
                // Line complete
                let extra_space = maxWidth - length;
                let remainder = extra_space % Math.max(1, line.length - 1);
                let space = Math.floor(
                    extra_space / Math.max(1, line.length - 1),
                );

                for (let j = 0; j < Math.max(1, line.length - 1); j++) {
                    line[j] += ' '.repeat(space);
                    if (remainder > 0) {
                        line[j] += ' ';
                        remainder--;
                    }
                }

                res.push(line.join(''));
                line = [];
                length = 0;
            }
        }

        // Handling last line
        let last_line = line.join(' ');
        let trail_space = maxWidth - last_line.length;
        res.push(last_line + ' '.repeat(trail_space));

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> FullJustify(string[] words, int maxWidth) {
        List<string> res = new List<string>();
        List<string> line = new List<string>();
        int length = 0, i = 0;

        while (i < words.Length) {
            // If the current word can fit in the line
            if (length + words[i].Length + line.Count <= maxWidth) {
                line.Add(words[i]);
                length += words[i].Length;
                i++;
            } else {
                // Line complete
                int extra_space = maxWidth - length;
                int space = extra_space / Math.Max(1, line.Count - 1);
                int remainder = extra_space % Math.Max(1, line.Count - 1);

                for (int j = 0; j < Math.Max(1, line.Count - 1); j++) {
                    line[j] += new string(' ', space);
                    if (remainder > 0) {
                        line[j] += " ";
                        remainder--;
                    }
                }

                res.Add(string.Join("", line));
                line.Clear();
                length = 0;
            }
        }

        // Handling last line
        string last_line = string.Join(" ", line);
        int trail_space = maxWidth - last_line.Length;
        res.Add(last_line + new string(' ', trail_space));

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of words and $m$ is the average length of the words.
