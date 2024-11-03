/**
 * Creates an expectation object for testing values.
 * 
 * @param {any} val - The value to be tested.
 * @returns {Object} An object with two methods:
 *   - toBe(expected): Returns true if val === expected, otherwise throws an error "Not Equal".
 *   - notToBe(expected): Returns true if val !== expected, otherwise throws an error "Equal".
 */
const expect = (val) => {
    const throwError = (message) => { throw new Error(message); };
    return {
        toBe: (expected) => val === expected || throwError("Not Equal"),
        notToBe: (expected) => val !== expected || throwError("Equal")
    };
};

// Example usage:
// expect(5).toBe(5); // returns true
// expect(5).notToBe(3); // returns true
// expect(5).toBe(3); // throws "Not Equal"
// expect(5).notToBe(5); // throws "Equal"