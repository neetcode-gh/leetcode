## 1. Greedy

::tabs-start

```python
class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        count = []
        
        for r in range(sideLength):
            for c in range(sideLength):
                num = (1 + (width - c - 1) // sideLength) * (1 + (height - r - 1) // sideLength)
                count.append(num)
                
        count.sort(reverse=True)
        return sum(count[:maxOnes])
```

```java
class Solution {
    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        List<Integer> count = new ArrayList<>();
        
        for (int r = 0; r < sideLength; ++r) {
            for (int c = 0; c < sideLength; ++c) {
                count.add((1 + (width - 1 - c) / sideLength) * (1 + (height - 1 - r) / sideLength));   
            }
        }
        
        count.sort(Comparator.reverseOrder());
        int answer = 0;
        for (int i = 0; i < maxOnes; ++i) {
            answer += count.get(i);
        }
        
        return answer;
    }
}
```

```cpp
class Solution {
public:
    int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        vector<int> count;
        
        for (int r = 0; r < sideLength; ++r) {
            for (int c = 0; c < sideLength; ++c) {
                count.push_back((1 + (width - 1 - c) / sideLength) * 
                                (1 + (height - 1 - r) / sideLength));
            }
        }
        
        sort(count.begin(), count.end(), greater<int>());
        
        int answer = 0;
        for (int i = 0; i < maxOnes; ++i) {
            answer += count[i];
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} sideLength
     * @param {number} maxOnes
     * @return {number}
     */
    maximumNumberOfOnes(width, height, sideLength, maxOnes) {
        const count = [];
        
        for (let r = 0; r < sideLength; ++r) {
            for (let c = 0; c < sideLength; ++c) {
                count.push((1 + Math.floor((width - 1 - c) / sideLength)) * 
                           (1 + Math.floor((height - 1 - r) / sideLength)));
            }
        }
        
        count.sort((a, b) => b - a);
        
        let answer = 0;
        for (let i = 0; i < maxOnes; ++i) {
            answer += count[i];
        }
        
        return answer;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(sideLength^2 \cdot \log sideLength^2)$

- Space complexity: $O(sideLength^2)$

---

## 2. Optimally Fill the Remainder Grids

::tabs-start

```python
class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        answer = maxOnes * ((height // sideLength) * (width // sideLength))
        remain = maxOnes

        cnt1 = min((height % sideLength) * (width % sideLength), remain)
        answer += ((height // sideLength) + (width // sideLength) + 1) * cnt1
        remain -= cnt1

        if height // sideLength > width // sideLength:
            cnt2 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height // sideLength) * cnt2
            remain -= cnt2
            cnt3 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width // sideLength) * cnt3
            remain -= cnt3
        else:
            cnt2 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (width // sideLength) * cnt2
            remain -= cnt2
            cnt3 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain)
            answer += (height // sideLength) * cnt3
            remain -= cnt3

        return answer
```

```java
class Solution {
    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        int answer = maxOnes * ((height / sideLength) * (width / sideLength));
        int remain = maxOnes;
        
        int cnt1 = Math.min((height % sideLength) * (width % sideLength), remain);
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1;
        remain -= cnt1;
        
        if (height / sideLength > width / sideLength) {
            int cnt2 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            int cnt2 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt3;
            remain -= cnt3;
        }
        
        return answer;
    }
}
```

```cpp
class Solution {
public:
    int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        int answer = maxOnes * ((height / sideLength) * (width / sideLength));
        int remain = maxOnes;
        
        int cnt1 = min((height % sideLength) * (width % sideLength), remain);
        answer += ((height / sideLength) + (width / sideLength) + 1) * cnt1;
        remain -= cnt1;
        
        if (height / sideLength > width / sideLength) {
            int cnt2 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            int cnt2 = min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (width / sideLength) * cnt2;
            remain -= cnt2;
            
            int cnt3 = min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += (height / sideLength) * cnt3;
            remain -= cnt3;
        }
        
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} sideLength
     * @param {number} maxOnes
     * @return {number}
     */
    maximumNumberOfOnes(width, height, sideLength, maxOnes) {
        let answer = maxOnes * (Math.floor(height / sideLength) * Math.floor(width / sideLength));
        let remain = maxOnes;
        
        let cnt1 = Math.min((height % sideLength) * (width % sideLength), remain);
        answer += (Math.floor(height / sideLength) + Math.floor(width / sideLength) + 1) * cnt1;
        remain -= cnt1;
        
        if (Math.floor(height / sideLength) > Math.floor(width / sideLength)) {
            let cnt2 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(height / sideLength) * cnt2;
            remain -= cnt2;
            
            let cnt3 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(width / sideLength) * cnt3;
            remain -= cnt3;
        } else {
            let cnt2 = Math.min(((height % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(width / sideLength) * cnt2;
            remain -= cnt2;
            
            let cnt3 = Math.min(((width % sideLength) * sideLength) - ((height % sideLength) * (width % sideLength)), remain);
            answer += Math.floor(height / sideLength) * cnt3;
            remain -= cnt3;
        }
        
        return answer;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$

- Space complexity: $O(1)$
