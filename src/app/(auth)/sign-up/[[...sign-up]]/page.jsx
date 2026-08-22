import { SignUp } from '@clerk/nextjs'
import { Shield, UserCircle, Mail } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Panel */}
        <section className="relative flex h-16 items-center bg-blue-600 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-gray-900" />
         

          <div className="relative hidden w-full lg:block lg:p-12">
            {/* IIIT Bhagalpur Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/c/c6/Indian_Institute_of_Information_Technology%2C_Bhagalpur_logo.png"
                  alt="IIIT Bhagalpur Logo"
                  className="h-12 w-12"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">SkillUp</span>
                  <span className="text-sm text-white/90">IIIT Bhagalpur</span>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Join SkillUp @ IIIT Bhagalpur
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Enhance your academic journey with SkillUp - The official skill development platform 
              for IIIT Bhagalpur students.
            </p>

            {/* Registration Instructions */}
            <div className="mt-12 space-y-6">
              <div className="rounded-lg bg-zinc-950 p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Mail className="h-6 w-6" />
                  Registration Requirements
                </h3>
                <ul className="mt-4 space-y-3 text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="text-white">•</span>
                    Use your official IIIT Bhagalpur email (@iiitbh.ac.in)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">•</span>
                    Complete your student profile after registration
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel - Sign Up */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Mobile Logo & Header */}
            <div className="relative -mt-16 block lg:hidden">
              <div className="inline-flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/c/c6/Indian_Institute_of_Information_Technology%2C_Bhagalpur_logo.png"
                  alt="IIIT Bhagalpur Logo"
                  className="h-12 w-12"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-600">SkillUp</span>
                  <span className="text-sm text-gray-600">IIIT Bhagalpur</span>
                </div>
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Create Your Account 🎓
              </h1>

              <p className="mt-4 text-gray-500">
                Join the IIIT Bhagalpur learning community on SkillUp
              </p>
            </div>

            {/* Email Domain Alert */}
            <Alert className="mb-6 mt-8 border-blue-200 bg-blue-50 lg:mt-0">
              <Shield className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-800">Institute Email Required</AlertTitle>
              <AlertDescription className="text-blue-700">
                Please use your IIIT Bhagalpur email address (@iiitbh.ac.in) to sign up. 
                You'll be redirected to complete your academic profile after registration.
              </AlertDescription>
            </Alert>

            {/* Sign Up Component */}
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "rounded-xl shadow-md",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                }
              }}
              redirectUrl="/profile"
              allowedEmailDomains={["iiitbh.ac.in"]}
            />

            {/* Additional Info */}
            <p className="mt-6 text-center text-sm text-gray-500">
              By signing up, you agree to follow IIIT Bhagalpur's code of conduct and academic integrity policies.
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}