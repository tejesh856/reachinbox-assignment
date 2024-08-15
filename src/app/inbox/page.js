"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Listofemail from "../components/Listofemail";
import Messages from "../components/Messages";
import Homepage from "../components/Homepage";
import Deletemodal from "../components/Deletemodal";

function Inboxpage() {
  const params = useSearchParams();
  const [isDark, setisDark] = useState(true);
  const [Emaillist, setEmaillist] = useState(null);
  const [Refreshlist, setRefreshlist] = useState(null);
  const [messagelist, setmessagelist] = useState(null);
  const [selectedemail, setselectedemail] = useState(false);
  const [showdeletemodal, setshowdeletemodal] = useState(false);

  //const [threadid, setthreadid] = useState(null);
  // const [token, setToken] = useState(null); // Start with null to indicate loading
  const [isAuthenticatestatus, setisAuthenticatestatus] = useState(null); // Start with null
  const router = useRouter();
  const [isLoadinglist, setIsLoadinglist] = useState(false);
  const [isLoadingmessage, setIsLoadingmessage] = useState(false);

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
      setIsLoadinglist(true);

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
      /*const latestEmailsMap = res.data.reduce((acc, email) => {
        const existingEmail = acc[email.fromEmail];

        if (
          !existingEmail ||
          new Date(email.sentAt) > new Date(existingEmail.sentAt)
        ) {
          acc[email.fromEmail] = email;
        }

        return acc;
      }, {});*/

      // Convert the map back to an array
      //const latestEmails = Object.values(latestEmailsMap);
      const latestEmailsMap = res.data.sort(
        (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
      );
      //console.log(latestEmailsMap);

      setEmaillist((prevState) => ({
        ...prevState,
        data: latestEmailsMap,
      }));

      setRefreshlist((prevState) => ({
        ...prevState,
        data: latestEmailsMap,
      }));

      setIsLoadinglist(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadinglist(false);
    }
  };
  const fetchMessages = async (threadid, email, name) => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadingmessage(true);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadid}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      // Group emails by fromEmail and keep the latest one based on sentAt

      // console.log(res);
      setmessagelist({ email: email, name: name, ...res });
      setIsLoadingmessage(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadingmessage(false);
    }
  };
  useEffect(() => {
    fetchEmails();
  }, []);

  useEffect(() => {
    if (isAuthenticatestatus === false) {
      router.push("/login");
    }
  }, [isAuthenticatestatus, router]);

  if (isAuthenticatestatus === null) {
    return <div>Loading...</div>; // Render a loading state initially
  }

  if (isAuthenticatestatus) {
    return (
      <div className="flex h-full">
        <Deletemodal
          setshowdeletemodal={setshowdeletemodal}
          showdeletemodal={showdeletemodal}
        />
        <Sidebar isDark={isDark} />

        {Emaillist ? (
          <div className="flex flex-col w-full">
            <Navbar isDark={isDark} setisDark={setisDark} />
            <div className="flex h-full w-full">
              <Listofemail
                isDark={isDark}
                Emaillist={Emaillist}
                fetchEmails={fetchEmails}
                fetchMessages={fetchMessages}
                setEmaillist={setEmaillist}
                setRefreshlist={setRefreshlist}
                isLoadinglist={isLoadinglist}
                setIsLoadinglist={setIsLoadinglist}
                setselectedemail={setselectedemail}
                selectedemail={selectedemail}
              />
              <Messages
                isDark={isDark}
                messagelist={messagelist}
                setshowdeletemodal={setshowdeletemodal}
              />
            </div>
          </div>
        ) : (
          <Homepage />
        )}
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
