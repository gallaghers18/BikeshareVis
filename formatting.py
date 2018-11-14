import datetime

Q1dataIn = {}
with open('2017Q1-capitalbikeshare-tripdata.csv') as csvData:
    next(csvData)

    dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    for line in csvData:
        listy = line.replace('"', '').strip().split(',')
        addressIn = listy[6]
        print(type(addressIn))
        if addressIn not in Q1dataIn:
            Q1dataIn[addressIn : ]
        

        temp = listy[2].split()
        dateIn = temp[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
        dayIn = datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()

        Q1dataIn[addressIn]['dayIn' : dayIn]
        print(Q1dataIn[addressIn]['dayIn'])



        # entry = {}
        # entry['DateOut'] = listy[1]
        # entry['DateIn'] = listy[2]
        # entry['AddressOut'] = listy[4]
        # entry['AddressIn'] = listy[6]
        # entry['MemberType'] = listy[8]
        # Q1data.append(entry)
    # Q1data = jsonify({'data': Q1data})