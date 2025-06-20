import { Password } from "@mui/icons-material";

export const constantValue = {
  email: "Plase enter email",
  Password: "Please Enter Password",
  ConfirmPassword: "Please Enter Confirm Password",
  Login: "Logged In Successfull",
  Logout: "User Logout",
  Signin: "User Created",
  SigninFailed: "Not able to Create User Try agter some time",
  EmailVerfiy: "Your Email is Verfied",
  Otp: "Otp is send to your mail",
  OtpFailed: "Otp send Failed",
  required: "All input field is required",
};
type QuestionType = "text" | "paragraph" | "single-select" | "multi-select";

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  placeholder?: string;
  options?: string[];
}
export const questions: Question[] = [
  // Basic Information
  {
    id: 1,
    type: "text",
    question: "Full Name:",
    placeholder: "Enter your full name...",
  },
  {
    id: 2,
    type: "text",
    question: "Age:",
    placeholder: "Enter your age...",
  },
//   {
//     id: 3,
//     type: "single-select",
//     question: "Gender:",
//     options: ["Male", "Female", "Other", "Prefer not to say"],
//   },
//   {
//     id: 4,
//     type: "text",
//     question: "Country and State/City:",
//     placeholder: "Enter your country and state/city...",
//   },

//   // Education and Work Status
//   {
//     id: 5,
//     type: "single-select",
//     question: "What is your current status?",
//     options: [
//       "School student (10th/12th)",
//       "College student",
//       "Graduate",
//       "Working professional",
//       "Career switcher",
//     ],
//   },
//   {
//     id: 6,
//     type: "text",
//     question: "What is your highest qualification?",
//     placeholder: "e.g., Bachelor's degree in Commerce",
//   },
//   {
//     id: 7,
//     type: "text",
//     question:
//       "What is your current stream (e.g., Science-Bio, Commerce, Arts)?",
//     placeholder: "Enter your stream...",
//   },
//   {
//     id: 8,
//     type: "text",
//     question: "Are you currently enrolled in any course? If yes, which one?",
//     placeholder: "Enter course name or write 'No'",
//   },

//   // Academic Interests & Strengths
//   {
//     id: 9,
//     type: "text",
//     question: "What are your favorite subjects?",
//     placeholder: "e.g., Maths, History, Computer Science",
//   },
//   {
//     id: 10,
//     type: "text",
//     question: "What are your strongest subjects or academic areas?",
//     placeholder: "List your strongest subjects...",
//   },

//   // Career Preferences & Goals
//   {
//     id: 11,
//     type: "single-select",
//     question: "What is your primary goal?",
//     options: [
//       "Government job",
//       "Private job",
//       "Freelancing",
//       "Entrepreneurship",
//       "Studying abroad",
//       "Research/Academia",
//     ],
//   },
//   {
//     id: 12,
//     type: "single-select",
//     question: "Preferred job type:",
//     options: ["Desk job", "Field job", "Creative/flexible", "Remote work"],
//   },
//   {
//     id: 13,
//     type: "text",
//     question: "Expected salary range in 5 years (optional)?",
//     placeholder: "e.g., ₹10 LPA",
//   },
//   {
//     id: 14,
//     type: "single-select",
//     question: "Are you willing to relocate?",
//     options: ["Yes", "No", "Maybe"],
//   },
//   {
//     id: 15,
//     type: "single-select",
//     question: "What do you prefer the most?",
//     options: [
//       "Job security",
//       "High salary",
//       "Impactful/social work",
//       "Creative freedom",
//     ],
//   },

//   // Skills & Comfort Zones
//   {
//     id: 16,
//     type: "single-select",
//     question: "Are you comfortable with coding or technical tasks?",
//     options: ["Yes", "No", "Somewhat"],
//   },
//   {
//     id: 17,
//     type: "single-select",
//     question: "Do you enjoy public speaking or communication-heavy roles?",
//     options: ["Yes", "No", "Sometimes"],
//   },
//   {
//     id: 18,
//     type: "single-select",
//     question: "Are you good at writing, designing, or managing people?",
//     options: ["Yes", "No", "Somewhat"],
//   },
//   {
//     id: 19,
//     type: "single-select",
//     question: "Are you okay with taking competitive/entrance exams?",
//     options: ["Yes", "No", "Maybe"],
//   },

//   // Budget & Support
//   {
//     id: 20,
//     type: "single-select",
//     question: "What is your financial capacity for higher education?",
//     options: ["Low", "Moderate", "High"],
//   },
//   {
//     id: 21,
//     type: "single-select",
//     question:
//       "Are your parents/family supportive of career experimentation or risks?",
//     options: ["Yes", "No", "Somewhat"],
//   },

//   // Extracurricular Activities & Passions
//   {
//     id: 22,
//     type: "multi-select",
//     question:
//       "Do you participate in any of the following? (Select all that apply)",
//     options: [
//       "Sports",
//       "Music (singing/instrumental)",
//       "Dance",
//       "Painting/Drawing",
//       "Theatre/Drama",
//       "Writing/Poetry",
//       "Gaming (casual or competitive)",
//       "Photography/Filmmaking",
//       "Social media content creation",
//     ],
//   },
//   {
//     id: 23,
//     type: "single-select",
//     question: "How serious are you about these activities?",
//     options: ["Hobby", "Semi-professional", "Career aspiration"],
//   },
//   {
//     id: 24,
//     type: "single-select",
//     question:
//       "Have you ever won awards or recognition in any extracurricular activity?",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 25,
//     type: "single-select",
//     question: "Would you consider building a career in any of these areas?",
//     options: ["Yes", "No", "Maybe"],
//   },

//   // Personality & Work Style
//   {
//     id: 26,
//     type: "single-select",
//     question: "Do you prefer working alone or in a team?",
//     options: ["Alone", "Team", "Both"],
//   },
//   {
//     id: 27,
//     type: "single-select",
//     question: "Are you introverted, extroverted, or balanced?",
//     options: ["Introverted", "Extroverted", "Balanced"],
//   },
//   {
//     id: 28,
//     type: "paragraph",
//     question: "How do you handle pressure or fast-paced environments?",
//     placeholder: "Describe how you respond under pressure...",
//   },
//   {
//     id: 29,
//     type: "multi-select",
//     question: "What do you enjoy most? (Select all that apply)",
//     options: [
//       "Solving problems",
//       "Helping people",
//       "Organizing events",
//       "Innovating",
//     ],
//   },
];
