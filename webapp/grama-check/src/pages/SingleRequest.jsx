import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "mochi-ui";
import Spinner from "../components/Spinner";
import StatusIcon from "../components/StatusIcon";
import PopupModal from "../components/PopupModal";

import { useAuthContext } from "@asgardeo/auth-react";

export default function SingleRequest() {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [addressVerified, setAddressVerified] = useState("pending");
  const [policeCheck, setPoliceCheck] = useState("pending");
  const [submitted, setSubmitted] = useState("pending");
  const [approved, setApproved] = useState("pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isReady, setIsReady] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const { state, signOut, getAccessToken } = useAuthContext();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAccessToken()
      .then((token) => {
        setAccessToken(token);
        return axios.get(
          `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/grama/certificate/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => {
        console.log("res", res.data);
        setUserData(res.data);
        checkStatus(res.data.status.address_verified, setAddressVerified);
        checkStatus(res.data.status.submitted, setSubmitted);
        res.data.status.approved &&
          checkStatus(res.data.status.approved, setApproved);
        res.data.status.rejected && setApproved("rejected");
        res.data.status.completed &&
          checkStatus(res.data.status.completed, setIsReady);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userData?.policeCases.length > 0) {
      setPoliceCheck("rejected");
    } else {
      setPoliceCheck("done");
    }
  }, [userData?.policeCases]);

  const checkStatus = (data, setter) => {
    if (data != null) {
      setter("done");
    } else {
      setter("rejected");
    }
  };

  const handleApprove = async () => {
    await axios
      .put(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/grama/approved/${id}`,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAddressVerified("done");
        setPoliceCheck("done");
        setApproved("done");
      });
  };

  const handleReject = async () => {
    await axios
      .put(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/grama/rejected/${id}?rejectionReason=${rejectionReason}`,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setApproved("rejected");
      });
  };

  const handleReady = async () => {
    await axios
      .put(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/eyfq/gcgeneralservice/general-80d/v1.0/grama/ready/${id}`,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsReady("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <h1
            className="header font-semibold   
        sm:text-md 
        md:text-lg 
        xl:text-xl 
        text-2xl my-8 mx-24"
          ></h1>
          <div className="flex justify-evenly gap-12 my-auto w-full items-center">
            <div className="flex userContent flex-col gap-4 shadow-md p-8 rounded-xl text-center">
              <h1 className="text-xl m-0 p-0">{userData?.userName}</h1>
              <h2 className="text-l m-0 p-0">{userData?.nic}</h2>
              <h2 className="text-l m-0 p-0">{userData?.userEmail}</h2>
              <h3 className="text-sm m-0 p-0 max-w-[30ch]">
                {userData?.checkedAddress}
              </h3>
              <h3>
                Submitted on{" "}
                {userData?.status.submitted.day.toString() +
                  "-" +
                  userData?.status.submitted.month.toString().padStart(2, 0) +
                  "-" +
                  userData?.status.submitted.year.toString()}
              </h3>
            </div>
            <div className="content mb-6 flex flex-col gap-4 ">
              <StatusIcon
                text="Submitted"
                status={submitted}
                date={userData?.status.submitted}
              />
              <StatusIcon
                text="Address Verified"
                status={addressVerified}
                date={userData?.status.address_verified}
              />
              <StatusIcon
                text="Police Check"
                status={policeCheck}
                justNow={true}
              />
              <StatusIcon
                text="Approved"
                status={approved}
                date={userData?.status.approved}
              />
              <StatusIcon
                text="Ready"
                status={isReady}
                date={userData?.status.ready}
              />
            </div>
            {userData?.status.address_verified === null ||
            userData?.policeCases.length > 0 ? (
              <div className="flex flex-col gap-14  mx-12 max-w-[40ch]">
                {userData?.status?.address_verified === null && (
                  <div className="flex userContent flex-col gap-4 shadow-md p-8 rounded-xl text-center">
                    <p className=" text-lg underline  text-red-400">
                      Address Mismatch
                    </p>
                    <div>
                      <p>Inputted Address: {userData?.address}</p>
                      <p>Valid Address: {userData?.checkedAddress}</p>
                    </div>
                  </div>
                )}
                {userData?.policeCases.length > 0 && (
                  <div className="flex userContent flex-col gap-4 shadow-md p-8 rounded-xl text-center ">
                    <p className=" text-lg underline text-red-400">
                      Police Cases
                    </p>
                    {userData?.policeCases.map((caseInfo, index) => (
                      <div key={index} className="text-lg">
                        <p>Case : {caseInfo.issue}</p>
                        <p>
                          Date : {caseInfo.date.year}-{caseInfo.date.month}-
                          {caseInfo.date.day}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {approved != "done" && approved != "rejected" && (
            <div className="actions flex justify-center mt-4">
              <PopupModal trigger={<Button title="Approve" />}>
                <>
                  <p className="text-lg ">Do you want to confirm approval?</p>
                  <div className="actions flex justify-center mt-8">
                    <Button
                      title="Confirm"
                      onClick={async () => {
                        await handleApprove();
                      }}
                    />
                  </div>
                </>
              </PopupModal>
              <PopupModal trigger={<Button title="Reject" color="danger" />}>
                <>
                  <p className="text-lg mb-2">State Reason For Rejection</p>
                  <textarea
                    rows="4"
                    cols="50"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="border- border-4"
                  >
                    your application was rejected due to
                  </textarea>
                  <div className="actions flex justify-center mt-2">
                    <Button
                      title="Reject"
                      color="danger"
                      onClick={async () => await handleReject()}
                    />
                  </div>
                </>
              </PopupModal>
            </div>
          )}
        </>
      )}

      {approved === "done" && isReady === "pending" && (
        <div className="actions flex justify-center mt-4">
          <Button
            title="Ready"
            onClick={async () => {
              handleReady();
            }}
          />
        </div>
      )}
    </div>
  );
}
