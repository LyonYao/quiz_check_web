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
import SubjectCheck from './components/subject/SubjectCheck';
import { ContentEdit } from './components/ContentEdit';
const theme = createTheme();

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
            <Route path="/activity/:aid/subject/check/:sid" element={<SubjectCheck />} />
            <Route path="/sim/content-edit" element={<ContentEdit />} />
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