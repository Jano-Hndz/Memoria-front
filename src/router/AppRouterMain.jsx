import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useEffect } from 'react';
import { AppRoutes } from '../App/routes/AppRoutes';
import { useAuthStore } from '../hooks';
import { Box, CircularProgress } from '@mui/material';


export const AppRouterMain = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
      checkAuthToken();
  }, [])

  if ( status === 'checking' ) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={ <AppRoutes /> } />
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' />  } />
    </Routes>
  )
}
