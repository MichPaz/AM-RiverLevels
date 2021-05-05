import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import './style/Menu.css'
// import routesPermissions from './routes-permissions';
import ImgW from '../../images/marca_w.svg'
import ImgB from '../../images/marca_b.svg'
import { Image } from 'react-bootstrap'
import { Link, useHistory,/* useLocation*/ } from 'react-router-dom'

//Importacoes do Material UI
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { /*Hidden,*/ SwipeableDrawer } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  AppBar, Toolbar, List, Typography, Menu,
  // Avatar, 
  ListItem, Collapse, MenuItem, ListItemText, ListItemIcon,
  Divider, IconButton, Grid
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

// import Button from '@material-ui/core/Button';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
// import AccountCircle from '@material-ui/icons/AccountCircle'

// import { useSelector, useDispatch } from 'react-redux'
// import Notice from './notice';

import AssessmentIcon from '@material-ui/icons/Assessment'

const drawerWidth = 320

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

export function ListItemLink(props) {
  const { to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  )

  return <ListItem button component={renderLink} {...props} />
}

function SubMenu(props) {
  const [open, setOpen] = useState(false)

  const { handleDrawerClose, data } = props
  let { items } = data

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        {data.icon && (
          <ListItemIcon>
            {<data.icon className='menuIconItem' />}
          </ListItemIcon>
        )}
        <ListItemText>{props.data.label}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {items.map(
            (item, index) =>
              <ListItemLink
                key={index}
                to={`/${item.href}`}
                onClick={handleDrawerClose}
              >
                <ListItemText style={{ paddingLeft: 12 }}>
                  {' - ' + item.label}
                </ListItemText>
              </ListItemLink>
          )}
        </List>
      </Collapse>
    </>
  )
}

function ItemMenu(props) {
  return (
    <>
      {/* {routesPermissions(props.href) && */}
      <ListItemLink to={props.href} onClick={props.handleDrawerClose}>
        <ListItemText>
          <strong>{props.label}</strong>
        </ListItemText>
      </ListItemLink>
      {/* } */}
    </>
  )
}

function MenuWebLateral() {
  let history = useHistory()

  // const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  //  const avatar = useSelector(state => state.avatarImage)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  //Menu Meu perfil
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  // const handleProfileMenuOpen = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <MenuItem
        onClick={() => {
          history.push('/meu_perfil')
          handleMenuClose()
          handleDrawerClose()
        }}
      >
        Meu Perfil
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push('/logout')
          handleMenuClose()
          handleDrawerClose()
        }}
      >
        Sair
      </MenuItem>
    </Menu>
  )


  return (
    <>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            edge='start'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          {!open && <Image className='img' alt='logo' src={ImgW} />}
          <Typography variant='h6' className={classes.title}>
            {/* {window.config.nomeSistema} */}
          </Typography>

          {/* <Notice /> */}
          {/* <MenuItem onClick={handleProfileMenuOpen}>
                {me && <Hidden smDown><Typography>
                  {me.nome}
                </Typography></Hidden>}
                <IconButton
                  aria-label='account of current user'
                  aria-controls='primary-search-account-menu'
                  aria-haspopup='true'
                  color='inherit'
                  size='medium'
                >
                  <Avatar
                    style={{ backgroundColor: 'rgb(0,0,0,0)' }}
                    src={avatar}
                  >
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              </MenuItem> */}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className={classes.drawer}
        variant='temporary'
        // variant="persistent"
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Grid container spacing={2} style={{ padding: 12 }}>
          <Grid item xs={6}>
            {open && <Image className='img' alt='logo' src={ImgB} />}
          </Grid>
          <Grid item xs={6}>
            <Grid container justify='flex-end'>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <List>
          <ItemMenu
            href='/'
            label='Home'
            handleDrawerClose={handleDrawerClose}
          />


          <SubMenu
            handleDrawerClose={handleDrawerClose}
            data={{
              label: 'Gráficos',
              icon: AssessmentIcon,
              items: [
                { href: 'dadosHidrometeorologicos', label: 'Dados Hidrometeorológicos' },
                { href: '#', label: 'Item' },
              ]
            }}
          />

        </List>
      </SwipeableDrawer>
      {renderMenu}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </>
  )
}

export default MenuWebLateral
