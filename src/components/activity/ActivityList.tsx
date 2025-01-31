import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ActivityCard } from './ActivityCard'; // 引入ActivityCard组件
import { PageInfoContext } from '../../PageInfoContext';

export const ListPage: React.FC = () => {
const { setPageInfo } = useContext(PageInfoContext)!;
setPageInfo("Activity List")
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
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.isArray(activityData) && activityData.length > 0 ? (
        activityData.map(activity => (
          <ActivityCard key={activity.id} {...activity} />
        ))
      ) : (
        <p>No activities available.</p> 
      )}
    </Box>
  );
};