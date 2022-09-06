import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  Toolbar,
  Grid,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Notification from "../../components/Notification";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import useTable from "../../components/useTable";
import {
  useTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from '../../contexts/TaskContextApi';
import { useUsers } from '../../contexts/UserContextApi';
import ConfirmDialog from "../../components/ConfirmDeleteDialog";

const useStyles = makeStyles((theme) => ({
  layoutContent: {
    margin: "40px",
    padding: "40px",
  },
  searchInput: {
    width: "70%",
  },
  newButton: {},
  isComplete: {
    width: "80%",
  },
  noRecords: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'user', label: 'User' },
  { id: 'isComplete', label: 'Completed' },
  { id: 'actions', label: 'Actions' },
];


export default function Tasks(props:any) {

  const classes = useStyles()
  const users = useUsers();
  const [user, setUser] = useState('');
  const tasks = useTask();
  const addNewTask = useAddTask();
  const updateTasks = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [taskToUpdate, setUpdateTask] = useState(null)
  const [isCompleted, setIsComplete] = useState(false);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:'',onConfirm: () => {}})
  const {TblContainer, TblHead, TblPagination,taskPaging} = useTable(tasks, headCells,filterFn);
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = item =>{
    setUpdateTask(item) 
    setOpenPopup(true)
  }

  const [notify, setNotify] = useState({isOpen:false, message:'', type:''})

  const getUser = (id: any): any => {
    return users.find((user: any) => {
      return user.id === id;
    });
  };

  const searchTasks = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                //set to lowercase search
                return items.filter(x => x.name.toLowerCase().includes(target.value))
        }
    })
}

const searchByUser = (e: any) => {
  let target = e.target.value;
  setUser(target);
  setFilterFn({
    fn: (items: any) => {
      if (!target) {
        return items;
      } else {
        return items.filter((x: any) => x.user === target);
      }
    },
  });
};

  const searchByIsComplete = () => {
    setIsComplete(!isCompleted);
    setFilterFn({
      fn: (items: any) => {
        if (isCompleted) {
          return items;
        } else {
          return items.filter((x: any) => x.isCompleted === !isCompleted);
        }
      },
    });
  };

  const insertOrUpdate = (task:any, resetForm) => {
    if (!task.id) addNewTask(task);
    else updateTasks(task);
    resetForm();
    setUpdateTask(null);
    setOpenPopup(false);

    setNotify({
      isOpen:true,
      message:'Data Inserted Successfully',
      type:'success'
    })
  }

  const onDelete: any = (id:any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  })
    deleteTask(id);
    setNotify({
      isOpen:true,
      message:'Data Deleted Successfully',
      type:'error'
    })

  } 

  return (
    <>
      <Paper className={classes.layoutContent}>
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <Controls.Input
                label="Search Project by Name"
                className={classes.searchInput}
                onChange={searchTasks}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.searchInput}>
              <Controls.Select
                  name="user"
                  label="User"
                  value={user}
                  onChange={searchByUser}
                  options={users}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.isComplete}>
                <FormGroup style={{ margin: 10 }}>
                  <FormControlLabel
                    control={
                      <Switch
                      checked={isCompleted}
                        onChange={searchByIsComplete}
                        color="primary"
                      />
                    }
                    label="Completed"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Controls.Button 
                text="Add Task"
                variant="contained"
                className={classes.newButton}
                onClick={() => setOpenPopup(true)}
              />
            </Grid>
          </Grid>
        </Toolbar>

        <TblContainer>
          <TblHead />
          <TableBody>
            {
              taskPaging().map((task:any) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                  {getUser(task.user).firstName}{' '}
                  {getUser(task.user).lastName}
                </TableCell>
                  <TableCell>
                  {task.isCompleted && (
                    <CheckCircleOutlineIcon/>
                  )}
                </TableCell>
                <TableCell>
                <Controls.ActionButton >
                    <CancelIcon fontSize='small' onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure you want to delete?',
                        subTitle: '',
                        onConfirm: () => {
                          onDelete(task.id);
                        },
                      })
                    }/>
                  </Controls.ActionButton>
                  <Controls.ActionButton >
                    <EditIcon fontSize='small' onClick={()=>{openInPopup(task)}} />
                  </Controls.ActionButton>
                </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </TblContainer>
        {!taskPaging().length && (
          <Typography variant="h6" className={classes.noRecords}>
            No Records
          </Typography>
        )}
        <TblPagination/>
      </Paper>
      <Popup
        title="Add New Task"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TaskForm 
        insertOrUpdate={insertOrUpdate}
        taskToUpdate={taskToUpdate}
        />
      </Popup>
      <Notification 
      notify={notify}
      setNotify={setNotify}
      />
      <ConfirmDialog 
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}/>
    </>
  );
}
