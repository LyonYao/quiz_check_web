import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline, Paper, Grid, useTheme } from '@mui/material';
import { Route, Routes, Outlet } from 'react-router-dom';
import { PageInfoProvider, PageInfoContext } from './PageInfoContext'; // 引入上下文

export const Layout: React.FC = () => {
  const theme = useTheme();
  const { pageInfo } = useContext(PageInfoContext)!;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '110vh' }}>
      {/* Banner with Gradient Background */}
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mt: 0, mb: 2, flexGrow: 1 }}>
        <AppBar position="static" sx={{
          background: 'linear-gradient(90deg,rgb(224, 200, 248) 0%,rgb(157, 192, 235) 100%)',
          minHeight: '120px',
          paddingTop: '10px',
        }}>
          <Toolbar>
            <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#6a11cb" strokeWidth="5" fill="none" />
              <path d="M50 30c-3.86 0-7 3.14-7 7v15h-10a5 5 0 0 0 0 10h20a5 5 0 0 0 0-10h-10V37c0-3.86-3.14-7-7-7z" fill="#6a11cb" />
              <path d="M40 60l10 10 20-20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff', marginLeft: '20px', marginTop:'60px'}}>
              {pageInfo}
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: '#fff', marginLeft: '20px',marginTop:'-40px' }}>
              活动管理系统
            </Typography>
              
          </Toolbar>
          <Typography  gutterBottom sx={{   textAlign: 'right', paddingRight:'10px' }}>
              overline text 333333333333333333333333333333333333333333
              </Typography>
          
        </AppBar>

        {/* Main Content Area */}
        <Paper elevation={3} sx={{ p: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Outlet />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Tail */}
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: theme.palette.grey[200] }}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            Hello World
          </Typography>
          <Typography variant="subtitle1" align="center">
            © {new Date().getFullYear()} Lyon Yao
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};