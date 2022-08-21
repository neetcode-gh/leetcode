const { readdirSync } = require('fs');

const PROBLEM_LISTS = {
    'NeetCode 150': [
        ['Contains Duplicate', '217'],
        ['Valid Anagram', '242'],
        ['Two Sum', '1'],
        ['Group Anagrams', '49'],
        ['Top K Frequent Elements', '347'],
        ['Product of Array Except Self', '238'],
        ['Valid Sudoku', '36'],
        ['Encode and Decode Strings', '271'],
        ['Longest Consecutive Sequence', '128'],
        ['Valid Palindrome', '125'],
        ['Two Sum II', '167'],
        ['3Sum', '15'],
        ['Container with Most Water', '11'],
        ['Trapping Rain Water', '42'],
        ['Best Time to Buy & Sell Stock', '121'],
        ['Longest Substring Without Repeating Characters', '3'],
        ['Longest Repeating Character Replacement', '424'],
        ['Permutation in String', '567'],
        ['Minimum Window Substring', '76'],
        ['Sliding Window Maximum', '239'],
        ['Valid Parentheses', '20'],
        ['Min Stack', '155'],
        ['Evaluate Reverse Polish Notation', '150'],
        ['Generate Parentheses', '22'],
        ['Daily Temperatures', '739'],
        ['Car Fleet', '853'],
        ['Largest Rectangle in Histogram', '84'],
        ['Binary Search', '704'],
        ['Search a 2D Matrix', '74'],
        ['Koko Eating Bananas', '875'],
        ['Search Rotated Sorted Array', '33'],
        ['Find Minimum in Rotated Sorted Array', '153'],
        ['Time Based Key-Value Store', '981'],
        ['Find Median of Two Sorted Arrays', '4'],
        ['Reverse Linked List', '206'],
        ['Merge Two Linked Lists', '21'],
        ['Reorder List', '143'],
        ['Remove Nth Node from End of List', '19'],
        ['Copy List with Random Pointer', '138'],
        ['Add Two Numbers', '2'],
        ['Linked List Cycle', '141'],
        ['Find the Duplicate Number', '287'],
        ['LRU Cache', '146'],
        ['Merge K Sorted Lists', '23'],
        ['Reverse Nodes in K-Group', '25'],
        ['Invert Binary Tree', '226'],
        ['Maximum Depth of Binary Tree', '104'],
        ['Diameter of a Binary Tree', '543'],
        ['Balanced Binary Tree', '110'],
        ['Same Tree', '100'],
        ['Subtree of Another Tree', '572'],
        ['Lowest Common Ancestor of a BST', '235'],
        ['Binary Tree Level Order Traversal', '102'],
        ['Binary Tree Right Side View', '199'],
        ['Count Good Nodes in a Binary Tree', '1448'],
        ['Validate Binary Search Tree', '98'],
        ['Kth Smallest Element in a BST', '230'],
        ['Construct Tree from Preorder and Inorder Traversal', '105'],
        ['Binary Tree Max Path Sum', '124'],
        ['Serialize and Deserialize Binary Tree', '297'],
        ['Implement Trie', '208'],
        ['Design Add and Search Word Data Structure', '211'],
        ['Word Search II', '212'],
        ['Kth Largest Element in a Stream', '703'],
        ['Last Stone Weight', '1046'],
        ['K Closest Points to Origin', '973'],
        ['Kth Largest Element in an Array', '215'],
        ['Task Scheduler', '621'],
        ['Design Twitter', '355'],
        ['Find Median from Data Stream', '295'],
        ['Subsets', '78'],
        ['Combination Sum', '39'],
        ['Permutations', '46'],
        ['Subsets II', '90'],
        ['Combination Sum II', '40'],
        ['Word Search', '79'],
        ['Palindrome Partitioning', '131'],
        ['Letter Combinations of a Phone Number', '17'],
        ['N-Queens', '51'],
        ['Number of Islands', '200'],
        ['Clone Graph', '133'],
        ['Max Area of Island', '695'],
        ['Pacific Atlantic Waterflow', '417'],
        ['Surrounded Regions', '130'],
        ['Rotting Oranges', '994'],
        ['Walls and Gates', '286'],
        ['Course Schedule', '207'],
        ['Course Schedule II', '210'],
        ['Redundant Connection', '684'],
        ['Number of Connected Components in Graph', '323'],
        ['Graph Valid Tree', '261'],
        ['Word Ladder', '127'],
        ['Reconstruct Itinerary', '332'],
        ['Min Cost to Connect all Points', '1584'],
        ['Network Delay Time', '743'],
        ['Swim in Rising Water', '778'],
        ['Alien Dictionary', '269'],
        ['Cheapest Flights Within K Stops', '787'],
        ['Climbing Stairs', '70'],
        ['Min Cost Climbing Stairs', '746'],
        ['House Robber', '198'],
        ['House Robber II', '213'],
        ['Longest Palindromic Substring', '5'],
        ['Palindromic Substrings', '647'],
        ['Decode Ways', '91'],
        ['Coin Change', '322'],
        ['Maximum Product Subarray', '152'],
        ['Word Break', '139'],
        ['Longest Increasing Subsequence', '300'],
        ['Partition Equal Subset Sum', '416'],
        ['Unique Paths', '62'],
        ['Longest Common Subsequence', '1143'],
        ['Best Time to Buy/Sell Stock With Cooldown', '309'],
        ['Coin Change II', '518'],
        ['Target Sum', '494'],
        ['Interleaving String', '97'],
        ['Longest Increasing Path in a Matrix', '329'],
        ['Distinct Subsequences', '115'],
        ['Edit Distance', '72'],
        ['Burst Balloons', '312'],
        ['Regular Expression Matching', '10'],
        ['Maximum Subarray', '53'],
        ['Jump Game', '55'],
        ['Jump Game II', '45'],
        ['Gas Station', '134'],
        ['Hand of Straights', '846'],
        ['Merge Triplets to Form Target Triplet', '1899'],
        ['Partition Labels', '763'],
        ['Valid Parenthesis String', '678'],
        ['Insert Interval', '57'],
        ['Merge Intervals', '56'],
        ['Non-Overlapping Intervals', '435'],
        ['Meeting Rooms', '252'],
        ['Meeting Rooms II', '253'],
        ['Minimum Interval to Include Each Query', '1851'],
        ['Rotate Image', '48'],
        ['Spiral Matrix', '54'],
        ['Set Matrix Zeroes', '73'],
        ['Happy Number', '202'],
        ['Plus One', '66'],
        ['Pow(x, n)', '50'],
        ['Multiply Strings', '43'],
        ['Detect Squares', '2013'],
        ['Single Number', '136'],
        ['Number of 1 Bits', '191'],
        ['Counting Bits', '338'],
        ['Reverse Bits', '190'],
        ['Missing Number', '268'],
        ['Sum of Two Integers', '371'],
        ['Reverse Integer', '7'],
    ],
    'Blind 75': [
        ['Contains Duplicate', '217'],
        ['Valid Anagram', '242'],
        ['Two Sum', '1'],
        ['Group Anagrams', '49'],
        ['Top K Frequent Elements', '347'],
        ['Product of Array Except Self', '238'],
        ['Encode and Decode Strings', '271'],
        ['Longest Consecutive Sequence', '128'],
        ['Valid Palindrome', '125'],
        ['3Sum', '15'],
        ['Container with Most Water', '11'],
        ['Best Time to Buy & Sell Stock', '121'],
        ['Longest Substring Without Repeating Characters', '3'],
        ['Longest Repeating Character Replacement', '424'],
        ['Minimum Window Substring', '76'],
        ['Valid Parentheses', '20'],
        ['Search Rotated Sorted Array', '33'],
        ['Find Minimum in Rotated Sorted Array', '153'],
        ['Reverse Linked List', '206'],
        ['Merge Two Linked Lists', '21'],
        ['Reorder List', '143'],
        ['Remove Nth Node from End of List', '19'],
        ['Linked List Cycle', '141'],
        ['Merge K Sorted Lists', '23'],
        ['Invert Binary Tree', '226'],
        ['Maximum Depth of Binary Tree', '104'],
        ['Same Tree', '100'],
        ['Subtree of Another Tree', '572'],
        ['Lowest Common Ancestor of a BST', '235'],
        ['Binary Tree Level Order Traversal', '102'],
        ['Validate Binary Search Tree', '98'],
        ['Kth Smallest Element in a BST', '230'],
        ['Construct Tree from Preorder and Inorder Traversal', '105'],
        ['Binary Tree Max Path Sum', '124'],
        ['Serialize and Deserialize Binary Tree', '297'],
        ['Implement Trie', '208'],
        ['Design Add and Search Word Data Structure', '211'],
        ['Word Search II', '212'],
        ['Find Median from Data Stream', '295'],
        ['Combination Sum', '39'],
        ['Word Search', '79'],
        ['Number of Islands', '200'],
        ['Clone Graph', '133'],
        ['Pacific Atlantic Waterflow', '417'],
        ['Course Schedule', '207'],
        ['Number of Connected Components in Graph', '323'],
        ['Graph Valid Tree', '261'],
        ['Alien Dictionary', '269'],
        ['Climbing Stairs', '70'],
        ['House Robber', '198'],
        ['House Robber II', '213'],
        ['Longest Palindromic Substring', '5'],
        ['Palindromic Substrings', '647'],
        ['Decode Ways', '91'],
        ['Coin Change', '322'],
        ['Maximum Product Subarray', '152'],
        ['Word Break', '139'],
        ['Longest Increasing Subsequence', '300'],
        ['Unique Paths', '62'],
        ['Longest Common Subsequence', '1143'],
        ['Maximum Subarray', '53'],
        ['Jump Game', '55'],
        ['Insert Interval', '57'],
        ['Merge Intervals', '56'],
        ['Non-Overlapping Intervals', '435'],
        ['Meeting Rooms', '252'],
        ['Meeting Rooms II', '253'],
        ['Rotate Image', '48'],
        ['Spiral Matrix', '54'],
        ['Set Matrix Zeroes', '73'],
        ['Number of 1 Bits', '191'],
        ['Counting Bits', '338'],
        ['Reverse Bits', '190'],
        ['Missing Number', '268'],
        ['Sum of Two Integers', '371'],
    ],
};
delete PROBLEM_LISTS["Blind 75"]

const IGNORE_DIRS = ['.github', 'cpp', '.git'];
const PREPEND_PATH = process.argv[2] || './';

const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const buildTableColumn = (
    language,
    problems,
    tableMatrix,
    directory = False
) => {
    directory = directory || language;
    let files = readdirSync(directory);
    let checkbox = problems.reduce((acc, [, number]) => {
        acc[number] = false;
        return acc;
    }, {});

    for (const file of files) {
        const fileNumber = file.match(/\d+/)[0];
        if (checkbox[fileNumber] !== undefined) checkbox[fileNumber] = true;
    }

    tableMatrix[0].push(language);
    for (const [index, complete] of Object.entries(Object.values(checkbox))) {
        tableMatrix[+index + 1].push(complete);
    }
};

const makeMarkdown = (table) => {
    return [
        table[0].join(' | '),
        table[0].map(() => '----').join(' | '),
        ...table.slice(1).map((row) =>
            row
                .map((cell, index) => {
                    if (index == 0) return `\`${cell}\``;
                    return cell ? '️✔️' : '❌';
                })
                .join(' | ')
        ),
    ].join('\n');
};

const tables = {};
Object.entries(PROBLEM_LISTS).forEach(([name, list]) => {
    tables[name] = Array.from({ length: list.length + 1 }, (item, index) => {
        if (index == 0) return ['Problem'];
        return [`${list[index - 1][1]} - ${list[index - 1][0]}`];
    });
});

for (const key in tables) {
    getDirectories(PREPEND_PATH)
        .filter((dir) => !IGNORE_DIRS.includes(dir))
        .forEach((language) => {
            buildTableColumn(
                language,
                PROBLEM_LISTS[key],
                tables[key],
                PREPEND_PATH + language
            );
        });
    tables[key] = makeMarkdown(tables[key]);

    console.log(`##### ${key}`);
    console.log(`\n${tables[key]}`);
}
