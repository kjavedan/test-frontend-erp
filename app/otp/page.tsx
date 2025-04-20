import { Suspense } from "react";
import { OtpForm } from "@/components/OtpForm";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpForm />
    </Suspense>
  );
}
