const phoneMask = value => {
    return value ? value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/( \d{1})(\d)/g, "$1 $2")
        .replace(/( \d{4})(\d{1,5})$/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, '$1')
        : ''
}

export default phoneMask;