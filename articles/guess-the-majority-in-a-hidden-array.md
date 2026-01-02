## 1. $n$ Queries

::tabs-start

```python
class Solution:
    def guessMajority(self, reader: 'ArrayReader') -> int:
        n = reader.length()
        cnt_equal = 1
        cnt_differ = 0
        index_differ = -1

        def f(equal, i):
            nonlocal cnt_equal, cnt_differ, index_differ
            if equal:
                cnt_equal += 1
            else:
                cnt_differ += 1
                index_differ = i

        query0123 = reader.query(0, 1, 2, 3)
        query1234 = reader.query(1, 2, 3, 4)
        f(reader.query(1, 2, 3, 4) == query0123, 4)
        
        for i in range(5, n):
            f(reader.query(1, 2, 3, i) == query0123, i)

        f(reader.query(0, 2, 3, 4) == query1234, 1)
        f(reader.query(0, 1, 3, 4) == query1234, 2)
        f(reader.query(0, 1, 2, 4) == query1234, 3)

        return (0 if cnt_equal > cnt_differ else index_differ
                if cnt_differ > cnt_equal else -1)
```

```java
class Solution {
    int cntEqual = 1, cntDiffer = 0, indexDiffer = -1;

    private void f(boolean equal, int i) {
        if (equal) {
            cntEqual++;
        } else {
            cntDiffer++;
            indexDiffer = i;
        }
    }

    public int guessMajority(ArrayReader reader) {
        int n = reader.length(), query0123 = reader.query(0, 1, 2, 3), query1234 = reader.query(1, 2, 3, 4);
        f(query1234 == query0123, 4);
        
        for (int i = 5; i < n; i++) {
            f(reader.query(1, 2, 3, i) == query0123, i);
        }

        f(reader.query(0, 2, 3, 4) == query1234, 1);
        f(reader.query(0, 1, 3, 4) == query1234, 2);
        f(reader.query(0, 1, 2, 4) == query1234, 3);

        return cntEqual > cntDiffer ? 0 : cntDiffer > cntEqual ? indexDiffer : -1;
    }
}
```

```cpp
class Solution {
    int cntEqual = 1, cntDiffer = 0, indexDiffer = -1;

public:
    int guessMajority(ArrayReader& reader) {
        int n = reader.length(), query0123 = reader.query(0, 1, 2, 3), query1234 = reader.query(1, 2, 3, 4);
        
        function<void(bool, int)> f = [this](bool equal, int i) {
            if (equal) {
                cntEqual++;
            } else {
                cntDiffer++;
                indexDiffer = i;
            }
        };

        f(query1234 == query0123, 4);

        for (int i = 5; i < n; i++) {
            f(reader.query(1, 2, 3, i) == query0123, i);
        }

        f(reader.query(0, 2, 3, 4) == query1234, 1);
        f(reader.query(0, 1, 3, 4) == query1234, 2);
        f(reader.query(0, 1, 2, 4) == query1234, 3);

        return cntEqual > cntDiffer ? 0 : cntDiffer > cntEqual ? indexDiffer : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {ArrayReader} reader
     * @return {number}
     */
    guessMajority(reader) {
        const n = reader.length();
        let cntEqual = 1;
        let cntDiffer = 0;
        let indexDiffer = -1;
        
        const f = (equal, i) => {
            if (equal) {
                cntEqual++;
            } else {
                cntDiffer++;
                indexDiffer = i;
            }
        };
        
        const query0123 = reader.query(0, 1, 2, 3);
        const query1234 = reader.query(1, 2, 3, 4);
        
        f(reader.query(1, 2, 3, 4) === query0123, 4);
        
        for (let i = 5; i < n; i++) {
            f(reader.query(1, 2, 3, i) === query0123, i);
        }
        
        f(reader.query(0, 2, 3, 4) === query1234, 1);
        f(reader.query(0, 1, 3, 4) === query1234, 2);
        f(reader.query(0, 1, 2, 4) === query1234, 3);
        
        return cntEqual > cntDiffer ? 0 
            : cntDiffer > cntEqual ? indexDiffer 
            : -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$

- Space complexity: $O(1)$ 

>  Where $n$ is the number of queries.
