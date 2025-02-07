"use client";

// import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FileUpload from "@/components/forms/addArchive/file-upload"

const addarchive = () => {

  return (
    <main className="min-h-screen p-24">
     <FileUpload />
    </main>
  );
};

export default addarchive;