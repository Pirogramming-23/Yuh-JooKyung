num = 0

while(True):   
    try:
        num = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :"))
        if num == 1 or num == 2 or num == 3:
            break
        else:
            print("1, 2, 3 중 하나를 입력하세요")
    except ValueError:
        print("정수를 입력하세요")  # ValueError가 발생하면 수행
