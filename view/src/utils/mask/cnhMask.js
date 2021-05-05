const cnhMask = value => {
    return value ? value
        .replace(/\D/g, '')
        .replace(/(\d{11})\d+?$/, '$1')
        : ''
}

export default cnhMask;