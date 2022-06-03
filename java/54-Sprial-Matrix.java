class Solution {
    
    public List<Integer> spiralOrder(int[][] matrix) {

        int startRow = 0;
        int startCol = 0 ;
        int endRow = matrix.length - 1;
        int endCol = matrix[0].length-1;


        List<Integer> result = new ArrayList<>();

        // loop until there are element
        while(startRow <= endRow && startCol <= endCol){

            // print top row - Traverse horizontal
            for(int i = startCol; i <= endCol ;i++){
                result.add(matrix[startRow][i]);
            }
            startRow++;

            // Traverse Down -- vertical
            for(int i = startRow ; i <= endRow ; i++){
                result.add(matrix[i][endCol]);
            }
            endCol--;
            if(startRow > endRow || startCol > endCol) break;

            // Traverse bottom backwards
            for(int i = endCol; i >=startCol ; i-- ){
                result.add(matrix[endRow][i]);
            }
            endRow--;

            // traverse up
            for(int i = endRow ; i >= startRow ; i--){
                result.add(matrix[i][startCol]);
            }
            startCol++;
        }

        return result;
    }
}
