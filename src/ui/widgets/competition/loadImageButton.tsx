import { RelationSlotValues } from "@/core/requests/network/File/FileTypes";
import { LoadFileResponse } from "@/core/requests/network/File/LoadFile.request";
import useFile from "@/hooks/useFile.hook";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface FileLoadButtonProps {
  relationString: RelationSlotValues;
  onSuccess?: (response: LoadFileResponse) => void;
  onError?: (error: Error) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  autoClose?: boolean;
}

type State = "idle" | "loading" | "success" | "error";

export const FileLoadButton = ({
  relationString,
  onSuccess,
  onError,
  accept = "image/*",
  maxSize = 50 * 1024 * 1024,
  disabled = false,
  className = "",
  autoClose = true,
}: FileLoadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>("idle");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { load } = useFile();

  const handleClick = () => {
    if (!isCompleted) inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setError(`File too large (max ${(maxSize / 1024 / 1024).toFixed(0)}MB)`);
      setState("error");
      setTimeout(() => setState("idle"), 3000);
      return;
    }

    setFileName(file.name);
    setState("loading");
    setError("");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const progressInt = setInterval(
        () => setProgress((p) => Math.min(p + Math.random() * 30, 90)),
        300,
      );

      const response = await load(formData, relationString);

      clearInterval(progressInt);
      setProgress(100);
      onSuccess?.(response as LoadFileResponse);
      setState("success");
      setIsCompleted(true);

      if (autoClose) {
        setTimeout(() => {
          if (inputRef.current) inputRef.current.value = "";
        }, 500);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    } finally {
      if (inputRef.current && !autoClose) inputRef.current.value = "";
    }
  };

  const getIcon = () => {
    switch (state) {
      case "loading":
        return <Loader2 className="w-4 h-4 mr-2 animate-spin" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 mr-2 text-red-500" />;
      default:
        return <Upload className="w-4 h-4 mr-2" />;
    }
  };

  const getText = () => {
    switch (state) {
      case "loading":
        return `Uploading... ${Math.round(progress)}%`;
      case "success":
        return fileName;
      case "error":
        return "Error";
      default:
        return "Load File";
    }
  };

  const isDisabled = disabled || state === "loading" || isCompleted;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isDisabled}
      />

      <Button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        variant={
          state === "error"
            ? "destructive"
            : state === "success"
              ? "secondary"
              : "default"
        }
      >
        {getIcon()}
        {getText()}
      </Button>

      {state === "loading" && (
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileLoadButton;
