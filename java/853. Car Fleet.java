class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        double[][] mergedPoints = new double[position.length][2];
        for (int idx=0;idx<position.length;idx++){
            mergedPoints[idx][0] = position[idx];
            mergedPoints[idx][1] = speed[idx];            
        }
        Arrays.sort(mergedPoints, Comparator.comparingDouble(o -> -o[0]));
        Stack<Double> backup = new Stack();
        for (int idx=0;idx<position.length;idx++){
            
            double _position = mergedPoints[idx][0];
            double _speed = mergedPoints[idx][1];
            
            //System.out.println("_position : " + _position);
            
            double _timeTaken = (target-_position)/_speed;
            double _lastValue = 0;
            if (!backup.isEmpty()){
                _lastValue = backup.peek();
            }
            backup.push(_timeTaken);
            //System.out.println(_timeTaken +"<="+ _lastValue +" is true :" + (_timeTaken <= _lastValue));
            if (backup.size()>1 && 
                _timeTaken <= _lastValue){
                backup.pop();
            }
        }
        return backup.size();
        
    }
}
