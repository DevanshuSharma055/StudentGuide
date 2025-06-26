import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Container,
  Avatar,
  Card,
  CardContent,
  Fade,
  IconButton,
} from "@mui/material";
import { Send, CheckCircle, Person, Computer } from "@mui/icons-material";
import { questions } from "../../Utils/Constant";
import { getReport } from "../../Services/UserApiCall";
import { toast } from "react-toastify";
import CareerRecommendations from "./components/CareerRecommendations";
import { CircularLoader } from "../../Components/Loader";
import { Prompt } from "../../Utils/Prompt";

// Type definitions
type QuestionType = "text" | "paragraph" | "single-select" | "multi-select";

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  placeholder?: string;
  options?: string[];
}

interface Answers {
  [questionId: number]: string | string[];
}

const QuestionChat: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userReport, setUserReport] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentQuestionIndex, answers]);

  useEffect(() => {
    setShowQuestion(false);
    setTimeout(() => setShowQuestion(true), 300);
  }, [currentQuestionIndex]);

  const getUserReport = async (text: string) => {
    try {
      setLoading(true);
      const res = await getReport(text);
      if (res.status == 200) {
        toast.success(res.message);
        console.log(res.data?.data);
        setUserReport(res.data?.data);
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        toast.error(errorMessage);
      }
    } 
      setLoading(false);
      setIsCompleted(true);
    
  };

  const handleSubmitAnswer = (): void => {
    const currentQuestion = questions[currentQuestionIndex];
    let answerToStore: string | string[];

    if (currentQuestion.type === "multi-select") {
      answerToStore = selectedOptions;
    } else {
      answerToStore = currentAnswer;
    }

    if (
      !answerToStore ||
      (Array.isArray(answerToStore) && answerToStore.length === 0)
    ) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerToStore,
    }));

    setCurrentAnswer("");
    setSelectedOptions([]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log('answere', answers,'answere')
      const searchText = Prompt(answers);
      console.log(searchText);
//       const searchText = `The user is dev years old, has completed BTech with a focus on Computer scinecn.
// They are interested in COmputer, and also enjoy extracurricular activities like Sports, Gaming (casual or competitive).

// They prefer Remote work work, are somewhat comfortable with coding, and might be open to competitive exams.
// Their family can afford Moderate education costs.

// Their goal is to Entrepreneurship, and they prefer a career that is Impactful/social work.
// They are not open to relocation.
// Suggest suitable future career options with:

// Field name

// Short description

// Entrance exams (if any)

// Estimated cost

// Career growth potential

// Work nature (desk/field/remote/creative)

// Why it fits the user

// Give at least 7 to 10 suitable career options.`;
      getUserReport(searchText);
    }
  };

  const handleOptionSelect = (option: string, isMultiple: boolean): void => {
    if (isMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      setCurrentAnswer(option);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      (currentAnswer.trim() || selectedOptions.length > 0)
    ) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {answer.map((item: string, index: number) => (
            <Chip key={index} label={item} size="small" color="primary" />
          ))}
        </Box>
      );
    }
    return <Typography variant="body1">{answer}</Typography>;
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case "text":
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end", mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder={question.placeholder}
              value={currentAnswer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentAnswer(e.target.value)
              }
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <IconButton
              color="primary"
              onClick={handleSubmitAnswer}
              disabled={!currentAnswer.trim()}
            >
              <Send />
            </IconButton>
          </Box>
        );

      case "paragraph":
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder={question.placeholder}
              value={currentAnswer}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCurrentAnswer(e.target.value)
              }
              autoFocus
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="contained"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim()}
                startIcon={<Send />}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );

      case "single-select":
        return (
          <Box sx={{ mt: 2 }}>
            <RadioGroup
              value={currentAnswer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentAnswer(e.target.value)
              }
            >
              {question.options?.map((option: string) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer}
                startIcon={<Send />}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );

      case "multi-select":
        return (
          <Box sx={{ mt: 2 }}>
            {question.options?.map((option: string) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionSelect(option, true)}
                  />
                }
                label={option}
              />
            ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmitAnswer}
                disabled={selectedOptions.length === 0}
                startIcon={<Send />}
              >
                Submit ({selectedOptions.length} selected)
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  //   if (isCompleted) {
  //     return (
  //       <Container maxWidth="md" sx={{ py: 4 }}>
  //         <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
  //           <CheckCircle sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
  //           <Typography variant="h4" gutterBottom color="success.main">
  //             Survey Completed!
  //           </Typography>
  //           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
  //             Thank you for answering all the questions.
  //           </Typography>

  //           <Card sx={{ mt: 3, textAlign: "left" }}>
  //             <CardContent>
  //               <Typography variant="h6" gutterBottom>
  //                 Your Responses:
  //               </Typography>
  //               {Object.entries(answers).map(([questionId, answer]) => {
  //                 const question = questions.find(
  //                   (q) => q.id === parseInt(questionId)
  //                 );
  //                 const serachtext = `The user is ${
  //                   questionId == "1" ? answer : ""
  //                 } years old, has completed [latest qualification] with a focus on [stream or subjects]. They are interested in [subjects], and also enjoy extracurricular activities like [list of hobbies, e.g., drawing, music, sports].

  // They prefer [desk/field/creative] work, are [comfortable/uncomfortable] with coding, and [are/are not] open to competitive exams. Their family can afford [low/moderate/high] education costs.

  // Their goal is to [goal: get a job, become an entrepreneur, study abroad, etc.], and they prefer a career that is [secure/high-paying/creative/social-impact]. They are [open/not open] to relocation.`;
  //                 return (
  //                   <Box
  //                     key={questionId}
  //                     sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}
  //                   >
  //                     <Typography variant="subtitle2" color="text.secondary">
  //                       {question?.question}
  //                     </Typography>
  //                     {renderAnswer(answer)}
  //                   </Box>
  //                 );
  //               })}
  //             </CardContent>
  //           </Card>
  //         </Paper>
  //       </Container>
  //     );
  //   }

  if (isCompleted) {
    return !loading ? (
      <CareerRecommendations backendData={userReport} />
    ) : (
      <CircularLoader />
    );
  }

  return (
    <Container
      sx={{ py: 2, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Typography variant="h6">
            Interactive Survey ({currentQuestionIndex + 1}/{questions.length})
          </Typography>
        </Box>

        {/* Messages Area */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          {/* Previous Questions and Answers */}
          {Object.entries(answers).map(([questionId, answer]) => {
            const question = questions.find(
              (q) => q.id === parseInt(questionId)
            );
            return (
              <Box key={questionId} sx={{ mb: 3 }}>
                {/* Bot Question */}
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                    <Computer />
                  </Avatar>
                  <Paper sx={{ p: 2, bgcolor: "grey.100", maxWidth: "80%" }}>
                    <Typography variant="body1">
                      {question?.question}
                    </Typography>
                  </Paper>
                </Box>

                {/* User Answer */}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      color: "white",
                      maxWidth: "80%",
                      mr: 1,
                    }}
                  >
                    {renderAnswer(answer)}
                  </Paper>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <Person />
                  </Avatar>
                </Box>
              </Box>
            );
          })}

          {/* Current Question */}
          {!isCompleted && (
            <Fade in={showQuestion} timeout={500}>
              <Box>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                    <Computer />
                  </Avatar>
                  <Paper sx={{ p: 2, bgcolor: "grey.100", maxWidth: "80%" }}>
                    <Typography variant="body1">
                      {questions[currentQuestionIndex]?.question}
                    </Typography>
                    {renderQuestionInput(questions[currentQuestionIndex])}
                  </Paper>
                </Box>
              </Box>
            </Fade>
          )}

          <div ref={messagesEndRef} />
        </Box>
      </Paper>
    </Container>
  );
};

export default QuestionChat;
