import Box from "@mui/joy/Typography";
import Button from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import useWindowSize from "./useWindowSizeHook";

function ButtonStack(props) {
  const { buttons } = props;

  return (
    <Box
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={{ xs: "column", md: "row" }}
    >
      {buttons.map((button, index) => {
        return (
          <Box
            mx={{ xs: 0, md: 2 }}
            my={{
              xs: 1,
              md: 0,
            }}
            key={index}
          >
            <Button
              variant="solid"
              color="primary"
              sx={{
                borderRadius: "2rem",
                padding: "0.9rem 1.8rem",
                color: button.textColor,
                backgroundColor: button.color,
                "&:hover": {
                  transform: "scale(1.10)",
                  transition: "transform 0.2s",
                  filter: "brightness(1.3)",
                  boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.5)",
                },
                "&:active": {
                  transform: "scale(1.05)",
                  filter: "brightness(1)",
                  boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 1)",
                },
              }}
              endDecorator={button.icon}
              onClick={button.action}
            >
              <Typography textColor="white" fontSize="0.9rem" fontWeight="bold">
                {button.label}
              </Typography>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

export function CoverPage(props) {
  const { title, subtitle, description, buttons, debug } = props;

  const windowSize = useWindowSize();

  return (
    <Box
      sx={{
        backgroundColor: "black",
      }}
    >
      <Box
        zIndex={10}
        position="absolute"
        height={windowSize.height ?? "100vh"}
        width={windowSize.width ?? "100vw"}
        display="flex"
        alignItems="center"
        justifyContent={windowSize.height > 780 ? "center" : "top"}
        flexDirection="column"
        py={windowSize.height > 780 ? 0 : 4}
      >
        <Box py={0}>
          <Typography
            variant="plain"
            fontWeight={100}
            fontSize={{ xs: "1rem", md: "1.5rem" }}
            textColor="white"
            fontFamily="Figtree"
            letterSpacing={2}
          >
            {title}
          </Typography>
        </Box>
        <Box
          px={4}
          pb={2}
          maxWidth="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="plain"
            fontSize={{ xs: "1.1rem", md: "3rem" }}
            fontWeight={700}
            textColor="white"
            textAlign="center"
            fontFamily="Figtree"
          >
            {subtitle}
          </Typography>
        </Box>
        <Box
          py={windowSize.height > 780 ? 2 : 0}
          maxWidth="lg"
          width="65%"
          textAlign="center"
        >
          <Typography
            variant="plain"
            textColor="lightgray"
            textAlign="center"
            fontSize={{ xs: "0.8rem", md: "0.9rem" }}
            fontWeight={500}
            fontFamily="Figtree"
          >
            {description}
          </Typography>
        </Box>

        <ButtonStack buttons={buttons}></ButtonStack>

        <Box
          py={windowSize.height > 780 ? 2 : 0}
          maxWidth="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            //Footer
            position: "absolute",
            bottom: 0,
          }}
        >
          <Box width={windowSize.height > 780 ? "20%" : "10%"}>
            <img
              src={process.env.PUBLIC_URL + "/cem-logo.png"}
              width="100%"
              alt="Christian Education Ministries"
            ></img>
          </Box>
        </Box>
      </Box>
      <Box
        id={"bg"}
        zIndex={0}
        sx={{
          backgroundImage: "url(" + process.env.PUBLIC_URL + "/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "brightness(0.15)",
          height: windowSize.height ?? "100vh",
          width: windowSize.width ?? "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
      {debug && (
        <Box
          position="absolute"
          zIndex={100}
          right={0}
          top={0}
          onClick={() => {}}
        >
          <Box p={1}>
            <Typography textColor="gray" fontSize="0.6rem">
              {windowSize.width} x {windowSize.height}
              {windowSize.height > 780 ? " - Desktop" : " - Mobile"}
              {window.ui.os}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
