import InputField from "./InputField";

export default function AuthForm() {
  return (
    <div className="form">
      <div className="tabs">
        <button className="active">Sign in</button>
        <button>Create account</button>
      </div>

      <h2>Welcome back.</h2>
      <p>Sign in to your account</p>

      <InputField label="Email address" type="email" placeholder="you@garden.com" />
      <InputField label="Password" type="password" placeholder="Your password" />

      <button className="btn">Sign in →</button>
    </div>
  );
}