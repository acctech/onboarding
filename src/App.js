import React, { useEffect } from "react";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import MainScreen from "./MainScreen";

const APPLE_DEVICE_URL = "https://start.cem.com.au";
const OTHER_DEVICE_URL =
  "https://clearpass.cem.org.au/onboard/device_provisioning_2.php";
let supportSiteIPs = ["60.241.110.90"];

// supportSiteIPs.push("165.228.22.234");

function App() {
  // Get Query Params if debug exists set debug to true
  const debug = window.location.search.includes("debug");

  const isAppleDevice =
    window.ui.os.toLowerCase().includes("mac") ||
    window.ui.os.toLowerCase().includes("ios");

  const [onSite, setOnSite] = React.useState(false);
  const [isWinSupportedSite, setIsWinSupportedSite] = React.useState(false);

  React.useEffect(() => {
    if (debug) console.log("Debug Mode: ", debug);

    // ipify
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((response) => {
        // console.table(response);

        let isSupported = false;
        for (let i = 0; i < supportSiteIPs.length; i++) {
          if (response.ip === supportSiteIPs[i]) {
            isSupported = true;
          }
        }
        setIsWinSupportedSite(isSupported);

        fetch(OTHER_DEVICE_URL, {
          setTimeout: 500,
          mode: "no-cors",
        })
          .then((response) => {
            // console.table(response);

            setOnSite(true);

            console.log(
              "Can reach other device url as " +
                window.ui.os +
                " device, redirecting to url."
            );

            if (!debug && isSupported) {
              console.info("Redirecting to: " + OTHER_DEVICE_URL);
              window.location = OTHER_DEVICE_URL;
            } else {
              console.info(
                "Not redirecting as " +
                  (debug ? "debug mode is enabled" : "") +
                  (isSupported ? "site is not supported." : "")
              );
            }
          })
          .catch((error) => {
            console.log(
              "Cannot reach other device url as " + window.ui.os + " device."
            );
          });
      });
  }, []);

  useEffect(() => {
    if (isAppleDevice) {
      console.log("Apple Device Recognised, redirecting...");
      // Redirect with 3 second timeout
      if (!debug) {
        window.location = APPLE_DEVICE_URL;
      }
    }
  }, [onSite, isAppleDevice, debug]);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <MainScreen
        debug={debug}
        APPLE_DEVICE_URL={APPLE_DEVICE_URL}
        isAppleDevice={isAppleDevice}
        onSite={onSite}
        isWinSupportedSite={isWinSupportedSite}
      />
    </CssVarsProvider>
  );
}

export default App;
