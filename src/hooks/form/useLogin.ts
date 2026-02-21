import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLogin() {
    const { handleSubmit, register, formState: { errors }   } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    return { 
        handleSubmit,
        register,
        errors
    }
 }