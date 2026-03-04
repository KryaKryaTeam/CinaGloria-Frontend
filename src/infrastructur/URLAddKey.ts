export default function URLAddValue(url: string, key: string, value: string): string { 
    const urlCore = new URL(url);
    urlCore.searchParams.append(key, value);
    return urlCore.toString();
}