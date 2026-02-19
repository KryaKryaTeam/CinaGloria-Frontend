import { useForm } from "react-hook-form";
import { SignUpData, signUpSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
interface UseSignupReturn { 

}
export default function useSignup() {
    const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { surname: '', email: '', password: '', repeatPassword: '' },
    mode: 'onChange',
  })
  return {
    
  }
 }  