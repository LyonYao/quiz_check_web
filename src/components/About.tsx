import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">关于我们</Typography>
      <Button variant="contained" color="secondary">
        关于我们按钮
      </Button>
    </Container>
  );
};

export default About;