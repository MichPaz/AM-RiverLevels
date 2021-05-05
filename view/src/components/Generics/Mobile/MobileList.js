import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion, AccordionDetails, Grid,
    AccordionSummary, AccordionActions, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    headingExpanded: {
        fontSize: theme.typography.pxToRem(18),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        marginLeft: 5,
        alignItems: 'center',
        // flexBasis: '33.33%',
        display: 'flex',
    },
    columnButton: {
        alignItems: 'center',
        flexBasis: '20.00%',
        display: 'flex',
        right: 0,
    },
}));

export default function DetailedAccordion(props) {
    const classes = useStyles()
    const { items } = props
    let expandedsInit = {}
    for (const item of items) {
        expandedsInit[item.id] = false
    }
    const [expandeds, setExpandeds] = useState(expandedsInit)

    const handleChange = (id) => (e, isExpanded) => {
        let expandedsTemp = expandeds
        expandedsTemp[id] = isExpanded = isExpanded ? true : false
        setExpandeds({ ...expandedsTemp })
    }

    const isExpanded = (id) => {
        return Boolean(expandeds[id])
    }

    return (
        <div className={classes.root}>
            {items.map(item => (
                <Accordion key={item.id} expanded={item.details ? isExpanded(item.id) : false} onChange={item.details?handleChange(item.id):undefined}>
                    <AccordionSummary expandIcon={item.details ? <ExpandMoreIcon /> : undefined}>
                        <Grid container>
                            <Grid item xs={item.details ? 12 : 6}>
                                <Grid container alignItems='center' style={{ height: '100%' }}>
                                    <Grid item xs={12}>
                                        <Typography className={classes[isExpanded(item.id) ? 'headingExpanded' : 'heading']} noWrap>{item.heading}</Typography>
                                    </Grid>
                                    {item.secondaryHeading &&
                                        <Grid item xs={12}>
                                            {!isExpanded(item.id) && <Typography className={classes.secondaryHeading} noWrap>{item.secondaryHeading}</Typography>}
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                            {!item.details &&
                                <Grid item xs>
                                    <Grid container justify='flex-end'>
                                        {item.actions}
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </AccordionSummary>
                    {item.details && <>
                        <AccordionDetails className={classes.details}>
                            {item.details}
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            {item.actions}
                        </AccordionActions>
                    </>}
                </Accordion>
            ))}
            {items.length === 0 && <Typography align='center'>
                {props.labelEmpty ? props.labelEmpty : 'Nenhum registro'}
            </Typography>}
        </div>
    );
}