/*
    Given an absolute path to a file or directory in a Unix-style file system,
    convert it to the simplified canonical path.

    In a Unix-style file system, a period '.' refers to the current directory.
    A double period '..' refers to the directory up a level.
    Any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'.
    For this problem, any other format of periods such as '...' are treated as file/directory names.

    The canonical path should have the following format:
    - The path starts with a single slash '/'.
    - Any two directories are separated by a single slash '/'.
    - The path does not end with a trailing '/'.
    - The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')

    Return the simplified canonical path.

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    string simplifyPath(string path) {
        stringstream ss(path);
        string dir;
        stack<string> stk;

        while (getline(ss, dir, '/')) {
            if (dir.empty() || dir == ".") {
                continue;
            }
            else if (dir == "..") {
                if (!stk.empty())
                    stk.pop();
            }
            else {
                stk.push(dir);
            }
        }

        string res = "";
        while (!stk.empty()) {
            res = "/" + stk.top() + res;
            stk.pop();
        }
        return res.empty()? "/" : res;
    }
};
