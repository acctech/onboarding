import React, { useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { CoverPage } from "./CoverPage";

export default function MainScreen(props) {
  const { debug, APPLE_DEVICE_URL, isAppleDevice, onSite, isWinSupportedSite } =
    props;

  console.table(props);

  const chooseUserType = {
    title: "WELCOME TO",
    subtitle: "Christian Education Ministries",
    description:
      "You appear to be " +
      (onSite ? "onsite" : "offsite") +
      " using a " +
      window.ui.os +
      " device" +
      (isWinSupportedSite ? " at a Windows supported site" : "") +
      "." +
      (isAppleDevice || (onSite && isWinSupportedSite)
        ? " Redirecting..."
        : isWinSupportedSite
        ? " Your device is not supported for Offsite Setup. \nPlease wait until you are on campus to complete the setup process."
        : " Your device is not supported."),
    buttons: isAppleDevice
      ? []
      : [
          // {
          //   label:
          //     "Your device is not supported for Offsite Setup. \nPlease wait until you are on campus to complete the setup process.",
          //   color: "#A88D5D",
          //   textColor: "white",
          //   icon: <EastIcon fontSize="small" sx={{ ml: 1 }}></EastIcon>,
          //   action: () => {},
          // },
        ],
  };

  useEffect(() => {
    if (isAppleDevice) {
      console.log("Apple Device Recognised, redirecting...");
      // Redirect with 3 second timeout
      if (!debug) {
        window.location = APPLE_DEVICE_URL;
      }
    }
  }, [onSite, isAppleDevice, debug, APPLE_DEVICE_URL]);

  return (
    <CoverPage
      title={chooseUserType.title}
      subtitle={chooseUserType.subtitle}
      description={chooseUserType.description}
      buttons={chooseUserType.buttons}
      debug={debug}
    />
  );
}
