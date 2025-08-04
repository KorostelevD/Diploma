import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
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
    setFormErrors({});
  }, [formData.email, formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.displayName.trim()) {
      errors.displayName = "Ім'я обов'язкове";
    }

    if (!formData.email) {
      errors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Невірний формат email";
    }

    if (!formData.password) {
      errors.password = "Пароль обов'язковий";
    } else if (formData.password.length < 6) {
      errors.password = "Пароль повинен містити мінімум 6 символів";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Підтвердження пароля обов'язкове";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Паролі не співпадають";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await register(formData.email, formData.password, formData.displayName);
    
    if (result.success) {
      navigate("/profile");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Створення облікового запису</h1>
          <p className="auth-subtitle">
            Заповніть форму для створення нового облікового запису
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="displayName" className="auth-form-label">
              Ім'я
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className={`auth-form-input ${formErrors.displayName ? 'error' : ''}`}
              placeholder="Введіть ваше ім'я"
              required
            />
            {formErrors.displayName && (
              <span className="field-error">{formErrors.displayName}</span>
            )}
          </div>

          <div className="auth-form-group">
            <label htmlFor="email" className="auth-form-label">
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`auth-form-input ${formErrors.email ? 'error' : ''}`}
              placeholder="Введіть вашу електронну пошту"
              required
            />
            {formErrors.email && (
              <span className="field-error">{formErrors.email}</span>
            )}
          </div>

          <div className="auth-form-group">
            <label htmlFor="password" className="auth-form-label">
              Пароль
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`auth-form-input ${formErrors.password ? 'error' : ''}`}
                placeholder="Створіть пароль"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.password && (
              <span className="field-error">{formErrors.password}</span>
            )}
          </div>

          <div className="auth-form-group">
            <label htmlFor="confirmPassword" className="auth-form-label">
              Підтвердження пароля
            </label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`auth-form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                placeholder="Підтвердіть пароль"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Приховати пароль" : "Показати пароль"}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <span className="field-error">{formErrors.confirmPassword}</span>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Реєструємо..." : "Зареєструватися"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Вже маєте обліковий запис?{" "}
            <Link to="/login" className="auth-link">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 