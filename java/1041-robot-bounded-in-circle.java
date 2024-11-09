class Solution {
    public boolean isRobotBounded(String instructions) {
        int x=0, y=0; 
        int dirX = 0, dirY=1; 

        for(char ch : instructions.toCharArray()){
            if(ch == 'G'){
                x += dirX;
                y += dirY;
            } else if(ch == 'L'){ 
                int temp = dirX;
                dirX = -1*dirY;
                dirY = temp;
            } else{
                int temp = dirX;
                dirX = dirY;
                dirY = -1*temp;
            }
        }

        return (x==0 && y==0) || (dirX!=0 || dirY!=1);
    }
}