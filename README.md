#  EchoHire

**EchoHire** is an online platform that uses Artificial Intelligence to conduct mock interviews, providing students with a realistic practice environment and instant feedback to improve their interview skills.

You can engage in realistic mock interviews with an AI interviewer that simulates real-world scenarios, asks relevant questions, and provides instant, constructive feedback.

The platform is designed to help you:

-  Hone your communication skills  
-  Boost your confidence  
-  Refine your answers in a pressure-free environment  


Train anytime, anywhere — and **master your interview performance**!
---
## Features

- **AI-Generated Interview Questions:** Automatically generate interview questions tailored to your needs.
- **Question Editing:** Edit and customize generated questions and their types.
- **Mock Interview Experience:** Simulate real interviews with voice input and assistant responses.
- **AI Feedback:** Receive structured feedback and suggestions for improvement after each session.
- **User Dashboard:** Navigate easily between dashboard, interview creation, and history.
- **Modern UI:** Built with React, Tailwind CSS, and Lucide icons for a clean, intuitive interface.
- **Supabase Integration:** Secure user authentication and data storage using Supabase.
- **Voice API Integration:** Practice interviews with real-time voice input and output (powered by VAPI).
- **Google API Integration:** Enhance question generation and feedback with Google AI services.
- **Responsive Design:** Fully responsive and mobile-friendly interface.
- **Session History:** Track and review past interview sessions and feedback.
- **Customizable Interview Types:** Support for multiple question types (e.g., technical, behavioral).

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Configuration](#configuration)
- [Contributing](#contributing)

---



## Project Structure

```
.
├── .env.local                # Environment variables
├── public/                   # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── (website)/create-interview/Generated-Questions/page.tsx   # Edit interview questions
│   │   ├── (interview)/start/[interviewId]/page.tsx                  # Interview session page
│   │   ├── api/generateFeedBack/route.ts                             # API for AI feedback
│   │   └── layout.tsx                                               # Root layout and theming
│   ├── components/
│   │   ├── sidebar-left.tsx                                         # Sidebar navigation
│   │   └── ...                                                      # Other UI components
│   └── store/
│       └── useQues.ts                                               # State management for questions
├── README.md
├── package.json
└── ...
```

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/echohire.git
   cd echohire
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in required values.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---



## Screenshots

> A clean and responsive UI 



- **Landing Page:**  
   <img width="1280" height="486" alt="image" src="https://github.com/user-attachments/assets/b3865ff5-7d58-4ff4-af06-85bdfdb3897d" />


- **Dashboard:**  
  <img width="1280" height="611" alt="image" src="https://github.com/user-attachments/assets/32f128a7-ad63-48c4-8d2b-edc4cb1e4e9f" />



- **Interview Session:**  
  <img width="1907" height="910" alt="Screenshot 2025-07-29 151436" src="https://github.com/user-attachments/assets/3d40ef7f-1e7b-4c47-8ea0-1d98778cd89b" />


- **Feedback:**  
  <img width="1918" height="919" alt="Screenshot 2025-07-29 151530" src="https://github.com/user-attachments/assets/11be7542-661f-429c-a6c3-f00211648b94" />


---

## Configuration

- **Environment Variables:**  
  Store API keys and configuration in `.env.local`.

  API's used
  >NEXT_PUBLIC_SUPABASE_URL

  >NEXT_PUBLIC_SUPABASE_ANON_KEY

  >NEXT_PUBLIC_BASE_

  >GOOGLE_API_KEY
  
  >NEXT_PUBLIC_VAPI


- **AI Feedback:**  
  The feedback API is implemented in [`src/app/api/generateFeedBack/route.ts`](src/app/api/generateFeedBack/route.ts).

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---


