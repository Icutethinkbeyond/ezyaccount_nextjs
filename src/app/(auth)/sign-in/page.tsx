"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // เพิ่ม state สำหรับการจัดการ Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">("error");

  // ฟังก์ชันตรวจสอบรูปแบบอีเมล
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // โหลดข้อมูลจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    
    if (storedEmail) {
      setEmail(storedEmail); 
    }

    if (storedPassword) {
      setPassword(storedPassword); 
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // รีเซ็ตข้อผิดพลาดเมื่อผู้ใช้เริ่มกรอกใหม่
    setErrors({ email: "", password: "" });

    // ตรวจสอบข้อมูลที่กรอก
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "กรุณากรอกอีเมล" }));
      return;
    }
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "รูปแบบอีเมลไม่ถูกต้อง" }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "กรุณากรอกรหัสผ่าน" }));
      return;
    }

    try {
      // เรียกใช้ API สำหรับการเข้าสู่ระบบ
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // รีเซ็ตฟอร์ม
        setEmail("");
        setPassword("");

        // เก็บข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        // เปลี่ยนเส้นทางหลังจากเข้าสู่ระบบสำเร็จ
        window.location.href = "/";
      } else {
        setSnackbarMessage(data.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setSnackbarMessage("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // ฟังก์ชันสำหรับ toggle การแสดง/ซ่อนรหัสผ่าน
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // รีเซ็ตข้อผิดพลาดเมื่อกรอกข้อมูลใหม่
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" })); // รีเซ็ตข้อผิดพลาดอีเมล
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" })); // รีเซ็ตข้อผิดพลาดรหัสผ่าน
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: 4,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            flexDirection: "column",
            padding: 6,
          }}
        >
          <Typography variant="h3" fontWeight="bold" mb={3}>
            EzyAccount
          </Typography>
          <Typography variant="h6" textAlign="center">
            โปรแกรมบัญชีใช้งานง่าย ที่เป็นเสมือนเพื่อคู่คิดธุรกิจคุณ
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            padding: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            เข้าสู่ระบบ
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="อีเมล*"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}  // ใช้ฟังก์ชันที่ปรับปรุงใหม่
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="รหัสผ่าน*"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}  // ใช้ฟังก์ชันที่ปรับปรุงใหม่
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mb: 3 }}
            >
              เข้าสู่ระบบ
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            size="large"
            sx={{ mb: 3 }}
          >
            Log in with Google
          </Button>

          <Typography variant="body1" textAlign="center">
            <Link
              href="/forget-password"
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              ลืมรหัสผ่าน?
            </Link>{" "}
            |{" "}
            <Link
              href="/sign-up"
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              สมัครสมาชิก
            </Link>
          </Typography>
        </Box>
      </Card>

      {/* Snackbar/Toast */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
