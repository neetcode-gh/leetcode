## 1. Recursion

### Intuition
The string consists of segments that are either single characters or groups of options inside braces. We process the string from left to right, extracting the options for each position. For the first position, we get all possible characters (sorted if from braces), then recursively generate all words from the remaining string. Each option at the current position is combined with each word from the recursive result.

### Algorithm
1. Define a helper function to extract options at the current position:
   - If the character is not `'{'`, return just that character.
   - Otherwise, collect all characters until `'}'`, sort them, and return the list.
2. Define a recursive function to generate all words from a starting position:
   - Base case: if at the end of the string, return a list containing an empty string.
   - Get the options for the current position and the starting index of the remaining string.
   - Recursively generate all words from the remaining string.
   - Combine each option with each word from the recursive result.
3. Call the recursive function starting at position `0` and return the result.

::tabs-start

```python
class Solution:
    def expand(self, s: str) -> List[str]:
        def storeFirstOptions(startPos, firstOptions):
            # If the first character is not '{', it means a single character
            if s[startPos] != '{':
                firstOptions.append(s[startPos])
            else:
                # Store all the characters between '{' and '}'
                while s[startPos] != '}':
                    if 'a' <= s[startPos] <= 'z':
                        firstOptions.append(s[startPos])
                    startPos += 1
                # Sort the list
                firstOptions.sort()
            # Increment it to point to the next character to be considered
            return startPos + 1

        def findAllWords(startPos):
            # Return empty string list if the string is empty
            if startPos == len(s):
                return [""]

            firstOptions = []
            # Store the characters for the first index as string in firstOptions
            remStringStartPos = storeFirstOptions(startPos, firstOptions)
            wordsWithRemString = findAllWords(remStringStartPos)

            expandedWords = []
            # Create new words by adding the character at the beginning
            for c in firstOptions:
                for word in wordsWithRemString:
                    expandedWords.append(c + word)

            return expandedWords

        return findAllWords(0)
```

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

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    expand(s) {
        const storeFirstOptions = (startPos, firstOptions) => {
            // If the first character is not '{', it means a single character
            if (s[startPos] !== '{') {
                firstOptions.push(s[startPos]);
            } else {
                // Store all the characters between '{' and '}'
                while (s[startPos] !== '}') {
                    if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                        firstOptions.push(s[startPos]);
                    }
                    startPos++;
                }
                // Sort the list
                firstOptions.sort();
            }
            // Increment it to point to the next character to be considered
            return startPos + 1;
        };

        const findAllWords = (startPos) => {
            // Return empty string list if the string is empty
            if (startPos === s.length) {
                return [""];
            }

            const firstOptions = [];
            // Store the characters for the first index as string in firstOptions
            const remStringStartPos = storeFirstOptions(startPos, firstOptions);
            const wordsWithRemString = findAllWords(remStringStartPos);

            const expandedWords = [];
            // Create new words by adding the character at the beginning
            for (const c of firstOptions) {
                for (const word of wordsWithRemString) {
                    expandedWords.push(c + word);
                }
            }

            return expandedWords;
        };

        return findAllWords(0);
    }
}
```

```csharp
public class Solution {
    private int StoreFirstOptions(string s, int startPos, List<char> firstOptions) {
        // If the first character is not '{', it means a single character
        if (s[startPos] != '{') {
            firstOptions.Add(s[startPos]);
        } else {
            // Store all the characters between '{' and '}'
            while (s[startPos] != '}') {
                if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                    firstOptions.Add(s[startPos]);
                }
                startPos++;
            }
            // Sort the list
            firstOptions.Sort();
        }
        // Increment it to point to the next character to be considered
        return startPos + 1;
    }

    private string[] FindAllWords(string s, int startPos) {
        // Return empty string list if the string is empty
        if (startPos == s.Length) {
            return new string[] { "" };
        }

        List<char> firstOptions = new List<char>();
        // Store the characters for the first index as string in firstOptions
        int remStringStartPos = StoreFirstOptions(s, startPos, firstOptions);
        string[] wordsWithRemString = FindAllWords(s, remStringStartPos);

        List<string> expandedWords = new List<string>();
        // Create new words by adding the character at the beginning
        foreach (char c in firstOptions) {
            foreach (string word in wordsWithRemString) {
                expandedWords.Add(c + word);
            }
        }

        return expandedWords.ToArray();
    }

    public string[] Expand(string s) {
        return FindAllWords(s, 0);
    }
}
```

```go
func expand(s string) []string {
    var storeFirstOptions func(startPos int, firstOptions *[]byte) int
    storeFirstOptions = func(startPos int, firstOptions *[]byte) int {
        // If the first character is not '{', it means a single character
        if s[startPos] != '{' {
            *firstOptions = append(*firstOptions, s[startPos])
        } else {
            // Store all the characters between '{' and '}'
            for s[startPos] != '}' {
                if s[startPos] >= 'a' && s[startPos] <= 'z' {
                    *firstOptions = append(*firstOptions, s[startPos])
                }
                startPos++
            }
            // Sort the list
            sort.Slice(*firstOptions, func(i, j int) bool {
                return (*firstOptions)[i] < (*firstOptions)[j]
            })
        }
        // Increment it to point to the next character to be considered
        return startPos + 1
    }

    var findAllWords func(startPos int) []string
    findAllWords = func(startPos int) []string {
        // Return empty string list if the string is empty
        if startPos == len(s) {
            return []string{""}
        }

        firstOptions := []byte{}
        // Store the characters for the first index as string in firstOptions
        remStringStartPos := storeFirstOptions(startPos, &firstOptions)
        wordsWithRemString := findAllWords(remStringStartPos)

        expandedWords := []string{}
        // Create new words by adding the character at the beginning
        for _, c := range firstOptions {
            for _, word := range wordsWithRemString {
                expandedWords = append(expandedWords, string(c)+word)
            }
        }

        return expandedWords
    }

    return findAllWords(0)
}
```

```kotlin
class Solution {
    fun expand(s: String): Array<String> {
        fun storeFirstOptions(startPos: Int, firstOptions: MutableList<Char>): Int {
            var pos = startPos
            // If the first character is not '{', it means a single character
            if (s[pos] != '{') {
                firstOptions.add(s[pos])
            } else {
                // Store all the characters between '{' and '}'
                while (s[pos] != '}') {
                    if (s[pos] in 'a'..'z') {
                        firstOptions.add(s[pos])
                    }
                    pos++
                }
                // Sort the list
                firstOptions.sort()
            }
            // Increment it to point to the next character to be considered
            return pos + 1
        }

        fun findAllWords(startPos: Int): List<String> {
            // Return empty string list if the string is empty
            if (startPos == s.length) {
                return listOf("")
            }

            val firstOptions = mutableListOf<Char>()
            // Store the characters for the first index as string in firstOptions
            val remStringStartPos = storeFirstOptions(startPos, firstOptions)
            val wordsWithRemString = findAllWords(remStringStartPos)

            val expandedWords = mutableListOf<String>()
            // Create new words by adding the character at the beginning
            for (c in firstOptions) {
                for (word in wordsWithRemString) {
                    expandedWords.add(c + word)
                }
            }

            return expandedWords
        }

        return findAllWords(0).toTypedArray()
    }
}
```

```swift
class Solution {
    func expand(_ s: String) -> [String] {
        let chars = Array(s)

        func storeFirstOptions(_ startPos: Int, _ firstOptions: inout [Character]) -> Int {
            var pos = startPos
            // If the first character is not '{', it means a single character
            if chars[pos] != "{" {
                firstOptions.append(chars[pos])
            } else {
                // Store all the characters between '{' and '}'
                while chars[pos] != "}" {
                    if chars[pos] >= "a" && chars[pos] <= "z" {
                        firstOptions.append(chars[pos])
                    }
                    pos += 1
                }
                // Sort the list
                firstOptions.sort()
            }
            // Increment it to point to the next character to be considered
            return pos + 1
        }

        func findAllWords(_ startPos: Int) -> [String] {
            // Return empty string list if the string is empty
            if startPos == chars.count {
                return [""]
            }

            var firstOptions: [Character] = []
            // Store the characters for the first index as string in firstOptions
            let remStringStartPos = storeFirstOptions(startPos, &firstOptions)
            let wordsWithRemString = findAllWords(remStringStartPos)

            var expandedWords: [String] = []
            // Create new words by adding the character at the beginning
            for c in firstOptions {
                for word in wordsWithRemString {
                    expandedWords.append(String(c) + word)
                }
            }

            return expandedWords
        }

        return findAllWords(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N \cdot 3^{N/7})$

>  Where $N$ is the length of the given string.

---

## 2. Iteration

### Intuition
Instead of using recursion, we can build the words iteratively. Starting with an empty string, we process each segment of the input. For each segment, we take all current words and extend each one with every option from that segment. This is similar to a Cartesian product, building up the result position by position.

### Algorithm
1. Initialize `expandedWords` with a single empty string.
2. Iterate through the input string:
   - Extract the options at the current position (single char or sorted chars from braces).
   - For each existing word in `expandedWords` and each option:
     - Create a new word by appending the option to the existing word.
   - Replace `expandedWords` with the newly created words.
   - Move the position to the next segment.
3. Return `expandedWords`.

::tabs-start

```python
class Solution:
    def expand(self, s: str) -> List[str]:
        def storeFirstOptions(startPos, firstOptions):
            # If the first character is not '{', it means a single character
            if s[startPos] != '{':
                firstOptions.append(s[startPos])
            else:
                # Store all the characters between '{' and '}'
                while s[startPos] != '}':
                    if 'a' <= s[startPos] <= 'z':
                        firstOptions.append(s[startPos])
                    startPos += 1
                # Sort the list
                firstOptions.sort()
            # Increment it to point to the next character to be considered
            return startPos + 1

        expandedWords = [""]
        startPos = 0
        while startPos < len(s):
            firstOptions = []
            # Store the characters for the first index as string in firstOptions
            remStringStartPos = storeFirstOptions(startPos, firstOptions)

            currWords = []
            # Append the string in the list firstOptions to string in expandedWords
            for word in expandedWords:
                for c in firstOptions:
                    currWords.append(word + c)

            # Update the list expandedWords to have all the words
            expandedWords = currWords
            # Pointing to the next character to be considered
            startPos = remStringStartPos

        return expandedWords
```

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

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    expand(s) {
        const storeFirstOptions = (startPos, firstOptions) => {
            // If the first character is not '{', it means a single character
            if (s[startPos] !== '{') {
                firstOptions.push(s[startPos]);
            } else {
                // Store all the characters between '{' and '}'
                while (s[startPos] !== '}') {
                    if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                        firstOptions.push(s[startPos]);
                    }
                    startPos++;
                }
                // Sort the list
                firstOptions.sort();
            }
            // Increment it to point to the next character to be considered
            return startPos + 1;
        };

        let expandedWords = [""];
        let startPos = 0;
        while (startPos < s.length) {
            const firstOptions = [];
            // Store the characters for the first index as string in firstOptions
            const remStringStartPos = storeFirstOptions(startPos, firstOptions);

            const currWords = [];
            // Append the string in the list firstOptions to string in expandedWords
            for (const word of expandedWords) {
                for (const c of firstOptions) {
                    currWords.push(word + c);
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords;
            // Pointing to the next character to be considered
            startPos = remStringStartPos;
        }

        return expandedWords;
    }
}
```

```csharp
public class Solution {
    private int StoreFirstOptions(string s, int startPos, List<string> firstOptions) {
        // If the first character is not '{', it means a single character
        if (s[startPos] != '{') {
            firstOptions.Add(s[startPos].ToString());
        } else {
            // Store all the characters between '{' and '}'
            while (s[startPos] != '}') {
                if (s[startPos] >= 'a' && s[startPos] <= 'z') {
                    firstOptions.Add(s[startPos].ToString());
                }
                startPos++;
            }
            // Sort the list
            firstOptions.Sort();
        }
        // Increment it to point to the next character to be considered
        return startPos + 1;
    }

    public string[] Expand(string s) {
        List<string> expandedWords = new List<string> { "" };

        int startPos = 0;
        while (startPos < s.Length) {
            List<string> firstOptions = new List<string>();
            // Store the characters for the first index as string in firstOptions
            int remStringStartPos = StoreFirstOptions(s, startPos, firstOptions);

            List<string> currWords = new List<string>();
            // Append the string in the list firstOptions to string in expandedWords
            foreach (string word in expandedWords) {
                foreach (string c in firstOptions) {
                    currWords.Add(word + c);
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords;
            // Pointing to the next character to be considered
            startPos = remStringStartPos;
        }

        return expandedWords.ToArray();
    }
}
```

```go
func expand(s string) []string {
    storeFirstOptions := func(startPos int, firstOptions *[]string) int {
        // If the first character is not '{', it means a single character
        if s[startPos] != '{' {
            *firstOptions = append(*firstOptions, string(s[startPos]))
        } else {
            // Store all the characters between '{' and '}'
            for s[startPos] != '}' {
                if s[startPos] >= 'a' && s[startPos] <= 'z' {
                    *firstOptions = append(*firstOptions, string(s[startPos]))
                }
                startPos++
            }
            // Sort the list
            sort.Strings(*firstOptions)
        }
        // Increment it to point to the next character to be considered
        return startPos + 1
    }

    expandedWords := []string{""}
    startPos := 0
    for startPos < len(s) {
        firstOptions := []string{}
        // Store the characters for the first index as string in firstOptions
        remStringStartPos := storeFirstOptions(startPos, &firstOptions)

        currWords := []string{}
        // Append the string in the list firstOptions to string in expandedWords
        for _, word := range expandedWords {
            for _, c := range firstOptions {
                currWords = append(currWords, word+c)
            }
        }

        // Update the list expandedWords to have all the words
        expandedWords = currWords
        // Pointing to the next character to be considered
        startPos = remStringStartPos
    }

    return expandedWords
}
```

```kotlin
class Solution {
    fun expand(s: String): Array<String> {
        fun storeFirstOptions(startPos: Int, firstOptions: MutableList<String>): Int {
            var pos = startPos
            // If the first character is not '{', it means a single character
            if (s[pos] != '{') {
                firstOptions.add(s[pos].toString())
            } else {
                // Store all the characters between '{' and '}'
                while (s[pos] != '}') {
                    if (s[pos] in 'a'..'z') {
                        firstOptions.add(s[pos].toString())
                    }
                    pos++
                }
                // Sort the list
                firstOptions.sort()
            }
            // Increment it to point to the next character to be considered
            return pos + 1
        }

        var expandedWords = mutableListOf("")
        var startPos = 0
        while (startPos < s.length) {
            val firstOptions = mutableListOf<String>()
            // Store the characters for the first index as string in firstOptions
            val remStringStartPos = storeFirstOptions(startPos, firstOptions)

            val currWords = mutableListOf<String>()
            // Append the string in the list firstOptions to string in expandedWords
            for (word in expandedWords) {
                for (c in firstOptions) {
                    currWords.add(word + c)
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords
            // Pointing to the next character to be considered
            startPos = remStringStartPos
        }

        return expandedWords.toTypedArray()
    }
}
```

```swift
class Solution {
    func expand(_ s: String) -> [String] {
        let chars = Array(s)

        func storeFirstOptions(_ startPos: Int, _ firstOptions: inout [String]) -> Int {
            var pos = startPos
            // If the first character is not '{', it means a single character
            if chars[pos] != "{" {
                firstOptions.append(String(chars[pos]))
            } else {
                // Store all the characters between '{' and '}'
                while chars[pos] != "}" {
                    if chars[pos] >= "a" && chars[pos] <= "z" {
                        firstOptions.append(String(chars[pos]))
                    }
                    pos += 1
                }
                // Sort the list
                firstOptions.sort()
            }
            // Increment it to point to the next character to be considered
            return pos + 1
        }

        var expandedWords = [""]
        var startPos = 0
        while startPos < chars.count {
            var firstOptions: [String] = []
            // Store the characters for the first index as string in firstOptions
            let remStringStartPos = storeFirstOptions(startPos, &firstOptions)

            var currWords: [String] = []
            // Append the string in the list firstOptions to string in expandedWords
            for word in expandedWords {
                for c in firstOptions {
                    currWords.append(word + c)
                }
            }

            // Update the list expandedWords to have all the words
            expandedWords = currWords
            // Pointing to the next character to be considered
            startPos = remStringStartPos
        }

        return expandedWords
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N \cdot 3^{N/7})$

>  Where $N$ is the length of the given string.

---

## 3. Backtracking

### Intuition
Backtracking is a natural fit for generating all combinations. First, we parse the input string to extract all options for each position. Then we build words character by character: at each position, we try each available option, add it to the current word, recurse to the next position, and then remove it (backtrack) to try the next option.

### Algorithm
1. Parse the input string to create a list of options for each position:
   - For each segment, extract either a single character or sorted characters from braces.
2. Define a recursive backtracking function:
   - Base case: if the current string length equals the number of positions, add it to the result.
   - Get the options for the current position.
   - For each option:
     - Append the character to the current string.
     - Recurse to fill the next position.
     - Remove the last character (backtrack).
3. Call the backtracking function with an empty string and return the result.

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

```csharp
public class Solution {
    private List<List<char>> allOptions = new List<List<char>>();

    private void StoreAllOptions(string s) {
        for (int pos = 0; pos < s.Length; pos++) {
            List<char> currOptions = new List<char>();

            // If the first character is not '{', it means a single character
            if (s[pos] != '{') {
                currOptions.Add(s[pos]);
            } else {
                // Store all the characters between '{' and '}'
                while (s[pos] != '}') {
                    if (s[pos] >= 'a' && s[pos] <= 'z') {
                        currOptions.Add(s[pos]);
                    }
                    pos++;
                }
                // Sort the list
                currOptions.Sort();
            }
            allOptions.Add(currOptions);
        }
    }

    private void GenerateWords(StringBuilder currString, List<string> expandedWords) {
        // If the currString is complete, we can store and return
        if (currString.Length == allOptions.Count) {
            expandedWords.Add(currString.ToString());
            return;
        }

        // Fetch the options for the current index
        List<char> currOptions = allOptions[currString.Length];

        // Add the character and go into recursion
        foreach (char c in currOptions) {
            currString.Append(c);
            GenerateWords(currString, expandedWords);
            // Backtrack to previous state
            currString.Length--;
        }
    }

    public string[] Expand(string s) {
        // Store the character options for different indices
        StoreAllOptions(s);

        List<string> expandedWords = new List<string>();
        GenerateWords(new StringBuilder(), expandedWords);
        return expandedWords.ToArray();
    }
}
```

```go
func expand(s string) []string {
    allOptions := [][]byte{}

    // Store all options for each position
    storeAllOptions := func() {
        pos := 0
        for pos < len(s) {
            currOptions := []byte{}
            // If the first character is not '{', it means a single character
            if s[pos] != '{' {
                currOptions = append(currOptions, s[pos])
            } else {
                // Store all the characters between '{' and '}'
                for s[pos] != '}' {
                    if s[pos] >= 'a' && s[pos] <= 'z' {
                        currOptions = append(currOptions, s[pos])
                    }
                    pos++
                }
                // Sort the list
                sort.Slice(currOptions, func(i, j int) bool {
                    return currOptions[i] < currOptions[j]
                })
            }
            allOptions = append(allOptions, currOptions)
            pos++
        }
    }

    var generateWords func(currString []byte, expandedWords *[]string)
    generateWords = func(currString []byte, expandedWords *[]string) {
        // If the currString is complete, we can store and return
        if len(currString) == len(allOptions) {
            *expandedWords = append(*expandedWords, string(currString))
            return
        }

        // Fetch the options for the current index
        currOptions := allOptions[len(currString)]

        // Add the character and go into recursion
        for _, c := range currOptions {
            currString = append(currString, c)
            generateWords(currString, expandedWords)
            // Backtrack to previous state
            currString = currString[:len(currString)-1]
        }
    }

    // Store the character options for different indices
    storeAllOptions()
    expandedWords := []string{}
    generateWords([]byte{}, &expandedWords)
    return expandedWords
}
```

```kotlin
class Solution {
    fun expand(s: String): Array<String> {
        val allOptions = mutableListOf<MutableList<Char>>()

        // Store all options for each position
        fun storeAllOptions() {
            var pos = 0
            while (pos < s.length) {
                val currOptions = mutableListOf<Char>()
                // If the first character is not '{', it means a single character
                if (s[pos] != '{') {
                    currOptions.add(s[pos])
                } else {
                    // Store all the characters between '{' and '}'
                    while (s[pos] != '}') {
                        if (s[pos] in 'a'..'z') {
                            currOptions.add(s[pos])
                        }
                        pos++
                    }
                    // Sort the list
                    currOptions.sort()
                }
                allOptions.add(currOptions)
                pos++
            }
        }

        fun generateWords(currString: StringBuilder, expandedWords: MutableList<String>) {
            // If the currString is complete, we can store and return
            if (currString.length == allOptions.size) {
                expandedWords.add(currString.toString())
                return
            }

            // Fetch the options for the current index
            val currOptions = allOptions[currString.length]

            // Add the character and go into recursion
            for (c in currOptions) {
                currString.append(c)
                generateWords(currString, expandedWords)
                // Backtrack to previous state
                currString.deleteCharAt(currString.length - 1)
            }
        }

        // Store the character options for different indices
        storeAllOptions()
        val expandedWords = mutableListOf<String>()
        generateWords(StringBuilder(), expandedWords)
        return expandedWords.toTypedArray()
    }
}
```

```swift
class Solution {
    func expand(_ s: String) -> [String] {
        let chars = Array(s)
        var allOptions: [[Character]] = []

        // Store all options for each position
        func storeAllOptions() {
            var pos = 0
            while pos < chars.count {
                var currOptions: [Character] = []
                // If the first character is not '{', it means a single character
                if chars[pos] != "{" {
                    currOptions.append(chars[pos])
                } else {
                    // Store all the characters between '{' and '}'
                    while chars[pos] != "}" {
                        if chars[pos] >= "a" && chars[pos] <= "z" {
                            currOptions.append(chars[pos])
                        }
                        pos += 1
                    }
                    // Sort the list
                    currOptions.sort()
                }
                allOptions.append(currOptions)
                pos += 1
            }
        }

        func generateWords(_ currString: inout [Character], _ expandedWords: inout [String]) {
            // If the currString is complete, we can store and return
            if currString.count == allOptions.count {
                expandedWords.append(String(currString))
                return
            }

            // Fetch the options for the current index
            let currOptions = allOptions[currString.count]

            // Add the character and go into recursion
            for c in currOptions {
                currString.append(c)
                generateWords(&currString, &expandedWords)
                // Backtrack to previous state
                currString.removeLast()
            }
        }

        // Store the character options for different indices
        storeAllOptions()
        var expandedWords: [String] = []
        var currString: [Character] = []
        generateWords(&currString, &expandedWords)
        return expandedWords
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 3^{N/7})$

- Space complexity: $O(N)$

>  Where $N$ is the length of the given string.

---

## Common Pitfalls

### Forgetting to Sort Options Within Braces
The problem requires the output to be in lexicographically sorted order. Options within braces like `{b,a,c}` must be sorted to `[a,b,c]` before generating combinations, otherwise the final result will be out of order.
```python
# Wrong: using options in original order
options = ['b', 'a', 'c']
# Correct: sort first
options.sort()  # ['a', 'b', 'c']
```

### Incorrect Index Advancement After Closing Brace
When parsing a brace group, after finding `}`, you must advance the index past the `}` character. Off-by-one errors here cause infinite loops or skipped characters.
```python
# Wrong: not advancing past '}'
while s[pos] != '}':
    pos += 1
# Missing: pos += 1 after the loop
```

### Not Handling Single Characters Outside Braces
Single characters outside braces (like `a` in `a{b,c}`) should be treated as a group with one option. Forgetting this case causes the character to be skipped entirely in the output.
