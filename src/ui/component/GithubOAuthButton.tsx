import { Github } from "lucide-react";
import { Button } from "../button";

export default function GithubOAuthButton() { 
        return (
            <Button>
                <Github className="h-5 w-5 mr-2" />
                Continue with GitHub
            </Button>
         )
}