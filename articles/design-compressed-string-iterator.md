## 1. Uncompressing the String (Time Limit Exceeded)

::tabs-start

```python
class StringIterator:
    def __init__(self, compressedString: str):
        self.res = []
        self.ptr = 0
        
        i = 0
        while i < len(compressedString):
            ch = compressedString[i]
            i += 1
            num = 0
            while i < len(compressedString) and compressedString[i].isdigit():
                num = num * 10 + int(compressedString[i])
                i += 1
            
            for j in range(num):
                self.res.append(ch)

    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        char = self.res[self.ptr]
        self.ptr += 1
        return char

    def hasNext(self) -> bool:
        return self.ptr != len(self.res)
```

```java
class StringIterator {

    StringBuilder res=new StringBuilder();
    int ptr=0;

    public StringIterator(String s) {
        int i = 0;
        while (i < s.length()) {
            char ch = s.charAt(i++);
            int num = 0;
            while (i < s.length() && Character.isDigit(s.charAt(i))) {
                num = num * 10 + s.charAt(i) - '0';
                i++;
            }

            for (int j = 0; j < num; j++)
                res.append(ch);
        }
    }

    public char next() {
        if (!hasNext())
            return ' ';

        return res.charAt(ptr++);
    }

    public boolean hasNext() {
        return ptr!=res.length();
    }
}
```

```cpp
class StringIterator {
public:
    string res;
    int ptr;
    
    StringIterator(string compressedString) {
        res = "";
        ptr = 0;
        
        int i = 0;
        while (i < compressedString.length()) {
            char ch = compressedString[i++];
            int num = 0;
            while (i < compressedString.length() && isdigit(compressedString[i])) {
                num = num * 10 + compressedString[i] - '0';
                i++;
            }
            
            for (int j = 0; j < num; j++)
                res += ch;
        }
    }
    
    char next() {
        if (!hasNext())
            return ' ';
        
        return res[ptr++];
    }
    
    bool hasNext() {
        return ptr != res.length();
    }
};
```

```javascript
class StringIterator {
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.res = [];
        this.ptr = 0;
        
        let i = 0;
        while (i < compressedString.length) {
            const ch = compressedString[i++];
            let num = 0;
            while (i < compressedString.length && !isNaN(compressedString[i])) {
                num = num * 10 + parseInt(compressedString[i]);
                i++;
            }
            
            for (let j = 0; j < num; j++)
                this.res.push(ch);
        }
    }
    
    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';
        
        return this.res[this.ptr++];
    }
    
    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.res.length;
    }
}
```

::tabs-end

### Complexity Analysis

- We precompute the elements of the uncompressed string. Thus, the space required in this case is $O(m)$, where $m$ refers to the length of the uncompressed string.

- The time required for precomputation is $O(m)$ since we need to generate the uncompressed string of length $m$.

- Once the precomputation has been done, the time required for performing `next()` and `hasNext()` is $O(1)$ for both.

- This approach can be easily extended to include `previous()`, `last()` and `find()` operations. All these operations require the use of an index only and thus, take $O(1)$ time. Operations like `hasPrevious()` can also be easily included.

- Since once the precomputation has been done, `next()` requires $O(1)$ time, this approach is useful if `next()` operation needs to be performed a large number of times. However, if `hasNext()` is performed most of the times, this approach isn't much advantageous since precomputation needs to be done anyhow.

- A potential problem with this approach could arise if the length of the uncompressed string is very large. In such a case, the size of the complete uncompressed string could become so large that it can't fit in the memory limits, leading to memory overflow.

>  Where $m$ is the length of the **uncompressed** string.

---

## 2. Pre-Computation 

::tabs-start

```python
class StringIterator:
    def __init__(self, compressedString: str):
        self.ptr = 0
        import re
        self.nums = list(map(int, re.findall(r'\d+', compressedString)))
        self.chars = re.findall(r'[a-zA-Z]', compressedString)

    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        self.nums[self.ptr] -= 1
        res = self.chars[self.ptr]
        
        if self.nums[self.ptr] == 0:
            self.ptr += 1
        
        return res

    def hasNext(self) -> bool:
        return self.ptr != len(self.chars)
```

```java
class StringIterator {

    int ptr = 0;
    String[] chars;int[] nums;

    public StringIterator(String compressedString) {
        nums = Arrays.stream(compressedString.substring(1).split("[a-zA-Z]+")).mapToInt(Integer::parseInt).toArray();;
        chars = compressedString.split("[0-9]+");
    }

    public char next() {
        if (!hasNext())
            return ' ';

        nums[ptr]--;
        char res=chars[ptr].charAt(0);
        if(nums[ptr]==0)
            ptr++;
        return res;
    }

    public boolean hasNext() {
        return ptr != chars.length;
    }
}
```

```cpp
class StringIterator {
public:
    int ptr = 0;
    vector<char> chars;
    vector<int> nums;
    
    StringIterator(string compressedString) {
        for (int i = 0; i < compressedString.length(); i++) {
            if (isalpha(compressedString[i])) {
                chars.push_back(compressedString[i]);
                int num = 0;
                i++;
                while (i < compressedString.length() && isdigit(compressedString[i])) {
                    num = num * 10 + (compressedString[i] - '0');
                    i++;
                }
                nums.push_back(num);
                i--;
            }
        }
    }
    
    char next() {
        if (!hasNext())
            return ' ';
        
        nums[ptr]--;
        char res = chars[ptr];
        
        if (nums[ptr] == 0)
            ptr++;
        
        return res;
    }
    
    bool hasNext() {
        return ptr != chars.size();
    }
};
```

```javascript
class StringIterator {
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.ptr = 0;
        this.nums = compressedString.match(/\d+/g).map(Number);
        this.chars = compressedString.match(/[a-zA-Z]/g);
    }

    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';
        
        this.nums[this.ptr]--;
        let res = this.chars[this.ptr];
        
        if (this.nums[this.ptr] === 0)
            this.ptr++;
        
        return res;
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.chars.length;
    }
}
```

::tabs-end

### Complexity Analysis

- The space required for storing the results of the precomputation is $O(n)$, where $n$ refers to the length of the compressed string. The $nums$ and $chars$ array contain a total of $n$ elements.

- The precomputation step requires $O(n)$ time. Thus, if `hasNext()` operation is performed most of the times, this precomputation turns out to be non-advantageous.

- Once the precomputation has been done, `hasNext()` and `next()` require $O(1)$ time.

- This approach can be extended to include the `previous()` and `hasPrevious()` operations, but that would require making some simple modifications to the current implementation.

>  Where $n$ is the length of the **compressed** string.

---

## 3. Demand-Computation

::tabs-start

```python
class StringIterator:
    
    def __init__(self, compressedString: str):
        self.res = compressedString
        self.ptr = 0
        self.num = 0
        self.ch = ' '
    
    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        if self.num == 0:
            self.ch = self.res[self.ptr]
            self.ptr += 1
            while self.ptr < len(self.res) and self.res[self.ptr].isdigit():
                self.num = self.num * 10 + int(self.res[self.ptr])
                self.ptr += 1

        self.num -= 1
        return self.ch
    
    def hasNext(self) -> bool:
        return self.ptr != len(self.res) or self.num != 0
```

```java
class StringIterator {

    String res;
    int ptr = 0, num = 0;
    char ch = ' ';

    public StringIterator(String s) {
        res = s;
    }

    public char next() {
        if (!hasNext())
            return ' ';

        if (num == 0) {
            ch = res.charAt(ptr++);
            while (ptr < res.length() && Character.isDigit(res.charAt(ptr))) {
                num = num * 10 + res.charAt(ptr++) - '0';
            }
        }
        
        num--;
        return ch;
    }

    public boolean hasNext() {
        return ptr != res.length() || num != 0;
    }
}
```

```cpp
class StringIterator {
public:
    string res;
    int ptr = 0, num = 0;
    char ch = ' ';
    
    StringIterator(string compressedString) {
        res = compressedString;
    }
    
    char next() {
        if (!hasNext())
            return ' ';

        if (num == 0) {
            ch = res[ptr++];
            while (ptr < res.length() && isdigit(res[ptr])) {
                num = num * 10 + (res[ptr++] - '0');
            }
        }
        
        num--;
        return ch;
    }
    
    bool hasNext() {
        return ptr != res.length() || num != 0;
    }
};
```

```javascript
class StringIterator {
    
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.res = compressedString;
        this.ptr = 0;
        this.num = 0;
        this.ch = ' ';
    }
    
    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';

        if (this.num === 0) {
            this.ch = this.res[this.ptr++];
            while (this.ptr < this.res.length && !isNaN(this.res[this.ptr])) {
                this.num = this.num * 10 + parseInt(this.res[this.ptr++]);
            }
        }

        this.num--;
        return this.ch;
    }
    
    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.res.length || this.num !== 0;
    }
}
```

::tabs-end

### Complexity Analysis

- Since no precomputation is done, constant space is required in this case.

- The time required to perform `next()` operation is $O(1)$.

- The time required for `hasNext()` operation is $O(1)$.

- Since no precomputations are done, and `hasNext()` requires only $O(1)$ time, this solution is advantageous if `hasNext()` operation is performed most of the times.

- This approach can be extended to include `previous()` and `hasPrevious()` operations, but this will require the use of some additional variables.
