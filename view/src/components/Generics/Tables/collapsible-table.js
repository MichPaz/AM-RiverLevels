import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//DATA FORMAT:
//
// data: {
//   header:
//   [
//     {
//       label: '',
//       align: '',
//     },
//   ],
//   items:
//   [
//     {
//       atribs: [],
//       header: [
//         {
//           label: '',
//           align: '',
//         },
//       ]
//       items:
//         [
//           {
//             atrib: '',
//             align: ''
//           },
//         ]
//     }
//   ]
// }




const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
    fontWeight: '550',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: '50px' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row.atribs.map((item => (
          <TableCell key={item}>
            {item}
          </TableCell>
        )))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases" className={classes.table}>
                <TableHead >
                  <TableRow>
                    {row.header.map(item => (
                      <StyledTableCell key={item.label} align={item.align}>{item.label}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {row.items.map((item, index) => (
                    <TableRow key={index}>
                      {item.map((e, index) => (
                        <TableCell key={index} align={e.align}>
                          {e.atrib}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {props.data.header.length > 0 && <TableCell />}
            {props.data.header.map((item => (
              <StyledTableCell key={item.label} align={item.align}>{item.label}</StyledTableCell>
            )))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.items.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}