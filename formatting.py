import datetime

def formatCsvData(csv_path):
    dataIn = {}
    dataOut = {}

    with open(csv_path) as csvData:
        next(csvData)

        dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

        for line in csvData:
            listy = line.replace('"', '').strip().split(',')
            addressIn = listy[6]
            addressOut = listy[4]
            

            tempIn = listy[2].split()
            dateIn = tempIn[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
            timeIn = tempIn[1].split(':')    # 0 -> hour, 1 -> minute, 2 -> seconds
            dayIn = dayMap[datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()]

            tempOut = listy[1].split()
            dateOut = tempOut[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
            timeOut = tempOut[1].split(':')    # 0 -> hour, 1 -> minute, 2 -> seconds
            dayOut = dayMap[datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()]

            timeBin = int(timeIn[0]) #determine what time bin current station falls into
            if int(timeIn[1])>30:
                timeBin = timeBin + .5 # 0 means 12:00am, 0.5 means 12:30am, 1 means 1am
            
            if addressIn not in dataIn:
                dataIn[addressIn] = {} #make addressIn a key and set value as nested dic
                dataIn[addressIn][dayIn] = {} #make dayIn a key in nested dic set value as nested^2 dic
                dataIn[addressIn][dayIn][timeBin] = 1 #make timeBin a key in nested^2 dic
            else:
                if dayIn not in dataIn[addressIn]:
                    dataIn[addressIn][dayIn] =  {}
                    dataIn[addressIn][dayIn][timeBin] = 1
                else:
                    if timeBin not in dataIn[addressIn][dayIn]:
                        dataIn[addressIn][dayIn][timeBin] = 1
                    else:
                        dataIn[addressIn][dayIn][timeBin]+=1

            timeBin = int(timeOut[0]) #determine what time bin current station falls into
            if int(timeOut[1])>30:
                timeBin = timeBin + .5 # 0 means 12:00am, 0.5 means 12:30am, 1 means 1am
            
            if addressOut not in dataOut:
                dataOut[addressOut] = {} #make addressIn a key and set value as nested dic
                dataOut[addressOut][dayOut] = {} #make dayIn a key in nested dic set value as nested^2 dic
                dataOut[addressOut][dayOut][timeBin] = 1 #make timeBin a key in nested^2 dic
            else:
                if dayOut not in dataOut[addressOut]:
                    dataOut[addressOut][dayOut] =  {}
                    dataOut[addressOut][dayOut][timeBin] = 1
                else:
                    if timeBin not in dataOut[addressOut][dayOut]:
                        dataOut[addressOut][dayOut][timeBin] = 1
                    else:
                        dataOut[addressOut][dayOut][timeBin]+=1

        return dataIn, dataOut

Q1dataIn, Q1dataOut = formatCsvData('2017Q1-capitalbikeshare-tripdata.csv')
print(Q1dataOut)

# def formatCsvData(csv_path, inData = True):
#     data = {}

#     if inData:
#         addressIndex = 6
#         dateIndex = 2
#     else:
#         addressIndex = 4
#         dateIndex = 1


#     with open(csv_path) as csvData:
#         next(csvData)

#         dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

#         for line in csvData:
#             listy = line.replace('"', '').strip().split(',')
#             addressIn = listy[addressIndex]
            

#             temp = listy[dateIndex].split()
#             dateIn = temp[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
#             timeIn = temp[1].split(':')    # 0 -> hour, 1 -> minute, 2 -> seconds
#             dayIn = dayMap[datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()]

#             timeBin = int(timeIn[0]) #determine what time bin current station falls into
#             if int(timeIn[1])>30:
#                 timeBin = timeBin + .5 # 0 means 12:00am, 0.5 means 12:30am, 1 means 1am
            
#             if addressIn not in data:
#                 data[addressIn] = {} #make addressIn a key and set value as nested dic
#                 data[addressIn][dayIn] = {} #make dayIn a key in nested dic set value as nested^2 dic
#                 data[addressIn][dayIn][timeBin] = 1 #make timeBin a key in nested^2 dic
#             else:
#                 if dayIn not in data[addressIn]:
#                     data[addressIn][dayIn] =  {}
#                     data[addressIn][dayIn][timeBin] = 1
#                 else:
#                     if timeBin not in data[addressIn][dayIn]:
#                         data[addressIn][dayIn][timeBin] = 1
#                     else:
#                         data[addressIn][dayIn][timeBin]+=1
#         return data

# Q1dataIn = formatCsvData('2017Q1-capitalbikeshare-tripdata.csv', False)
# print(Q1dataIn)

# Q1dataIn = {}
# with open('2017Q1-capitalbikeshare-tripdata.csv') as csvData:
#     next(csvData)

#     dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

#     for line in csvData:
#         listy = line.replace('"', '').strip().split(',')
#         addressIn = listy[6]
        

#         temp = listy[2].split()
#         dateIn = temp[0].split('-')    # 0 -> year, 1 -> month, 2 -> day
#         timeIn = temp[1].split(':')    # 0 -> hour, 1 -> minute, 2 -> seconds
#         dayIn = dayMap[datetime.date(int(dateIn[0]), int(dateIn[1]), int(dateIn[2])).weekday()]

#         timeBin = int(timeIn[0]) #determine what time bin current station falls into
#         if int(timeIn[1])>30:
#             timeBin = timeBin + .5 # 0 means 12:00am, 0.5 means 12:30am, 1 means 1am
        
#         if addressIn not in Q1dataIn:
#             Q1dataIn[addressIn] = {} #make addressIn a key and set value as nested dic
#             Q1dataIn[addressIn][dayIn] = {} #make dayIn a key in nested dic set value as nested^2 dic
#             Q1dataIn[addressIn][dayIn][timeBin] = 1 #make timeBin a key in nested^2 dic
#         else:
#             if dayIn not in Q1dataIn[addressIn]:
#                 Q1dataIn[addressIn][dayIn] =  {}
#                 Q1dataIn[addressIn][dayIn][timeBin] = 1
#             else:
#                 if timeBin not in Q1dataIn[addressIn][dayIn]:
#                     Q1dataIn[addressIn][dayIn][timeBin] = 1
#                 else:
#                     Q1dataIn[addressIn][dayIn][timeBin]+=1
#         if addressIn == '10th & E St NW':
#             print(addressIn, dayIn, timeBin)

#     print(Q1dataIn['10th & E St NW'])
    # print(Q1dataIn)

        

        
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