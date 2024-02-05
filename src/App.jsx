import React, { useEffect } from "react";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import MainScreen from "./MainScreen";
import { publicIpv4 } from "public-ip";

const APPLE_DEVICE_URL = "https://cemschools.jamfcloud.com/enrol";
const OTHER_DEVICE_URL =
  "https://clearpass.cem.org.au/onboard/device_provisioning_2.php";
let supportSiteIPs = ["60.241.110.90"];

function App() {
  // Get Query Params if debug exists set debug to true
  const debug = window.location.search.includes("debug");

  const isAppleDevice =
    window.ui.os.toLowerCase().includes("mac") ||
    window.ui.os.toLowerCase().includes("ios");

  const [onSite, setOnSite] = React.useState(false);
  const [isWinSupportedSite, setIsWinSupportedSite] = React.useState(false);
  const [ipAddress, setIpAddress] = React.useState("");

  useEffect(() => {
    const prepareData = async () => {
      if (debug) console.log("Debug Mode: ", debug);

      let publicIPv4 = undefined;
      // public-ip
      try {
        publicIPv4 = await publicIpv4();
        setIpAddress(publicIPv4);
        if (debug) console.log("IP Obtained with public-ip: ", publicIPv4);
      } catch (error) {
        console.error(error);
      }

      // If publicIPv4 is undefined, use ipify
      if (publicIPv4 === undefined) {
        // ipify
        let rawResponse = await fetch("https://api.ipify.org?format=json");
        let ipifyResponse = await rawResponse.json();

        // console.table(response);
        setIpAddress(ipifyResponse.ip);
        publicIPv4 = ipifyResponse.ip;
        if (debug) console.log("IP Obtained with ipify: ", publicIPv4);
      }

      // Check if the site is supported
      let isSupported = false;
      for (let i = 0; i < supportSiteIPs.length; i++) {
        if (publicIPv4 === supportSiteIPs[i]) {
          isSupported = true;
        }
      }
      setIsWinSupportedSite(isSupported);

      try {
        // Check if the site can reach the other device url
        const otherDeviceUrlRawResponse = await fetch(OTHER_DEVICE_URL, {
          setTimeout: 500,
          mode: "no-cors",
        });

        console.table(otherDeviceUrlRawResponse);
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
      } catch (error) {
        console.log(
          "Cannot reach other device url as " + window.ui.os + " device."
        );
      }
    };

    prepareData().catch(console.error);
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
        ipAddress={ipAddress}
      />
    </CssVarsProvider>
  );
}

export default App;
