import React from 'react';
import { Grid, Typography, Select, FormControl, MenuItem } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const limitList = [5, 10, 20, 50, 100]

export const LimitPagination = (props) => {
    const { handleLimit, limit, count, offset, countLocal } = props

    let limitListCurrent = [count]
    if (limit !== count)
        limitListCurrent.push(limit)

    const info = `${offset + 1}-${countLocal + offset } de ${count}`

    return (
        <>
            {count > 0 &&
                <Grid container justify='center' alignItems='center' spacing={1}>
                    <Grid item>
                        <Typography variant='body2'>Quantidade por Página:</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl margin='dense' variant="standard">
                            <Select

                                value={limit}
                                onChange={handleLimit}
                            >
                                {[...limitList.filter(e => (e < count) && e !== limit), ...limitListCurrent].sort((a, b) => a - b).map(op => (
                                    <MenuItem value={op} key={op}>{op}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{info}</Typography>
                    </Grid>
                </Grid>
            }
        </>
    )
}

const PaginationGeneric = (props) => {

    const { page, handlePage, lastPage } = props

    return (
        <>
            {lastPage > 1 &&
                <Grid container justify='center'>
                    <Pagination size='small' count={lastPage} page={page} onChange={handlePage} showFirstButton showLastButton />
                </Grid>
            }
        </>
    )
}


export default PaginationGeneric