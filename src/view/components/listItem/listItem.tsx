
import { ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import React from "react"
import { useStyleApp } from "../../app/style-app"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LocalTaxiRoundedIcon from '@material-ui/icons/LocalTaxiRounded';

export const ListItemTaxi: React.FC<{
  car_mark:string
  car_model:string
  car_color:string
  distance: number
}> = ({car_color, car_mark, car_model, distance}) => {
  const classes = useStyleApp()
  return <>

    <ListItem button className={classes.listItem}>

      <ListItemIcon className={classes.taxiItemIconStart}>
        <LocalTaxiRoundedIcon />
      </ListItemIcon>

      <ListItemText primary={`${car_mark} ${car_model}`} secondary={car_color} />

      <Typography className={classes.listItemDist}>{`${distance} м`}</Typography>

      <ListItemIcon className={classes.taxiItemIconEnd}>
        <KeyboardArrowRightIcon />
      </ListItemIcon>

    </ListItem>

  </>
}