import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const STEPS = {
  EMAIL: 'email',
  LOGIN: 'login',
  REGISTER: 'register'
};

export const DynamicAuth = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    displayName: "",
    phone: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  
  const { 
    login, 
    register, 
    forgotPassword, 
    checkUser, 
    loading, 
    error, 
    clearError, 
    isAuthenticated 
  } = useAuth();
  
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
  }, [formData, email]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setFormErrors({ email: "Введіть електронну пошту" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormErrors({ email: "Невірний формат електронної пошти" });
      return;
    }

    setIsCheckingUser(true);
    
    try {
      const result = await checkUser(email);
      
      if (result.success) {
        if (result.exists) {
          setCurrentStep(STEPS.LOGIN);
        } else {
          setCurrentStep(STEPS.REGISTER);
          setFormData(prev => ({ ...prev, email: email }));
        }
      } else {
        setFormErrors({ email: result.error });
      }
    } catch (error) {
      setFormErrors({ email: "Помилка при перевірці користувача" });
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password) {
      setFormErrors({ password: "Введіть пароль" });
      return;
    }

    const result = await login(email, formData.password);
    
    if (result.success) {
      navigate("/profile");
    }
  };

  const validateRegistrationForm = () => {
    const errors = {};

    if (!formData.displayName.trim()) {
      errors.displayName = "Ім'я обов'язкове";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Телефон обов'язковий";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Невірний формат телефону";
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

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateRegistrationForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await register(email, formData.password, formData.displayName, formData.phone);
    
    if (result.success) {
      navigate("/profile");
    }
  };

  const handleForgotPassword = async () => {
    const result = await forgotPassword(email);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  const handleBackToEmail = () => {
    setCurrentStep(STEPS.EMAIL);
    setFormData({
      password: "",
      displayName: "",
      phone: "",
      confirmPassword: ""
    });
    setFormErrors({});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (currentStep === STEPS.EMAIL) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Почнемо з вашої електронної пошти</h1>
            <p className="auth-subtitle">
              Ми перевіримо, чи у вас уже є обліковий запис. Якщо ні, ми створимо новий.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="auth-form">
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
                className={`auth-form-input ${formErrors.email ? 'error' : ''}`}
                placeholder="Введіть вашу електронну пошту"
                required
              />
              {formErrors.email && (
                <span className="field-error">{formErrors.email}</span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isCheckingUser || !email}
            >
              {isCheckingUser ? "Перевіряємо..." : "Продовжити"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentStep === STEPS.LOGIN) {
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

          <form onSubmit={handleLoginSubmit} className="auth-form">
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
                  placeholder="Введіть ваш пароль"
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

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="forgot-password-link"
                onClick={handleForgotPassword}
              >
                Забули пароль?
              </button>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading || !formData.password}
            >
              {loading ? "Входимо..." : "Продовжити"}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Не ваш email?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={handleBackToEmail}
              >
                Змінити
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === STEPS.REGISTER) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Створення облікового запису</h1>
            <p className="auth-subtitle">
              Заповніть форму для створення нового облікового запису
            </p>
            <p className="auth-email">{email}</p>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="auth-form">
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
              <label htmlFor="phone" className="auth-form-label">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`auth-form-input ${formErrors.phone ? 'error' : ''}`}
                placeholder="+380 XX XXX XX XX"
                required
              />
              {formErrors.phone && (
                <span className="field-error">{formErrors.phone}</span>
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
              {loading ? "Реєструємо..." : "Створити обліковий запис"}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Не ваш email?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={handleBackToEmail}
              >
                Змінити
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}; 