import React, { useState, useEffect } from 'react';

import {
    IconButton, Badge, MenuList, Typography,
    Paper, ListItemIcon, MenuItem, Menu, Grid
} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import ModalInfo from '../components/Generics/modalInfo'
import NewsVisualizationActions from '../actions/newsVisualization'
import NewsVisualizationStores from '../stores/newsVisualization'

import styles from '../components/configs/styles';


function NoticeView(props) {
    const { show, onHide, item } = props
    return (
        <>
            {item &&
                <ModalInfo
                    show={show}
                    onHide={onHide}
                    widthModal='md'
                    fullWidth
                    title='Notificação'
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            < Typography variant='body1'>
                                {item.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ height: 30 }} />
                    </Grid>
                </ModalInfo>
            }
        </>
    );
}


function NoticesList(props) {
    const { open, anchorEl, handleClose, items } = props
    const [item, setItem] = useState()
    const [show, setShow] = useState(false)

    const handleClick = (item) => {
        NewsVisualizationActions.add(item.id)
        setItem(item)
        setShow(true)
    }

    return (
        <>
            <NoticeView
                show={show}
                onHide={() => setShow(false)}
                item={item}
            />
            {items.length > 0 &&
                <Paper>
                    <Menu
                        style={{ maxWidth: 400, maxHeight: '80vh' }}
                        open={open}
                        anchorEl={anchorEl}
                        keepMounted
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuList autoFocusItem={open}>
                            {
                                items.map(item => (
                                    <MenuItem key={item.id} onClick={()=>handleClick(item)}>
                                        {item.noticeType === 'news' &&
                                            <ListItemIcon>
                                                {item.visualized ?
                                                    <AnnouncementIcon fontSize="small" />
                                                    :
                                                    <AnnouncementIcon fontSize="small" style={{ color: styles.color.orange }} />
                                                }
                                            </ListItemIcon>
                                        }
                                        <Typography variant="inherit" noWrap>
                                            {item.description}
                                        </Typography>
                                    </MenuItem>
                                ))
                            }

                        </MenuList>
                    </Menu>
                </Paper>
            }
        </>
    );
}


const formatData = (data, noticeType) => {
    return data.map(item => ({ ...item, noticeType }))
}

function Home() {

    let newsVisualizations = NewsVisualizationStores.getNewsVisualization()

    const [notices, setNotices] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        // NewsVisualizationActions.add(
        //     notices
        //         .filter(e => e?.visualized === false)
        //         .map(e => e?.id)
        // )
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        newsVisualizations = NewsVisualizationStores.getNewsVisualization()
        setAnchorEl(null);
    };

    const _onChange = () => {
        const news = NewsVisualizationStores.getNews()
        // if (!open) {
            newsVisualizations = NewsVisualizationStores.getNewsVisualization()
        // }


        for (let n of news) {
            n.visualized = newsVisualizations
                .map(e => e?.newId)
                .includes(n.id) ? true : false
        }

        setNotices(formatData(news, 'news'))
    }

    useEffect(() => {

        const fetchData = async () => {
            NewsVisualizationActions.list((new Date().toISOString()))
        }

        fetchData()
        const interval = setInterval(fetchData, 6e5)
        NewsVisualizationStores.addChangeListener(_onChange)
        return function cleanup() {
            NewsVisualizationStores.removeChangeListener(_onChange)
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    return (
        <>
            <NoticesList
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                items={notices}
            />
            <IconButton aria-label="notificações" color="inherit" onClick={handleClick}>
                <Badge badgeContent={notices.filter(e => e?.visualized === false).length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </>
    );
}

export default Home;