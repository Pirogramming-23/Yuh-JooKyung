num = 0

def brGame():
    global num
    while(True):   
        try:
            N = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :"))
            if N == 1 or N == 2 or N == 3:
                break
            else:
                print("1, 2, 3 중 하나를 입력하세요")
        except ValueError:
            print("정수를 입력하세요")  # ValueError가 발생하면 수행
    
    # 입력받은 수만큼 숫자 출력
    for i in range(N):
        num += 1
        print("playerA : ", num)
        if num == 31:
            return "A"
    
    # playerB 차례
    while(True):   
        try:
            M = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :"))
            if M == 1 or M == 2 or M == 3:
                break
            else:
                print("1, 2, 3 중 하나를 입력하세요")
        except ValueError:
            print("정수를 입력하세요")
    
    # 입력받은 수만큼 숫자 출력
    for i in range(M):
        num += 1
        print("playerB : ", num)
        if num == 31:
            return "B"
    
    return None

def main():
    global num
    while(True):
        winner = brGame()
        if winner == "A":
            print("playerA win!")
            break
        elif winner == "B":
            print("playerB win!")
            break

main()


