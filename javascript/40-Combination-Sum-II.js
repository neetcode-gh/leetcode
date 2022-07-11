//////////////////////////////////////////////////////////////////////////////
// Backtracking
// Time: Theta(2^log(n)) O(2^n)
// Space: Theta(2^log(n)) O(2^n)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);

  const combos = [];
  const combo = [];
  const map = Object.create(null);

  for (let i = 0; i < candidates.length; ++i) {
    map[candidates[i]] = i;
  }

  getCombos(target);
  return combos;

  /**
   * @param {number} target
   * @param {number=} start = `0`
   * @return {void}
   */
  function getCombos(target, start = 0) {
    if (target in map && start <= map[target]) {
      combo.push(target);
      combos.push(combo.slice());
      combo.pop();
    }

    const mid = Math.floor(target / 2);
    for (let i = start; i < candidates.length && candidates[i] <= mid; ++i) {
      if (i !== start && candidates[i] === candidates[i - 1]) {
        continue;
      }
      combo.push(candidates[i]);
      getCombos(target - candidates[i], i + 1);
      combo.pop();
    }
  }
}
