import { Box, Card, Button, Typography, Divider } from "@mui/material";
import { Google } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import AuthForm from "@/components/forms/auth/AuthForm";

const LoginPage = () => {
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
          <Image
            src="/images/logos/logo-white-png.png"
            alt="logo"
            height={70}
            width={80}
            priority
          />
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

          <AuthForm />

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
    </Box>
  );
};

export default LoginPage;
