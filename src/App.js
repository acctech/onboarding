import React from "react";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import MainScreen from "./MainScreen";

const APPLE_DEVICE_URL = "https://start.cem.com.au";
const OTHER_DEVICE_URL =
  "https://clearpass.cem.org.au/onboard/device_provisioning_2.php";

function App() {
  // Get Query Params if debug exists set debug to true
  const debug = window.location.search.includes("debug");
  if (debug) console.log("Debug Mode: ", debug);

  const isAppleDevice =
    window.ui.os.toLowerCase().includes("mac") ||
    window.ui.os.toLowerCase().includes("ios");

  React.useEffect(() => {
    if (isAppleDevice) {
      console.log("Apple Device Recognised, redirecting...");
      if (!debug) {
        window.location = APPLE_DEVICE_URL;
      }
    } else {
      fetch(OTHER_DEVICE_URL, {
        setTimeout: 1000,
      })
        .then((response) => {
          console.log(
            "Can reach other device url as " +
              window.ui.os +
              " device, redirecting to url."
          );

          if (response.ok) {
            window.location = OTHER_DEVICE_URL;
          }
        })
        .catch((error) => {
          console.log(
            "Cannot reach other device url as " + window.ui.os + " device."
          );
        });
    }
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <MainScreen
        debug={debug}
        APPLE_DEVICE_URL={APPLE_DEVICE_URL}
        isAppleDevice={isAppleDevice}
      />
    </CssVarsProvider>
  );
}

export default App;
