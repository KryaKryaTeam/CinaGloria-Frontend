export default function debugLog(message: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEBUG] ${message}`);
  }
}
