num = 0

def input_num():
    while(True):   
        try:
            N = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :"))
            if N == 1 or N == 2 or N == 3:
                break
            else:
                print("1, 2, 3 중 하나를 입력하세요")
        except ValueError:
            print("정수를 입력하세요")  # ValueError가 발생하면 수행
    return N

def player_A(N, num):
    for i in range(N):
        num += 1
        print("PlayerA : ", num)

def player_B(N, num):
    for i in range(N):
        num += 1
        print("PlayerB : ", num)

def main():
    while(True):
        N = input_num()
        player_A(N, num)
        M = input_num()
        player_B(M, num) 


main()


