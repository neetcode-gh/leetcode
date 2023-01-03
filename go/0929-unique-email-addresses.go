import "strings"

func numUniqueEmails(emails []string) int {
	ans, uniqueAddressMap := 0, make(map[string]struct{})
	for _, email := range emails {
		address := uniqueAddress(email)
		if _, ok := uniqueAddressMap[address]; !ok {
			ans++
			uniqueAddressMap[address] = struct{}{}
		}
	}
	return ans
}

func uniqueAddress(email string) string {
	parts := strings.Split(email, "@")
	local, domain := parts[0], parts[1]

	local = strings.ReplaceAll(local, ".", "")

	plusIndex := strings.Index(local, "+")
	if plusIndex >= 0 {
		local = local[:plusIndex]
	}

	return local + "@" + domain
}
