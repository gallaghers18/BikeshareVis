from flask import Flask, render_template, jsonify
import datetime


app = Flask(__name__)
with app.app_context():

    Q1data = []
    with open('2017Q1-capitalbikeshare-tripdata.csv') as csvData:
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['DateOut'] = listy[1]
            entry['DateIn'] = listy[2]
            entry['AddressOut'] = listy[4]
            entry['AddressIn'] = listy[6]
            entry['MemberType'] = listy[8]
            Q1data.append(entry)
        Q1data = jsonify({'data': Q1data})

    Q2data = []
    with open('2017Q2-capitalbikeshare-tripdata.csv') as csvData:
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['DateOut'] = listy[1]
            entry['DateIn'] = listy[2]
            entry['AddressOut'] = listy[4]
            entry['AddressIn'] = listy[6]
            entry['MemberType'] = listy[8]
            Q2data.append(entry)
        Q2data = jsonify({'data': Q2data})

    Q3data = []
    with open('2017Q2-capitalbikeshare-tripdata.csv') as csvData:
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['DateOut'] = listy[1]
            entry['DateIn'] = listy[2]
            entry['AddressOut'] = listy[4]
            entry['AddressIn'] = listy[6]
            entry['MemberType'] = listy[8]
            Q3data.append(entry)
        Q3data = jsonify({'data': Q3data})

    Q4data = []
    with open('2017Q2-capitalbikeshare-tripdata.csv') as csvData:
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['DateOut'] = listy[1]
            entry['DateIn'] = listy[2]
            entry['AddressOut'] = listy[4]
            entry['AddressIn'] = listy[6]
            entry['MemberType'] = listy[8]
            Q4data.append(entry)
        Q4data = jsonify({'data': Q4data})

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

@app.route('/Q1Data/')
def getQ1():
    return Q1data

@app.route('/Q2Data/')
def getQ2():
    return Q2data

@app.route('/Q3Data/')
def getQ3():
    return Q3data
    
@app.route('/Q4Data/')
def getQ4():
    return Q4data


if __name__=='__main__':
    app.run(debug=True)

    

