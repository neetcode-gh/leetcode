## 1. Storing New Words

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(n \cdot m)$

>  Where $n$ is the number of strings in the `words` array and $m$ is the maximum length of a string

---

## 2. Iterate on the Matrix

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of strings in the `words` array and $m$ is the maximum length of a string
