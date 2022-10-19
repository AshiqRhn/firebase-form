import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { app } from "../firebase";

interface User {
  accessToken?: string
  name?: string
  profession?: string 
}

const Home: React.FC<User> = (user:User) => {   

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider()  
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")  
    
  
    const signUpWithEmail = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((res:any) => {
        console.log(res.user);        
        sessionStorage.setItem('Token', res.user.accessToken);
        router.push('/registration')
        .catch((err) => {
          alert("Cannot Log in")
        })
      })      
    };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((res:any) => {
        console.log(res.user);
        sessionStorage.setItem('Token', res.user.accessToken);
        router.push('/registration')           
    })
    } 
    useEffect(() => {
        const token = sessionStorage.getItem('Token')
        if (token) {
          router.push('/registration')
        }
      }, [router])

  const theme = createTheme();

  return (
    <div style ={{minHeight: "100vh", marginTop: "100px"}}>
      <Head>
        <title>Sign Up Form</title>       
      </Head>      
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{backgroundColor:'#f8f9fa', border: "1px solid #adb5bd", borderRadius: '10px',  boxShadow: "0 8px 10px -4px lightblue" }} >
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth             
              label="Email Address"            
              autoComplete="email"
              autoFocus
              onChange={(e) =>setEmail(e.target.value)}
              value={email} 
              type = "email"
            />
            <TextField
              margin="normal"
              required
              fullWidth             
              label="Password"
              type="password"            
              value= {password}
              onChange={(e) =>setPassword(e.target.value)} 
              autoComplete="current-password"
            />
           
            <Button           
              fullWidth
              variant="contained"
              onClick={signUpWithEmail}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>             
                      
          </Box>
          <Typography variant="body1" align="center">Or</Typography>
        <Button             
              fullWidth
              variant="outlined"
              onClick = {signUpWithGoogle}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign in with Google
            </Button>
            
        </Box>      
      </Container>
    </ThemeProvider>  
    </div>
  )
}

export default Home
