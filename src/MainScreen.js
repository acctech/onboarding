import React, { useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { CoverPage } from "./CoverPage";

export default function MainScreen(props) {
  const { debug, APPLE_DEVICE_URL, isAppleDevice } = props;

  const chooseUserType = {
    title: "WELCOME TO",
    subtitle: "Christian Education Ministries",
    description:
      "You appear to be offsite using a " +
      window.ui.os +
      " device. " +
      (isAppleDevice ? "Redirecting..." : ""),
    buttons: isAppleDevice
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
  });

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
