import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Layout } from './Layout';
import  Home  from './components/Home';
import { ListPage as Acvt } from './components/activity/ActivityList';
import { DetailPage as Detail } from './components/activity/ActivityDetail';
import {SubjectList} from './components/subject/SubjectList';
import About from './components/About';
import { PageInfoProvider } from './PageInfoContext';
import { SubjectDetail } from './components/subject/SubjectDetail';
import SubjectCheck from './components/check/SubjectCheck';
import { ContentEdit } from './components/ContentEdit';
import CheckHistory from './components/check/CheckHistory';
import QuestionPreview from './components/check/QuestionPreview';
import { AcvtQuestionPreview } from './components/check/AcvtQuestionPreview';
const theme = createTheme({
  palette: {
    primary: {
      // 主色调变浅
      main: '#6b9bf0', // 假设这是你想用的更浅的颜色
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30, // 设置圆角半径
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageInfoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Acvt/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/activity" element={<Acvt/>} />
            <Route path="/activity/detail/:id" element={<Detail />} />
            <Route path="/activity/:aid/subject" element={<SubjectList/>} />
            <Route path="/activity/:aid/subject/detail/:sid" element={<SubjectDetail/>} />
            <Route path="/check/:aid/:sid" element={<SubjectCheck />} />
            <Route path="/check/history/:aId/:regCde" element={<CheckHistory />} />
            <Route path="/check/preview-q/:aId" element={<AcvtQuestionPreview />} />
            <Route path="/sim/content-edit" element={<ContentEdit />} />
            <Route path="/sim/preview-q" element={<QuestionPreview />} />
            <Route path="*" element={<div>Not Found</div>} />
            
            
            {/*<Route path="another-page" element={<AnotherPage />} /> 添加更多路由 */}
          </Route>
        </Routes>
      </Router>
      </PageInfoProvider>
    </ThemeProvider>
  );
}

export default App;