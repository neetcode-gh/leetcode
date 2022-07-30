class Solution {
    private boolean isWithinRange(int[] triplet, int[] target) {
        int len = 3;
        for(int i=0; i<len; i++) {
            if(triplet[i] > target[i])
                return false;
        }
        return true;
    }
    
    private boolean isEqual(int[] arr1, int[] arr2) {
        int len = arr1.length;
        for(int i=0; i<len; i++) {
            if(arr1[i] != arr2[i])
                return false;
        }
        return true;
    }
    
    private int[] getMax(int[] triplet1, int[] triplet2) {
        int len = 3;
        int[] max = new int[3];
        for(int i=0; i<len; i++) {
            max[i] = Math.max(triplet1[i], triplet2[i]);
        }
        return max;
    }
    
    public boolean mergeTriplets(
        int[][] triplets, 
        int[] target
    ) {
        boolean doesOneValidTripletExist = false;
        int[] maxFromTriplets = new int[]{
            Integer.MIN_VALUE, 
            Integer.MIN_VALUE, 
            Integer.MIN_VALUE
        };
        
        for(int[] triplet: triplets) {
            // Ignore those triplets who are not within target
            if(isWithinRange(triplet, target) == false)
                continue;
            
            doesOneValidTripletExist = true;
            maxFromTriplets = getMax(maxFromTriplets, triplet);
        }
        
        return doesOneValidTripletExist &&
                isEqual(maxFromTriplets, target);
    }
}