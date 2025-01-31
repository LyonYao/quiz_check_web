import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';
import { PageInfoContext } from '../../PageInfoContext';

const mockData = [
  {
    id: '001',
    title: 'React 入门课程',
    description: '学习 React 的基础知识和应用。',
  },
  {
    id: '002',
    title: '高级 JavaScript',
    description: '深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。',
  },
  {
    id: '003',
    title: '全栈开发',
    description: '掌握前端和后端开发技能。',
  },
];

const activityData = [
  {
    "id": "001",
    "name": "2024 AWS Share",
    "startTime": "2024-03-15T09:00:00Z",
    "endTime": "2024-03-15T17:00:00Z",
    "status": "即将开始",
    "location": "线上活动 - AWS 平台",
    "description": "深入探讨AWS最新技术和服务，为开发者提供实战技巧。",
    "fee": "免费"
  },
  {
    "id": "002",
    "name": "2024 数据科学研讨会",
    "startTime": "2024-04-22T10:00:00Z",
    "endTime": "2024-04-22T18:00:00Z",
    "status": "报名中",
    "location": "北京市朝阳区某会议中心",
    "description": "聚焦数据科学前沿话题，与业内专家面对面交流。",
    "fee": "¥200"
  },
  {
    "id": "003",
    "name": "2024 AI 开发者大会",
    "startTime": "2024-06-10T08:30:00Z",
    "endTime": "2024-06-12T17:00:00Z",
    "status": "已满员",
    "location": "线上活动 - Zoom",
    "description": "涵盖AI开发的所有方面，从理论到实践，全面覆盖。",
    "fee": "¥500"
  },
  {
    "id": "004",
    "name": "2024 AI 开发者大会",
    "startTime": "2024-06-10T08:30:00Z",
    "endTime": "2024-06-12T17:00:00Z",
    "status": "已满员",
    "location": "线上活动 - Zoom",
    "description": "涵盖AI开发的所有方面，从理论到实践，全面覆盖。",
    "fee": "¥500"
  },
  {
    "id": "005",
    "name": "2024 AI 开发者大会",
    "startTime": "2024-06-10T08:30:00Z",
    "endTime": "2024-06-12T17:00:00Z",
    "status": "已满员",
    "location": "线上活动 - Zoom",
    "description": "涵盖AI开发的所有方面，从理论到实践，全面覆盖。",
    "fee": "¥500"
  },
  {
    "id": "006",
    "name": "2024 AI 开发者大会",
    "startTime": "2024-06-10T08:30:00Z",
    "endTime": "2024-06-12T17:00:00Z",
    "status": "已满员",
    "location": "线上活动 - Zoom",
    "description": "涵盖AI开发的所有方面，从理论到实践，全面覆盖。",
    "fee": "¥500"
  }
];
export const SubjectList: React.FC = () => {

  const { aid } = useParams<{ aid: string }>();
  const activity = activityData.find(acty => acty.id === aid);
  const { setPageInfo } = React.useContext(PageInfoContext)!;
  if(activity&&activity.name){
    setPageInfo(activity.name);
  }
  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
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
            {mockData.map((subject, index) => (
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
                      {subject.description.length > 30
                        ? `${subject.description.substring(0, 30)}...`
                        : subject.description}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    sx={{ mr: 1 }}
                    href={'/activity/' + aid + '/subject/detail/'+subject.id}
                  >
                    查看
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<CheckCircleIcon />}
                    href={'/activity/' + aid + '/subject/check/'+subject.id}
                  >
                    检查
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubjectList;

