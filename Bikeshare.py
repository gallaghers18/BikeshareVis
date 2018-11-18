from flask import Flask, render_template, jsonify
import datetime


app = Flask(__name__)
with app.app_context():
    print("Beginning Formatting CSVs")
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
                    dataIn[addressIn]['Address'] = addressIn
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
                    dataOut[addressOut]['Address'] = addressOut
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
    Q1dataIn = jsonify({'data' : Q1dataIn})
    Q1dataOut = jsonify({'data' : Q1dataOut})
    print("File formatted")
    Q2dataIn, Q2dataOut = formatCsvData('2017Q2-capitalbikeshare-tripdata.csv')
    Q2dataIn = jsonify({'data' : Q2dataIn})
    Q2dataOut = jsonify({'data' : Q2dataOut})
    print("File formatted")
    Q3dataIn, Q3dataOut = formatCsvData('2017Q3-capitalbikeshare-tripdata.csv')
    Q3dataIn = jsonify({'data' : Q3dataIn})
    Q3dataOut = jsonify({'data' : Q3dataOut})
    print("File formatted")
    Q4dataIn, Q4dataOut = formatCsvData('2017Q4-capitalbikeshare-tripdata.csv')
    Q4dataIn = jsonify({'data' : Q4dataIn})
    Q4dataOut = jsonify({'data' : Q4dataOut})
    print("File formatted")

    
@app.route('/')
def forcePlot():
    return render_template('Bikeshare.html')

@app.route('/stationData/')
def getStationData():
    with open('Capital_Bike_Share_Locations.csv') as csvData:
        data = []
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['Id'] = listy[1]
            entry['Address'] = listy[2]
            entry['Latitude'] = listy[4]
            entry['Longitude'] = listy[5]
            data.append(entry)
    return jsonify({'data': data})

@app.route('/Q1dataIn/')
def getQ1in():
    return Q1dataIn

@app.route('/Q1dataOut/')
def getQ1out():
    return Q1dataOut

@app.route('/Q2dataIn/')
def getQ2in():
    return Q2dataIn

@app.route('/Q2dataOut/')
def getQ2out():
    return Q2dataOut

@app.route('/Q3dataIn/')
def getQ3in():
    return Q3dataIn

@app.route('/Q3dataOut/')
def getQ3out():
    return Q3dataOut

@app.route('/Q4dataIn/')
def getQ4in():
    return Q4dataIn

@app.route('/Q4dataOut/')
def getQ4out():
    return Q4dataOut


if __name__=='__main__':
    app.run(debug=True)

    

