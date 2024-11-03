/**
 * Built-in Functions Solution
 * Hash Set - Unique Emails
 * Time O(N * K) | Space O(N)
 * https://leetcode.com/problems/unique-email-addresses
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
	const valid = emails.map(email => {
		const [local, domain] = email.split("@");
		return (
			local.split("+").shift().split(".").join("") + "@" + domain
		);
	});

	return new Set(valid).size;
};

/**
 * Manual Solution
 * Hash Set - Unique Emails
 * Time O(N * K) | Space O(N)
 * https://leetcode.com/problems/unique-email-addresses
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
	const uniqEmails = new Set();

	for (let email of emails) {
		let cleanEmail = "";
		for (let i = 0; i < email.length; i++) {
			if (email[i] === "@") {
				cleanEmail += email.slice(i);
				break;
			} else if (email[i] === "+") {
				while (email[i] !== "@") i++;
				cleanEmail += email.slice(i);
				break;
			} else if (email[i] !== ".") {
				cleanEmail += email[i];
			}
		}

		uniqEmails.add(cleanEmail);
	}

	return uniqEmails.size;
};
