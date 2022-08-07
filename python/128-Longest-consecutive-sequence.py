class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        par = [i for i in range(len(nums))]
        rank = [1] * len(nums)
        def find(n):
            p = par[n]
            while p != par[p]:
                par[p] = par[par[p]]
                p = par[p]
            return p
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
            if p1 == p2:
                return
            if rank[p1] > rank[p2]:
                par[p2] = p1
                rank[p1] += rank[p2]
            else:
                par[p1] = p2
                rank[p2] += rank[p1]

        num2pos = {num:i for i, num in enumerate(nums)}
        for num in nums: # O(n)
            if num-1 in num2pos:
                union(num2pos[num], num2pos[num-1]) # amortized constant time O(1)
        return max(rank) # O(n)
