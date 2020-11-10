import { AppBar, Toolbar, Typography } from "@material-ui/core"
import React from "react"

export const Header:React.FC = () => {
  return <>
  <AppBar>
    <Toolbar>
      <Typography  variant="h6">Детали заказа</Typography>
    </Toolbar>
  </AppBar>
  <Toolbar />
  </>
}