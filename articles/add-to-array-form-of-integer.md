## 1. Reverse and Add

::tabs-start

```python
class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        num.reverse()
        i = 0
        while k:
            digit = k % 10
            if i < len(num):
                num[i] += digit
            else:
                num.append(digit)
            carry = num[i] // 10
            num[i] %= 10
            k //= 10
            k += carry
            i += 1
        num.reverse()
        return num
```

```java
public class Solution {
    public List<Integer> addToArrayForm(int[] num, int k) {
        List<Integer> result = new ArrayList<>();
        for (int i = num.length - 1; i >= 0; i--) {
            k += num[i];
            result.add(k % 10);
            k /= 10;
        }
        while (k > 0) {
            result.add(k % 10);
            k /= 10;
        }
        Collections.reverse(result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> addToArrayForm(vector<int>& num, int k) {
        reverse(num.begin(), num.end());
        int i = 0;
        while (k) {
            int digit = k % 10;
            if (i < num.size()) {
                num[i] += digit;
            } else {
                num.push_back(digit);
            }
            int carry = num[i] / 10;
            num[i] %= 10;
            k /= 10;
            k += carry;
            i++;
        }
        reverse(num.begin(), num.end());
        return num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} num
     * @param {number} k
     * @return {number[]}
     */
    addToArrayForm(num, k) {
        num.reverse();
        let i = 0;
        while (k > 0) {
            const digit = k % 10;
            if (i < num.length) {
                num[i] += digit;
            } else {
                num.push(digit);
            }
            const carry = Math.floor(num[i] / 10);
            num[i] %= 10;
            k = Math.floor(k / 10) + carry;
            i++;
        }
        num.reverse();
        return num;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(n, m))$
- Space complexity: $O(n)$.

> Where $n$ is the size of the array $num$ and $m$ is the number of digits in $k$.

---

## 2. Without Reverse()

::tabs-start

```python
class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        from collections import deque
        result = deque()
        i = len(num) - 1
        carry = 0

        while i >= 0 or k > 0 or carry > 0:
            digit = k % 10
            sum_val = carry + (num[i] if i >= 0 else 0) + digit

            result.appendleft(sum_val % 10)
            carry = sum_val // 10

            k //= 10
            i -= 1

        return list(result)
```

```java
public class Solution {
    public List<Integer> addToArrayForm(int[] num, int k) {
        LinkedList<Integer> result = new LinkedList<>();
        int carry = 0, i = num.length - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            int digit = k % 10;
            int sum = carry + (i >= 0 ? num[i] : 0) + digit;

            result.addFirst(sum % 10);
            carry = sum / 10;

            k /= 10;
            i--;
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> addToArrayForm(vector<int>& num, int k) {
        list<int> result;
        int carry = 0, i = num.size() - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            int digit = k % 10;
            int sum = carry + (i >= 0 ? num[i] : 0) + digit;

            result.push_front(sum % 10);
            carry = sum / 10;

            k /= 10;
            i--;
        }

        return vector<int>(result.begin(), result.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} num
     * @param {number} k
     * @return {number[]}
     */
    addToArrayForm(num, k) {
        let res = new Deque();
        let carry = 0,
            i = num.length - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            const digit = k % 10;
            const sum = carry + (i >= 0 ? num[i] : 0) + digit;

            res.pushFront(sum % 10);
            carry = Math.floor(sum / 10);

            k = Math.floor(k / 10);
            i--;
        }

        const resultArray = [];
        while (!res.isEmpty()) {
            resultArray.push(res.popFront());
        }

        return resultArray;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(n, m))$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $num$ and $m$ is the number of digits in $k$.
