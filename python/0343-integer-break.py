class Solution(object):
    def integerBreak(self, n):
        """
        :type n: int
        :rtype: int
        """
        if n == 2:
            return 1
        if n == 3:
            return 2
        product, temp = 1, n
        while temp > 4:
            product *= 3
            temp -= 3
        return product * temp
