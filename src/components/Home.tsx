import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
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