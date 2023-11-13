import React from "react";

// MUI COMPONENTS
import { Button, createTheme, ThemeProvider, Toolbar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// LINK CSS
import "./pricing.css";

// LOCAL COMPONENTS
import Footer from "../../components/footer/Footer";
import Nav from "../../components/Nav/Nav";

// MUI THEME
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      light: "#7780e8",
      main: "#5763e3",
      dark: "#3545dc",
      contrastText: "#fff",
    },
  },
});

const Pricing = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="pricing-main-bg">
          <Nav />
          <Toolbar />
          <div className="div">
            <div className="pricing-page-header heading-margin-top ">
              Choose the plan that
            </div>
            <div className="pricing-page-header">
              fits your needs
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "5rem",
                  lineHeight: "1rem",
                  color: "#5762E3",
                  opacity: ".8",
                }}
              >
                .
              </span>
            </div>
          </div>
          <div className="pricing-card-container">
            <div className="pricing-card">
              <div className="circle-logo-container">
                <div className="circle"></div>
              </div>
              <div className="plan-type-header">Personal</div>
              <div className="plan-type-desc faded-text">
                For organizing every corner of your personal life
              </div>
              <div className="plan-price">FREE</div>
              <div className="button-container">
                <Button
                  sx={{ fontWeight: "600", margin: "0 0 1rem 0" }}
                  variant="outlined"
                  size="large"
                >
                  {" "}
                  GET STARTED{" "}
                </Button>
              </div>
              <div className="features-heading">Key features</div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Tasks & lists
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">Reminders</div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">Calendar</div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Daily planner
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Sync across devices
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <div className="circle-logo-container">
                <div className="circle"></div>
                <div className="circle opacity-level-2"></div>
              </div>
              <div className="plan-type-header">Premium</div>
              <div className="plan-type-desc faded-text">
                For power users who want to manage work and life like a pro
              </div>
              <div className="price-text-container">
                <div className="plan-price">$3</div>
                <div className="price-sidetext-container">
                  <div className="price-sidetext">per month</div>
                  <div className="price-sidetext">billed annually</div>
                </div>
              </div>
              <div className="button-container">
                <Button
                  sx={{ fontWeight: "600", margin: "0 0 1rem 0" }}
                  variant="outlined"
                  size="large"
                >
                  {" "}
                  GET STARTED{" "}
                </Button>
              </div>
              <div className="features-heading">
                Everything in Personal, plus
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Recurring tasks
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Whatsapp reminders
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">Color tags</div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  +100 app integrations
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Location reminders
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <div className="circle-logo-container">
                <div className="circle"></div>
                <div className="circle opacity-level-2"></div>
                <div
                  className="circle opacity-level-3"
                  style={{ position: "absolute", marginTop: "-30px" }}
                ></div>
              </div>

              <div className="plan-type-header">Teams</div>
              <div className="plan-type-desc faded-text">
                Collaborate with your entire team on any project
              </div>
              <div className="price-text-container">
                <div className="plan-price">$5</div>
                <div className="price-sidetext-container">
                  <div className="price-sidetext">per user / month</div>
                  <div className="price-sidetext">billed annually</div>
                </div>
              </div>
              <div className="button-container">
                <Button
                  sx={{ fontWeight: "600", margin: "0 0 1rem 0" }}
                  variant="outlined"
                  size="large"
                >
                  {" "}
                  TRY IT FREE{" "}
                </Button>
              </div>
              <div className="features-heading">
                Everything in Premium, plus
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Collaborative workspace
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Unlimited project boards
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Unlimited team members
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  +100 workflow templates
                </div>
              </div>
              <div className="features-list-row">
                <DoneIcon sx={{ color: "#5965E3" }} />
                <div className="features-list-text faded-text">
                  Admin tools & permissions
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Pricing;
