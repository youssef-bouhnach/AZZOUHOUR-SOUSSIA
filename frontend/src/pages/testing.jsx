import { useState } from "react";
import "../styles/testing.css";
const image = "../../public/favicon.svg";

export default function Testing() {
  const [isRegister, setIsRegister] = useState(false);
  const [animation, setAnimation] = useState("");

  const handleSwitch = () => {
    // remove old animation first

    // force re-render so animation restarts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimation(isRegister ? "flip-2-ver-right-2" : "flip-2-ver-right-1");

        setIsRegister(!isRegister);
      });
    });
  };

  return (
    <div className="container">
      <div className={`card ${animation}`}>
        {!isRegister ? (
          <div className="form">
            <h1>Login</h1>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Login</button>
          </div>
        ) : (
          <div className="form">
            <h1>Register</h1>

            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Create Account</button>
          </div>
        )}
      </div>

      <p className="switch" onClick={handleSwitch}>
        {!isRegister
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}
