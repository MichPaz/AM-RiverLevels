import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TableSortLabel, Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/*
*
*       

        const data = {
            header: [
                {
                    id: '1',
                    label: 'nome',
                    align: 'left',
                    order: true
                },
                {
                    id: '2',
                    label: 'Descrição',
                    aling: 'left',
                    order: true
                },
                {
                    id: '3',
                    label: 'Ações',
                    aling: 'right',
                    order: false
                },
            ],
            items: [
              {
                atrib: object
                aling: 'left',
              }
            ],
        }
 * 
 * 
 */




const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
    fontWeight: '550',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (a[orderBy]) {
    if (b[orderBy].atrib < a[orderBy].atrib) {
      return -1;
    }
    if (b[orderBy].atrib > a[orderBy].atrib) {
      return 1;
    }
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function TableHeader(props) {
  const { row, classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (

    <TableHead style={{ width: '100%' }} >
      <TableRow >
        <StyledTableCell padding="checkbox">
        </StyledTableCell>
        {row.header.map((headCell, index) => (
          headCell.order ? <StyledTableCell
            key={index}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.label ? order : false}
          >
            <TableSortLabel className={classes.myHeadCell}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.label ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
            :
            <StyledTableCell key={index} align={headCell.align}>
              {headCell.label}
            </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const datas = props.data.items;
  const { size, width } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    datas.length > 0 ? <TableContainer component={Paper}>
      <Table className={classes.table} style={width ? { minWidth: width } : undefined} size={size ? size : 'medium'} aria-label="customized table">
        <TableHeader
          classes={classes}
          row={props.data}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {
            stableSort(datas, getComparator(order, orderBy)).map((item, index) => (
              <StyledTableRow key={index} hover tabIndex={-1}>
                <TableCell padding="checkbox"></TableCell>
                {item.map((e, indexA) => (
                  <StyledTableCell align={e.align} key={indexA}>
                    {e.atrib}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          }

        </TableBody>
      </Table>
    </TableContainer>
      :
      <Typography align='center' variant='body1' style={{ margin: 20 }}>
        {props.labelEmpty ? props.labelEmpty : 'Ainda não há nenhum registro.'}
      </Typography>
  );
}