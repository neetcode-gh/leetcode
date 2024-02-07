class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> map = new HashMap<>();
        for(char c: s.toCharArray())
            map.put(c, map.getOrDefault(c, 0) + 1);

        PriorityQueue<pair> q = new PriorityQueue<>((a, b) -> b.f - a.f);
        for(char c: map.keySet())
            q.add(new pair(c, map.get(c)));
        
        StringBuilder res = new StringBuilder();
        while(!q.isEmpty()){
            pair r = q.poll();
            int f = r.f;
            while(f > 0){
                res.append(r.c);
                f--;
            }
        }   
        return res.toString();    
    }
}
class pair{
    char c;
    int f;
    
    public pair(char c, int f){
        this.c = c;
        this.f = f;
    }
}
