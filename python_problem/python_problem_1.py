import random


num = 0

def brGame():
    global num
    N = random.randint(1, 3)
    
    # 입력받은 수만큼 숫자 출력
    for i in range(N):
        num += 1
        print("computer : ", num)
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
        print("player : ", num)
        if num == 31:
            return "B"
    
    return None

def main():
    global num
    while(True):
        loser = brGame()
        if loser == "A":
            print("player win!")
            break
        elif loser == "B":
            print("computer win!")
            break

main()


