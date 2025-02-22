import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import apiFetch from '../api';
const Home: React.FC = () => {
  //call API and show response in console
  React.useEffect(() => {
    apiFetch('activity/greet')
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); 
  return (
    <Container>
      <Typography variant="h4">首页</Typography>
      <Button variant="contained" color="primary">
        主页按钮
      </Button>
    </Container>
  );
};

export default Home;