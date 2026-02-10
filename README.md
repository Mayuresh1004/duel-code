# Code Grind

Code Grind is a modern competitive programming platform built with Next.js, designed to provide a seamless coding experience similar to LeetCode. It features a robust code execution engine powered by Judge0, user authentication via Clerk, and a sleek UI.

## 🚀 Features

- **Code Execution**: Run and submit code in multiple languages (Python, JavaScript, Java, C++, Go) using the Judge0 API.
- **Problem Solving**: Solve algorithmic problems with test cases and driver code integration.
- **User Authentication**: Secure sign-up and login powered by Clerk.
- **Sleek UI**: Modern, responsive interface built with Shadcn UI and Tailwind CSS.
- **Dark/Light Mode**: Fully supported theming system.
- **Code Editor**: Powerful browser-based code editor using Monaco Editor.
- **Submission History**: Track your past submissions and results.
- **Playlists**: Create and manage custom problem playlists.
- **Dashboard**: User dashboard with statistics and progress tracking.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Code Execution**: [Judge0](https://judge0.com/)
- **State Management**: React Hooks & Server Actions

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm / pnpm / yarn
- PostgreSQL Database
- Clerk Account
- Judge0 API (Self-hosted or Cloud)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/code-grind.git
    cd code-grind
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/codegrind"

    # Authentication (Clerk)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Judge0 API
    # Use https://ce.judge0.com for the free public instance
    JUDGE0_API_URL="https://ce.judge0.com"
    NEXT_PUBLIC_JUDGE0_API_URL="https://ce.judge0.com"
    ```

4.  **Initialize the Database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Support

You can also run the project using Docker Compose:

```bash
docker-compose up -d
```

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and API clients (Judge0, etc.).
- `modules/`: Feature-specific logic (Auth, Problems).
- `prisma/`: Database schema and migrations.
- `public/`: Static assets.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.