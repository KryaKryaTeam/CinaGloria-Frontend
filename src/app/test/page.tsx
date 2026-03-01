'use client'
import NetworkUserRepository from "@/core/network/NetworkUserRepository";
import { Button } from "@/ui/button";

export default function TestPage() {
    const service = new NetworkUserRepository()
    const aboba = async() => await service.postLoginData("example@localhost.com", "123Ac&44")
    const foo = async() => console.log(JSON.stringify(await service.getDataFromServiceWorker()));
    
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for development purposes.</p>
      <Button onClick={() => aboba()}>Login</Button>
      <Button onClick={() => foo()}>Get Token from Service Worker</Button>
    </div>
  );
}