import datetime

Q1dataIn = {}
dummy = {}
with open('2017Q1-capitalbikeshare-tripdata.csv') as csvData:
    next(csvData)

    dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    for line in csvData:
        listy = line.replace('"', '').strip().split(',')
        addressIn = listy[6]
        

        temp = listy[2].split()
        dateIn = temp[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
        timeIn = temp[1].split(':')    # 0 -> hour, 1 -> minute, 2 -> seconds
        dayIn = dayMap[datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()]

        timeBin = int(timeIn[0]) #determine what time bin current station falls into
        if int(timeIn[1])>30:
            timeBin = timeBin + .5 # 0 means 12:00am, 0.5 means 12:30am, 1 means 1am
        
        if addressIn not in Q1dataIn:
            Q1dataIn[addressIn] = {} #make addressIn a key and set value as nested dic
            Q1dataIn[addressIn][dayIn] = {} #make dayIn a key in nested dic set value as nested^2 dic
            Q1dataIn[addressIn][dayIn][timeBin] = 1 #make timeBin a key in nested^2 dic
        else:
            if dayIn not in Q1dataIn[addressIn]:
                Q1dataIn[addressIn][dayIn] =  {}
                Q1dataIn[addressIn][dayIn][timeBin] = 1
            else:
                if timeBin not in Q1dataIn[addressIn][dayIn]:
                    Q1dataIn[addressIn][dayIn][timeBin] = 1
                else:
                    Q1dataIn[addressIn][dayIn][timeBin]+=1
        if addressIn == '7th & E St SW':
            print(addressIn, dayIn, timeBin)

    print(Q1dataIn['7th & E St SW'])

        

        
            # print("inner",Q1dataIn[addressIn])
        # print(Q1dataIn[addressIn], dayIn, dayMap[dayIn])
            
        # print(dayIn, Q1dataIn[addressIn], dayMap[dayIn]) 
        # print(Q1dataIn)
        # else:
        #     Q1dataIn[addressIn[dayIn]]


        
        # print(temp)

        # Q1dataIn[addressIn]['dayIn' : dayIn]
        # print(Q1dataIn[addressIn]['dayIn'])



        # entry = {}
        # entry['DateOut'] = listy[1]
        # entry['DateIn'] = listy[2]
        # entry['AddressOut'] = listy[4]
        # entry['AddressIn'] = listy[6]
        # entry['MemberType'] = listy[8]
        # Q1data.append(entry)
    # Q1data = jsonify({'data': Q1data})