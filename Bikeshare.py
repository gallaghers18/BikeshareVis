from flask import Flask, render_template, jsonify
import random
app = Flask(__name__)

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

#HERE WE WILL DO ALL OUR AVERAGING AND ANY OTHER PREPROCESSING, BUT FOR NOW I HAVEN'T DONE THAT
@app.route('/Q1Data/')
def getQuarterOne():
    with open('2017Q1-capitalbikeshare-tripdata.csv') as csvData:
        data = []
        next(csvData)
        for line in csvData:
            listy = line.strip().split(',')
            entry = {}
            entry['DateOut'] = listy[1]
            entry['DateIn'] = listy[2]
            entry['AddressOut'] = listy[4]
            entry['AddressIn'] = listy[6]
            entry['MemberType'] = listy[8]
            data.append(entry)
    return jsonify({'data': data})

@app.route('/Q2Data/')
def getQ2():
    return Q2data

if __name__=='__main__':
    # with open('2017Q2-capitalbikeshare-tripdata.csv') as csvData:
    #     Q2data = []
    #     next(csvData)
    #     for line in csvData:
    #         listy = line.strip().split(',')
    #         entry = {}
    #         entry['DateOut'] = listy[1]
    #         entry['DateIn'] = listy[2]
    #         entry['AddressOut'] = listy[4]
    #         entry['AddressIn'] = listy[6]
    #         entry['MemberType'] = listy[8]
    #         Q2data.append(entry)
    #     Q2data = jsonify({'data': Q2data})

    app.run(debug=True)