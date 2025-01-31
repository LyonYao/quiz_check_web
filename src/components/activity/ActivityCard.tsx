import React,{ useState} from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, styled } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DetailsIcon from '@mui/icons-material/Details';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const ActivityBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: string;
  location: string;
  description: string;
  fee: string; 
}

export const ActivityCard: React.FC<Activity> = ({ id, name, startTime, endTime, status, location, description, fee }) => {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [regCloseTxt, setRegCloseTxt] = useState<string>("取消");
  const handleClickOpen = (id: string) => {
    setRegCloseTxt("取消");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputName('');
    setRegistrationCode('');
  };

  const handleRegister = () => {
    // 这里可以添加注册逻辑，例如发送请求到服务器
    // 假设注册成功后生成一个注册码
    const code = `CODE-${Math.random().toString(36).substr(2, 6)}`;
    setRegistrationCode(code);
    setRegCloseTxt("关闭");
  };
  return (
    <ActivityBox key={id}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography color="text.secondary">时间：{new Date(startTime).toLocaleString()} - {new Date(endTime).toLocaleString()}</Typography>
          <Typography color="text.secondary">状态：{status}</Typography>
          <Typography color="text.secondary">地点：{location}</Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography color="text.secondary">费用：{fee}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleClickOpen(id)}><AppRegistrationIcon />注册</Button>
          <Button size="small" onClick={() => window.open('/activity/detail/' + id, '_blank')}><DetailsIcon />概要</Button>
          <Button size="small" href={'/activity/' + id + '/subject'}><ChecklistIcon />课程列表</Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>注册</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="姓名"
            type="text"
            fullWidth
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          {registrationCode && <><Typography color="textSecondary">注册成功代码: {registrationCode}</Typography>
          <Alert severity="warning">此代码用于答题凭据，请务必牢记.</Alert></>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{regCloseTxt}</Button>
          <Button onClick={handleRegister}>确认</Button>
        </DialogActions>
      </Dialog>
    </ActivityBox>
  );
};

