# Contributing
**Please read the [guidelines below](#contributing-guidelines) before opening a PR**

Solutions from these languages will be linked from [NeetCode.io](https://neetcode.io):

* Python
* C++
* Java
* Javascript

Solutions are also welcome for any other *supported* language on leetcode.com!

To contribute, please fork this repo and open a PR adding a [missing solution](./README.md#missing-solutions) from the supported languages.

If you would like to have collaborator permissions on the repo to merge your own PRs or review others' PRs please let me know. 

## Contributing Guidelines

- **Match the casing of files and directories**
  - For files, it's **`<language>/<problem-number>-Name-Of-Problem.<language-extension>`** (e.g. `java/1-Two-Sum.java`)
  - *Note: This is subject to change in the future, as [described in this issue](https://github.com/neetcode-gh/leetcode/issues/457#issuecomment-1233558291)*
- **Give your PR a succinct and accurate title** (e.g. _"Create: 1-Two-Sum.py"_)
- Prefer **one solution/change per PR** (not a hard and fast rule, but will typically make the review cycle shorter)
- **Follow the** [PR template](./.github/pull_request_template.md) and add additional information when needed
- **Make sure your code passes** submission on [leetcode.com](https://leetcode.com) for the problem it solves
- **Write clean code** (Your code should use semantically meaningful variable/method names, consistent style, etc) and easy to understand. for example, a single letter is probably not a semantically meaningful name
- **Ensure the problem is not already solved** in the language you're contributing in

## FAQs

**Q:** What should my solution include?

**A:** You can keep your solution exactly the same as the one you submit to leetcode, you don't need to write tests or your own implementation of leetcode's built-ins.
##

**Q:** What if there are multiple ways to solve the problem?

**A:** Multiple solutions to the same problem are accepted (as long as they differ in approach or time/memory complexity), although the first solution should always follow the same algorithm shown on [the channel](https://www.youtube.com/c/neetcode). Please make sure distinct solutions are grouped together in the same file, with appropriately differentiating names (e.g. `isValidBstIterative` and `isValidBstRecursive`)
##

**Q:** What if my solution has a lower runtime but the same time/memory complexity?

**A:** Leetcode's runtime measurement can be severely inaccurate varying based on server load, time of day and many other factors. In general, readability and clarity of the code (in the context of interviews) are features more important than performance gains, however changes that transparently improve performance will be accepted.
##

**Q:** What if the problem I want to add isn't in the Neetcode 150 list or Missing Solutions table?

**A:** Questions outside of the Neetcode 150 list can be added but please prioritise adding the listed solutions first.
##

<sub>Thanks for contributing 🚀</sub>
