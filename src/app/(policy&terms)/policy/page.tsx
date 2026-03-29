export default function PolicyPage() {
  return (
    <>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          1. Introduction
        </h2>
        <p>
          Welcome to our application. To provide our services, we use Google and
          GitHub OAuth for authentication. This policy explains how we handle
          your data.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          2. Data Collection via OAuth
        </h2>
        <p>When you sign in using Google or GitHub, we may collect:</p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>Email address:</strong> For identification and
            notifications.
          </li>
          <li>
            <strong>Public Profile:</strong> Name and profile picture.
          </li>
          <li>
            <strong>Unique ID:</strong> To link your account securely.
          </li>
        </ul>
      </section>

      <section>
        <h2 style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "5px" }}>
          3. Data Deletion
        </h2>
        <p>
          You can revoke access anytime via Google/GitHub settings or contact
          our support for full data removal.
        </p>
      </section>
    </>
  );
}
