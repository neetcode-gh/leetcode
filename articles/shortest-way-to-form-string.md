## 1. Concatenate until Subsequence

::tabs-start

```python
class Solution:
    def shortestWay(self, source: str, target: str) -> int:

        # To check if to_check is subsequence of in_string
        def is_subsequence(to_check, in_string):
            i = j = 0
            while i < len(to_check) and j < len(in_string):
                if to_check[i] == in_string[j]:
                    i += 1
                j += 1

            return i == len(to_check)

        # Set of all characters of the source. We could use a boolean array as well.
        source_chars = set(source)

        # Check if all characters of the target are present in the source
        # If any character is not present, return -1
        for char in target:
            if char not in source_chars:
                return -1

        # Concatenate source until the target is a subsequence
        # of the concatenated string
        concatenated_source = source
        count = 1
        while not is_subsequence(target, concatenated_source):
            concatenated_source += source
            count += 1

        # Number of concatenations done
        return count
```

```java
class Solution {
    public int shortestWay(String source, String target) {

        // Boolean array to mark all characters of source
        boolean[] sourceChars = new boolean[26];
        for (char c : source.toCharArray()) {
            sourceChars[c - 'a'] = true;
        }

        // Check if all characters of the target are present in the source
        // If any character is not present, return -1
        for (char c : target.toCharArray()) {
            if (!sourceChars[c - 'a']) {
                return -1;
            }
        }

        // Concatenate source until the target is a subsequence of the concatenated string
        String concatenatedSource = source;
        int count = 1;
        while (!isSubsequence(target, concatenatedSource)) {
            concatenatedSource += source;
            count++;
        }

        // Number of concatenations done
        return count;
    }

    // To check if toCheck is a subsequence of the inString
    public boolean isSubsequence(String toCheck, String inString) {
        int i = 0, j = 0;
        while (i < toCheck.length() && j < inString.length()) {
            if (toCheck.charAt(i) == inString.charAt(j)) {
                i++;
            }
            j++;
        }

        return i == toCheck.length();
    }
}
```

```cpp
class Solution {
public:
    int shortestWay(string source, string target) {

        // Boolean array to mark all characters of the source
        bool sourceChars[26] = {false};
        for (char c : source) {
            sourceChars[c - 'a'] = true;
        }

        // Check if all characters of the target are present in the source
        // If any character is not present, return -1
        for (char c : target) {
            if (!sourceChars[c - 'a']) {
                return -1;
            }
        }

        // Concatenate source until the target is a subsequence of the concatenated string
        string concatenatedSource = source;
        int count = 1;
        while (!isSubsequence(target, concatenatedSource)) {
            concatenatedSource += source;
            count++;
        }

        // Number of concatenations done
        return count;
    }

    // To check if toCheck is a subsequence of inString
    bool isSubsequence(string toCheck, string inString) {
        int i = 0, j = 0;
        while (i < toCheck.length() && j < inString.length()) {
            if (toCheck[i] == inString[j]) {
                i++;
            }
            j++;
        }

        return i == toCheck.length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} source
     * @param {string} target
     * @return {number}
     */
    shortestWay(source, target) {

        // Boolean array to mark all characters of source
        let sourceChars = new Array(26).fill(false);
        for (let c of source) {
            sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true;
        }

        // Check if all characters of target are present in source
        // If any character is not present, return -1
        for (let c of target) {
            if (!sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)]) {
                return -1;
            }
        }

        // Concatenate source until target is a subsequence of concatenated string
        let concatenatedSource = source;
        let count = 1;
        while (!this.isSubsequence(target, concatenatedSource)) {
            concatenatedSource += source;
            count++;
        }

        // Number of concatenations done
        return count;
    }

    // To check if toCheck is a subsequence of inString
    isSubsequence(toCheck, inString) {
        let i = 0, j = 0;
        while (i < toCheck.length && j < inString.length) {
            if (toCheck[i] == inString[j]) {
                i++;
            }
            j++;
        }

        return i == toCheck.length;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(T^2 \cdot S)$
- Space complexity: $O(TS)$

>  where $S$ is the length of `source` and $T$ is the length of `target`

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def shortestWay(self, source: str, target: str) -> int:

        # Set of all characters of source. Can use a boolean array too.
        source_chars = set(source)

        # Check if all characters of target are present in source
        # If any character is not present, return -1
        for char in target:
            if char not in source_chars:
                return -1

        # Length of source to loop back to start of source using mod
        m = len(source)

        # Pointer for source
        source_iterator = 0

        # Number of times source is traversed. It will be incremented when
        # while finding the occurrence of a character in target, source_iterator
        # reaches the start of source again.
        count = 0

        # Find all characters of target in source
        for char in target:

            # If while finding, iterator reaches start of source again,
            # increment count
            if source_iterator == 0:
                count += 1

            # Find the first occurrence of char in source
            while source[source_iterator] != char:

                # Formula for incrementing while looping back to start.
                source_iterator = (source_iterator + 1) % m

                # If while finding, iterator reaches the start of source again,
                # increment count
                if source_iterator == 0:
                    count += 1

            # Loop will break when char is found in source. Thus, increment.
            # Don't increment count until it is not clear that target has
            # remaining characters.
            source_iterator = (source_iterator + 1) % m

        # Return count
        return count
```

```java
class Solution {
    public int shortestWay(String source, String target) {

        // Boolean array to mark all characters of source
        boolean[] sourceChars = new boolean[26];
        for (char c : source.toCharArray()) {
            sourceChars[c - 'a'] = true;
        }

        // Check if all characters of target are present in source
        // If any character is not present, return -1
        for (char c : target.toCharArray()) {
            if (!sourceChars[c - 'a']) {
                return -1;
            }
        }

        // Length of source to loop back to start of source using mod
        int m = source.length();

        // Pointer for source
        int sourceIterator = 0;

        // Number of times source is traversed. It will be incremented when
        // While finding occurrence of a character in target, sourceIterator
        // reaches the start of source again.
        int count = 0;

        // Find all characters of target in source
        for (char c : target.toCharArray()) {

            // If while finding, the iterator reaches the start of source again,
            // increment count
            if (sourceIterator == 0) {
                count++;
            }

            // Find the first occurrence of c in source
            while (source.charAt(sourceIterator) != c) {

                // Formula for incrementing while looping back to start.
                sourceIterator = (sourceIterator + 1) % m;

                // If while finding, iterator reaches start of source again,
                // increment count
                if (sourceIterator == 0) {
                    count++;
                }
            }

            // Loop will break when c is found in source. Thus, increment.
            // Don't increment count until it is not clear that target has
            // remaining characters.
            sourceIterator = (sourceIterator + 1) % m;
        }

        // Return count
        return count;
    }
}
```

```cpp
class Solution {
public:
    int shortestWay(string source, string target) {
        
        // Boolean array to mark all characters of source
        bool sourceChars[26] = {false};
        for (char c : source) {
            sourceChars[c - 'a'] = true;
        }

        // Check if all characters of target are present in source
        // If any character is not present, return -1
        for (char c : target) {
            if (!sourceChars[c - 'a']) {
                return -1;
            }
        }

        // Length of source to loop back to start of source using mod
        int m = source.length();

        // Pointer for source
        int sourceIterator = 0;

        // Number of times source is traversed. It will be incremented when
        // while finding occurrence of a character in target, sourceIterator
        // reaches the start of source again.
        int count = 0;

        // Find all characters of target in source
        for (char c : target) {

            // If while finding, iterator reaches start of source again,
            // increment count
            if (sourceIterator == 0) {
                count++;
            }

            // Find the first occurrence of c in source
            while (source[sourceIterator] != c) {

                // Formula for incrementing while looping back to start.
                sourceIterator = (sourceIterator + 1) % m;

                // If while finding, iterator reaches start of source again,
                // increment count
                if (sourceIterator == 0) {
                    count++;
                }
            }

            // Loop will break when c is found in source. Thus, increment.
            // Don't increment count until it is not clear that target has
            // remaining characters.
            sourceIterator = (sourceIterator + 1) % m;
        }

        // Return count
        return count;
    }  
};
```

```javascript
class Solution {
    /**
     * @param {string} source
     * @param {string} target
     * @return {number}
     */
    shortestWay(source, target) {
        // Boolean array to mark all characters of source
        let sourceChars = new Array(26).fill(false);
        for (let c of source) {
            sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true;
        }

        // Check if all characters of target are present in source
        // If any character is not present, return -1
        for (let c of target) {
            if (!sourceChars[c.charCodeAt(0) - 'a'.charCodeAt(0)]) {
                return -1;
            }
        }

        // Length of source to loop back to start of source using mod
        let m = source.length;

        // Pointer for source
        let sourceIterator = 0;

        // Number of times source is traversed. It will be incremented when
        // while finding occurrence of a character in target, sourceIterator
        // reaches the start of source again.
        let count = 0;

        // Find all characters of target in source
        for (let c of target) {

            // If while finding, iterator reaches start of source again,
            // increment count
            if (sourceIterator == 0) {
                count++;
            }

            // Find the first occurrence of c in source
            while (source[sourceIterator] != c) {

                // Formula for incrementing while looping back to start.
                sourceIterator = (sourceIterator + 1) % m;

                // If while finding, iterator reaches start of source again,
                // increment count
                if (sourceIterator == 0) {
                    count++;
                }
            }

            // Loop will break when c is found in source. Thus, increment.
            // Don't increment count until it is not clear that target has
            // remaining characters.
            sourceIterator = (sourceIterator + 1) % m;
        }

        // Return count
        return count;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(S \cdot T)$
- Space complexity: $O(1)$ constant space used

>  where $S$ is the length of `source` and $T$ is the length of `target`

---

## 3. Inverted Index and Binary Search

::tabs-start

```python

```

```java
class Solution {
    public int shortestWay(String source, String target) {

        // List of indices for all characters in source
        ArrayList<Integer>[] charToIndices = new ArrayList[26];
        for (int i = 0; i < source.length(); i++) {
            char c = source.charAt(i);
            if (charToIndices[c - 'a'] == null) {
                charToIndices[c - 'a'] = new ArrayList<>();
            }
            charToIndices[c - 'a'].add(i);
        }

        // Pointer for source
        int sourceIterator = 0;

        // Number of times we need to iterate through source
        int count = 1;

        // Find all characters of target in source
        for (char c : target.toCharArray()) {

            // If the character is not in the source, return -1
            if (charToIndices[c - 'a'] == null) {
                return -1;
            }

            // Binary search to find the index of the character in source
            // next to the source iterator
            ArrayList<Integer> indices = charToIndices[c - 'a'];
            int index = Collections.binarySearch(indices, sourceIterator);

            // If the index is negative, we need to find the next index
            // that is greater than the source iterator
            if (index < 0) {
                index = -index - 1;
            }

            // If we have reached the end of the list, we need to iterate
            // through source again, hence first index of character in source.
            if (index == indices.size()) {
                count++;
                sourceIterator = indices.get(0) + 1;
            } else {
                sourceIterator = indices.get(index) + 1;
            }
        }

        // Return the number of times we need to iterate through source
        return count;
    }
}
```

```cpp
class Solution {
public: 
    int shortestWay(string source, string target) {

        // Array to store the vector of charToIndices of each character in source
        vector < int > charToIndices[26];
        for (int i = 0; i < source.size(); i++) {
            charToIndices[source[i] - 'a'].push_back(i);
        }

        // The current index in source
        int sourceIterator = 0;

        // Number of times we have to iterate through source to get target
        int count = 1;

        // Find all characters of target in source
        for (int i = 0; i < target.size(); i++) {

            // If the character is not present in source, return -1
            if (charToIndices[target[i] - 'a'].size() == 0) {
                return -1;
            }

            // Binary search to find the index of the character in source next to the source iterator
            vector < int > indices = charToIndices[target[i] - 'a'];
            int index = lower_bound(indices.begin(), indices.end(), sourceIterator) - indices.begin();

            // If we have reached the end of the list, we need to iterate
            // through source again, hence first index of character in source.
            if (index == indices.size()) {
                count++;
                sourceIterator = indices[0] + 1;
            } else {
                sourceIterator = indices[index] + 1;
            }
        }

        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} source
     * @param {string} target
     * @return {number}
     */
    shortestWay(source, target) {
        // List of indices for all characters in source
        let charToIndices = new Array(26);
        for (let i = 0; i < source.length; i++) {
            let c = source[i];
            if (charToIndices[c.charCodeAt(0) - 'a'.charCodeAt(0)] == null) {
                charToIndices[c.charCodeAt(0) - 'a'.charCodeAt(0)] = [];
            }
            charToIndices[c.charCodeAt(0) - 'a'.charCodeAt(0)].push(i);
        }
        // Pointer for source
        let sourceIterator = 0;
        // Number of times we need to iterate through source
        let count = 1;
        // Find all characters of target in source
        for (let i = 0; i < target.length; i++) {
            let c = target[i];
            // If the character is not in the source, return -1
            if (charToIndices[c.charCodeAt(0) - 'a'.charCodeAt(0)] == null) {
                return -1;
            }
            // Binary search to find the index of the character in source
            // next to the source iterator
            let indices = charToIndices[c.charCodeAt(0) - 'a'.charCodeAt(0)];
            let index = this.binarySearch(indices, sourceIterator);
            // If we have reached the end of the list, we need to iterate
            // through source again, hence first index of character in source.
            if (index == indices.length) {
                count++;
                sourceIterator = indices[0] + 1;
            } else {
                sourceIterator = indices[index] + 1;
            }
        }
        // Return the number of times we need to iterate through source
        return count;
    }

    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {number}
     */
    binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(S + T \log(S))$
- Space complexity: $O(S)$

>  where $S$ is the length of `source` and $T$ is the length of `target`

---

## 4. 2D Array

::tabs-start

```python
class Solution:
    def shortestWay(self, source: str, target: str) -> int:

        # Length of source
        source_length = len(source)

        # Next Occurrence of Character after Index
        next_occurrence = [defaultdict(int) for idx in range(source_length)]

        # Base Case
        next_occurrence[source_length -
                        1][source[source_length - 1]] = source_length - 1

        # Using Recurrence Relation to fill next_occurrence
        for idx in range(source_length - 2, -1, -1):
            next_occurrence[idx] = next_occurrence[idx + 1].copy()
            next_occurrence[idx][source[idx]] = idx

        # Pointer for source
        source_iterator = 0

        # Number of times we need to iterate through source
        count = 1

        # Find all characters of target in source
        for char in target:

            # If character is not in source, return -1
            if char not in next_occurrence[0]:
                return -1

            # If we have reached the end of source, or the character is not in
            # source after source_iterator, loop back to beginning
            if (source_iterator == source_length or
                    char not in next_occurrence[source_iterator]):
                count += 1
                source_iterator = 0

            # Next occurrence of character in source after source_iterator
            source_iterator = next_occurrence[source_iterator][char] + 1

        # Return the number of times we need to iterate through source
        return count
```

```java
class Solution {
    public int shortestWay(String source, String target) {

        // Next occurrence of a character after a given index
        int[][] nextOccurrence = new int[source.length()][26];

        // Base Case
        for (int c = 0; c < 26; c++) {
            nextOccurrence[source.length() - 1][c] = -1;
        }
        nextOccurrence[source.length() - 1][source.charAt(source.length() - 1) - 'a'] = source.length() - 1;

        // Fill using recurrence relation
        for (int idx = source.length() - 2; idx >= 0; idx--) {
            for (int c = 0; c < 26; c++) {
                nextOccurrence[idx][c] = nextOccurrence[idx + 1][c];
            }
            nextOccurrence[idx][source.charAt(idx) - 'a'] = idx;
        }

        // Pointer to the current index in source
        int sourceIterator = 0;

        // Number of times we need to iterate through source
        int count = 1;

        // Find all characters of target in source
        for (char c : target.toCharArray()) {

            // If the character is not present in source
            if (nextOccurrence[0][c - 'a'] == -1) {
                return -1;
            }

            // If we have reached the end of source, or the character is not in
            // source after source_iterator, loop back to beginning
            if (sourceIterator == source.length() || nextOccurrence[sourceIterator][c - 'a'] == -1) {
                count++;
                sourceIterator = 0;
            }

            // Next occurrence of character in source after source_iterator
            sourceIterator = nextOccurrence[sourceIterator][c - 'a'] + 1;
        }

        // Return the number of times we need to iterate through source
        return count;
    }
}
```

```cpp
class Solution {
public:
    int shortestWay(string source, string target) {

        // Next Occurrence of Character after Index
        int nextOccurrence[source.length()][26];

        // Base Case
        for (int c = 0; c < 26; c++) {
            nextOccurrence[source.length() - 1][c] = -1;
        }
        nextOccurrence[source.length() - 1][source[source.length() - 1] - 'a'] = source.length() - 1;

        // Fill using recurrence relation
        for (int idx = source.length() - 2; idx >= 0; idx--) {
            for (int c = 0; c < 26; c++) {
                nextOccurrence[idx][c] = nextOccurrence[idx + 1][c];
            }
            nextOccurrence[idx][source[idx] - 'a'] = idx;
        }

        // Pointer to the current index in source
        int sourceIterator = 0;

        // Number of times we need to iterate through source
        int count = 1;

        // Find all characters of target in source
        for (char c : target) {

            // If the character is not present in source
            if (nextOccurrence[0][c - 'a'] == -1) {
                return -1;
            }

            // If we have reached the end of source, or the character is not in
            // source after source_iterator, loop back to beginning
            if (sourceIterator == source.length() || nextOccurrence[sourceIterator][c - 'a'] == -1) {
                count++;
                sourceIterator = 0;
            }

            // Next occurrence of character in source after source_iterator
            sourceIterator = nextOccurrence[sourceIterator][c - 'a'] + 1;
        }

        // Return the number of times we need to iterate through source
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} source
     * @param {string} target
     * @return {number}
     */
    shortestWay(source, target) {
        // Length of source
        const sourceLength = source.length

        // Next Occurrence of Character after Index
        const nextOccurrence = Array.from({length: sourceLength}, () => Array(26).fill(-1))

        // Base Case
        for (let c = 0; c < 26; c++) {
            nextOccurrence[sourceLength - 1][c] = -1
        }
        nextOccurrence[sourceLength - 1][source[sourceLength - 1].charCodeAt(0) - 'a'.charCodeAt(0)] = sourceLength - 1

        // Fill using the recurrence relation
        for (let idx = sourceLength - 2; idx >= 0; idx--) {
            for (let c = 0; c < 26; c++) {
                nextOccurrence[idx][c] = nextOccurrence[idx + 1][c]
            }
            nextOccurrence[idx][source[idx].charCodeAt(0) - 'a'.charCodeAt(0)] = idx
        }

        // Pointer to the current index in source
        let sourceIterator = 0

        // Number of times we need to iterate through source
        let count = 1

        // Find all characters of target in source
        for (let idx = 0; idx < target.length; idx++) {

            // If the character is not present in source
            if (nextOccurrence[0][target[idx].charCodeAt(0) - 'a'.charCodeAt(0)] == -1) {
                return -1
            }

            // If we have reached the end of source, or the character is not in
            // source after source_iterator, loop back to beginning
            if (sourceIterator == sourceLength || nextOccurrence[sourceIterator][target[idx].charCodeAt(0) - 'a'.charCodeAt(0)] == -1) {
                count++
                sourceIterator = 0
            }

            // Next occurrence of the character in source after source_iterator
            sourceIterator = nextOccurrence[sourceIterator][target[idx].charCodeAt(0) - 'a'.charCodeAt(0)] + 1
        }

        // Return the number of times we need to iterate through source
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(S + T)$
- Space complexity: $O(S)$

>  where $S$ is the length of `source` and $T$ is the length of `target`
