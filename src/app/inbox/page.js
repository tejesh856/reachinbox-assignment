"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Inboxpage() {
  const params = useSearchParams();
  const [isDark, setisDark] = useState(true);

  const [token, setToken] = useState(null); // Start with null to indicate loading
  const [isAuthenticatestatus, setisAuthenticatestatus] = useState(null); // Start with null
  const router = useRouter();

  useEffect(() => {
    //const authToken = Cookies.get("authToken");
    //setisAuthenticatestatus(!!authToken);

    const tokenFromQuery = params.get("token");
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      Cookies.set("authToken", tokenFromQuery, { expires: 30 });
      setisAuthenticatestatus(true);
    }
  }, [params]);
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setisAuthenticatestatus(!!authToken); // Update state after checking the cookie
  }, []);

  useEffect(() => {
    if (isAuthenticatestatus === false) {
      router.push("/login");
    }
  }, [isAuthenticatestatus, router]);
  /*useEffect(() => {
    if (isAuthenticatestatus === false) {
      router.push("/login");
    }
  }, [isAuthenticatestatus, router]);

  */ if (isAuthenticatestatus === null) {
    return <div>Loading...</div>; // Render a loading state initially
  }

  if (isAuthenticatestatus) {
    return (
      <div className="flex h-full">
        <Sidebar isDark={isDark} />
        <Navbar isDark={isDark} setisDark={setisDark} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default function Inbox() {
  return (
    <Suspense>
      <Inboxpage />
    </Suspense>
  );
}
