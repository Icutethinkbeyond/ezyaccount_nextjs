"use client"

import { useState, useCallback } from "react"
import { Box, Typography, Paper, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useDropzone } from "react-dropzone"

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  border: "2px dashed rgba(0, 0, 0, 0.12)",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}))

const UploadIcon = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "8px",
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  "& svg": {
    color: "white",
    fontSize: "24px",
  },
}))

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <UploadBox
        {...getRootProps()}
        sx={{
          borderColor: isDragActive ? "primary.main" : "inherit",
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon>
          <CloudUploadIcon />
        </UploadIcon>
        <Typography variant="h6" gutterBottom>
          วางไฟล์เพื่ออัปโหลด
        </Typography>
        <Typography color="textSecondary">หรือ</Typography>
        <IconButton
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            width: 48,
            height: 48,
          }}
        >
          <Box component="span" sx={{ fontSize: 24 }}>
            +
          </Box>
        </IconButton>
        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Selected files:</Typography>
            {files.map((file, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {file.name}
              </Typography>
            ))}
          </Box>
        )}
      </UploadBox>
    </Box>
  )
}

