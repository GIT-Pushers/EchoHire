<img width="1890" height="872" alt="image" src="https://github.com/user-attachments/assets/85ee153a-bd36-44f0-b20e-e1f7f35db906" /># EchoHire

EchoHire is an AI-powered interview preparation platform built with [Next.js](https://nextjs.org). It enables users to generate, edit, and practice interview questions, receive AI-driven feedback, and track their progress—all in a modern, responsive web interface.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI-Generated Interview Questions:** Automatically generate interview questions tailored to your needs.

- **Mock Interview Experience:** Simulate real interviews with voice input and assistant responses.
- **AI Feedback:** Receive structured feedback and suggestions for improvement after each session.
- **User Dashboard:** Navigate easily between dashboard, interview creation, and history.
- **Modern UI:** Built with React, Tailwind CSS, and Lucide icons for a clean, intuitive interface.

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

## Usage

- **View Questions:**  
  Go to `/create-interview` to generate and view interview questions.  
  ![Edit Questions Screenshot](./snapshots/edit-questions.png) <!-- Placeholder -->

- **Start Interview:**  
  Begin a mock interview session and interact with the AI assistant.  
  ![Start Interview Screenshot](./snapshots/start-interview.png) <!-- Placeholder -->

- **Receive Feedback:**  
  After the session, receive AI-generated feedback and suggestions.  
  ![Feedback Screenshot](./snapshots/feedback.png) <!-- Placeholder -->

---

## Screenshots

> A clean and responsive UI 



- **Landing Page:**  
  ![Landing page Screenshot](./snapshots/dashboard.png)

- **Dashboard:**  
  ![Dashboard Screenshot](./snapshots/dashboard.png)

- **Edit Questions:**  
  ![Edit Questions Screenshot](./snapshots/edit-questions.png)

- **Interview Session:**  
  ![Interview Session Screenshot](./snapshots/interview-session.png)

- **Feedback:**  
  ![Feedback Screenshot](./snapshots/feedback.png)

---

## Configuration

- **Environment Variables:**  
  Store API keys and configuration in `.env.local`.

- **Customizing Questions:**  
  Edit logic in [`src/app/(website)/create-interview/Generated-Questions/page.tsx`](src/app/(website)/create-interview/Generated-Questions/page.tsx).

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

## License

This project is licensed under the MIT License.
