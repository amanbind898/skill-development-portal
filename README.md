# 🚀 SkillUp - Skill Development Portal

A modern, full-stack learning and skill development platform designed for college students. SkillUp helps learners master technical concepts, track competitive programming & DSA progress across multiple platforms, prepare for technical interviews, and access curated resources with AI assistance.

---

## ✨ Features

- 📚 **Curated Learning Roadmaps & Resources**: Comprehensive study materials for Web Development, AI/ML, DSA, Competitive Programming, Blockchain, and Cybersecurity.
- 📊 **Unified Coding Analytics**: Real-time stats and profile tracking integrated with LeetCode, Codeforces, CodeChef, and GeeksforGeeks.
- 🤖 **AI Learning Assistant**: Built-in AI chatbot for guidance, concept explanations, and personalized study strategies.
- 👤 **Student & Profile Management**: Complete user profile management with social/coding links, achievements, and progress tracking powered by Clerk authentication.
- ⚡ **Modern Full-Stack Architecture**: Powered by Next.js App Router, TailwindCSS, Drizzle ORM, and PostgreSQL (Neon).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Serverless API Routes)
- **Frontend UI**: [React 19](https://react.dev/), [TailwindCSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database & ORM**: [PostgreSQL (Neon)](https://neon.tech/) & [Drizzle ORM](https://orm.drizzle.team/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)
- **Scraping & APIs**: [Cheerio](https://cheerio.js.org/) & [Axios](https://axios-http.com/)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/amanbind898/skill-development-portal.git
cd skill-development-portal
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables

Copy the example environment file and configure your keys:

```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
# Neon / PostgreSQL Database URL
DRIZZLE_DB_URL=postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URL Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Database Setup

Push the Drizzle schema to your database:

```bash
npm run db:push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the production server |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run db:push` | Pushes the database schema with Drizzle Kit |
| `npm run db:studio` | Opens Drizzle Studio for visual database management |

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) and adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
