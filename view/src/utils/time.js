export const getPeriodByDaysAgo = (days) => {
    let dates = {}
    dates.startDate = (new Date((new Date()).getTime() - (days * 24 * 60 * 60 * 1000))).toISOString();
    dates.endDate = new Date().toISOString().slice(0, 10) + 'T23:59:59.999Z';
    return dates
}