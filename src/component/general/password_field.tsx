import React, { useState } from "react";

interface FieldErrors {
  password?: string;
}

interface PasswordFieldProps {
  fieldErrors?: FieldErrors;
  password: string;
  setPassword: (password: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  fieldErrors,
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label>Password:</label>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "2px",
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "-3px",
            top: "47%",
            transform: "translateY(-115%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {fieldErrors?.password && (
        <>
          <br />
          <span style={{ color: "red" }}>{fieldErrors.password}</span>
        </>
      )}
    </div>
  );
};

export default PasswordField;
