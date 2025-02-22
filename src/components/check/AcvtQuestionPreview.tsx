import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiFetch from "../../api";
import { PageInfoContext } from "../../PageInfoContext";
import { Question } from "./Question";
import TextField from "@mui/material/TextField";


export const AcvtQuestionPreview: React.FC = () => {
    const { aId } = useParams<{ aId: string }>();

    const { setCallAPIing } = useContext(PageInfoContext)!;
    const [loadQuestionMsg, setLoadQuestionMsg] = React.useState<string | null>(null);

    const { setPageInfo } = React.useContext(PageInfoContext)!;
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState<number| null>();
    const [currentQuestion,setCurrentQuestion]  =useState<Question>();

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);
    useEffect(  () => {
        setPageInfo('题目浏览');
        const fetchList= async() => {
            try {
                setCallAPIing(true);
                const data = await apiFetch('checker/q-list-preview', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({type: 'ACTIVITY',a_id: aId}),
                });
                if(!data.error){
                    setCurrentQuestionIndex(0);
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
        fetchList();
    }, [aId]);

    const fetchQuestion= async() => {
        try {
            setCallAPIing(true);
            const data = await apiFetch('checker/q-preview', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ q_id: questions[currentQuestionIndex]}),
            });
            if(!data.error){
                setCurrentQuestion(data.question);
              }else{
                setLoadQuestionMsg(data.error);
              }
          } catch (error) {
            console.error('Error fetching activity data:', error);
          }finally{
            setCallAPIing(false);
          }
    }
    useEffect(()=>{
        if(questions && questions[currentQuestionIndex]){
            if (timer) clearTimeout(timer);
            setTimer(window.setTimeout(() => { 
                fetchQuestion();
            }, 800));
           
        }

    },[questions,currentQuestionIndex]);

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

    return (
        <Box >
            {loadQuestionMsg && <><Alert severity="info">{loadQuestionMsg}</Alert></>}
            
            <Box mt={2} p={2} bgcolor="grey.100">
            {currentQuestion && <Container key={currentQuestion.id}>
                <FormControl component="fieldset">
                    <Typography variant="h6" component="div" sx={{justifyContent: 'center',lineHeight:'2.6'}}>
                    <TextField
                                 size="small"
                                margin="dense"
                                label="题目#"
                                type="text"
                                sx={{maxWidth:'80px'}}
                                value={currentQuestionIndex+1}
                                onChange={(e) => {setCurrentQuestionIndex(parseInt((e.target.value+'').trim())-1); }} 

                            />  / {questions.length}
                    </Typography>
                    <div
                        dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                        style={{ marginBottom: '15px', marginTop: '15px', minHeight: '300px', maxHeight: '500px', overflow: 'auto' }}
                    />

                    <Box>参考选项：{/**currentQuestion.answer*/}
                    {currentQuestion.type === 'S' ? (
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
                        </RadioGroup>
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
                    <ButtonGroup aria-label="Vertical  group" sx={{ gap: '10px' }}>
                        <Button variant="contained" color="primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            上一题
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                            下一题
                        </Button> 
                         
                    </ButtonGroup>
                </Box>
                 
            </Container>}
            </Box>
        </Box>);
};