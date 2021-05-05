const pis_pasepMask = value => {
    return value ? value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{5})(\d)/, '$1.$2')
        .replace(/(\d{5}.\d{2})(\d{1})/, '$1-$2')
        .replace(/(-\d{1})\d+?$/, '$1')
        : ''
}

export default pis_pasepMask;