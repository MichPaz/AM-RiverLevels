import { getMeImage } from '../../../main/session'

export default function avatarImage(state = getMeImage() ? getMeImage() : '', action) {
    switch (action.type) {
        case 'CHANGE_ME_AVATAR':
            return (getMeImage() && getMeImage() !== "null") ? getMeImage() : ''
        default:
            return state
    }
}