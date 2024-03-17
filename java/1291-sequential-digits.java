class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        Queue<Integer> q = new LinkedList<>();
        for(int i = 1; i < 10; i++)
            q.add(i);

        while(!q.isEmpty()){
            int n = q.poll();
            if(n > high)
                continue;
            if(n >= low && n <= high)
                res.add(n);
            int ones = n % 10;
            if(ones < 9)
                q.add(n * 10 + (ones + 1));
        }
        return res;    
    }
}
