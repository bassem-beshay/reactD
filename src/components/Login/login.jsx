import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    alert(`Login attempted with email: ${email}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" 
         style={{ backgroundColor: '#fff0f5' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px', borderColor: '#ff69b4' }}>
        <h1 className="text-center mb-4" style={{ color: '#ff69b4' }}>تسجيل الدخول</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#ff69b4', fontWeight: 'bold' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#ffb6c1', borderWidth: '2px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#ff69b4', fontWeight: 'bold' }}>
              كلمة المرور
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderColor: '#ffb6c1', borderWidth: '2px' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn w-100"
            style={{ 
              backgroundColor: '#ff69b4', 
              color: 'white',
              border: 'none',
              padding: '0.8rem',
              fontSize: '1rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff1493'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff69b4'}
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;