const monthlyData = [
    {
        "_id": "65832bf1da403d95d776b2c7",
        "amount": 100,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "__v": 0
    },
    {
        "_id": "65832bf3da403d95d776b2c9",
        "amount": 100,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "__v": 0
    },
    {
        "_id": "65832bf4da403d95d776b2cb",
        "amount": 100,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "__v": 0
    },
    {
        "_id": "65832bf4da403d95d776b2cd",
        "amount": 100,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "__v": 0
    },
    {
        "_id": "65832bf5da403d95d776b2cf",
        "amount": 100,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "__v": 0
    },
    {
        "_id": "65833b5edba3b8cbef3ffde7",
        "amount": 100,
        "date_sl": 1703099230876,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "createdAt": "2023-12-20T19:07:10.886Z",
        "updatedAt": "2023-12-20T19:07:10.886Z",
        "__v": 0
    },
    {
        "_id": "65833b63dba3b8cbef3ffde9",
        "amount": 100,
        "date_sl": 1703099235661,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "createdAt": "2023-12-20T19:07:15.663Z",
        "updatedAt": "2023-12-20T19:07:15.663Z",
        "__v": 0
    },
    {
        "_id": "65833b64dba3b8cbef3ffdeb",
        "amount": 100,
        "date_sl": 1703099236653,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "createdAt": "2023-12-20T19:07:16.654Z",
        "updatedAt": "2023-12-20T19:07:16.654Z",
        "__v": 0
    },
    {
        "_id": "65833b65dba3b8cbef3ffded",
        "amount": 100,
        "date_sl": 1703099237703,
        "date": "2023-12-21",
        "description": "POI",
        "category": "credit",
        "expenseType": "657d7a95aee8df1aa1d9cf8f",
        "createdAt": "2023-12-20T19:07:17.705Z",
        "updatedAt": "2023-12-20T19:07:17.705Z",
        "__v": 0
    }
]

// Function to convert date to week number (Saturday-Friday week structure)
function getWeekNumber(date) {
    const dayOfWeek = date.getDay();
    const saturdayIndex = 6; // Saturday is the 6th day of the week
    const daysToSaturday = saturdayIndex - dayOfWeek;
    const nextSaturday = new Date(date.getTime() + daysToSaturday * 24 * 60 * 60 * 1000);
    const weekNumber = Math.floor((nextSaturday.getDate() - 1) / 7) + 1;
    return weekNumber;
}

// Function to get month name from month number
function getMonthName(monthNumber) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber - 1];
}

// Function to organize data by both month and week
function organizeDataByMonthAndWeek(data) {
    return data.reduce((result, item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const weekNumber = getWeekNumber(date);

        // Initialize the month array if it doesn't exist
        if (!result[month]) {
            result[month] = { monthName: getMonthName(month), weeks: {} };
        }

        // Initialize the week array if it doesn't exist
        if (!result[month].weeks[weekNumber]) {
            result[month].weeks[weekNumber] = [];
        }

        // Add the item to the corresponding month and week
        result[month].weeks[weekNumber].push(item);

        return result;
    }, {});
}

// Organize data by both month and week
const monthlyWeeklyData = organizeDataByMonthAndWeek(monthlyData);

// Function to print organized data
function printOrganizedData(organizedData) {
    for (const month in organizedData) {
        const monthData = organizedData[monthNumber];
        console.log(`Month: ${organizedData[month].monthName}`);
        for (const week in organizedData[month].weeks) {
            console.log(`  Week ${week}:`);
            console.log(monthData.weeks[week]);
        }
        console.log('\n');
    }
}

// Print organized data
printOrganizedData(monthlyWeeklyData);



module.exports = { monthlyWeeklyData }

