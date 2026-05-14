import { FieldError as ferhf, FieldErrorsImpl, Merge } from "react-hook-form";
import { FieldError } from "../field";

export function ErrorBlank({
  error,
}: {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  error: ferhf | Merge<ferhf, FieldErrorsImpl<{}>> | undefined;
}) {
  if (error) return <FieldError>{error.message}</FieldError>;
}
