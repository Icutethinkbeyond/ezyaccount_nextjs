'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Button, TextField, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = new URLSearchParams(window.location.search).get('token');
      setToken(token);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!token) {
      setErrorMessage('ไม่มี token');
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, token }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/auth/sign-in');
      } else {
        setErrorMessage(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      setErrorMessage('เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 2, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          รีเซ็ตรหัสผ่าน
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <TextField
              label="รหัสผ่านใหม่"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!errorMessage && newPassword !== confirmPassword}
              helperText={newPassword !== confirmPassword && errorMessage}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              label="ยืนยันรหัสผ่านใหม่"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errorMessage && newPassword !== confirmPassword}
              helperText={newPassword !== confirmPassword && errorMessage}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </div>
          {errorMessage && (
            <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 2 }}
          >
            รีเซ็ตรหัสผ่าน
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
