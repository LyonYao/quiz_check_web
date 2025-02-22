import React,{ useContext, useState} from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, styled } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DetailsIcon from '@mui/icons-material/Details';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Activity } from './Activity';
import apiFetch from '../../api';
import { PageInfoContext } from '../../PageInfoContext';
const ActivityBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));



export const ActivityCard: React.FC<Activity> = (props) => {
  const { id, name, start_time, end_time, status, location, description,
     fee,can_reg, can_check, can_preview_q } = props;
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [regCloseTxt, setRegCloseTxt] = useState<string>("取消");
  const [regMsg, setRegMsg] = useState<string>('');
  const { setCallAPIing } = useContext(PageInfoContext)!;
  const handleClickOpen = (id: string) => {
    setRegCloseTxt("取消");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputName('');
    setRegistrationCode('');
    setRegMsg('');
  };

  const handleRegister = async () => {
    if(!inputName){
      setRegMsg('请输入姓名');
      return;
    }
    try {
      setCallAPIing(true);
      const data = await apiFetch('activity/reg', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({'id': id, 'name': inputName}),
      });
      if(data['error']){
        setRegMsg(data['error']);
      }else{
        setRegistrationCode(data['reg_code']);
        setRegCloseTxt("关闭");
        setRegMsg('');
      }
    } catch (error) {
        console.error('Error registering:', error);
        setRegMsg('Error when registering');
    } finally {
      setCallAPIing(false);
    };
  };
  return (
    <ActivityBox key={id}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography color="text.secondary">时间：{new Date(start_time).toLocaleString()} - {new Date(end_time).toLocaleString()}</Typography>
          <Typography color="text.secondary">状态：{status}</Typography>
          <Typography color="text.secondary">地点：{location}</Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography color="text.secondary">费用：{fee}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => window.open('/activity/detail/' + id, '_blank')}><DetailsIcon />概要</Button>
          {!can_check && <Button size="small" href={'/activity/' + id + '/subject'}><ChecklistIcon />课程列表</Button>}
          {(can_check && can_preview_q) && <Button size="small" href={'/check/preview-q/' + id }><ChecklistIcon />预览题目</Button>}
          {can_reg && <Button size="small" onClick={() => handleClickOpen(id)}><AppRegistrationIcon />注册</Button>}
          {(can_reg &&can_check) && <Button size="small" href={'/check/' + id + '/CHECK'}><CheckCircleIcon />答题</Button>}
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
          <Alert severity="warning">此代码用于答题凭据，请务必牢记.</Alert> 
          </>
          }
          {regMsg && <Alert severity="warning">{regMsg}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{regCloseTxt}</Button>
          {!registrationCode &&<Button onClick={handleRegister}>确认</Button>}
        </DialogActions>
      </Dialog>
    </ActivityBox>
  );
};

