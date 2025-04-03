import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('تم تسجيل الحساب بنجاح!');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" 
         style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="text-center mb-4 text-primary">إنشاء حساب جديد</h1>
        <form onSubmit={handleSubmit} dir="rtl">
          {/* اسم المستخدم */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              اسم المستخدم
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* رقم التليفون */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              رقم التليفون
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* العنوان */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              العنوان
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* الرقم السري */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              الرقم السري
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <div className="form-text">يجب أن يكون الرقم السري 6 أحرف على الأقل</div>
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              className="btn btn-primary py-2"
            >
              تسجيل الحساب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;