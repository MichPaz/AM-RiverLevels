const rgMask = value => {
    return value? value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, '$1.$2')
        .replace(/(.\d{3})(\d{1})/, '$1-$2')
        .replace(/(-\d{1})(\d)+?$/, "$1")
        : ''
}

export default rgMask;