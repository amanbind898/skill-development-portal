import { SignIn } from '@clerk/nextjs'
import { GraduationCap, Book, Target, Users } from 'lucide-react'

export default function Page() {
  return (
    <section className="min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Panel */}
        <section className="relative flex h-32 items-end bg-zinc-600 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-zinc-600/95" />
        

          <div className="relative hidden w-full lg:block lg:p-12">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-10 w-10 text-zinc" />
              <span className="text-2xl font-bold text-zinc">SkillUp</span>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-zinc sm:text-4xl md:text-5xl">
              Unlock Your Potential
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-zinc/90">
              Join thousands of learners on their journey to success through expert-led courses, 
              hands-on projects, and a supportive community.
            </p>

            {/* Feature Highlights */}
            <div className="mt-12 grid gap-6">
              <div className="flex items-center gap-3 text-zinc">
                <Book className="h-6 w-6" />
                <p>Access to 8 study path across multiple domains</p>
              </div>
              <div className="flex items-center gap-3 text-zinc">
                <Target className="h-6 w-6" />
                <p>Placement and Interview Preparation</p>
              </div>
              <div className="flex items-center gap-3 text-zinc">
                <Users className="h-6 w-6" />
                <p>Dashboard for seemless tracking of skills</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel - Sign In */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Mobile Logo & Header */}
            <div className="relative -mt-16 block lg:hidden">
              <div className="inline-flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-blue-600">SkillUp</span>
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome Back to SkillUp! 👋
              </h1>

              <p className="mt-4 text-gray-500">
                Sign in to continue your learning journey and access your personalized dashboard.
              </p>
            </div>

            {/* Sign In Component */}
            <div className="mt-8 lg:mt-0">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "rounded-xl shadow-md",
                    headerTitle: "text-2xl font-bold text-gray-900",
                    headerSubtitle: "text-gray-600",
                  }
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}