import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: fade(theme.palette.grey[100], 0),
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            color: theme.palette.grey[800],
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip);

export default function CustomizedBreadcrumbs(props) {

    let history = useHistory();

    function handleClick(event, path) {
        event.preventDefault();
        history.push(path);
    }

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item xs={12}>

                <Breadcrumbs aria-label="breadcrumb">

                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Home"
                        icon={<HomeIcon fontSize="small" />}
                        onClick={(e) => handleClick(e, '/')}
                    />

                    {props.crumbs.map((p, index) => (
                        (index < props.crumbs.length - 1) ?
                            <StyledBreadcrumb
                                key={p.label}
                                component="a"
                                href={p.crumb}
                                label={p.label}
                                onClick={(e) => handleClick(e, p.crumb)}
                            />
                            :
                            <StyledBreadcrumb
                                key={p.label}
                                label={p.label}
                            />
                    ))}

                </Breadcrumbs>

            </Grid>
            <Grid item xs={12} style={{ height: '20px' }}></Grid>
        </Grid>
    );
}