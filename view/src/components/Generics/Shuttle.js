import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Paper, Button, Typography } from '@material-ui/core';
import LoadingList from './Loading/loadingList'
import InputSearch from './Atomics/InputSearch'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        // width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function notData(a, b) {
    return a.filter((value) => b.indexOf(value.value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.map(e => e.value).indexOf(value) !== -1);
}

function intersectionData(a, b) {
    return a.filter((value) => b.map(e => e).indexOf(value.value) !== -1);
}

const CustomList = (props) => {
    const defaultLimit = 20
    const { items, classes, handleToggle, checked } = props
    const [limit, setLimit] = useState(defaultLimit)

    const handleScroll = (e) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            setLimit(limit + defaultLimit)
        }
    }

    const endSlice = items.count < limit ? items.count : limit

    return (
        <Paper className={classes.paper} onScroll={handleScroll}>
            <List dense component="div" role="list">
                {items.slice(0, endSlice).map((item) => {
                    const labelId = `transfer-list-item-${item.value}-label`;
                    return (
                        <ListItem key={item.value} role="listitem" button onClick={handleToggle(item.value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item.value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.label} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    )
}

export default function TransferList(props) {
    const { data, setValues, config } = props
    let { loading } = props
    loading = loading !== undefined ? loading : false

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [filter, setFilter] = React.useState({
        left: '',
        right: '',
    });

    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [change, setChange] = React.useState(false);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const setFilterKey = (key) => (e) => {
        let aux = filter
        aux[key] = e.target.value
        setFilter({ ...aux })
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function isEquivalent(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }

    const compareArray = function (a, b) {
        if (!a || !b)
            return false;
        if (a.length !== b.length)
            return false;
        for (var i = 0, l = a.length; i < l; i++) {
            if (a[i] instanceof Array && b[i] instanceof Array) {
                if (!a[i].equals(b[i]))
                    return false;
            }
            else
                if (!isEquivalent(a[i], b[i]))
                    return false;
        }
        return true;
    }

    const [count, setCount] = useState(0)

    useEffect(() => {

        if (count < 10 && data && (!compareArray(data.left, left) || !compareArray(data.right, right))) {
            setLeft(data.left ? data.left : [])
            // setChange(true)
            setRight(data.right ? data.right : [])
            // alert('roi')
            setCount(count + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (setValues && change) {
            setValues(right)
            setChange(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [right])

    const handleAllRight = () => {
        setRight(right.concat(left));
        setChange(true)
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setChange(true)
        setRight(right.concat(intersectionData(left, leftChecked)));
        setLeft(notData(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(intersectionData(right, rightChecked)));
        setChange(true)
        setRight(notData(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setChange(true)
        setRight([]);
    };

    const leftFiltered = left.filter(e => e.label.match(filter.left))
    const rightFiltered = right.filter(e => e.label.match(filter.right))

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>
                <Grid>
                    <Typography variant='body1' color='textSecondary'>
                        {config?.leftLabel ? config.leftLabel : 'Não Possui'}
                    </Typography>
                    <InputSearch
                        value={filter.left}
                        onChange={setFilterKey('left')}
                    />
                    {loading ? <Paper className={classes.paper}><LoadingList /></Paper> : <CustomList
                        items={leftFiltered}
                        classes={classes}
                        handleToggle={handleToggle}
                        checked={checked}
                    />}
                    <Typography variant='body2' color='textSecondary' align='right'>
                        {`Exibindo ${leftFiltered.length} de ${left.length}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Grid>
                    <Typography variant='body1' color='textSecondary'>
                        {config?.rigthLabel ? config.rigthLabel : 'Possui'}
                    </Typography>
                    <InputSearch
                        value={filter.right}
                        onChange={setFilterKey('right')}
                    />
                    {loading ? <Paper className={classes.paper}><LoadingList /></Paper> : <CustomList
                        items={rightFiltered}
                        classes={classes}
                        handleToggle={handleToggle}
                        checked={checked}
                    />}
                    <Typography variant='body2' color='textSecondary' align='right'>
                        {`Exibindo ${rightFiltered.length} de ${right.length}`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}