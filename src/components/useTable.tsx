import React, { useState } from 'react'
import { makeStyles, Table, TableCell, TableHead,TablePagination,TableRow } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(4),
    '& thead th': {
        fontWeight: '600',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    '& tbody td': {
        fontWeight: '600',
    },
    '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    },
},
}))

export default function useTable(tasks:any, headCells:any,filterFn:any) {

  const classes = useStyles();

  const pages = [5,10,15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  

    const TblContainer = (props:any) => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = (props:any) => {
        return (
            <TableHead>
                <TableRow>
                {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
            >
            {headCell.label}
            </TableCell>
          ))}
                </TableRow>
            </TableHead>
        )
    }

    const handlePage = (event: any, newPage: any) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const TblPagination = () => (<TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={tasks.length}
      onPageChange={handlePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
  />) 

  const taskPaging = () => {
      return filterFn.fn(tasks).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
}

  return {
    TblContainer,
    TblHead,
    TblPagination,
    taskPaging
  }
}
