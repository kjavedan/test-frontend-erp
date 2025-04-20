import { Suspense } from "react";
import { EmailVerificationOTPForm } from "@/components/OtpForm";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationOTPForm />
    </Suspense>
  );
}
