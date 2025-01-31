import React, { useState, useEffect } from 'react';
import { Container, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, Button, FormControl, ButtonGroup, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { PageInfoContext } from '../../PageInfoContext';
import { useParams } from 'react-router-dom';

interface Option {
    value: string;
    label: string;
}

interface Question {
    id: string;
    context: string;
    options: Option[];
    type: 'single' | 'multiple';
}

const mockData = [
    {
      id: '001',
      title: 'React 入门课程',
      description: '学习 React 的基础知识和应用。',
      content: `<h1>活动一简介</h1>
                <p>这是一个关于如何组织和参与社区服务活动的详细指南。活动包括了从准备到执行的每一个步骤。</p>`
    },
    {
      id: '002',
      title: '高级 JavaScript',
      description: '深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。深入理解 JavaScript 的高级概念。',
      content: `<h1>活动二简介</h1>
      <p>本次活动旨在提高公众对环境保护重要性的认识。</p>
      <img src="https://picsum.photos/200/300" alt="活动二图片" width="1200px"/>`
    },
    {
      id: '003',
      title: '全栈开发',
      description: '掌握前端和后端开发技能。',
      content: `<h1>活动二简介</h1>
      <p>本次活动旨在提高公众对环境保护重要性的认识。</p>
      <img src="https://picsum.photos/200/300" alt="活动二图片" width="1200px"/>`
    },
  ];

export const SubjectCheck: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({});
    const { sid } = useParams<{ sid: string }>();
    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [registrationCode, setRegistrationCode] = useState('');
    const [registrationCodeTxt, setRegistrationCodeTxt] = useState('');
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const subj = mockData.find(subj => subj.id === sid);
        if (subj) {
            setPageInfo(subj.title);
        } else {
            setPageInfo('');
        }
    }, [sid, setPageInfo]);

    useEffect(() => {
        if (registrationCode) {
            const fetchedQuestions: Question[] = [
                {
                    id: '1',
                    context: '<p>What is the capital of France?</p><p>What is the capital of France?</p><p>What is the capital of France?</p>',
                    options: [
                        { value: 'paris', label: 'Paris' },
                        { value: 'london', label: 'London' },
                        { value: 'berlin', label: 'Berlin' },
                        { value: 'madrid', label: 'Madrid' },
                    ],
                    type: 'single',
                },
                {
                    id: '2',
                    context: '<p>Select the prime numbers:</p>',
                    options: [
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                    ],
                    type: 'multiple',
                },
            ];
            setQuestions(fetchedQuestions);
        }
    }, [registrationCode]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers((prev) => {
            const newAnswers = { ...prev };
            if (questions[currentQuestionIndex].type === 'single') {
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

    const handleSubmit = () => {
        // Submit selectedAnswers
        console.log('Submitted answers:', selectedAnswers);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegisterInput = () => {
        setRegistrationCode(registrationCodeTxt);
        setOpen(false);
    };

    useEffect(() => {
        if (!registrationCode) {
            setOpen(true);
        }
    }, [sid]);



    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
        <Dialog open={open} onClose={handleClose}>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegisterInput}>确认</Button>
                </DialogActions>
            </Dialog>
           {currentQuestion && <Container>
                <FormControl component="fieldset">
                    <Typography variant="h6" component="div">
                        题目 {currentQuestion.id}
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{ __html: currentQuestion.context }}
                        style={{ marginBottom: '15px', marginTop: '15px', minHeight: '300px', maxHeight: '500px', overflow: 'auto' }}
                    />
                    {currentQuestion.type === 'single' ? (
                        <RadioGroup
                            row
                            value={selectedAnswers[currentQuestion.id]?.[0] || ''}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
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
                        </RadioGroup>
                    ) : (
                        <Box sx={{ display: 'flex', gap: '15px' }}>
                            {currentQuestion.options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={selectedAnswers[currentQuestion.id]?.includes(option.value) || false}
                                            onChange={() => handleAnswerChange(currentQuestion.id, option.value)}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </Box>
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
                    <ButtonGroup aria-label="Vertical button group">
                        <Button variant="contained" color="primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            上一题
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                            下一题
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            提交
                        </Button>
                    </ButtonGroup>
                </Box>
            </Container>}
            
        </>
    );
};

export default SubjectCheck;