import api from '../services/api'

function isNull(a) {
    return (a === null || a === 'null' || a === undefined || a === 'undefined')
}

export default function getSession() {
    if (!isNull(sessionStorage.getItem('session'))) {
        // console.log('sessionStorage')
        return JSON.parse(sessionStorage.getItem('session'))
    } else {
        if (!isNull(localStorage.getItem('session'))) {
            // console.log('localStorage')
            return JSON.parse(localStorage.getItem('session'))
        }
    }
}

export function setMeImage(image) {
    if (!isNull(sessionStorage.getItem('session'))) {
        sessionStorage.setItem('meImage', image)
    } else {
        if (!isNull(localStorage.getItem('session'))) {
            localStorage.setItem('meImage', image)
        }
    }
}

export function getMeImage() {
    if (!isNull(sessionStorage.getItem('session'))) {
        return !isNull(sessionStorage.getItem('meImage')) ? sessionStorage.getItem('meImage') : undefined
    } else {
        if (!isNull(localStorage.getItem('session'))) {
            return !isNull(localStorage.getItem('meImage')) ? localStorage.getItem('meImage') : undefined
        }
    }
}

export async function deleteSession() {
    if (!isNull(sessionStorage.getItem('session'))) {
        await api.delete('token', { data: { foo: "bar" } })
            .then(() => { })
            .catch(() => { });
        // sessionStorage.setItem('session', null)
    }
}
