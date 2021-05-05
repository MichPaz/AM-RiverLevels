export const getDateFromAPI = value => {
    return value ? (new Date(new Date(value).valueOf() - new Date().getTimezoneOffset() * 60000).toISOString()) : value
}

export const getDateNow = () => {
    return new Date(new Date().valueOf() - new Date().getTimezoneOffset() * 60000).toISOString()
}

export const dataToDateTime = (value) => {
    return value ? (new Date(value).toISOString()) : value
}

export const dataTempoToDateTime = (value) => {
    return value ? (new Date(value).toISOString()) : value
}

// date
export const dateToForm = value => {
    try {
        return new Date(value)?.toISOString()?.slice(0, 10)
    } catch {
        return ''
    }
}

export const dateToView = value => {
    return value ? (new Date(value).toLocaleString()) : value
}


// dateTime
export const dateTimeToForm = value => {
    let date
    let dateStr
    if (value) {
        date = new Date(new Date(value) - new Date().getTimezoneOffset() * 60000)
        dateStr = date.toISOString().slice(0, 16)
    }
    return dateStr ? dateStr : value
}

export const dateTimeToView = value => {
    return value ? (new Date(value).toLocaleString()) : value
}

export const dateTimeToData = value => {
    if (value) {
        var datePart = value.slice(0, 10).match(/\d+/g),
            year = datePart[0],
            month = datePart[1],
            day = datePart[2];
        return day + '/' + month + '/' + year;
    }
    return value
}

export const dateTimeToDataTempo = value => {
    if (value) {
        var datePart = value.slice(0, 10).match(/\d+/g),
            year = datePart[0],
            month = datePart[1],
            day = datePart[2];
        return day + '/' + month + '/' + year
    }
    return value
}