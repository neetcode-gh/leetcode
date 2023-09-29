class Solution:
    def checkDivisible(self,str1, str2, x):
        i, j = 0, 0
        f, f1 = 0, 0

        # Optimizations
        if len(str1)%len(x)!=0 or len(str2)%len(x)!=0:
            return False

        
        # Build String 1 by concatenating x
        tmp = ""
        while i <= len(str1):
            tmp += x
            if tmp == str1:
                f = 1
            i += len(x)

        # Build String 2 by concatenating x
        tmp = ""
        while j <= len(str2):
            tmp += x
            if tmp == str2:
                f1 = 1
            j += len(x)

        if f == 1 and f1 == 1:
            return True
        return False

    def gcdOfStrings(self, str1: str, str2: str) -> str:
        ans=""
        
        # Always making sure that str1 remains the string with lesser length
        if len(str1) > len(str2):
            str1, str2 = str2, str1

        for i in range(len(str1)):
            x = str1[: i + 1]
            if self.checkDivisible(str1, str2, x):
                ans=x
        return ans
