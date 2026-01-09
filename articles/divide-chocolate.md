## 1. Binary Search + Greedy

### Intuition

We want to maximize the minimum sweetness we receive after dividing the chocolate bar into `k + 1` pieces. This is a classic binary search on the answer pattern. We binary search on possible sweetness values: for each candidate value `mid`, we greedily check if we can divide the bar so that at least `k + 1` people each get a piece with sweetness at least `mid`. If we can, we try a higher value; if not, we try a lower one.

### Algorithm

1. Set the search range: `left = min(sweetness)` and `right = sum(sweetness) / (k + 1)`.
2. While `left < right`:
   - Compute `mid = (left + right + 1) / 2`.
   - Greedily assign consecutive chunks to people, cutting whenever the accumulated sweetness reaches `mid`.
   - Count how many people receive a piece with sweetness at least `mid`.
3. If at least `k + 1` people can receive such a piece, set `left = mid`.
4. Otherwise, set `right = mid - 1`.
5. Return `right` as the maximum possible minimum sweetness.

::tabs-start

```python
class Solution:
    def maximizeSweetness(self, sweetness: List[int], k: int) -> int:
        # Initialize the left and right boundaries.
        # left = 1 and right = (total sweetness) / (number of people).
        number_of_people = k + 1
        left = min(sweetness)
        right = sum(sweetness) // number_of_people
        
        while left < right:
            # Get the middle index between left and right boundary indexes.
            # cur_sweetness stands for the total sweetness for the current person.
            # people_with_chocolate stands for the number of people that have 
            # a piece of chocolate of sweetness greater than or equal to mid.  
            mid = (left + right + 1) // 2
            cur_sweetness = 0
            people_with_chocolate = 0
            
            # Start assigning chunks to the current person.
            for s in sweetness:
                cur_sweetness += s
                
                # If the total sweetness is no less than mid, this means we can break off
                # the current piece and move on to assigning chunks to the next person.
                if cur_sweetness >= mid:
                    people_with_chocolate += 1
                    cur_sweetness = 0

            if people_with_chocolate >= k + 1:
                left = mid
            else:
                right = mid - 1
                
        return right
```

```java
class Solution {
    public int maximizeSweetness(int[] sweetness, int k) {
        // Initialize the left and right boundaries.
        // left = 1 and right = total sweetness / number of people.
        int numberOfPeople = k + 1;
        int left = Arrays.stream(sweetness).min().getAsInt();
        int right = Arrays.stream(sweetness).sum() / numberOfPeople;

        while (left < right) {
            // Get the middle index between left and right boundary indexes.
            // cur_sweetness stands for the total sweetness for the current person.
            // people_with_chocolate stands for the number of people that have 
            // a piece of chocolate of sweetness greater than or equal to mid.  
            int mid = (left + right + 1) / 2;
            int curSweetness = 0;
            int peopleWithChocolate = 0;
            
            // Start assigning chunks to the current people,.
            for (int s : sweetness) {
                curSweetness += s;
                
                // If the total sweetness for him is no less than mid, meaning we 
                // have done with him and should move on to assigning chunks to the next people.
                if (curSweetness >= mid) {
                    peopleWithChocolate += 1;
                    curSweetness = 0;
                }
            }
            
            // Check if we successfully give everyone a piece of chocolate with sweetness
            // no less than mid, and eliminate the search space by half.
            if (peopleWithChocolate >= numberOfPeople) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        // Once the left and right boundaries coincide, we find the target value,
        // that is, the maximum possible sweetness we can get.
        return right;
    }
}
```

```cpp
class Solution {
public:
    int maximizeSweetness(vector<int>& sweetness, int k) {
        // Initialize the left and right boundaries.
        // left = 1 and right = total sweetness / number of people.
        int numberOfPeople = k + 1;
        int left = *min_element(sweetness.begin(), sweetness.end());
        int right = accumulate(sweetness.begin(), sweetness.end(), 0) / numberOfPeople;
        
        while (left < right) { 
            // Get the middle index between left and right boundary indexes.
            // cur_sweetness stands for the total sweetness for the current person.
            // people_with_chocolate stands for the number of people that have 
            // a piece of chocolate of sweetness greater than or equal to mid.  
            int mid = (left + right + 1) / 2;
            int curSweetness = 0;
            int peopleWithChocolate = 0;
            
            // Start assigning chunks to the current people,.
            for (int s : sweetness) {
                curSweetness += s;
                
                // When the total sweetness from him is no less than mid, meaning we 
                // have done with him and move on to assigning chunks to the next people.
                if (curSweetness >= mid) {
                    peopleWithChocolate += 1;
                    curSweetness = 0;
                }
            }
            
            // Check if we successfully give everyone a piece of chocolate with sweetness
            // no less than mid, and eliminate the search space by half.
            if (peopleWithChocolate >= numberOfPeople) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        // Once the left and right boundaries coincide, we find the target value,
        // that is, the maximum possible sweetness we can get.
        return right;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sweetness
     * @param {number} k
     * @return {number}
     */
    maximizeSweetness(sweetness, k) {
        // Initialize the left and right boundaries.
        // left = 1 and right = total sweetness / number of people.
        let numberOfPeople = k + 1;
        let left = Math.min(...sweetness);
        let right = Math.floor(sweetness.reduce((x, y) => x + y) / numberOfPeople);

        while (left < right) {
            // Get the middle index between left and right boundary indexes.
            // cur_sweetness stands for the total sweetness for the current person.
            // people_with_chocolate stands for the number of people that have
            // a piece of chocolate of sweetness greater than or equal to mid.
            const mid = Math.floor((left + right + 1) / 2);
            let curSweetness = 0;
            let peopleWithChocolate = 0;

            // Start assigning chunks to the current people.
            for (const s of sweetness) {
                curSweetness += s;

                // If the total sweetness for him is no less than mid, meaning we
                // have done with him and should move on to assigning chunks to the next people.
                if (curSweetness >= mid) {
                    peopleWithChocolate += 1;
                    curSweetness = 0;
                }
            }

            // Check if we successfully give everyone a piece of chocolate with sweetness
            // no less than mid, and eliminate the search space by half.
            if (peopleWithChocolate >= numberOfPeople) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        // Once the left and right boundaries concide, we find the target value,
        // that is, the maximum possible sweetness I can get.
        return right;
    }
}
```

```csharp
public class Solution {
    public int MaximizeSweetness(int[] sweetness, int k) {
        int numberOfPeople = k + 1;
        int left = sweetness.Min();
        int right = sweetness.Sum() / numberOfPeople;

        while (left < right) {
            int mid = (left + right + 1) / 2;
            int curSweetness = 0;
            int peopleWithChocolate = 0;

            foreach (int s in sweetness) {
                curSweetness += s;
                if (curSweetness >= mid) {
                    peopleWithChocolate++;
                    curSweetness = 0;
                }
            }

            if (peopleWithChocolate >= numberOfPeople) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        return right;
    }
}
```

```go
func maximizeSweetness(sweetness []int, k int) int {
    numberOfPeople := k + 1
    left := sweetness[0]
    total := 0
    for _, s := range sweetness {
        if s < left {
            left = s
        }
        total += s
    }
    right := total / numberOfPeople

    for left < right {
        mid := (left + right + 1) / 2
        curSweetness := 0
        peopleWithChocolate := 0

        for _, s := range sweetness {
            curSweetness += s
            if curSweetness >= mid {
                peopleWithChocolate++
                curSweetness = 0
            }
        }

        if peopleWithChocolate >= numberOfPeople {
            left = mid
        } else {
            right = mid - 1
        }
    }

    return right
}
```

```kotlin
class Solution {
    fun maximizeSweetness(sweetness: IntArray, k: Int): Int {
        val numberOfPeople = k + 1
        var left = sweetness.min()
        var right = sweetness.sum() / numberOfPeople

        while (left < right) {
            val mid = (left + right + 1) / 2
            var curSweetness = 0
            var peopleWithChocolate = 0

            for (s in sweetness) {
                curSweetness += s
                if (curSweetness >= mid) {
                    peopleWithChocolate++
                    curSweetness = 0
                }
            }

            if (peopleWithChocolate >= numberOfPeople) {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return right
    }
}
```

```swift
class Solution {
    func maximizeSweetness(_ sweetness: [Int], _ k: Int) -> Int {
        let numberOfPeople = k + 1
        var left = sweetness.min()!
        var right = sweetness.reduce(0, +) / numberOfPeople

        while left < right {
            let mid = (left + right + 1) / 2
            var curSweetness = 0
            var peopleWithChocolate = 0

            for s in sweetness {
                curSweetness += s
                if curSweetness >= mid {
                    peopleWithChocolate += 1
                    curSweetness = 0
                }
            }

            if peopleWithChocolate >= numberOfPeople {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return right
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log(S/(k + 1)))$

    - The lower and upper bounds are `min(sweetness)` and `S / (k + 1)` respectively. In the worst case (when `k` is small), the right boundary will have the same magnitude as `S`, and the left boundary will be `1`. Thus, the maximum possible time complexity for a single binary search is $O(\log S)$.
    For every single search, we need to traverse the chocolate bar in order to allocate chocolate chunks to everyone, which takes $O(n)$ time.

- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of chunks in the chocolate, and $S$ is the total sweetness of the chocolate bar.
