import { Box, Icon, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#757ce8', height: '35px'}}>      
        <Typography variant="body2" color="white" padding="5px" align="center">
            &copy; <i>2022 FireBase Authentication & Form</i>
        </Typography>     
    </div>
  )
}

export default Footer