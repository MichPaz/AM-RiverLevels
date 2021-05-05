
import React from 'react'

import {
    Typography, Grid, Avatar
} from '@material-ui/core'


import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'

import FilesStores from '../../stores/files'

const FilesView = (props) => {

    const fileClick = async (file) => {
        await FilesStores.download(file)
    }

    return (
        <Grid container spacing={2}>
            {props.files.length === 0 &&
                <Typography variant='body1'>
                    &nbsp;&nbsp;&nbsp;&nbsp; Sem arquivos registrados.
                </Typography>
            }
            {props.files.map(file => (
                <Grid item xs={12} key={file.id}>
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        wrap='nowrap'
                    >
                        <div
                            style={{
                                cursor: 'pointer',
                                paddingLeft: 25, paddingRight: 10,
                            }}
                            onClick={() => fileClick(file)}
                        >
                            <Avatar variant="rounded">
                                {file.type === "image" && < PhotoLibraryIcon />}
                                {file.type === "pdf" && <PictureAsPdfIcon />}
                                {file.type === "video" && <VideoLibraryIcon />}
                            </Avatar>
                        </div>
                        <Typography
                            variant='body2'
                            style={{ cursor: 'pointer' }}
                            onClick={() => fileClick(file)}
                            noWrap
                        >
                            {file.name}
                        </Typography>

                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default FilesView