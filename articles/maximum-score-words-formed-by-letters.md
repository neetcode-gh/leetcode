## 1. Backtracking

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        def can_form_word(w, letter_cnt):
            word_cnt = Counter(w)
            for c in word_cnt:
                if word_cnt[c] > letter_cnt[c]:
                    return False
            return True

        def get_score(w):
            res = 0
            for c in w:
                res += score[ord(c) - ord('a')]
            return res

        letter_cnt = Counter(letters)

        def backtrack(i):
            if i == len(words):
                return 0

            res = backtrack(i + 1)  # skip
            if can_form_word(words[i], letter_cnt):  # include (when possible)
                for c in words[i]:
                    letter_cnt[c] -= 1
                res = max(res, get_score(words[i]) + backtrack(i + 1))
                for c in words[i]:
                    letter_cnt[c] += 1

            return res

        return backtrack(0)
```

```java
public class Solution {
    int[] letterCnt;
    int[] score;

    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        this.score = score;
        this.letterCnt = new int[26];

        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        return backtrack(0, words);
    }

    private int canFormWord(String word) {
        int[] wordCnt = new int[26];
        for (char c : word.toCharArray()) {
            wordCnt[c - 'a']++;
            if (wordCnt[c - 'a'] > letterCnt[c - 'a']) {
                return 0;
            }
        }
        return 1;
    }

    private int getScore(String word) {
        int res = 0;
        for (char c : word.toCharArray()) {
            res += score[c - 'a'];
        }
        return res;
    }

    private int backtrack(int i, String[] words) {
        if (i == words.length) {
            return 0;
        }

        int res = backtrack(i + 1, words);  // skip
        if (canFormWord(words[i]) == 1) {  // include (when possible)
            for (char c : words[i].toCharArray()) {
                letterCnt[c - 'a']--;
            }
            res = Math.max(res, getScore(words[i]) + backtrack(i + 1, words));
            for (char c : words[i].toCharArray()) {
                letterCnt[c - 'a']++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> letterCnt = vector<int>(26, 0);
    vector<int> score;
    vector<string> words;

    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        this->words = words;
        this->score = score;

        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        return backtrack(0);
    }

    bool canFormWord(string& word) {
        vector<int> wordCnt(26, 0);
        for (char c : word) {
            wordCnt[c - 'a']++;
            if (wordCnt[c - 'a'] > letterCnt[c - 'a']) {
                return false;
            }
        }
        return true;
    }

    int getScore(string& word) {
        int res = 0;
        for (char c : word) {
            res += score[c - 'a'];
        }
        return res;
    }

    int backtrack(int i) {
        if (i == words.size()) {
            return 0;
        }

        int res = backtrack(i + 1);  // skip
        if (canFormWord(words[i])) {  // include (when possible)
            for (char c : words[i]) {
                letterCnt[c - 'a']--;
            }
            res = max(res, getScore(words[i]) + backtrack(i + 1));
            for (char c : words[i]) {
                letterCnt[c - 'a']++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        const canFormWord = (w, letterCnt) => {
            let wordCnt = new Array(26).fill(0);
            for (let c of w) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordCnt[idx]++;
                if (wordCnt[idx] > letterCnt[idx]) {
                    return false;
                }
            }
            return true;
        };

        const getScore = (w) => {
            let res = 0;
            for (let c of w) {
                res += score[c.charCodeAt(0) - 'a'.charCodeAt(0)];
            }
            return res;
        };

        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const backtrack = (i) => {
            if (i === words.length) {
                return 0;
            }

            let res = backtrack(i + 1); // skip

            if (canFormWord(words[i], letterCnt)) {
                // include (when possible)
                for (let c of words[i]) {
                    letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]--;
                }
                res = Math.max(res, getScore(words[i]) + backtrack(i + 1));
                for (let c of words[i]) {
                    letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
                }
            }

            return res;
        };

        return backtrack(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n * (w + m) + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.

---

## 2. Bactracking + Precomputation

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        letter_cnt = [0] * 26
        for c in letters:
            letter_cnt[ord(c) - ord('a')] += 1

        n = len(words)
        word_scores = [0] * n
        word_freqs = [[0] * 26 for _ in range(n)]

        for i, word in enumerate(words):
            for c in word:
                idx = ord(c) - ord('a')
                word_freqs[i][idx] += 1
                word_scores[i] += score[idx]

        def backtrack(i):
            if i == n:
                return 0

            res = backtrack(i + 1)  # skip
            can_include = all(word_freqs[i][j] <= letter_cnt[j] for j in range(26))

            if can_include:  # include (when possible)
                for j in range(26):
                    letter_cnt[j] -= word_freqs[i][j]
                res = max(res, word_scores[i] + backtrack(i + 1))
                for j in range(26):
                    letter_cnt[j] += word_freqs[i][j]

            return res

        return backtrack(0)
```

```java
public class Solution {
    private int[] letterCnt = new int[26];
    private int[] wordScores;
    private int[][] wordFreqs;
    private int n;

    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        Arrays.fill(letterCnt, 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        n = words.length;
        wordScores = new int[n];
        wordFreqs = new int[n][26];

        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        return backtrack(0, words);
    }

    private int backtrack(int i, String[] words) {
        if (i == n) {
            return 0;
        }

        int res = backtrack(i + 1, words); // skip
        boolean canInclude = true;

        for (int j = 0; j < 26; j++) {
            if (wordFreqs[i][j] > letterCnt[j]) {
                canInclude = false;
                break;
            }
        }

        if (canInclude) {  // include (when possible)
            for (int j = 0; j < 26; j++) {
                letterCnt[j] -= wordFreqs[i][j];
            }
            res = Math.max(res, wordScores[i] + backtrack(i + 1, words));
            for (int j = 0; j < 26; j++) {
                letterCnt[j] += wordFreqs[i][j];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> letterCnt = vector<int>(26, 0);
    vector<int> wordScores;
    vector<vector<int>> wordFreqs;
    int n;

    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        fill(letterCnt.begin(), letterCnt.end(), 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        n = words.size();
        wordScores = vector<int>(n, 0);
        wordFreqs = vector<vector<int>>(n, vector<int>(26, 0));

        for (int i = 0; i < n; i++) {
            for (char c : words[i]) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        return backtrack(0, words);
    }

private:
    int backtrack(int i, vector<string>& words) {
        if (i == n) {
            return 0;
        }

        int res = backtrack(i + 1, words); // skip
        bool canInclude = true;

        for (int j = 0; j < 26; j++) {
            if (wordFreqs[i][j] > letterCnt[j]) {
                canInclude = false;
                break;
            }
        }

        if (canInclude) {  // include (when possible)
            for (int j = 0; j < 26; j++) {
                letterCnt[j] -= wordFreqs[i][j];
            }
            res = max(res, wordScores[i] + backtrack(i + 1, words));
            for (int j = 0; j < 26; j++) {
                letterCnt[j] += wordFreqs[i][j];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let n = words.length;
        let wordScores = new Array(n).fill(0);
        let wordFreqs = Array.from({ length: n }, () => new Array(26).fill(0));

        for (let i = 0; i < n; i++) {
            for (let c of words[i]) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        const backtrack = (i) => {
            if (i === n) {
                return 0;
            }

            let res = backtrack(i + 1); // skip
            let canInclude = true;

            for (let j = 0; j < 26; j++) {
                if (wordFreqs[i][j] > letterCnt[j]) {
                    canInclude = false;
                    break;
                }
            }

            if (canInclude) {
                // include (when possible)
                for (let j = 0; j < 26; j++) {
                    letterCnt[j] -= wordFreqs[i][j];
                }
                res = Math.max(res, wordScores[i] + backtrack(i + 1));
                for (let j = 0; j < 26; j++) {
                    letterCnt[j] += wordFreqs[i][j];
                }
            }

            return res;
        };

        return backtrack(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.

---

## 3. Backtracking (Bit Mask)

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        letter_cnt = [0] * 26
        for c in letters:
            letter_cnt[ord(c) - ord('a')] += 1

        n = len(words)
        word_scores = [0] * n
        word_freqs = [[0] * 26 for _ in range(n)]

        for i, word in enumerate(words):
            for c in word:
                idx = ord(c) - ord('a')
                word_freqs[i][idx] += 1
                word_scores[i] += score[idx]

        res = 0

        for mask in range(1 << n):
            cur_score = 0
            cur_letter_cnt = letter_cnt[:]
            valid = True

            for i in range(n):
                if mask & (1 << i):
                    for j in range(26):
                        if word_freqs[i][j] > cur_letter_cnt[j]:
                            valid = False
                            break
                    if not valid:
                        break

                    for j in range(26):
                        cur_letter_cnt[j] -= word_freqs[i][j]

                    cur_score += word_scores[i]

            if valid:
                res = max(res, cur_score)

        return res
```

```java
public class Solution {
    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        int[] letterCnt = new int[26];
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        int n = words.length;
        int[] wordScores = new int[n];
        int[][] wordFreqs = new int[n][26];

        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        int res = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int curScore = 0;
            int[] curLetterCnt = Arrays.copyOf(letterCnt, 26);
            boolean valid = true;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    for (int j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (int j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = Math.max(res, curScore);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        vector<int> letterCnt(26, 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        int n = words.size();
        vector<int> wordScores(n, 0);
        vector<vector<int>> wordFreqs(n, vector<int>(26, 0));

        for (int i = 0; i < n; i++) {
            for (char c : words[i]) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        int res = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int curScore = 0;
            vector<int> curLetterCnt = letterCnt;
            bool valid = true;

            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    for (int j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (int j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = max(res, curScore);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let n = words.length;
        let wordScores = new Array(n).fill(0);
        let wordFreqs = Array.from({ length: n }, () => new Array(26).fill(0));

        for (let i = 0; i < n; i++) {
            for (let c of words[i]) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        let res = 0;
        for (let mask = 0; mask < 1 << n; mask++) {
            let curScore = 0;
            let curLetterCnt = [...letterCnt];
            let valid = true;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    for (let j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (let j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = Math.max(res, curScore);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * 2 ^ n + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.
