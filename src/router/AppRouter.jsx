import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthRouter } from '../auth/routes/AuthRouter'
import { JournalRoute } from '../journal/routes/JournalRoute'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          (status === 'authenticated')
           ? <Route path="/*" element={ < JournalRoute/> } />
           : <Route path="/auth/*" element={ <AuthRouter /> } />
        }

        <Route path='/*' element={ <Navigate to='/auth/login' />  } />


        {/* login y registro */}
       

        {/* <Route  path='/auth/*' element={<AuthRouter />} /> */}
        {/* jornual app */}
       {/*  <Route path='/*' element={<JournalPage />} /> */}
    </Routes>
  )
}
