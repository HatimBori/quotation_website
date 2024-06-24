import React from "react";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Homeimage from "../Images/Untitled design.png";
import { Brightness1 } from "@mui/icons-material";
import Home1 from "../Images/Home1.jpg";
import Hoverbutton from "./Hoverbutton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Avatar from "@mui/material/Avatar";

const boxStyle = {
  height: "100vh",
  backgroundImage: `url(${Home1})`,
  backgroundSize: "cover",
  backgroundColor: "rgba(255, 255, 255, 2.9)",
  backgroundPosition: "center",
};

function Home() {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    backgroundColor: "#ffa000",
    color: isHovered ? "yellow" : "black",
    borderRadius: "20px",
    fontSize: "10px",
    padding: "7px 20px",
    marginRight: 0,
    width: "150px",
  };
  return (
    <div>
      <Box style={boxStyle}>
        <Navbar />
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
            color: "transparent",
            textAlign: "center",
            alignItems: "center",
            // backgroundColor: "white",
            // background: "linear-gradient(to right, gold, black)",
            marginTop: "100px",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "1",
            fontFamily: "lora",
            fontSize: "90px",

            // backgroundClip: "text", // Apply the gradient to the text
            // WebkitBackgroundClip: "text", // For Safari
            // WebkitTextFillColor: "transparent", // For Safari
          }}
        >
          SHREE MAHALAXMI
        </h1>
        {/* <h1
          style="text-shadow:0px 0px 5px #000000;"
          class="headline-responsive font-bold leading-tighter tracking-tighter mb-4 font-heading uppercase"
        >
          Contact Us
        </h1> */}
        {/* <h2>GRANITES AND TILES</h2> */}
        <div style={{ display: "flex" }}>
          <Box
            sx={{
              width: "50%",
              height: "100vh",
              //   backgroundColor: "#474747",
              color: "white",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="tracking-in-expand"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  marginTop: "150px",
                  fontSize: "80px",
                  fontFamily: "serif",
                  color: "#f8de22",
                  animation:
                    "tracking-in-expand-fwd-top 2s ease-in-out forwards",
                }}
              >
                Explore Exquisite{" "}
              </h2>
              <h2
                style={{
                  fontFamily: "serif",
                  fontSize: "80px",
                  color: "#f8de22",
                  animation:
                    "tracking-in-expand-fwd-top 2s ease-in-out forwards",
                }}
              >
                Marble & Granite
              </h2>
              <h3
                style={{
                  fontSize: "30px",
                  fontStyle: "italic",
                  fontFamily: "serif",
                  animation:
                    "tracking-in-expand-fwd-top 2s ease-in-out forwards",
                }}
              >
                Discover a Variety of Stunning Tiles
              </h3>
              <div style={{ display: "flex", height: "30px" }}>
                <Button
                  className="homeAnimation .btn2"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  style={buttonStyle}
                  component={Link}
                  to="/products"
                >
                  <span>See all products..</span>
                </Button>

                {/* <Button
                  className="homeAnimation "
                  to="/products"
                  component={Link}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "transparent",
                      marginLeft: 1,
                    }}
                  >
                    <ArrowCircleRightIcon
                      sx={{
                        color: "#ffa000",
                        height: "30px",
                        fontSize: "80px",
                      }}
                    />
                  </Avatar>
                </Button> */}

                {/* <Button
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  style={{
                    marginLeft: 0,
                    height: "30px",
                    width: "30px",
                    padding: 0,
                  }}
                  component={Link}
                  to="/products"
                >
                  {" "}
                  <ArrowCircleRightIcon
                    sx={{
                      fontSize: "30px",
                      height: "30px",
                      color: "#ffa000",
                      padding: 0,
                      width: "30px",
                      "&.MuiIcon-fontSizeLarge": {
                        fontSize: "30px",
                      },
                    }}
                  />
                </Button> */}
              </div>
            </div>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100vh",
              //   backgroundColor: "#474747",
              color: "white",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              flexDirection: "column",
            }}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          </Box>

          {/* <Box
            sx={{ width: "50%", height: "100vh", backgroundColor: "#474747" }}
          >
            <h2>HI</h2>
          </Box> */}
        </div>
      </Box>
    </div>
  );
}

export default Home;
