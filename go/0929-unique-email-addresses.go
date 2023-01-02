func numUniqueEmails(emails []string) int {
	emailSet := make(map[string]bool)

]	for _, email := range emails {
		parts := strings.Split(email, "@")
		local, domain := parts[0], parts[1]

]		local = strings.Replace(local, ".", "", -1)
		plusIndex := strings.Index(local, "+")
		if plusIndex != -1 {
			local = local[:plusIndex]
		}

		emailSet[local+"@"+domain] = true
	}

	return len(emailSet)
}
