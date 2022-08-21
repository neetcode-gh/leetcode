# Leetcode solutions for 🚀 [NeetCode.io](https://neetcode.io)
> This repo hosts the solutions found on [NeetCode.io](https://neetcode.io) including the solutions shown on the [NeetCode YouTube channel](https://www.youtube.com/c/neetcode). 

### Updates

I will periodically update the neetcode.io site with new solutions for this repo!

### Contributing

**Please read the [contributing guidelines](#contributing-guidelines) below before opening a PR**

To contribute, please fork this repo and open a PR against `main` for a problem that does not yet have a solution in a given language.

Solutions needed (will be linked from [NeetCode.io](https://neetcode.io)):

* Java
* Javascript

Solutions are also welcome for any other *supported* language on leetcode.com!

Complete:
* Python
* C++

Please feel free to open a pull request to add solutions in other languages for the Neetcode 150 problem list. If you would like to have collaborator permissions on the repo to merge your own PRs or review others' PRs please let me know. 

#### Contributing Guidelines
- make your PR title a succinct and accurate description of the change (e.g. "adding java solution for 1. two sum")
- adhere to existing naming conventions for files/directories
  - for files, it's `<problem-number>-Name-of-Problem.<language-extension>` (e.g. `1-Two-Sum.py`)
  - for directories, it's `snake_case`
- prefer one solution/change per PR (not a hard and fast rule, but will typically make the review cycle shorter)
- in general, put your solution in the top-level directory for the given language (e.g. `java/`). some languages have a nested directory structure that maps to the categories on neetcode.io, but we're trying to avoid those moving forward because they're less easily searchable
- ensure your code passes submission on [leetcode.com](https://leetcode.com) for the problem it solves
- ensure your code is clean (uses semantically meaningful variable/method names, consistent style, etc) and easy to understand. for example, a single letter is probably not a semantically meaningful name
- ensure the problem is not already solved in the language you're contributing in

#### FAQs
- _Can I add a different solution for a problem that already has a solution?_

    In general, multiple solutions to the same problem are accepted, as long as the solutions are distinct (unique approaches to solving the problem) and/or 
are distinctly efficient (in terms of runtime/space complexity, expressed in Big O notation). Please make sure distinct solutions are grouped together in the same file, with appropriately differentiating names (e.g. `isValidBstIterative` and `isValidBstRecursive`)

- _Can I add or replace a solution with an answer that is practically more efficient (*but not an improvement in terms of Big O*)?_

  leetcode.com's runtime benchmarking is notoriously inaccurate (re-running the same program frequently yields deltas in excess of 50%), and therefore should not be used as evidence of a solution's efficiency.

  If you do want to use a proper benchmarking tool to measure improved performance over an existing solution, feel free, but there are a few things to keep in mind. In general, readability and clarity of the code (in the context of interviews) is more important than performance gains, so your if your change adds substantial complexity it may be rejected. Also, these solutions are supposed to serve as editorials for other programmers looking to improve their problem solving skills. As long as your change is aiding that mission, your change should be approved!

- _Can/should I add tests for my solution?_

  We love your enthusiasm for testing! However, in this case the answer is no. The test code for each answer is the leetcode.com submission button, and we don't want to risk the inevitable divergence of the test code from the source code (because the consumers of this repository are infrequently using the two in tandem). 

#### Missing Solutions
##### NeetCode 150

Problem | c | csharp | go | java | javascript | kotlin | python | ruby | rust | scala | swift | typescript
---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----
217 - Contains Duplicate | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️
242 - Valid Anagram | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ️✔️
1 - Two Sum | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️
49 - Group Anagrams | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
347 - Top K Frequent Elements | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
238 - Product of Array Except Self | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
36 - Valid Sudoku | ❌ | ❌ | ❌ | ❌ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
271 - Encode and Decode Strings | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
128 - Longest Consecutive Sequence | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
125 - Valid Palindrome | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
167 - Two Sum II | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
15 - 3Sum | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
11 - Container with Most Water | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
42 - Trapping Rain Water | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
121 - Best Time to Buy <completion-table /> Sell Stock | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
3 - Longest Substring Without Repeating Characters | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
424 - Longest Repeating Character Replacement | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
567 - Permutation in String | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
76 - Minimum Window Substring | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
239 - Sliding Window Maximum | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
20 - Valid Parentheses | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
155 - Min Stack | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
150 - Evaluate Reverse Polish Notation | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
22 - Generate Parentheses | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
739 - Daily Temperatures | ❌ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
853 - Car Fleet | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
84 - Largest Rectangle in Histogram | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
704 - Binary Search | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
74 - Search a 2D Matrix | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
875 - Koko Eating Bananas | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
33 - Search Rotated Sorted Array | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
153 - Find Minimum in Rotated Sorted Array | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌
981 - Time Based Key-Value Store | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
4 - Find Median of Two Sorted Arrays | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
206 - Reverse Linked List | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
21 - Merge Two Linked Lists | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
143 - Reorder List | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
19 - Remove Nth Node from End of List | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
138 - Copy List with Random Pointer | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
2 - Add Two Numbers | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
141 - Linked List Cycle | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
287 - Find the Duplicate Number | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
146 - LRU Cache | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
23 - Merge K Sorted Lists | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
25 - Reverse Nodes in K-Group | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
226 - Invert Binary Tree | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
104 - Maximum Depth of Binary Tree | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ❌
543 - Diameter of a Binary Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
110 - Balanced Binary Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
100 - Same Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
572 - Subtree of Another Tree | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
235 - Lowest Common Ancestor of a BST | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
102 - Binary Tree Level Order Traversal | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
199 - Binary Tree Right Side View | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
1448 - Count Good Nodes in a Binary Tree | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
98 - Validate Binary Search Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
230 - Kth Smallest Element in a BST | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
105 - Construct Tree from Preorder and Inorder Traversal | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
124 - Binary Tree Max Path Sum | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ❌
297 - Serialize and Deserialize Binary Tree | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
208 - Implement Trie | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
211 - Design Add and Search Word Data Structure | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
212 - Word Search II | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
703 - Kth Largest Element in a Stream | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
1046 - Last Stone Weight | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
973 - K Closest Points to Origin | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
215 - Kth Largest Element in an Array | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
621 - Task Scheduler | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
355 - Design Twitter | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
295 - Find Median from Data Stream | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
78 - Subsets | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
39 - Combination Sum | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
46 - Permutations | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
90 - Subsets II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
40 - Combination Sum II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
79 - Word Search | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ️✔️
131 - Palindrome Partitioning | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
17 - Letter Combinations of a Phone Number | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
51 - N-Queens | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
200 - Number of Islands | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
133 - Clone Graph | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ❌
695 - Max Area of Island | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
417 - Pacific Atlantic Waterflow | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
130 - Surrounded Regions | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
994 - Rotting Oranges | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
286 - Walls and Gates | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
207 - Course Schedule | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
210 - Course Schedule II | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
684 - Redundant Connection | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
323 - Number of Connected Components in Graph | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
261 - Graph Valid Tree | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
127 - Word Ladder | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
332 - Reconstruct Itinerary | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
1584 - Min Cost to Connect all Points | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
743 - Network Delay Time | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
778 - Swim in Rising Water | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
269 - Alien Dictionary | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
787 - Cheapest Flights Within K Stops | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
70 - Climbing Stairs | ❌ | ❌ | ❌ | ❌ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
746 - Min Cost Climbing Stairs | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ❌
198 - House Robber | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
213 - House Robber II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
5 - Longest Palindromic Substring | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
647 - Palindromic Substrings | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
91 - Decode Ways | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
322 - Coin Change | ❌ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
152 - Maximum Product Subarray | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
139 - Word Break | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
300 - Longest Increasing Subsequence | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
416 - Partition Equal Subset Sum | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
62 - Unique Paths | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
1143 - Longest Common Subsequence | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
309 - Best Time to Buy/Sell Stock With Cooldown | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
518 - Coin Change II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
494 - Target Sum | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
97 - Interleaving String | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
329 - Longest Increasing Path in a Matrix | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
115 - Distinct Subsequences | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
72 - Edit Distance | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌
312 - Burst Balloons | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
10 - Regular Expression Matching | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
53 - Maximum Subarray | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
55 - Jump Game | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
45 - Jump Game II | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
134 - Gas Station | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
846 - Hand of Straights | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
1899 - Merge Triplets to Form Target Triplet | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
763 - Partition Labels | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
678 - Valid Parenthesis String | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
57 - Insert Interval | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
56 - Merge Intervals | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
435 - Non-Overlapping Intervals | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
252 - Meeting Rooms | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
253 - Meeting Rooms II | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
1851 - Minimum Interval to Include Each Query | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
48 - Rotate Image | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
54 - Spiral Matrix | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
73 - Set Matrix Zeroes | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
202 - Happy Number | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
66 - Plus One | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
50 - Pow(x, n) | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
43 - Multiply Strings | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
2013 - Detect Squares | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
136 - Single Number | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
191 - Number of 1 Bits | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
338 - Counting Bits | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
190 - Reverse Bits | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
268 - Missing Number | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
371 - Sum of Two Integers | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
7 - Reverse Integer | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
##### Blind 75

Problem | c | csharp | go | java | javascript | kotlin | python | ruby | rust | scala | swift | typescript
---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----
217 - Contains Duplicate | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️
242 - Valid Anagram | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️
1 - Two Sum | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
49 - Group Anagrams | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
347 - Top K Frequent Elements | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
238 - Product of Array Except Self | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
271 - Encode and Decode Strings | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
128 - Longest Consecutive Sequence | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
125 - Valid Palindrome | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
15 - 3Sum | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
11 - Container with Most Water | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
121 - Best Time to Buy <completion-table /> Sell Stock | ❌ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
3 - Longest Substring Without Repeating Characters | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
424 - Longest Repeating Character Replacement | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
76 - Minimum Window Substring | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
20 - Valid Parentheses | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
33 - Search Rotated Sorted Array | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌
153 - Find Minimum in Rotated Sorted Array | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
206 - Reverse Linked List | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
21 - Merge Two Linked Lists | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
143 - Reorder List | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
19 - Remove Nth Node from End of List | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
141 - Linked List Cycle | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
23 - Merge K Sorted Lists | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
226 - Invert Binary Tree | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ❌
104 - Maximum Depth of Binary Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
100 - Same Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
572 - Subtree of Another Tree | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
235 - Lowest Common Ancestor of a BST | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
102 - Binary Tree Level Order Traversal | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
98 - Validate Binary Search Tree | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
230 - Kth Smallest Element in a BST | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
105 - Construct Tree from Preorder and Inorder Traversal | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
124 - Binary Tree Max Path Sum | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
297 - Serialize and Deserialize Binary Tree | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
208 - Implement Trie | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
211 - Design Add and Search Word Data Structure | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
212 - Word Search II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
295 - Find Median from Data Stream | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
39 - Combination Sum | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
79 - Word Search | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
200 - Number of Islands | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ️✔️
133 - Clone Graph | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
417 - Pacific Atlantic Waterflow | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
207 - Course Schedule | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ❌
323 - Number of Connected Components in Graph | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
261 - Graph Valid Tree | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
269 - Alien Dictionary | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
70 - Climbing Stairs | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
198 - House Robber | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
213 - House Robber II | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
5 - Longest Palindromic Substring | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
647 - Palindromic Substrings | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
91 - Decode Ways | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
322 - Coin Change | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
152 - Maximum Product Subarray | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
139 - Word Break | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
300 - Longest Increasing Subsequence | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
62 - Unique Paths | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
1143 - Longest Common Subsequence | ❌ | ❌ | ❌ | ❌ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
53 - Maximum Subarray | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ❌
55 - Jump Game | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
57 - Insert Interval | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
56 - Merge Intervals | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
435 - Non-Overlapping Intervals | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
252 - Meeting Rooms | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
253 - Meeting Rooms II | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
48 - Rotate Image | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ️✔️ | ️✔️
54 - Spiral Matrix | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
73 - Set Matrix Zeroes | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ❌
191 - Number of 1 Bits | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ❌
338 - Counting Bits | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ️✔️ | ❌ | ❌
190 - Reverse Bits | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️
268 - Missing Number | ❌ | ️✔️ | ❌ | ️✔️ | ️✔️ | ❌ | ️✔️ | ❌ | ❌ | ❌ | ❌ | ️✔️
371 - Sum of Two Integers | ❌ | ❌ | ❌ | ️✔️ | ️✔️ | ️✔️ | ️✔️ | ❌ | ❌ | ❌ | ️✔️ | ️✔️
