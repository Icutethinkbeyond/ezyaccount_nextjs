"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "กรุณากรอกชื่อ",
      username: formData.username ? "" : "กรุณากรอกชื่อผู้ใช้งาน",
      address: formData.address ? "" : "กรุณากรอกที่อยู่",
      phone: !formData.phone
        ? "กรุณากรอกเบอร์โทร"
        : !validatePhone(formData.phone)
        ? "เบอร์โทรต้องมี 10 หลัก"
        : "",
      email: !formData.email
        ? "กรุณากรอกอีเมล"
        : !validateEmail(formData.email)
        ? "รูปแบบอีเมลไม่ถูกต้อง"
        : "",
      password: formData.password ? "" : "กรุณากรอกรหัสผ่าน",
      confirmPassword:
        !formData.confirmPassword
          ? "กรุณากรอกยืนยันรหัสผ่าน"
          : formData.password !== formData.confirmPassword
          ? "รหัสผ่านไม่ตรงกัน"
          : "",
      termsAccepted: formData.termsAccepted
        ? ""
        : "กรุณายอมรับเงื่อนไขการใช้บริการ",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("สมัครสมาชิกสำเร็จ!");
        
        // เก็บอีเมลไว้ใน localStorage
        localStorage.setItem("userEmail", formData.email);

        setFormData({
          name: "",
          username: "",
          address: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });

        setTimeout(() => {
          router.push("/"); 
        }, 1000);
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.message}`);
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsSubmitting(false);
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
            โปรแกรมบัญชีใช้งานง่าย ที่เป็นเสมือนเพื่อนคู่คิดธุรกิจคุณ
          </Typography>
        </Box>

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
            สมัครใช้งานระบบจัดการบัญชี
          </Typography>

          {successMessage && (
            <Typography
              variant="h6"
              color="success"
              textAlign="center"
              mb={3}
            >
              {successMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="ชื่อ*"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ชื่อผู้ใช้งาน*"
                  name="username"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="ที่อยู่*"
                  name="address"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="เบอร์โทร*"
                  name="phone"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="อีเมล*"
                  name="email"
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="รหัสผ่าน*"
                  name="password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ยืนยันรหัสผ่าน*"
                  name="confirmPassword"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  name="termsAccepted"
                />
              }
              label="ฉันยอมรับเงื่อนไขการใช้บริการ*"
            />
            {errors.termsAccepted && (
              <Typography color="error">{errors.termsAccepted}</Typography>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" mt={3}>
                <CircularProgress />
              </Box>
            ) : (
              <Button type="submit" variant="contained" fullWidth size="large">
                สมัครสมาชิก
              </Button>
            )}
          </form>

          <Typography variant="body1" textAlign="center" sx={{ mt: 3 }}>
            <Link
              href="/sign-in"
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              กลับไปที่หน้าล็อกอิน
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthRegister;
