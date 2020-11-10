
import { CardContent, Box, Avatar, Typography, Card } from "@material-ui/core"
import React from "react"
import { useStyleApp } from "../../app/style-app"
import LocalTaxiRoundedIcon from '@material-ui/icons/LocalTaxiRounded';
import { TTaxi } from "../../../types/types";

export const CardTaxi: React.FC<{car: TTaxi}> = ({car}) => {
  const classes = useStyleApp()
  return <>
    <Card className={classes.card}>
      <CardContent>
        <Box className={classes.cardIcon}>
          <Avatar className={classes.iconWrap}>
            <LocalTaxiRoundedIcon className={classes.icon} />
          </Avatar>
        </Box>
        <Box className={classes.cardInfo}>
          <Typography variant='subtitle1' variantMapping={{ subtitle1: "p" }}>{`${car.car_mark} ${car.car_model}`}</Typography>
          <Typography variant='overline'>{car.car_color}</Typography>
          <br />
          <Box className={classes.carNumber}><Typography>{car.car_number}</Typography></Box>
        </Box>
      </CardContent>
    </Card>
  </>
}