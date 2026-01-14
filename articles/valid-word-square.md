## 1. Storing New Words

### Intuition

A word square has a special property: the k-th row reads the same as the k-th column. To verify this, we can construct new words by reading each column vertically and then compare them to the original row words. If every row word matches its corresponding column word, we have a valid word square. We first check basic constraints: the number of rows must equal the maximum word length, and the first row must be the longest.

### Algorithm

1. Count the number of rows and find the maximum column length.
2. If the first row is not the longest or the number of rows does not equal the number of columns, return `false`.
3. For each column index `col`, build a new word by collecting characters from each row at that column position (skip if the row is too short).
4. Store all these column words in a list.
5. Compare the original words list with the new column words list. Return `true` if they are identical.

::tabs-start

```python
class Solution:
    def validWordSquare(self, words: List[str]) -> bool:
        cols = 0
        rows = len(words)
        new_words = []
        
        for word in words:
            cols = max(cols, len(word))

        # If the first row doesn't have maximum number of characters, or
        # the number of rows is not equal to columns it can't form a square.
        if cols != len(words[0]) or rows != cols:
            return False

        for col in range(cols):
            new_word = []
            # Iterate on each character of column 'col'.
            for row in range(rows):
                # If the current row's word's size is less than the column number it means this column is empty,
                # or, if there is a character present then use it to make the new word.
                if col < len(words[row]):
                    new_word.append(words[row][col])
            # Push the new word of column 'col' in the list.
            new_words.append(''.join(new_word))

        # Check if all row's words match with the respective column's words.
        return words == new_words
```

```java
class Solution {
    public boolean validWordSquare(List<String> words) {
        int cols = 0;
        int rows = words.size();
        List<String> newWords = new ArrayList<String>();
        
        for (String word : words) {
            cols = Math.max(cols, word.length());
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if (cols != words.get(0).length() ||rows != cols) {
            return false;
        }

        for (int col = 0; col < cols; ++col) {
            StringBuilder newWord = new StringBuilder();
            // Iterate on each character of column 'col'.
            for (int row = 0; row < rows; ++row) {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if (col < words.get(row).length()) {
                    newWord.append(words.get(row).charAt(col));
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.add(newWord.toString());
        }

        // Check if all row's words match with the respective column's words.
        for (int index = 0; index < rows; ++index) {
            if (words.get(index).compareTo(newWords.get(index)) != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validWordSquare(vector<string>& words) {
        int cols = 0;
        int rows = words.size();
        vector<string> newWords;
        
        for (auto& word : words) {
            cols = max(cols, (int)word.size());
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if (cols != words[0].size() || rows != cols) {
            return false;
        }

        for (int col = 0; col < cols; ++col) {
            string newWord;
            // Iterate on each character of column 'col'.
            for (int row = 0; row < rows; ++row) {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if (col < words[row].size()) {
                    newWord += words[row][col];
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.push_back(newWord);
        }

        // Check if all row's words match with the respective column's words.
        return words == newWords;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    validWordSquare(words) {
        let cols = 0;
        let rows = words.length;
        let newWords = [];

        for (let word of words) {
            cols = Math.max(cols, word.length);
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if (cols != words[0].length || rows != cols) {
            return false;
        }

        for (let col = 0; col < cols; ++col) {
            let newWord = "";
            // Iterate on each character of column 'col'.
            for (let row = 0; row < rows; ++row) {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if (col < words[row].length) {
                    newWord += words[row][col];
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.push(newWord);
        }

        // Check if all row's words match with the respective column's words.
        return words.every((value, index) => value === newWords[index]);
    }
}
```

```csharp
public class Solution {
    public bool ValidWordSquare(IList<string> words) {
        int cols = 0;
        int rows = words.Count;
        List<string> newWords = new List<string>();

        foreach (string word in words) {
            cols = Math.Max(cols, word.Length);
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if (cols != words[0].Length || rows != cols) {
            return false;
        }

        for (int col = 0; col < cols; col++) {
            StringBuilder newWord = new StringBuilder();
            // Iterate on each character of column 'col'.
            for (int row = 0; row < rows; row++) {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if (col < words[row].Length) {
                    newWord.Append(words[row][col]);
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.Add(newWord.ToString());
        }

        // Check if all row's words match with the respective column's words.
        for (int index = 0; index < rows; index++) {
            if (words[index] != newWords[index]) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func validWordSquare(words []string) bool {
    cols := 0
    rows := len(words)
    newWords := []string{}

    for _, word := range words {
        if len(word) > cols {
            cols = len(word)
        }
    }

    // If the first row doesn't have maximum number of characters, or
    // the number of rows is not equal to columns it can't form a square.
    if cols != len(words[0]) || rows != cols {
        return false
    }

    for col := 0; col < cols; col++ {
        newWord := []byte{}
        // Iterate on each character of column 'col'.
        for row := 0; row < rows; row++ {
            // If the current row's word's size is less than the column number it means this column is empty,
            // or, if there is a character present then use it to make the new word.
            if col < len(words[row]) {
                newWord = append(newWord, words[row][col])
            }
        }
        // Push the new word of column 'col' in the list.
        newWords = append(newWords, string(newWord))
    }

    // Check if all row's words match with the respective column's words.
    for i := 0; i < rows; i++ {
        if words[i] != newWords[i] {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun validWordSquare(words: List<String>): Boolean {
        var cols = 0
        val rows = words.size
        val newWords = mutableListOf<String>()

        for (word in words) {
            cols = maxOf(cols, word.length)
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if (cols != words[0].length || rows != cols) {
            return false
        }

        for (col in 0 until cols) {
            val newWord = StringBuilder()
            // Iterate on each character of column 'col'.
            for (row in 0 until rows) {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if (col < words[row].length) {
                    newWord.append(words[row][col])
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.add(newWord.toString())
        }

        // Check if all row's words match with the respective column's words.
        return words == newWords
    }
}
```

```swift
class Solution {
    func validWordSquare(_ words: [String]) -> Bool {
        var cols = 0
        let rows = words.count
        var newWords: [String] = []
        let wordsArr = words.map { Array($0) }

        for word in wordsArr {
            cols = max(cols, word.count)
        }

        // If the first row doesn't have maximum number of characters, or
        // the number of rows is not equal to columns it can't form a square.
        if cols != wordsArr[0].count || rows != cols {
            return false
        }

        for col in 0..<cols {
            var newWord = ""
            // Iterate on each character of column 'col'.
            for row in 0..<rows {
                // If the current row's word's size is less than the column number it means this column is empty,
                // or, if there is a character present then use it to make the new word.
                if col < wordsArr[row].count {
                    newWord.append(wordsArr[row][col])
                }
            }
            // Push the new word of column 'col' in the list.
            newWords.append(newWord)
        }

        // Check if all row's words match with the respective column's words.
        return words == newWords
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(n \cdot m)$

>  Where $n$ is the number of strings in the `words` array and $m$ is the maximum length of a string

---

## 2. Iterate on the Matrix

### Intuition

Instead of building new words and comparing lists, we can directly verify the word square property: for every position `(row, col)`, the character must equal the character at position `(col, row)`. This is essentially checking that the matrix is symmetric along its main diagonal. We iterate through each character and verify this symmetry, handling cases where one position might be out of bounds.

### Algorithm

1. For each word at index `wordNum`:
   - For each character position `charPos` in that word:
     - Check if position `(charPos, wordNum)` is valid (`charPos < number of words`, `wordNum < length of words[charPos]`).
     - If invalid, return `false`.
     - If `words[wordNum][charPos] != words[charPos][wordNum]`, return `false`.
2. If all checks pass, return `true`.

::tabs-start

```python
class Solution:
    def validWordSquare(self, words: List[str]) -> bool:
        for word_num in range(len(words)):
            for char_pos in range(len(words[word_num])):
                # char_pos (curr 'row' word) is bigger than column word, or
                # word_num (curr 'column' word) is bigger than row word, or 
                # characters at index (word_num,char_pos) and (char_pos,word_num) are not equal.
                if char_pos >= len(words) or \
                    word_num >= len(words[char_pos]) or \
                    words[word_num][char_pos] != words[char_pos][word_num]:
                    return False
        return True
```

```java
class Solution {
    public boolean validWordSquare(List<String> words) {
        for (int wordNum = 0; wordNum < words.size(); ++wordNum) {
            for (int charPos = 0; charPos < words.get(wordNum).length(); ++charPos) {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or 
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if (charPos >= words.size() || 
                    wordNum >= words.get(charPos).length() || 
                    words.get(wordNum).charAt(charPos) != words.get(charPos).charAt(wordNum)){
                    return false;
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validWordSquare(vector<string>& words) {
        for (int wordNum = 0; wordNum < words.size(); ++wordNum) {
            for (int charPos = 0; charPos < words[wordNum].size(); ++charPos) {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or 
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if (charPos >= words.size() || 
                    wordNum >= words[charPos].size() || 
                    words[wordNum][charPos] != words[charPos][wordNum]){
                    return false;
                }
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    validWordSquare(words) {
        for (let wordNum = 0; wordNum < words.length; ++wordNum) {
            for (let charPos = 0; charPos < words[wordNum].length; ++charPos) {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if (charPos >= words.length ||
                    wordNum >= words[charPos].length ||
                    words[wordNum][charPos] != words[charPos][wordNum]){
                    return false;
                }
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool ValidWordSquare(IList<string> words) {
        for (int wordNum = 0; wordNum < words.Count; wordNum++) {
            for (int charPos = 0; charPos < words[wordNum].Length; charPos++) {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if (charPos >= words.Count ||
                    wordNum >= words[charPos].Length ||
                    words[wordNum][charPos] != words[charPos][wordNum]) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

```go
func validWordSquare(words []string) bool {
    for wordNum := 0; wordNum < len(words); wordNum++ {
        for charPos := 0; charPos < len(words[wordNum]); charPos++ {
            // charPos (curr 'row' word) is bigger than column word, or
            // wordNum (curr 'column' word) is bigger than row word, or
            // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
            if charPos >= len(words) ||
               wordNum >= len(words[charPos]) ||
               words[wordNum][charPos] != words[charPos][wordNum] {
                return false
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun validWordSquare(words: List<String>): Boolean {
        for (wordNum in words.indices) {
            for (charPos in words[wordNum].indices) {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if (charPos >= words.size ||
                    wordNum >= words[charPos].length ||
                    words[wordNum][charPos] != words[charPos][wordNum]) {
                    return false
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func validWordSquare(_ words: [String]) -> Bool {
        let wordsArr = words.map { Array($0) }
        for wordNum in 0..<wordsArr.count {
            for charPos in 0..<wordsArr[wordNum].count {
                // charPos (curr 'row' word) is bigger than column word, or
                // wordNum (curr 'column' word) is bigger than row word, or
                // characters at index (wordNum,charPos) and (charPos,wordNum) are not equal.
                if charPos >= wordsArr.count ||
                   wordNum >= wordsArr[charPos].count ||
                   wordsArr[wordNum][charPos] != wordsArr[charPos][wordNum] {
                    return false
                }
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of strings in the `words` array and $m$ is the maximum length of a string

---

## Common Pitfalls

### Not Handling Jagged Arrays Correctly

Words in the input can have different lengths, creating a jagged grid. When checking if `words[i][j] == words[j][i]`, you must first verify that both positions exist. If `words[j]` does not have a character at index `i` (because it is shorter), or if `j` exceeds the number of words, the comparison is invalid. Always check bounds before accessing characters.

### Assuming Square Dimensions

Do not assume that the number of rows equals the maximum word length. For example, `["abc", "de"]` has 2 rows but the first word has 3 characters. A valid word square requires the k-th row to match the k-th column exactly, which implicitly requires consistent dimensions. Verify that accessing `words[charPos][wordNum]` is valid before comparing.
