class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        List<Integer> starts = new ArrayList<>();
        List<Integer> ends = new ArrayList<>();
        
        for(int[] flwr: flowers){
            starts.add(flwr[0]);
            ends.add(flwr[1] + 1);
        }

        Collections.sort(starts);
        Collections.sort(ends);
        int[] res = new int[people.length];

        for(int i = 0; i < people.length; i++){
            int person = people[i];
            int startBlooming = BinarySearch(starts, person);
            int stopBlooming = BinarySearch(ends, person);
            res[i] = startBlooming - stopBlooming;
        }
        return res;
    }

    private int BinarySearch(List<Integer> ls, int target){
        int l = 0;
        int r = ls.size();

        while(l < r){
            int m = l + (r-l)/2;
            if(target < ls.get(m))
                r = m;
            else
                l = m + 1;    
        }
        return l;
    }
}
