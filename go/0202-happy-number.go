func isHappy(n int) bool {
    
	total := 0
	alreadySeen := make(map[int]bool)
	for {

		// if we have seen this number
		if seen := alreadySeen[n]; seen {
			break
		}

		alreadySeen[n] = true

		// split n into its individual digits.
		strn := fmt.Sprint(n)

		// get the length
		length := len(strn)

		// compute sum of digits
		for i := 0; i < length; i++ {
			digit, _ := strconv.Atoi(string(strn[i]))
			total += (digit * digit)
		}
		if total == 1 {
			return true
		}

		// reassign n to total
		n = total
		total = 0
   }
    
return false
}