import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, Button, FormControl, ButtonGroup, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Alert } from '@mui/material';
import { PageInfoContext } from '../../PageInfoContext';
import { useParams, useNavigate } from 'react-router-dom';
import apiFetch from '../../api';
import { Question } from './Question';



 

export const QuestionPreview: React.FC = () => {

    const navigate = useNavigate();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [currentQuestion,setCurrentQuestion] = useState<Question>();
    const [questionId, setQuestionId] = useState('');
    const [open, setOpen] = useState(true);
    const [msg, setMsg] = React.useState<string>('');
    const { setCallAPIing } = useContext(PageInfoContext)!;
    

    const handleRegisterInput = async () => {
        if (!questionId) {
            return;
        }
        if (questionId) {
            try {
              setCallAPIing(true);
              const data = await apiFetch('checker/q-preview', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ q_id: questionId}),
              });
              if(!data.error){
                setCurrentQuestion(data.question);
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
    
    useEffect(() => {
        setPageInfo('题目预览')
        if (!questionId) {
            setOpen(true);
        }
    }, []);

    return (
        <>
        <Dialog open={open} >
                <DialogTitle>请填写Question ID</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                        value={questionId}
                        onChange={(e) => {
                            if(e.target.value){
                                setQuestionId(e.target.value);
                            }
                        }}
                    />
                    {msg && <Alert severity="warning">{msg}</Alert>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleRegisterInput}>查看</Button>
                </DialogActions>
            </Dialog>
            {currentQuestion && <Container>
                <FormControl component="fieldset">
                    <Typography variant="h6" component="div">
                        题目 #{questionId}
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                        style={{ marginBottom: '15px', marginTop: '15px', minHeight: '300px', maxHeight: '500px', overflow: 'auto' }}
                    />
                    <Box>参考选项：
                        {currentQuestion.type === 'S' ? (
                            <>
                            <RadioGroup
                                row
                                value={currentQuestion.answer?.[0]|| ''}
                                onChange={ (e) => {} }
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
                            <>
                            <Box sx={{ display: 'flex', gap: '15px' }}>
                                
                                {currentQuestion.options.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        control={
                                            <Checkbox
                                                checked={currentQuestion.answer?.includes(option.value) || false}
                                                onChange={() => {}}
                                            />
                                        }
                                        label={option.label}
                                    />
                                ))}
                            </Box></>
                            
                        )} </Box>
                </FormControl>
                {msg && <Alert severity="warning">{msg}</Alert>}
            </Container>}
            
        </>
    );
};

export default QuestionPreview;