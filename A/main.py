def QuestionA():
    f = open("QuestionAInputFile.txt", "r")
    firstLine = True
    count = 0
    for line in f:
        if firstLine:
            if line.strip().isdecimal() and 1 <= int(line.strip()) <= 100:
                count = int(line.strip())
                firstLine = False
                print()
                continue
            else:
                print('Invalid Format')
                break
        if count == 0:
            break

        pair = line.strip().split(' ')
        if len(pair) != 2 or not pair[0].isdecimal() or not pair[1].isdecimal():
            print('Invalid Format')
            count -= 1
            continue
        x = int(pair[0])
        n = int(pair[1])
        ## The question doesn't define the lower bound of the input n, but it should be positive
        if x < 1 or n > 10 or n < 0:
            print('Invalid Format')
            count -= 1
            continue
        if n % 2 == 0 :
            print(0)
        else:
            print(x)
        count -= 1
    f.close()
\
QuestionA()

