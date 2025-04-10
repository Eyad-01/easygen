import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { emailValidator, passwordValidator } from "./commonValidators";
import PasswordField from "./component/general/password_field";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  const signInSchema = yup.object().shape({
    email: emailValidator,
    password: passwordValidator,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");

    try {
      await signInSchema.validate({ email, password }, { abortEarly: false });
      setFieldErrors({});

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signin`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } },
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user || email);
      navigate("/");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const errors: Record<string, string> = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path && !errors[error.path]) {
            errors[error.path] = error.message;
          }
        });
        setFieldErrors(errors);
      } else {
        setGlobalError("Invalid email or password.");
        console.error("Error signing in:", err);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (
            <>
              <br /> <span style={{ color: "red" }}>{fieldErrors.email}</span>
            </>
          )}
        </div>

        <PasswordField
          password={password}
          setPassword={setPassword}
          fieldErrors={fieldErrors}
        />
        {globalError && (
          <>
            <br /> <span style={{ color: "red" }}>{globalError}</span>
          </>
        )}
        <button type="submit">Sign In</button>
        <p style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
