package mypkg

func Add(x int, y int) int {
	return x + y
}

func Dif(x int, y int) int {
	if x >= y {
		return x - y
	} else {
		return y - x
	}
}
