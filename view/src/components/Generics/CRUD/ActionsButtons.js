import React from 'react'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const translate = {
    'cadastrar': 'Cadastrar',
    'detalhes': 'Detalhes',
    'editar': 'Editar',
    'apagar': 'Apagar',
}

const ActionButtons = (props) => {
    const history = useHistory()
    const { item, methods, route } = props
    const handleClick = (m) => () => (history.push(`/${route}/${item.id}/${m.route}`))
    const permissions = useSelector(state => state.servicos)

    return (
        <Grid container justify={'flex-end'}>
            {
                methods.map(m => {
                    if (m.hasItem) {
                        return (
                            Boolean(m.permission || (permissions[route] && permissions[route][m.route])) &&
                            <Tooltip key={m.name} title={m.tooltip ? m.tooltip : translate[m.route] ? translate[m.route] : ''}>
                                <IconButton
                                    aria-label={m.name}
                                    onClick={handleClick(m)}
                                >
                                    <m.icon />
                                </IconButton >
                            </Tooltip>
                        )
                    } else {
                        return ''
                    }
                })
            }
        </Grid>
    )
}

export default ActionButtons