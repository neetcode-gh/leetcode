impl Solution {
    pub fn rotate(matrix: &mut [Vec<i32>]) {
        matrix.reverse();
        let len = matrix.len();
        for i in 0..len { 
            for j in i..len  { 
                let x = matrix[i][j];
                let y = matrix[j][i];
                matrix[j][i] = x;
                matrix[i][j] = y;
            }
        }
    }
}
