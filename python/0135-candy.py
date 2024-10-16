class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        # Initialize with one candy becuase each child must have at least one candy.
        candies = [1] * n 

        # Iterate from left to right 
        for i in range(1, n):
            # Check if current rating is greater than left neighbor
            if ratings[i] > ratings[i - 1]:
                # Rating is higher so deserves more candy than left neighbor
                candies[i] = candies[i - 1] + 1

        # Iterate from right to left
        for i in range(n - 2, -1, -1):
            # Check if current rating is greater than right neighbor
            if ratings[i] > ratings[i + 1]:
                # Take max to check if the value is already greater than its right neighbor + 1.
                candies[i] = max(candies[i], candies[i + 1] + 1)
        
        return sum(candies)
