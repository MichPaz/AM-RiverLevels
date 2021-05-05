export function iLikeSearch(search, list) {
    const key = new RegExp(search
        .toLowerCase()
        .replace(/a/g, '(a|á|â|ã)')
        .replace(/e/g, '(e|é|ê)')
        .replace(/i/g, '(i|í|î)')
        .replace(/o/g, '(o|ó|ô|õ)')
        .replace(/u/g, '(u|ú|û)')
        + '.*', "g")
    return list.filter(e => Boolean(e.nome.toLowerCase().match(key)))
}