
impl Solution {

    pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {

        let mut chessboard: Vec<Vec<i8>> = vec![vec![0;n as usize]; n as usize];
        let mut result: Vec<Vec<String>> = Vec::new();
        let directions: Vec<(isize, isize)> = vec!((-1, 1), (1, 1), (1, -1), (-1, -1));

        fn toggle_queen(row: usize, col: usize, chessboard: &mut Vec<Vec<i8>>, directions: &Vec<(isize, isize)>, toggle: i8) {

            for i in 0..chessboard.len() { chessboard[row][i] += toggle };
            for j in 0..chessboard.len() { chessboard[j][col] += toggle };

            for dir in directions {
                let mut i = row as isize + dir.0;
                let mut j = col as isize + dir.1;
                while i >= 0 && i < chessboard.len() as isize && j >= 0 && j < chessboard.len() as isize {
                    chessboard[i as usize][j as usize] += toggle;
                    i += dir.0;
                    j += dir.1;
                }
            }
            chessboard[row][col] -= 3 * toggle;
        }

        fn copy_board(chessboard: &Vec<Vec<i8>>) -> Vec<String> {
            let mut copy: Vec<char> = vec!['.'; chessboard.len()];
            let mut board: Vec<String> = Vec::with_capacity(chessboard.len());
            for i in 0..chessboard.len() {
                for j in 0..chessboard.len() {
                    if chessboard[i][j] == -1 { copy[j] = 'Q' } else { copy[j] = '.' };
                }
                board.push(copy.iter().collect());
            }
            return board;
        }

        fn backtrack( chessboard: &mut Vec<Vec<i8>>, result: &mut Vec<Vec<String>>, row: usize, directions: &Vec<(isize, isize)>) {
            if row == chessboard.len() {
                result.push(copy_board(&chessboard));
                return;
            }

            for col in 0..chessboard.len() {
                if chessboard[row][col] == 0 {
                    toggle_queen(row, col, chessboard, directions, 1);
                    backtrack(chessboard, result, row + 1, directions);
                    toggle_queen(row, col, chessboard, directions, -1);
                }
            }
            return;
        }


        backtrack(&mut chessboard, &mut result, 0, &directions);
        return result;
    }
}