import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { forgotPassword, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      clearError();
    }
    setMessage("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("Введіть електронну пошту");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Невірний формат електронної пошти");
      return;
    }

    const result = await forgotPassword(email);
    
    if (result.success) {
      setIsEmailSent(true);
      setMessage(result.message);
    } else {
      setMessage(result.error);
    }
  };

  const handleReturnToLogin = () => {
    navigate("/login");
  };

  if (isEmailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">З поверненням!</h1>
            <h2 className="auth-subtitle">Введіть пароль</h2>
            <p className="auth-description">
              Використовуйте свій пароль для входу в існуючий обліковий запис.
            </p>
            <p className="auth-email">{email}</p>
          </div>

          <div className="success-message">
            <p>{message}</p>
            <p>Перевірте вашу електронну пошту та перейдіть за посиланням для скидання пароля.</p>
          </div>

          <div className="form-actions-center">
            <button
              type="button"
              className="auth-submit-btn"
              onClick={handleReturnToLogin}
            >
              Продовжити
            </button>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Не отримали лист?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setIsEmailSent(false);
                  setMessage("");
                }}
              >
                Спробуйте ще раз
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Почнемо з вашої електронної пошти</h1>
          <p className="auth-subtitle">
            Ми перевіримо, чи у вас уже є обліковий запис. Якщо ні, ми створимо новий.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-form-label">
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-form-input"
              placeholder="Введіть вашу електронну пошту"
              required
            />
          </div>

          {(error || message) && (
            <div className={`message ${error ? 'error-message' : 'info-message'}`}>
              {error || message}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || !email}
          >
            {loading ? "Надсилаємо..." : "Продовжити"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Пам'ятаєте пароль?{" "}
            <Link to="/login" className="auth-link">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 