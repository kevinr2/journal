import {Box} from '@mui/system' 
import { Navbar } from '../components/Navbar'
import { SideBar } from '../components/SideBar'
import { Toolbar } from '@mui/material'

const drawerWidth= 280

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
        {/* navbar */}
        <Navbar drawerWidth={drawerWidth} />

        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth} />

        <Box 
            component="main"
            sx={{flexGrow:1,p:3}}
        >
          <Toolbar />
            {children}
        </Box>
    </Box>
  )
}
