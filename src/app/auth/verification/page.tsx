import VerificationCodeForm from "@/ui/widgets/auth/VerificationCodeForm";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback="Loading...">
      <VerificationCodeForm />
    </Suspense>
  );
}

export default Page;
