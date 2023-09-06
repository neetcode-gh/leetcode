class Solution {
    boolean[] used;
    public boolean makesquare(int[] matchsticks) {
        used = new boolean[matchsticks.length];
        int total = 0;
        for (int n : matchsticks) {
            total += n;
        }
        //Check if total of all the sides is divisible by 4 or not
        if (total % 4 != 0) return false;
        int side = total / 4;

        return helper(matchsticks, side, 0, 0, 4);
    }

    boolean helper(int[] matchsticks, int targetSide, int currentSum, int index, int sides) {
        //if all the sides are matching the target side length then we found a solution
        if (sides == 0)
            return true;
        //Check if current side is equal to targetSide , that means we found another side
        if (currentSum == targetSide) {
            return helper(matchsticks, targetSide, 0, 0, sides - 1);
        }

        for (int i = index; i < matchsticks.length; i++) {
            //Only use matchsticks which are not used and which doesn't increase the current side more than target side
            if (!used[i] && currentSum + matchsticks[i] <= targetSide) {
                used[i] = true;
                boolean found = helper(matchsticks, targetSide, currentSum + matchsticks[i], i + 1, sides);
                if (found) {
                    return true;
                }
                used[i] = false;
            }
        }
        return false;
    }


}