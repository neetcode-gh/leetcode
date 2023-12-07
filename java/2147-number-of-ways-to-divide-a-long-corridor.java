class Solution {
    public int numberOfWays(String corridor) {
        int MOD = (int)1e9 + 7;
        List<Integer> seatIdx = new ArrayList<>();

        for(int i = 0; i < corridor.length(); i++){
            if(corridor.charAt(i) == 'S')
                seatIdx.add(i);
        }
        if(seatIdx.size() == 0 || seatIdx.size()%2 == 1)
            return 0;

        long res = 1;
        for(int i = 2; i < seatIdx.size(); i += 2){
            res = res*(seatIdx.get(i) - seatIdx.get(i-1)) % MOD;
        }
        return (int)res;    
    }
}  
