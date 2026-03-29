export default function TermsPage() {
  return (
    <>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Terms of Service
      </h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          1. Acceptance
        </h2>
        <p>
          By signing in via Google or GitHub OAuth, you agree to these Terms and
          all applicable laws.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          2. Liability
        </h2>
        <p>
          The service is provided <strong>&quot;AS IS&quot;</strong>. We are not
          liable for third-party OAuth provider outages or data issues.
        </p>
      </section>

      <section>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          3. Termination
        </h2>
        <p>
          We reserve the right to suspend access for breaches of these terms.
        </p>
      </section>
    </>
  );
}
