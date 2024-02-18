const dateToString = (date) => {
    if (date !== undefined && date !== null && date !== '' && !isNaN(date) && date instanceof Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}

const dateToTimestamp = (date) => {
    if (date !== undefined && date !== null && date !== '' && !isNaN(date) && date instanceof Date) {
        return date.getTime()
    }

}

const timestampToDate = (timestamp) => new Date(timestamp)


// Function to convert date to week number (Saturday-Friday week structure)
function getCurrentWeeKRange() {
    // Current Date
    const date = new Date()
    const dayOfWeek = date.getDay();

    // next Friday
    const daysToSaturday = 6 - dayOfWeek;

    // previous saturday
    const prevDaysToSaturday = 6 - daysToSaturday + 1

    const startWeekTimestamp = date.getTime() - (prevDaysToSaturday + 1) * 24 * 60 * 60 * 1000
    const startWeek = new Date(startWeekTimestamp);
    startWeek.setUTCHours(0, 0, 0, 0); // 12 AM 0:0:0
    // To Send Saturday +1 day
    const startWeekSend = new Date(startWeekTimestamp + 24 * 60 * 60 * 1000)

    // end week (Friday)
    const endWeekTimestamp = date.getTime() + (daysToSaturday - 1) * 24 * 60 * 60 * 1000 - date.getTimezoneOffset() * 60 * 1000
    const endWeek = new Date(endWeekTimestamp);
    const endWeekSend = new Date(endWeekTimestamp)
    endWeek.setUTCHours(23, 59, 59, 0);

    return {
        startWeek: dateToString(startWeekSend),
        endWeek: dateToString(endWeekSend),
        startWeekTimestamp: startWeekTimestamp,
        endWeekTimestamp: endWeekTimestamp
    };
}



export const dateUtils = {
    dateToString,
    dateToTimestamp,
    timestampToDate,
    getCurrentWeeKRange,

}
