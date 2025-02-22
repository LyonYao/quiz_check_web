import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline, Paper, Grid, useTheme, Backdrop, CircularProgress } from '@mui/material';
import { Route, Routes, Outlet } from 'react-router-dom';
import { PageInfoProvider, PageInfoContext } from './PageInfoContext'; // 引入上下文

export const Layout: React.FC = () => {
  const theme = useTheme();
  const { pageInfo , callAPIing } = useContext(PageInfoContext)!;

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
              Quzi Study & Check
            </Typography>
              
          </Toolbar>
          <Typography  gutterBottom sx={{   textAlign: 'right', paddingRight:'10px' }}>
              {(() => {
                const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleString());

                React.useEffect(() => {
                  const timer = setInterval(() => {
                    setCurrentTime(new Date().toLocaleString());
                  }, 1000);

                  return () => clearInterval(timer);
                }, []);

                return currentTime;
              })()}
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
            © {new Date().getFullYear()} Lyon 

          </Typography>
          <Typography variant="subtitle2" align="center" sx={{
                fontSize: '0.8rem', // 调整字体大小
                color: '#a9a9a9',  // 淡灰色
            }}>该网站所有题目均来源于网络搜集分析，并非任何官方题目。
            <br/>
            题目用来参考学习预估，计算正确率不代表任何考试通过率
            <br/>
            该网站不会搜集你任何信息，注册可以使用昵称代替，系统3个月之后自动删除注册及答题结果
            </Typography>
        </Container>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 888 }}
        open={callAPIing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
    
  );
};