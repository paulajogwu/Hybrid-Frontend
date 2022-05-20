import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/Comment';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Divider } from '@material-ui/core';


export default function Details() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const { id } = useParams();
  let timerInterval
  let [details, setInfo] = React.useState([])
  let [comments, SetComment] = React.useState([])
  

  useEffect(() => {

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
        

      
        fetch("http://hn.algolia.com/api/v1/items/" +id)
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
          
              console.log("jhjhijgfigf, ",data)

              setInfo(data)
              SetComment(data.children)
             
            
            }
          });

      }
    })
  
  },[]);

  return (

      <Paper sx={{ width: '80%',margin:'auto',height:'100%' }} style={{marginTop:'100px',backgroundColor:'dodgerblue',
      paddingTop:'100px',paddingBottom:'100px'}}> 

<Card sx={{ maxWidth: 665, margin:'auto' }}>
      <CardMedia
        
      >
        <img src='/logo-hn.webp' style={{width:'100%',height:'250px'}}/>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {details.title}
        </Typography>
        <Button size="small">Point: {details.points}</Button>
      </CardContent>
      <CardActions>
       
        <List>
        <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="comments" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        {comments.map((datas) => ( 
        <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
           
            
            <Typography style={{width:500}}> {datas.text}</Typography>
           
            <br/>
             
          </ListItem>
          <Divider/>
        </List>
        ))} 
      </Collapse>
    </List>
      </CardActions>
    </Card>

    </Paper> 
   
  );
}
