import React, { useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { CoverPage } from "./CoverPage";

const APPLE_DEVICE_URL = "https://start.cem.com.au";
const OTHER_DEVICE_URL =
  "https://clearpass.cem.org.au/onboard/device_provisioning_2.php";

export default function MainScreen(props) {
  const { isOffSite, ipAddress, onForceChange, debug } = props;
  const isAppleDevice =
    window.ui.os.toLowerCase().includes("mac") ||
    window.ui.os.toLowerCase().includes("ios");

  const chooseUserType = {
    title: "WELCOME TO",
    subtitle: "Christian Education Ministries",
    description:
      "You appear to be " +
      (isOffSite ? "offsite" : "on campus") +
      " using a " +
      window.ui.os +
      " device. " +
      (isAppleDevice ? "Redirecting in 3 seconds..." : ""),
    buttons:
      isOffSite === true
        ? isAppleDevice
          ? []
          : [
              {
                label:
                  "Your device is not supported for Offsite Setup. \nPlease wait until you are on campus to complete the setup process.",
                color: "#A88D5D",
                textColor: "white",
                icon: <EastIcon fontSize="small" sx={{ ml: 1 }}></EastIcon>,
                action: () => {},
              },
            ]
        : [],
  };

  const [currentPage, setCurrentPage] = React.useState(chooseUserType);

  React.useEffect(() => {
    setCurrentPage(chooseUserType);
  }, [onForceChange, ipAddress, isOffSite]);

  useEffect(() => {
    if (isAppleDevice) {
      console.log("Apple Device Recognised, redirecting...");
      // Redirect with 3 second timeout
      setTimeout(() => {
        if (!debug) {
          window.location = APPLE_DEVICE_URL;
        }
      }, 3000);
    } else {
      console.log("Non-Apple Device Recognised, checking if on campus..");
      if (!isOffSite) {
        console.log("On Campus " + window.ui.os + " device, redirecting...");
        // Redirect with 3 second timeout
        setTimeout(() => {
          if (!debug) {
            window.location = OTHER_DEVICE_URL;
          }
        }, 3000);
      } else {
        fetch(OTHER_DEVICE_URL)
          .then((response) => {
            console.log(
              "Still can reach other device url as " +
                window.ui.os +
                " device, redirecting to url."
            );
            // Redirect with 3 second timeout
            setTimeout(() => {
              if (!debug) {
                window.location = OTHER_DEVICE_URL;
              }
            }, 3000);
          })
          .catch((error) => {
            // Show offsite other device message
            console.log("Offsite " + window.ui.os + " device, doing nothing.");
          });
      }
    }
  });

  return (
    <CoverPage
      title={currentPage.title}
      subtitle={currentPage.subtitle}
      description={currentPage.description}
      buttons={currentPage.buttons}
      isOffSite={isOffSite}
      ipAddress={ipAddress}
      onForceChange={onForceChange}
      debug={debug}
    />
  );
}
