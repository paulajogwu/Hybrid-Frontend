import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2'
import {
  Link,
} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Newspaper';
import CommentIcon from '@mui/icons-material/RemoveRedEye';




import Paper from '@mui/material/Paper';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Home() {

  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
   

    let [name, setInput] = React.useState('')

    let [searchlist, setInfo] = React.useState([])
   
  
    const Search = () => {
      let timerInterval
  
      // const isValid = validate()
      if (name==0) {
      
        Swal.fire({
          icon: 'info',
          title: `Please enter a Text to Search`,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          width: 350,
          background: 'white',
          iconColor: 'red',
        })
  
    }else{



      Swal.fire({
        title: 'Loading!',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          

          var Names = name;
          console.log("jhjhijgfigf, Name",name)
          //var nameURL = reposName.replace(/-/g, "/");
          fetch("http://hn.algolia.com/api/v1/search?query=" +Names)
          .then(result => result.json())
            .then((data) => {
              if(data.message=="Not Found"){ 
                Swal.fire({
                  icon: 'error',
                  title: `No Record Found`,
                  position: 'center',
                  showConfirmButton: false,
                  timer: 3000,
                  width: 350,
                  background: 'white',
                  iconColor: 'red',
                })
              }
              else{
            
               

                setInfo(data.hits)
               
              
              }
            })
            .catch((err) =>{
              Swal.fire({
                icon: 'error',
                title: `${err}! Please check your internet connection `,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                width: 350,
                background: 'white',
                iconColor: 'red',
              })
            });

        }
      })

    }
  };


  const [checked, setChecked] = React.useState([0]);

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


  const Result=(props)=>{
    const details = props.id;
    
    if(details ==0){

     return(
       <>
      <div style={{textAlign:'center',color:'red'}}>
      <Typography style={{fontFamily:'sans-serif', fontSize:'20px'}}
     > No Record to Display</Typography>
      </div>
       </>
     )

    }
    else{
      return(
        <>
        {searchlist.map((data) => (
      <List sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }} style={{margin:'auto'}}>
    
    <ListItem style={{ backgroundColor:'DodgerBlue'}}
               secondaryAction={
                <Link to={`view/${data.objectID}`}>
                   <IconButton edge="end" aria-label="comments">
                  <CommentIcon style={{color:'white'}}/>
                </IconButton>
                </Link>
               
              }
              disablePadding  
              >
                <ListItemButton >
               
                  <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                  <ListItemText  style={{color:'white'}} primary={`${data.title}`}/>
                  {/* primary={`${data.title}`}   */}
                </ListItemButton>
              </ListItem>
              <br/>
        </List>
             

        ))}
      
        </>
      )
    }
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            HYBRID
          </Typography>
          <FormControl sx={{ width: '45ch' }}>
        <OutlinedInput  onChange={(e) => setInput(e.target.value)} placeholder="Please enter text" style={{backgroundColor:'white', borderRadius:15,width:'100%'}} 
        endAdornment={      <SearchIcon />}/>
  
          
      
      </FormControl>
      <FormControl sx={{ width: '5ch' }}></FormControl>
      <FormControl sx={{ width: '20ch' }}>
      <Button variant="contained"  style={{backgroundColor:'white',color:'ButtonText'}}
           onClick={() => {
            Search()
          }}>
        Search
      </Button>
      </FormControl>
       
         
        </Toolbar>
      </AppBar>



      

    </Box>

<br/>
    {/* <Paper sx={{ width: '50%' }}> */}

    

   {/* </Paper> */}

   <Result id={searchlist} />
    </>

  );
}
