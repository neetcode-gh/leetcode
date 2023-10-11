class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        //separate the start and end times and sort them
        int[] start = new int[flowers.length];
        int[] end = new int[flowers.length];

        for (int i = 0; i<flowers.length; i++) {
            start[i] = flowers[i][0];
            end[i] = flowers[i][1];
        }
        Arrays.sort(start);
        Arrays.sort(end);

        int[] result = new int[people.length];

        //use binary search and find the number of flowers blooming
        for (int i = 0; i<people.length; i++) {
            int bloom = blooming(start, people[i]);
            int notBloom = notBlooming(end, people[i]);
            result[i] = bloom - notBloom;
        }
        
        return result;
    }

    //find upper bound of flowers blooming
    public int blooming(int[] start, int index) {
        int left = 0; 
        int right = start.length;

        while (left<right) {
            int mid = left + (right-left)/2;
            if (start[mid] <= index) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return right;
    }

    //lower bound of flowers not blooming
    public int notBlooming(int[] start, int index) {
        int left = 0; 
        int right = start.length;

        while (left<right) {
            int mid = left + (right-left)/2;
            if (start[mid] < index) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return right;
    }
}