import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { database } from "../firebase";

const Registration = () => {

    const [name, setName] = useState("")
    const [job, setJob] = useState("") 
    // const [dob, setDob] = useState<any>(Date()) 
    // const [desc, setDesc] = useState("") 
    // const [loc, setLoc] = useState("") 
    const [fireData, setFireData] = useState<any>([{}])
    const [isUpdate, setIsUpdate] = useState<any>(false)
    const [ID, setID] = useState(null)

    const databaseRef = collection(database, 'Personal Info');
    const router = useRouter()

    useEffect(() => {
        const token = sessionStorage.getItem('Token')
        if (token) {
          getData()
        }
        if (!token) {
          getData()
          router.push('/signup')
        }
      }, [])

      const submitHandler = (e) => {
        e.preventDefault()        
        addDoc(databaseRef, {
          name: name,
          job: job,  
        //   dob: dob,    
        //   loc: loc,
        //   desc: desc
        })
        .then(() => {
          // alert("Data Sent")
          getData()
          setName("")
        //   setDob(Date())
        //   setLoc("")
        //   setJob("")     
        //   setDesc("")
        })
        .catch((err) => console.log(err)
        )
      }

      const getData = async () => {
        await getDocs(databaseRef)
        .then((res) => {
          setFireData(res.docs.map((data) =>{
            return {...data.data(), id: data.id}
          }));      
        })
      }
    
      const getID = (id:any, name:any, job:any) => {
        setID(id)
        setName(name)
        setJob(job) 
        // setDob(null)   
        // setLoc(loc)   
        // setDesc(desc)
        setIsUpdate(true)    
      }
    
      const updateFields = () => {
        const fieldToEdit = doc(database, 'Personal Info', ID)
        updateDoc(fieldToEdit, {
          name: name,
          job: job, 
        //   dob: dob,
        //   loc: loc,    
        //   desc: desc
          
        }) 
        .then(() => {
          alert("Data Updated")
          getData()
          setName("")
          setJob("")
        //   setDob(null)      
        //   setLoc("")
        //   setDesc("")
          setIsUpdate(false)
        }) 
        .catch((err) => console.log(err)
        )
        }

        const deleteDocument = (id) => {
            const fieldToEdit = doc(database, 'Personal Info', id)
            deleteDoc(fieldToEdit)
            .then(() => {
              alert("Data Deleted")
              getData()
            })
            .catch((err) => alert("Cannot delete field"))
          }
        
          const Logout = () => {
            sessionStorage.removeItem('Token')
            router.push('/')
          }
        
        const theme = createTheme();

  return (
    <div style={{minHeight:"100vh", marginTop: "100px"}}>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{backgroundColor:'#f8f9fa', border: "1px solid #adb5bd", borderRadius: '10px',  boxShadow: "0 8px 10px -4px lightblue" }}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Button onClick={Logout}>Logout</Button>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <div>             
             
                <TextField
                  margin="normal"
                  required
                  fullWidth             
                  label="Name"            
                  autoComplete="name"
                  autoFocus
                  onChange={(e) =>setName(e.target.value)}
                  value={name} 
                  type = "text"
                />       
              
                <TextField
                  margin="normal"
                  required
                  fullWidth             
                  label="Job"
                  type="text"            
                  value= {job}
                  onChange={(e) =>setJob(e.target.value)} 
                  autoComplete="current-password"
                /> <br/><br/>        
                {isUpdate? (
                    <Button 
                        fullWidth
                        sx={{ mt: 3, mb: 2 }} 
                        variant="contained" onClick={updateFields}>
                    Update
                    </Button>
                ): (
                    <Button  
                        fullWidth
                        variant="contained"
                        type='submit' 
                        onClick={submitHandler} >
                        Submit
                    </Button>
                )}           
            </div><br/>
          </Box>            
        </Box> 
        
      </Container><br/>
      <Container component="main" maxWidth="md" style={{backgroundColor:'#f8f9fa', border: "1px solid #adb5bd", borderRadius: '10px',  boxShadow: "0 8px 10px -4px lightblue" }}>
        <Box>
        {fireData.map((data:any) => {
          return (
            <div>             
              <p>Name: {data.name}</p>
                <p>Job: {data.job}</p>                   

                <button onClick={() => getID(data.id, data.name, data.job)}>
                  Update
                </button>

                <button onClick={() => deleteDocument(data.id)}>
                  Delete
                </button>
            </div>
          )
        })}
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}
export default Registration