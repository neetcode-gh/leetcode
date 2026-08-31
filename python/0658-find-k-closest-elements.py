# Log(n) + k
# More code but also more intuitive
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        # Step 1: Binary Search to find the closest position to x
        left, right = 0, len(arr) - 1
        while left < right:
            mid = (left + right) // 2
            if arr[mid] < x:
                left = mid + 1
            else:
                right = mid

        # Step 2: Initialize two pointers around the closest element
        left, right = left - 1, left  # left points to smaller, right points to larger

        # Step 3: Expand around the closest position to find k elements
        while k > 0:
            if left < 0:  # If left pointer is out of bounds, move right
                right += 1
            elif right >= len(arr):  # If right pointer is out of bounds, move left
                left -= 1
            elif abs(arr[left] - x) <= abs(arr[right] - x):  # Pick the closer element
                left -= 1
            else:
                right += 1
            k -= 1

        # Step 4: Return the sorted subarray
        return arr[left + 1:right]


# Log(n-k) + k
# Elegant but very difficult to understand
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - k

        while l < r:
            m = (l + r) // 2
            if x - arr[m] > arr[m + k] - x:
                l = m + 1
            else:
                r = m
        return arr[l : l + k]
