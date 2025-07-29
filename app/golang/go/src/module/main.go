package main

import (
	"fmt"
	"module/mypkg"
)

func main() {
	// Check math
	fmt.Println(mypkg.Add(3, 4))
	fmt.Println(mypkg.Dif(10, 4))

	// Check ascii
	fmt.Println(mypkg.String2Code("A"))
}
