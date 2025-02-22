import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../../PageInfoContext';
import apiFetch from '../../api';
import { Subject } from './Subject';
export const SubjectList: React.FC = () => {
  const [msg, setMsg] = React.useState<string>('Loading');
  const { aid } = useParams<{ aid: string }>();
  const { setPageInfo } = React.useContext(PageInfoContext)!;
  const [subjectList, setSubjectList] = React.useState<Subject[]>([]);
  //user APi to get acitvity via aid
  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await apiFetch('activity/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:aid}),
        });
        if(data.length === 0){
          setPageInfo('No activity data available');
        }else{
          setPageInfo(data.name);
        }
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };
    const fetchSubjectList = async () => {
      try {
        const data = await apiFetch('subject/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({aid:aid}),
        });
        if(data.length === 0){
          setMsg('No data available');
        }else{
          setSubjectList(data);
        }
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };
    fetchActivity();
    fetchSubjectList();
  }, [aid]); 
  return (
    <Box sx={{ p: 2 }}>
      {subjectList && subjectList.length>0? (<TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5',fontSize:'medium' }}>
            <TableRow>
              <TableCell>序号</TableCell>
              <TableCell>课程名称</TableCell>
              <TableCell>描述</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectList.map((subject, index) => (
              <TableRow key={subject.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Tooltip title={subject.title}>
                    <span>
                      {subject.title.length > 30
                        ? `${subject.title.substring(0, 30)}...`
                        : subject.title}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={subject.description}>
                    <span>
                      {subject.description.length > 40
                        ? `${subject.description.substring(0, 40)}...`
                        : subject.description}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  {subject.status=='C' && <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<CheckCircleIcon />}
                      href={'/check/'+ aid +'/'+subject.id}
                    >
                      答题
                    </Button>}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    sx={{ mr: 1 }}
                    href={'/activity/' + aid + '/subject/detail/'+subject.id}
                  >
                    查看
                  </Button>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>):<p>{msg}</p>
    }
    </Box>
  );
};

export default SubjectList;

