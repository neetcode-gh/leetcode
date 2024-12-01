/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  let [len1, len2] = [str1.length, str2.length];

  function isDivisor(l) {
    if (len1 % l || len2 % l) {
      return false;
    }

    let [f1, f2] = [Math.floor(len1 / l), Math.floor(len2 / l)];

    return (
      str1.slice(0, l).repeat(f1) == str1 && str1.slice(0, l).repeat(f2) == str2
    );
  }

  for (let l = Math.min(len1, len2); l > 0; l--) {
    if (isDivisor(l)) {
      return str1.slice(0, l);
    }
  }

  return "";
};
