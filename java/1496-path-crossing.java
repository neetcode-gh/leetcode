class Solution {
    public boolean isPathCrossing(String path) {
        Set<String> set = new HashSet<>();
        set.add("[0, 0]");
        int[] pos = {0, 0};
      
        for(char c: path.toCharArray()){
            if(c == 'N'){
                pos[1] += 1;
            }
            else if(c == 'S')
                pos[1] -= 1;
            else if(c == 'E')
                pos[0] += 1;
            else
                pos[0] -= 1;
            if(set.contains(Arrays.toString(pos)))
                return true;
            set.add(Arrays.toString(pos));
        }
        return false;
    }
}
