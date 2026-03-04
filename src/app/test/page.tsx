'use client'
import Email from "@/core/domain/value-object/Email";
import { Password } from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { Button } from "@/ui/button";

export default function TestPage() {
    const service = new JWTChangeRequest();
    const aboba = async() => await service.execute({
        email: new Email("example@localhost.com"),
        password: new Password("123Ac&44")
    });

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for development purposes.</p>
      <Button onClick={() => aboba()}>Login</Button>
      {/* <Button onClick={() => foo()}>Get Token from Service Worker</Button> */}
    </div>
  );
}