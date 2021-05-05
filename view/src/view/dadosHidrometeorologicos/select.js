import React from 'react'
import Read from '../Generics/CRUD/read'
import model from '../../models/dadosHidrometeorologicos'

const keys = [
    { key: 'codigo', md: 12 },
    { key: 'nome', md: 12 },
]

function SelectItem(props) {

    const { item, show, onHide } = props

    const propsCRUD = {
        label: 'Área',
        item,
        show,
        onHide,
        keys,
        model,
    }

    return (
        <Read {...propsCRUD} />
    )
}

export default SelectItem