// Time Complexity O(n2)
func isValidSudoku(board [][]byte) bool {
    
    hashMap := make(map[string]bool)
    
    for i:=0; i<9; i ++ {
        for j:=0;j<9; j++ {
            
            row:= i
            column :=j
            
            current_val :=string(board[i][j])

            if current_val =="." { 
                continue
            }
            _,ok1 := hashMap[current_val + "found in row" + string(row)]
            _,ok2 := hashMap[current_val + "found in column"+  string(column)]
            _,ok3 := hashMap[current_val + "found in grid" + string(i/3) + "-" + string(j/3)]            
                        
            if ok1 ||ok2||ok3{
                
                return false
            } else {
                hashMap[current_val + "found in row" + string(row)] = true
                hashMap[current_val + "found in column"+  string(column)] = true
                hashMap[current_val + "found in grid" + string(i/3) + "-" + string(j/3)]= true                
            }
        }

    }
    return true    
    
}
