"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Listofemail from "../components/Listofemail";
import Messages from "../components/Messages";

function Inboxpage() {
  const params = useSearchParams();
  const [isDark, setisDark] = useState(true);
  const [Emaillist, setEmaillist] = useState(null);
  // const [token, setToken] = useState(null); // Start with null to indicate loading
  const [isAuthenticatestatus, setisAuthenticatestatus] = useState(null); // Start with null
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //const authToken = Cookies.get("authToken");
    //setisAuthenticatestatus(!!authToken);

    const tokenFromQuery = params.get("token");
    if (tokenFromQuery) {
      //setToken(tokenFromQuery);
      Cookies.set("authToken", tokenFromQuery);

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
  const fetchEmails = async () => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoading(true);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();

      // Group emails by fromEmail and keep the latest one based on sentAt
      const latestEmailsMap = res.data.reduce((acc, email) => {
        const existingEmail = acc[email.fromEmail];

        if (
          !existingEmail ||
          new Date(email.sentAt) > new Date(existingEmail.sentAt)
        ) {
          acc[email.fromEmail] = email;
        }

        return acc;
      }, {});

      // Convert the map back to an array
      const latestEmails = Object.values(latestEmailsMap);
      latestEmails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
      setEmaillist({ ...res, data: latestEmails });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

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

        <div className="flex flex-col w-full">
          <Navbar isDark={isDark} setisDark={setisDark} />
          <div className="flex h-full w-full">
            <Listofemail
              isDark={isDark}
              Emaillist={Emaillist}
              fetchEmails={fetchEmails}
              setEmaillist={setEmaillist}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Messages />
          </div>
        </div>
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
