class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        pos_vel = sorted(zip(position,speed), reverse=True)
        max_seen = float("-inf")
        ans = 0
        for elem in pos_vel:
            vel = elem[1]
            pos = elem[0]
            time = (target-pos)/vel
            if max_seen < time:#I reach after everyone on my right, so i make one fleet
                ans += 1
                max_seen = time
        return ans
