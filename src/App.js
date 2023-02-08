import React from "react";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import MainScreen from "./MainScreen";

function App() {
  const [isOffSite, setIsOffSite] = React.useState(false);
  const [ipAddress, setIsAddress] = React.useState(null);

  React.useEffect(() => {
    fetch("https://api.ipify.org?format=json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAddress(data.ip);
        let offSite = !data.ip.startsWith("165.228");
        setIsOffSite(offSite);
      })
      .catch((error) => {
        console.error("Error:", error, "Safe failing back to onsite setup");
        setIsAddress("169.254.0.0");
        setIsOffSite(false);
      });
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <MainScreen
        isOffSite={isOffSite}
        ipAddress={ipAddress}
        onForceChange={() => {
          setIsOffSite(!isOffSite);
        }}
      />
    </CssVarsProvider>
  );
}

export default App;