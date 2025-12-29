## 1. Recursion

::tabs-start

```java
class Solution {
    int storeFirstOptions(String s, int startPos, List<Character> firstOptions) {
        // If the first character is not '{', it means a single character
        if (s.charAt(startPos) != '{') {
            firstOptions.add(s.charAt(startPos));
        } else {
            // Store all the characters between '{' and '}'
            while (s.charAt(startPos) != '}') {
                 if (s.charAt(startPos) >= 'a' && s.charAt(startPos) <= 'z') {
                     firstOptions.add(s.charAt(startPos));
                 }
                startPos++;
            }
            
            // Sort the list
            Collections.sort(firstOptions);
        }
        
        // Increment it to point to the next character to be considered
        return startPos + 1;
    }
    
    String[] findAllWords(String s, int startPos) {
        // Return empty string list if the string is empty
        if (startPos == s.length()) {
            return new String[] {""};
        }
        
        List<Character> firstOptions = new ArrayList<>();
        
        // Store the characters for the first index as string in firstOptions
        int remStringStartPos = storeFirstOptions(s, startPos, firstOptions);
        String[] wordsWithRemString = findAllWords(s, remStringStartPos);
        
        List<String> expandedWords = new ArrayList<>();
        
        // Create new words by adding the character at the beginning
        for (Character c : firstOptions) {
            for (String word : wordsWithRemString) {
                expandedWords.add(c + word);
            }
        }
        
        return expandedWords.toArray(new String[0]);
    }
    
    public String[] expand(String s) {
        return findAllWords(s, 0);
    }
}
```

```cpp
class Solution {
public:
    int storeFirstOptions(string& s, int startPos, vector<char>& firstOptions) {
        // If the first character is not '{', it means a single character
        if (s[startPos] != '{') {
            firstOptions.push_back(s[startPos]);
        } else {
            // Store all the characters between '{' and '}'
            while (s[startPos] != '}') {
                 if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                     firstOptions.push_back(s[startPos]);
                 }
                startPos++;
            }
            
            // Sort the list
            sort(firstOptions.begin(), firstOptions.end());
        }
        
        // Increment it to point to the next character to be considered
        return startPos + 1;
    }
    
    vector<string> findAllWords(string& s, int startPos) {
        // Return empty string list if the string is empty
        if (startPos == s.size()) {
            return {""};
        }
        
        vector<char> firstOptions;
        
        // Store the characters for the first index as string in firstOptions
        int remStringStartPos = storeFirstOptions(s, startPos, firstOptions);
        vector<string> wordsWithRemString = findAllWords(s, remStringStartPos);
        
        vector<string> expandedWords;
        
        // Create new words by adding the character at the beginning
        for (char c : firstOptions) {
            for (string word : wordsWithRemString) {
                expandedWords.push_back(c + word);
            }
        }
        
        return expandedWords;
    }
    
    vector<string> expand(string s) {
        return findAllWords(s, 0);
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N \cdot 3^{N/7})$

>  Where $N$ is the length of the given string.

---

## 2. Iteration

::tabs-start

```java
class Solution {
    int storeFirstOptions(String s, int startPos, List<String> firstOptions) {
        // If the first character is not '{', it means a single character
        if (s.charAt(startPos) != '{') {
            firstOptions.add(String.valueOf(s.charAt(startPos)));
        } else {
            // Store all the characters between '{' and '}'
            while (s.charAt(startPos) != '}') {
                if (s.charAt(startPos) >= 'a' && s.charAt(startPos) <= 'z') {
                    firstOptions.add(String.valueOf(s.charAt(startPos)));
                }
                startPos++;
            }

            // Sort the list
            Collections.sort(firstOptions);
        }

        // Increment it to point to the next character to be considered
        return startPos + 1;
    }
    
    String[] expand(String s) {
        List<String> expandedWords = Arrays.asList("");
        
        int startPos = 0;
        while (startPos < s.length()) {
            List<String> firstOptions = new ArrayList<>();
            // Store the characters for the first index as string in firstOptions
            int remStringStartPos = storeFirstOptions(s, startPos, firstOptions);
            
            List<String> currWords = new ArrayList<>();
            // Append the string in the list firstOptions to string in expandedWords
            for (String word : expandedWords) {
                for (String c : firstOptions) {
                    currWords.add(word + c);
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords;
            // Pointing to the next character to be considered
            startPos = remStringStartPos;
        }
        
        return expandedWords.toArray(new String[0]);
    }
}
```

```cpp
class Solution {
public:
    int storeFirstOptions(string& s, int startPos, vector<string>& firstOptions) {
        // If the first character is not '{', it means a single character
        if (s[startPos] != '{') {
            firstOptions.push_back(string(1, s[startPos]));
        } else {
            // Store all the characters between '{' and '}'
            while (s[startPos] != '}') {
                 if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                     firstOptions.push_back(string(1, s[startPos]));
                 }
                startPos++;
            }

            // Sort the list
            sort(firstOptions.begin(), firstOptions.end());
        }

        // Increment it to point to the next character to be considered
        return startPos + 1;
    }
    
    vector<string> expand(string s) {
        vector<string> expandedWords = {""};
        
        int startPos = 0;
        while (startPos < s.size()) {
            vector<string> firstOptions;
            // Store the characters for the first index as string in firstOptions
            int remStringStartPos = storeFirstOptions(s, startPos, firstOptions);
            
            vector<string> currWords;
            // Append the string in the list firstOptions to string in expandedWords
            for (string word : expandedWords) {
                for (string c : firstOptions) {
                    currWords.push_back(word + c);
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords;
            // Pointing to the next character to be considered
            startPos = remStringStartPos;
        }
        return expandedWords;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N \cdot 3^{N/7})$

>  Where $N$ is the length of the given string.

---

## 3. Backtracking

::tabs-start

```python
class Solution:
    def expand(self, s: str) -> List[str]:
        all_options = []
        
        # Store all options for each position
        def store_all_options():
            pos = 0
            while pos < len(s):
                curr_options = []
                # If the first character is not '{', it means a single character
                if s[pos] != '{':
                    curr_options.append(s[pos])
                else:
                    # Store all the characters between '{' and '}'
                    while s[pos] != '}':
                        if 'a' <= s[pos] <= 'z':
                            curr_options.append(s[pos])
                        pos += 1
                    # Sort the list
                    curr_options.sort()
                all_options.append(curr_options)
                pos += 1
        
        def generate_words(curr_string, expanded_words):
            # If the currString is complete, we can store and return
            if len(curr_string) == len(all_options):
                expanded_words.append(''.join(curr_string))
                return
            
            # Fetch the options for the current index
            curr_options = all_options[len(curr_string)]
            
            # Add the character and go into recursion
            for c in curr_options:
                curr_string.append(c)
                generate_words(curr_string, expanded_words)
                # Backtrack to previous state
                curr_string.pop()
        
        # Store the character options for different indices
        store_all_options()
        expanded_words = []
        generate_words([], expanded_words)
        return expanded_words
```

```java
class Solution {
    List<List<Character>> allOptions = new ArrayList<>();

    void storeAllOptions(String s) {
        for (int pos = 0; pos < s.length(); pos++) {
            List<Character> currOptions = new ArrayList<>();
            
            // If the first character is not '{', it means a single character
             if (s.charAt(pos) != '{') {
                 currOptions.add(s.charAt(pos));
             } else {
                 // Store all the characters between '{' and '}'
                 while (s.charAt(pos) != '}') {
                     if (s.charAt(pos) >= 'a' && s.charAt(pos) <= 'z') {
                         currOptions.add(s.charAt(pos));
                     }
                     pos++;
                 }
                 // Sort the list
                 Collections.sort(currOptions);
             }
            
            allOptions.add(currOptions);
        }
    }
    
    void generateWords(StringBuilder currString, List<String> expandedWords) {
        // If the currString is complete, we can store and return
        if (currString.length() == allOptions.size()) {
            expandedWords.add(currString.toString());
            return;
        }
        
        // Fetch the options for the current index
        List<Character> currOptions = allOptions.get(currString.length());
            
        // Add the character and go into recursion
        for (char c : currOptions) {
            currString.append(c);
            generateWords(currString, expandedWords);
            // Backtrack to previous state
            currString.deleteCharAt(currString.length() - 1);
        }
    }

    public String[] expand(String s) {
        // Store the character options for different indices
        storeAllOptions(s);
        
        List<String> expandedWords = new ArrayList<>();
        generateWords(new StringBuilder(), expandedWords);
        return expandedWords.toArray(new String[0]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> allOptions;
    
    void storeAllOptions(string& s) {
        for (int pos = 0; pos < s.size(); pos++) {
            vector<char> currOptions;
            
            // If the first character is not '{', it means a single character
            if (s[pos] != '{') {
                currOptions.push_back(s[pos]);
            } else {
                // Store all the characters between '{' and '}'
                while (s[pos] != '}') {
                    if (s[pos] >= 'a' && s[pos] <= 'z') {
                        currOptions.push_back(s[pos]);
                    }
                    pos++;
                }
                // Sort the list
                sort(currOptions.begin(), currOptions.end());
            }
            allOptions.push_back(currOptions);
        }
    }
    
    void generateWords(string currString, vector<string>& expandedWords) {
        // If the currString is complete, we can store and return
        if (currString.size() == allOptions.size()) {
            expandedWords.push_back(currString);
            return;
        }
        
        // Fetch the options for the current index
        vector<char> currOptions = allOptions[currString.size()];

        // Add the character and go into recursion
        for (char c : currOptions) {
            currString += c;
            generateWords(currString, expandedWords);
            // Backtrack to previous state
            currString.pop_back();
        }
    }
    
    vector<string> expand(string s) {
        // Store the character options for different indices
        storeAllOptions(s);
        
        vector<string> expandedWords;
        generateWords("", expandedWords);
        return expandedWords;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    expand(s) {
        const allOptions = [];
        
        // Store all options for each position
        const storeAllOptions = () => {
            let pos = 0;
            while (pos < s.length) {
                const currOptions = [];
                // If the first character is not '{', it means a single character
                if (s[pos] !== '{') {
                    currOptions.push(s[pos]);
                } else {
                    // Store all the characters between '{' and '}'
                    while (s[pos] !== '}') {
                        if (s[pos] >= 'a' && s[pos] <= 'z') {
                            currOptions.push(s[pos]);
                        }
                        pos++;
                    }
                    // Sort the list
                    currOptions.sort();
                }
                allOptions.push(currOptions);
                pos++;
            }
        };
        
        const generateWords = (currString, expandedWords) => {
            // If the currString is complete, we can store and return
            if (currString.length === allOptions.length) {
                expandedWords.push(currString.join(''));
                return;
            }
            
            // Fetch the options for the current index
            const currOptions = allOptions[currString.length];
            
            // Add the character and go into recursion
            for (const c of currOptions) {
                currString.push(c);
                generateWords(currString, expandedWords);
                // Backtrack to previous state
                currString.pop();
            }
        };
        
        // Store the character options for different indices
        storeAllOptions();
        const expandedWords = [];
        generateWords([], expandedWords);
        return expandedWords;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N)$

>  Where $N$ is the length of the given string.
