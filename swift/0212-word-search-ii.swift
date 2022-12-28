/**
 * Question Link: https://leetcode.com/problems/word-search-ii/
 */

class Solution {
    class TrieNode {
        var children =  [Character: TrieNode]()
        var word: String = ""
    }

    func findWords(_ board: [[Character]], _ words: [String]) -> [String] {
        var answer = [String]()
        let root = buildTrie(words)
    
        var board = board
    
        for row in 0..<board.count {
            for col in 0..<board[0].count {
                if root.children[board[row][col]] != nil {
                    dfs(row, col, root,&board,&answer)
                }
            }
        }

        return answer
    }

    func buildTrie(_ words: [String]) -> TrieNode {
        let root = TrieNode()
        for word in words {
            var current = root

            word.forEach {
                if current.children[$0] == nil {
                    current.children[$0] = TrieNode()
                }
                current = current.children[$0]!
            }
            current.word = word
        }

         return root
    }

     func getInBoardChild(_ x: Int, _ y: Int,_ board:[[Character]],_ root: TrieNode) -> TrieNode? {
        if 0..<board[0].count ~= x && 0..<board.count ~= y && board[y][x] != "." {
            return root.children[board[y][x]]
        }
        return nil
    }
    
    func dfs( _ y: Int,_ x: Int,_ root: TrieNode,_ board: inout [[Character]],_ answer: inout [String]) {
        guard let child = getInBoardChild(x, y, board, root) else { return }

        let char = board[y][x]
        board[y][x] = "."

        if !child.word.isEmpty {
            answer.append(child.word)
            child.word = ""
        }

        for d in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)] {
            dfs(d.1,d.0, child,&board,&answer)
        }

         board[y][x] = char
    }
}
