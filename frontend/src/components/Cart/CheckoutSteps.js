import React, { Fragment } from "react"
import { Stepper, StepLabel, Step } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import "../../stylesheets/CheckoutSteps.css"

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <span className="checkoutSteps-label">Shipping Details</span>,
      icon: <LocalShippingIcon />
    },
    {
      label: <span className="checkoutSteps-label">Confirm Order</span>,
      icon: <LibraryAddCheckIcon />
    },
    {
      label: <span className="checkoutSteps-label">Payment</span>,
      icon: <AccountBalanceIcon />
    }
  ]

  const stepStyles = {
    boxSizing: "border-box",
    marginTop: "2rem"
  }

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
            <StepLabel
              style={{
                color: activeStep >= index ? "#0d6efd" : "rgba(0, 0, 0, 0.649)"
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps
