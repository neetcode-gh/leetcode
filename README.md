# Leetcode solutions for [NeetCode.io](https://neetcode.io)

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
**Can I add a different solution for a problem that already has a solution?**

In general, multiple solutions to the same problem are accepted, as long as the solutions are distinct (unique approaches to solving the problem) and/or 
are distinctly efficient (in terms of runtime/space complexity, expressed in Big O notation). Please make sure distinct solutions are grouped together in the same file, with appropriately differentiating names (e.g. `isValidBstIterative` and `isValidBstRecursive`)

**Can I add or replace a solution with an answer that is practically more efficient (*but not an improvement in terms of Big O*)?**

leetcode.com's runtime benchmarking is notoriously inaccurate (re-running the same program frequently yields deltas in excess of 50%), and therefore should not be used as evidence of a solution's efficiency.

If you do want to use a proper benchmarking tool to measure improved performance over an existing solution, feel free, but there are a few things to keep in mind. In general, readability and clarity of the code (in the context of interviews) is more important than performance gains, so your if your change adds substantial complexity it may be rejected. Also, these solutions are supposed to serve as editorials for other programmers looking to improve their problem solving skills. As long as your change is aiding that mission, your change should be approved!

**Can/should I add tests for my solution?**

We love your enthusiasm for testing! However, in this case the answer is no. The test code for each answer is the leetcode.com submission button, and we don't want to risk the inevitable divergence of the test code from the source code (because the consumers of this repository are infrequently using the two in tandem). 
