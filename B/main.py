def QuestionB():
    f = open("QuestionBInputFile.txt", "r")
    firstLine = True
    for line in f:
        if firstLine:
            firstLine = False
            print()
            continue
        totalUnit = int(line.strip())
        baseNum = totalUnit // 12
        remainder = totalUnit % 12
        min = (remainder // 6) + (remainder % 6) / 4
        max = (remainder // 4) + (remainder % 4) / 6
        if min % 1 == 0 and max % 1 == 0:
            print(int(baseNum * 2 + min), int(baseNum * 3 + max))
        else:
            print(-1)
    f.close()


QuestionB()
