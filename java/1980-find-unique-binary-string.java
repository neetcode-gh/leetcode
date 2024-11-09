class Solution {
    /**
     * If k is the length of the String and there are n Strings
     * Time Complexity = O(2^k)
     * Space Complexity = n*k (for set) + k (for the current sequence)
     */
    public String findDifferentBinaryString(String[] nums) {
        Set<String> uniqueNums = Set.of(nums);
        return helper(uniqueNums, uniqueNums.size(), new StringBuffer());
    }

    String helper(Set<String> uniqueStr, int size, StringBuffer currentSeq) {
        //Check if current sequence has reached to required length
        if (currentSeq.length() == size) {
            //Check if current sequence exists in the provided list , we can keep track of it as global flag too
            if (!uniqueStr.contains(currentSeq.toString())) {
                return currentSeq.toString();
            }
            //current sequence is not unique
            return null;
        }

        //Only if current sequence length is smaller than required length
        currentSeq.append("0");
        String result = helper(uniqueStr, size, currentSeq);
        currentSeq.deleteCharAt(currentSeq.length() - 1);

        //Check if we can find an ans with "0"
        if (result != null) {
            return result;
        }
        //If appending "0" didn't work then try with "1"
        currentSeq.append("1");
        result = helper(uniqueStr, size, currentSeq);
        currentSeq.deleteCharAt(currentSeq.length() - 1);

        return result;
    }
}