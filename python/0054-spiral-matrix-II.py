class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:

        ans=[[0 for _ in range(n)] for _ in range(n)]

        top = 0
        left = 0
        right = len(ans[0])-1
        bottom = len(ans)-1

        number=1

        while left <=right and top <=bottom:
            # Left to Right
            for i in range(left, right+1):
                ans[top][i]=number
                number+=1
            top += 1

            # Top to Bottom
            for i in range(top, bottom+1):
                ans[i][right]=number
                number+=1
            right -= 1

            # Right to Left
            if top <=bottom:
                for i in range(right, left - 1, -1):
                    ans[bottom][i]=number
                    number+=1
                bottom -= 1

            # Bottom to Top
            if left <=right:
                for i in range(bottom, top - 1, -1):
                    ans[i][left]=number
                    number+=1
                left += 1

        return ans
