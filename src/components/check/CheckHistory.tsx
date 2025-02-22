import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, ButtonGroup, Button, FormControl, Checkbox, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { PageInfoContext } from '../../PageInfoContext';
import { useParams, useNavigate } from 'react-router-dom';
import apiFetch from '../../api';
import { Question } from './Question';

interface CheckHistoryItem {
    id: string;
    name: string;
    created_at: string;
    completed_at: string;
    status: string;
    duration: string;
    question_count: number;
    score: number;
}
const CheckHistory: React.FC = () => {
    const [msg, setMsg] = React.useState<string>('Loading');
    const [checkHistoryList, setCheckHistoryList] = React.useState<CheckHistoryItem[]>([]);
    const { regCde } = useParams<{ regCde: string }>();
    const { aId } = useParams<{ aId: string }>();

    const [callAPIing, setCallAPIing] = React.useState<boolean>(false);
    const [loadQuestionMsg, setLoadQuestionMsg] = React.useState<string | null>(null);
    const [currentSelectedRow, setCurrentSelectedRow] = React.useState<CheckHistoryItem | null>(null);

    const { setPageInfo } = React.useContext(PageInfoContext)!;
     const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    useEffect(  () => {
       const fetchHistor= async() => {
            try {
                setCallAPIing(true);
                const data = await apiFetch('checker/history', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({registration_code: regCde,aId: aId}),
                });
                if(!data.error){
                    setPageInfo(data.reg_name + '的历史记录');
                    setCheckHistoryList(data.history);
                    
                  }else{
                    setMsg(data.error);
                  }
              } catch (error) {
                console.error('Error fetching activity data:', error);
              }finally{
                setCallAPIing(false);
              }
        }
        fetchHistor();
    }, [regCde]);

    const selectedRow = async(row: CheckHistoryItem) => {
        try {
            setCurrentSelectedRow(row);
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setCallAPIing(true);
            setLoadQuestionMsg('Loading questions...');
            const data = await apiFetch('checker/history-item', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({registration_code: regCde, check_id: row.id}),
            });
            if(!data.error){
                setLoadQuestionMsg('');
                setQuestions(data.questions);

            }else{
                setLoadQuestionMsg(data.error);
            }
          } catch (error) {
            console.error('Error fetching activity data:', error);
          }finally{
            setCallAPIing(false);
          }
        
    }
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
    const currentQuestion = questions[currentQuestionIndex];
    return (
       
        <Box>
            {loadQuestionMsg && <><Alert severity="info">{loadQuestionMsg}</Alert></>}
            {checkHistoryList && checkHistoryList.length>0 ?(<><TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>名称</TableCell>
                            <TableCell>题目数量</TableCell>
                            <TableCell>开始时间</TableCell>
                            <TableCell>结束时间</TableCell>
                            <TableCell>是否完成</TableCell>
                            <TableCell>用时</TableCell>
                            <TableCell>正确率</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkHistoryList.map((row, index) => (
                            <TableRow key={index} onClick={() => selectedRow(row)} 
                            style={{ cursor: 'pointer', backgroundColor: currentSelectedRow === row ? 'lightblue' : 'inherit' }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.question_count}</TableCell>
                                <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                                <TableCell>{row.completed_at?new Date(row.completed_at).toLocaleString():''}</TableCell>
                                <TableCell>{row.status ==='C' ? '是' : '否'}</TableCell>
                                <TableCell>{row.duration?row.duration+'min':'-'}</TableCell>
                                <TableCell>{row.score ==-1?'-':row.score+'%'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} p={2} bgcolor="grey.100">
            {currentQuestion && <Container>
                <FormControl component="fieldset">
                    <Typography variant="h6" component="div">
                        题目 #{currentQuestion.idx+1} / {questions.length}
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                        style={{ marginBottom: '15px', marginTop: '15px', minHeight: '300px', maxHeight: '500px', overflow: 'auto' }}
                    />
                    <Box>您所选项：
                    {currentQuestion.type === 'S' ? (
                        <><strong></strong>
                        <RadioGroup
                            row
                            value={currentQuestion.result?.[0] || ''}
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
                                            checked={currentQuestion.result.includes(option.value) || false}
                                            onChange={() => {}}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </Box></>
                       
                    )} </Box>

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
                    </ButtonGroup>
                </Box>
                 
            </Container>}
            </Box></>):(<Typography>{msg}</Typography>)
        }
        
        </Box> 
    );
};

export default CheckHistory;