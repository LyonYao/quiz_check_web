import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, Button, FormControl, ButtonGroup, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Alert } from '@mui/material';
import { PageInfoContext } from '../../PageInfoContext';
import { useParams, useNavigate } from 'react-router-dom';
import apiFetch from '../../api';
import { Question } from './Question';



 

export const SubjectCheck: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({});
    const { sid } = useParams<{ sid: string }>();
    const { aid } = useParams<{ aid: string }>();
    const navigate = useNavigate();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [registrationCode, setRegistrationCode] = useState('');
    const [registrationCodeTxt, setRegistrationCodeTxt] = useState('');
    const [open, setOpen] = useState(true);
    const [msg, setMsg] = React.useState<string>('');
    const [startTime, setStartTime] = useState<Date>();
    const [checkId, setCheckId] = React.useState<string>('');
    const [regName, setRegName] = React.useState<string>('');
    const [refId, setRefId] = React.useState<string>('');
    const [checkerType, setCheckType] = React.useState<string>('');
    const { setCallAPIing } = useContext(PageInfoContext)!;
    const handleAnswerChange = (questionId: number, answer: string) => {
        setSelectedAnswers((prev) => {
            const newAnswers = { ...prev };
            if (questions[currentQuestionIndex].type === 'S') {
                newAnswers[questionId] = [answer];
            } else {
                if (newAnswers[questionId]?.includes(answer)) {
                    newAnswers[questionId] = newAnswers[questionId].filter((a) => a !== answer);
                } else {
                    newAnswers[questionId] = [...(newAnswers[questionId] || []), answer];
                }
            }
            return newAnswers;
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        // Submit selectedAnswers
        console.log('Submitted answers:', selectedAnswers);
        const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
            question_id: questions[parseInt(questionId)].id,
            answer,
        }));
        try {
            setCallAPIing(true);
            const data = await apiFetch('checker/complete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({result: answers, record_id: checkId,current_answer_idx: currentQuestionIndex}),
            });
            if(!data.error){
                setMsg('恭喜你完成此次测试');
                setTimeout(() => {
                    navigate(`/check/history/${aid}/${registrationCodeTxt}`);
                }, 1000); 
              }else{
                setMsg(data.error);
              }
          } catch (error) {
            console.error('Error fetching activity data:', error);
          }finally{
            setCallAPIing(false);
          }

    };

    
    const handleSave = async () => {
        // Submit selectedAnswers
        console.log('Submitted answers:', selectedAnswers);
        const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
            question_id: questions[parseInt(questionId)].id,
            answer,
        }));
        try {
            setCallAPIing(true);
            const data = await apiFetch('checker/save', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({result: answers, record_id: checkId,current_answer_idx: currentQuestionIndex}),
            });
            if(!data.error){
                setMsg('保存成功');
                
              }else{
                setMsg(data.error);
              }
          } catch (error) {
            console.error('Error fetching activity data:', error);
          }finally{
            setCallAPIing(false);
          }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegisterInput = async () => {
        if (!registrationCodeTxt) {
            return;
        }
        setRegistrationCode(registrationCodeTxt);
        if (registrationCodeTxt) {
            try {
                setCallAPIing(true);
              const data = await apiFetch('checker/list', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({sid: sid, aid: aid, registration_code: registrationCodeTxt}),
              });
              if(!data.error){
                setQuestions(data.questions);
                setCheckId(data.check_id);
                setStartTime(data.start_time?new Date(data.start_time):undefined);
                setRegName(data.reg_name);
                setCheckType(data.checker_type);
                setRefId(data.ref_id);
                let it: { [key: string]: string[] } = {};
                data.questions.forEach((question:Question, idx:number) => {
                    it[question.idx] = question.result;
                }); 
                setSelectedAnswers(it);
                setCurrentQuestionIndex(data.current_answer_idx);
                setOpen(false); 
              }else{
                setMsg(data.error);
              }
              
            } catch (error) {
              console.error('Error fetching activity data:', error);
            } finally{
              setCallAPIing(false);
            }
          };
       
    };
    const handleCheckHistory = () => {
        if (!registrationCodeTxt) {
            return;
        }
        setRegistrationCode(registrationCodeTxt);
        navigate(`/check/history/${aid}/${registrationCodeTxt}`);
    };
    useEffect(() => {
        if (!registrationCode) {
            setOpen(true);
        }
    }, [sid]);

    useEffect(() => {
        if (!checkerType) {
            const fetchActivityData = async () => {
                try {
                    const data = await apiFetch('activity/content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'id': aid}),
                    });
                    if(data.length > 0){
                        setPageInfo(data[0].name); 
                    } 
                } catch (error) {
                    console.error('Error fetching activity data:', error); 
                }
            }
            const fetchSubjectData = async () => {
                try {
                    const data = await apiFetch('subject/content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'id': sid}),
                    });
                    if(data.length > 0){
                        setPageInfo(data[0].title); 
                    } 
                } catch (error) {
                    console.error('Error fetching activity data:', error); 
                }
            }
            if(checkerType === 'ACTIVITY'){
                fetchActivityData();
            }else{
                fetchSubjectData();
            } 
        }
    }, [checkerType]);

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
        <Dialog open={open} >
                <DialogTitle>请填写注册成功代码</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="注册成功代码"
                        type="text"
                        fullWidth
                        value={registrationCodeTxt}
                        onChange={(e) => setRegistrationCodeTxt(e.target.value)}
                    />
                    {msg && <Alert severity="warning">{msg}</Alert>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCheckHistory}>回顾历史</Button><Button onClick={handleRegisterInput}>开始答题</Button>
                </DialogActions>
            </Dialog>
            {currentQuestion && <Container>
                <Box> <Alert severity="info">姓名：{regName} 开始时间: {startTime &&startTime.toLocaleString()}</Alert></Box>
                <FormControl component="fieldset">
                    <Typography variant="h6" component="div">
                        题目 #{currentQuestion.idx+1} / {questions.length}
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                        style={{ marginBottom: '15px', marginTop: '15px', minHeight: '300px', maxHeight: '500px', overflow: 'auto' }}
                    />
                    {currentQuestion.type === 'S' ? (
                        <><strong>单选：</strong>
                        <RadioGroup
                            row
                            value={selectedAnswers[currentQuestion.idx]?.[0] || ''}
                            onChange={(e) => handleAnswerChange(currentQuestion.idx, e.target.value)}
                        >
                            {currentQuestion.options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    sx={{ marginRight: '15px' }}
                                />
                            ))}
                        </RadioGroup></>
                    ) : (
                        <><strong>多选：</strong>
                        <Box sx={{ display: 'flex', gap: '15px' }}>
                           
                            {currentQuestion.options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={selectedAnswers[currentQuestion.idx]?.includes(option.value) || false}
                                            onChange={() => handleAnswerChange(currentQuestion.idx, option.value)}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </Box></>
                    )}
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        textAlign: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <ButtonGroup aria-label="Vertical button group" sx={{ gap: '10px' }}>
                        <Button variant="contained" color="primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            上一题
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                            下一题
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleSave}>
                            保存
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            提交
                        </Button>
                    </ButtonGroup>
                   
                </Box>
                
                {msg && <Alert severity="warning">{msg}</Alert>}
            </Container>}
            
        </>
    );
};

export default SubjectCheck;