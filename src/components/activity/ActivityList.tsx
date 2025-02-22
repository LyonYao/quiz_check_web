import React, { useContext,useEffect, useState } from 'react';
import apiFetch from '../../api';
import { Box } from '@mui/material';
import { ActivityCard } from './ActivityCard'; // 引入ActivityCard组件
import { PageInfoContext } from '../../PageInfoContext';
import { Activity } from './Activity';
export const ListPage: React.FC = () => {
  const { setPageInfo } = useContext(PageInfoContext)!;
  const [msg, setMsg] = React.useState<string>('Loading');

  const [activityData, setActivityData] = useState<Activity[]>([]);
  useEffect(() => {
    setPageInfo("Quiz Check - 活动列表");
    const fetchData = async () => {
      try {
        const data = await apiFetch('activity/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if(data.length === 0){
          setMsg('No data available');
        }else{
          setActivityData(data);
        }
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.isArray(activityData) && activityData.length > 0 ? (
        activityData.map(activity => (
          <ActivityCard key={activity.id} {...activity} />
        ))
      ) : (
        <p>{msg}</p> 
      )}
    </Box>
  );
};