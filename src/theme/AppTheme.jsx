import { CssBaseline } from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import { pupleTheme } from './purpleTheme'



export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={ pupleTheme }>
        <CssBaseline />

        {children}
    </ThemeProvider>
  )
}
