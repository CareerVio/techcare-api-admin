function calculateAverageDeviceData(deviceDatas) {
    const fieldsToAverage = [
        'heartRate', 'bloodPressureDia', 'bloodPressureSys',
        'temperature', 'spo2', 'stepCount'
    ];

    const totals = fieldsToAverage.reduce((acc, field) => {
        acc[field] = 0;
        return acc;
    }, {});

    deviceDatas.forEach(data => {
        fieldsToAverage.forEach(field => {
            totals[field] += parseFloat(data[field]) || 0;
        });
    });

    const averages = fieldsToAverage.reduce((acc, field) => {
        const average = deviceDatas.length > 0 ? totals[field] / deviceDatas.length : 0;
        // group two to decimal places for cleanliness
        acc[field] = +average.toFixed(2);
        return acc;
    }, {});

    return averages;
}

export { calculateAverageDeviceData }