import ContactForm from "@/components/contact-form"
import WelcomeEmailTest from "@/components/welcome-email-test"

export default function EmailTestPage() {
  return (
    <div className="min-h-screen bg-[#0a0a20] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-cyan-400">Email Testing</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <ContactForm />
          <WelcomeEmailTest />
        </div>
      </div>
    </div>
  )
}
