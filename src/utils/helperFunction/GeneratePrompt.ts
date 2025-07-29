type InterviewFormData = {
  companyName: string;
  companyDescription: string;
  jobName: string;
  jobDescription: string;
  interviewTypes: string[];
  numberOfQuestions: string; // e.g., "5", "10"
};

export function generateInterviewPrompt(data: InterviewFormData): string {
  const {
    companyName,
    companyDescription,
    jobName,
    jobDescription,
    interviewTypes,
    numberOfQuestions,
  } = data;

  const typeList = interviewTypes.join(", ");

  return `You are an expert technical interviewer.

Based on the following inputs, generate a structured, relevant, and high-quality list of interview questions.

📌 Job Context:
Company Name: ${companyName}  
Company Description: ${companyDescription}  
Job Title: ${jobName}  
Job Description: ${jobDescription}  
Number of Questions: ${numberOfQuestions}  
Interview Types: ${typeList}  

📝 Your task:
1. Analyze the job description to extract key responsibilities, required technical skills, and expected experience level.
2. Generate exactly ${numberOfQuestions} interview questions appropriate for the listed interview types (${typeList}).
3. Ensure the questions are well-balanced across types, and vary in difficulty and style (theory, practical, code, reasoning).
4. Match the tone and structure of a real-life ${typeList} interview session.
5. Avoid filler; each question should assess a meaningful aspect of the candidate's suitability.

🚦 Output Format:
Respond in **JSON** format with an array of question objects:
interviewQuestions = [
  {
    "question": "Your question here",
    "type": "Technical | Coding Challenge | Problem Solving | Experience | Leadership"
  },
  ...
]

🎯 Objective:
Your goal is to create a professional-grade interview plan for the '${jobName}' role, with exactly ${numberOfQuestions} questions targeting the most relevant skills and competencies.
`;
}
