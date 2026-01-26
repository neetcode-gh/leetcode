## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Greedy Algorithms** - Making optimal local decisions at each step (prioritizing $10 bills for $15 change to preserve flexibility)
- **Basic Iteration** - Processing elements sequentially while maintaining state
- **Simple Counting** - Tracking quantities of different bill denominations using variables

---

## 1. Iteration - I

### Intuition

Each lemonade costs `$5`, so we need to give back the difference when customers pay with `$10` or `$20` bills. The key observation is that `$5` bills are more versatile than `$10` bills since they can be used for both `$5` and `$15` change. When giving `$15` change, we should prefer using one `$10` and one `$5` rather than three `$5`s to preserve our flexibility for future transactions.

### Algorithm

1. Track the count of `$5` and `$10` bills we have.
2. For each customer's bill:
   - If `$5`: simply add it to our `$5` count.
   - If `$10`: we need to give `$5` change. Decrement the `$5` count and increment the `$10` count. Return `false` if no `$5` is available.
   - If `$20`: we need to give `$15` change. Prefer using one `$10` + one `$5` if possible; otherwise use three `$5`s. Return `false` if neither option works.
3. Return `true` if all customers received correct change.

::tabs-start

```python
class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        five, ten = 0, 0
        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                ten += 1
                if five > 0:
                    five -= 1
                else:
                    return False
            else:
                change = b - 5
                if change == 15 and five > 0 and ten > 0:
                    five -= 1
                    ten -= 1
                elif change == 15 and five >= 3:
                    five -= 3
                else:
                    return False
        return True
```

```java
public class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                ten++;
                if (five > 0) {
                    five--;
                } else {
                    return false;
                }
            } else {
                if (five > 0 && ten > 0) {
                    five--;
                    ten--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
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
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                ten++;
                if (five > 0) {
                    five--;
                } else {
                    return false;
                }
            } else {
                if (five > 0 && ten > 0) {
                    five--;
                    ten--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
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
     * @param {number[]} bills
     * @return {boolean}
     */
    lemonadeChange(bills) {
        let five = 0,
            ten = 0;
        for (let b of bills) {
            if (b === 5) {
                five++;
            } else if (b === 10) {
                ten++;
                if (five > 0) {
                    five--;
                } else {
                    return false;
                }
            } else {
                if (five > 0 && ten > 0) {
                    five--;
                    ten--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
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
    public bool LemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        foreach (int b in bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                ten++;
                if (five > 0) {
                    five--;
                } else {
                    return false;
                }
            } else {
                int change = b - 5;
                if (change == 15 && five > 0 && ten > 0) {
                    five--;
                    ten--;
                } else if (change == 15 && five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}
```

```go
func lemonadeChange(bills []int) bool {
    five, ten := 0, 0
    for _, b := range bills {
        if b == 5 {
            five++
        } else if b == 10 {
            ten++
            if five > 0 {
                five--
            } else {
                return false
            }
        } else {
            if five > 0 && ten > 0 {
                five--
                ten--
            } else if five >= 3 {
                five -= 3
            } else {
                return false
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun lemonadeChange(bills: IntArray): Boolean {
        var five = 0
        var ten = 0
        for (b in bills) {
            if (b == 5) {
                five++
            } else if (b == 10) {
                ten++
                if (five > 0) {
                    five--
                } else {
                    return false
                }
            } else {
                if (five > 0 && ten > 0) {
                    five--
                    ten--
                } else if (five >= 3) {
                    five -= 3
                } else {
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
    func lemonadeChange(_ bills: [Int]) -> Bool {
        var five = 0
        var ten = 0
        for b in bills {
            if b == 5 {
                five += 1
            } else if b == 10 {
                ten += 1
                if five > 0 {
                    five -= 1
                } else {
                    return false
                }
            } else {
                if five > 0 && ten > 0 {
                    five -= 1
                    ten -= 1
                } else if five >= 3 {
                    five -= 3
                } else {
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

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Iteration - II

### Intuition

This is a cleaner version of the same greedy approach. Instead of checking conditions before decrementing, we optimistically make the change and then verify if the `$5` count went negative. This simplifies the code by deferring the validity check to a single condition after each transaction.

### Algorithm

1. Track `$5` and `$10` bill counts.
2. For each bill:
   - If `$5`: increment the `$5` count.
   - If `$10`: decrement `$5`, increment `$10`.
   - If `$20` and we have a `$10`: decrement both `$5` and `$10`.
   - If `$20` and no `$10`: decrement `$5` by `3`.
3. After each transaction, check if the `$5` count is negative. If so, return `false`.
4. Return `true` after processing all customers.

::tabs-start

```python
class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        five, ten = 0, 0
        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                five, ten = five - 1, ten + 1
            elif ten > 0:
                five, ten = five - 1, ten - 1
            else:
                five -= 3
            if five < 0:
                return False
        return True
```

```java
public class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                five--;
                ten++;
            } else if (ten > 0) {
                five--;
                ten--;
            } else {
                five -= 3;
            }
            if (five < 0) {
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
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                five--;
                ten++;
            } else if (ten > 0) {
                five--;
                ten--;
            } else {
                five -= 3;
            }
            if (five < 0) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} bills
     * @return {boolean}
     */
    lemonadeChange(bills) {
        let five = 0,
            ten = 0;
        for (let b of bills) {
            if (b === 5) {
                five++;
            } else if (b === 10) {
                five--;
                ten++;
            } else if (ten > 0) {
                five--;
                ten--;
            } else {
                five -= 3;
            }
            if (five < 0) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool LemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        foreach (int b in bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                five--;
                ten++;
            } else if (ten > 0) {
                five--;
                ten--;
            } else {
                five -= 3;
            }

            if (five < 0) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func lemonadeChange(bills []int) bool {
    five, ten := 0, 0
    for _, b := range bills {
        if b == 5 {
            five++
        } else if b == 10 {
            five--
            ten++
        } else if ten > 0 {
            five--
            ten--
        } else {
            five -= 3
        }
        if five < 0 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun lemonadeChange(bills: IntArray): Boolean {
        var five = 0
        var ten = 0
        for (b in bills) {
            if (b == 5) {
                five++
            } else if (b == 10) {
                five--
                ten++
            } else if (ten > 0) {
                five--
                ten--
            } else {
                five -= 3
            }
            if (five < 0) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func lemonadeChange(_ bills: [Int]) -> Bool {
        var five = 0
        var ten = 0
        for b in bills {
            if b == 5 {
                five += 1
            } else if b == 10 {
                five -= 1
                ten += 1
            } else if ten > 0 {
                five -= 1
                ten -= 1
            } else {
                five -= 3
            }
            if five < 0 {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Using Three $5 Bills Before One $10 and One $5

When giving $15 change for a $20 bill, you should prefer using one $10 and one $5 over three $5 bills. The $5 bills are more versatile since they can be used for both $5 and $10 change scenarios. Using three $5 bills depletes your flexibility for future transactions.

### Not Tracking the $10 Bill Count

Some solutions only track $5 bills, assuming $10 bills are not useful. However, $10 bills are essential for efficiently making $15 change. Failing to track them means you cannot implement the optimal greedy strategy and may incorrectly return `false` when change is actually possible.
