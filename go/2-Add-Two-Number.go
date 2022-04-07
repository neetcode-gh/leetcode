package go

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

// function, which takes a string as
// argument and return the reverse of string.
func reverse(str string) (result string) {
	for _, v := range str {
			result = string(v) + result
	}
	return result
}

//getNumberByLindedList : allows us to create a number from the linkedList passed as parameter
func getNumberByLindedList(list *ListNode) string {
	var myNumber string = ""

	for ; list != nil; list = list.Next {
			myNumber += strconv.Itoa(list.Val)
	}
	return myNumber
}

//stringAddition: addition large numbers thanks to strings
func stringAddition(number1 string, number2 string) string {
	// storing result
	var result string = ""

	//make sure length of number2 larger.
	if len(number1) > len(number2) {
			//swap
			t := number1;
			number1 = number2;
			number2 = t;
	}

	// Calculate length of both string
	n1 := len(number1);
	n2 := len(number2);

	carry := 0;
	for i := 0; i < n1; i++ {
			// Do school mathematics, compute sum of current digits and carry
			var sum int = ((int(uint8(number1[i])) - 48) + ((int(uint8(number2[i])) - 48) + carry));
			result += string(sum % 10 + 48);

			//Calculate carry for next step
			carry = int(sum / 10);
	}

	// Add remaining digits of larger number
	for i := n1; i < n2; i++ {
			fmt.Println(n1, n2)
			var sum int = ((int(uint8(number2[i])) - 48) + carry);
			result += string(sum % 10 + 48);
			carry = int(sum / 10);
	}
	// Add remaining carry
	if carry != 0 {
			result += string(carry + 48);
	}
	// reverse resultant string
	result = reverse(result);

	return result
}

//createListByNumbers : allows us to create a linkedList that contains the sum of the two numbers passed as parameter
func createListByNumbers(number1 string, number2 string) (*ListNode, error) {
	finalNumber := reverse(stringAddition(number1, number2))
	num, err := strconv.Atoi(string(finalNumber[0]))
	if err != nil {
			return nil, err
	}
	head := &ListNode{Val: num}
	ptr := head

	for _, v := range finalNumber[1:] {
			num, err = strconv.Atoi(string(v))
			if err != nil {
					return nil, err
			}
			newNode := ListNode{num, nil}
			if ptr.Next == nil {
					ptr.Next = &newNode
			}
			ptr = ptr.Next
	}
	return head, nil
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	number1 := getNumberByLindedList(l1)
	number2 := getNumberByLindedList(l2)
	result, err := createListByNumbers(number1, number2)

	if err != nil {
			return nil
	}
	return result
}
