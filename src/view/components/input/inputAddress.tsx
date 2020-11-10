import { Box, Grid, Typography, TextField } from "@material-ui/core"
import React, { Dispatch, SetStateAction } from "react"
import { useStyleApp } from "../../app/style-app"

export const InputAddress: React.FC<{
  inputAdress: string, 
  setInputAdress: Dispatch<SetStateAction<string>>
  error: boolean
}> = ({inputAdress, setInputAdress, error}) => {
  const classes = useStyleApp()

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setInputAdress(prev => {
      prev = event.target.value
      return prev
    })
  }

  const input = React.useRef<HTMLDivElement|null>(null)
 
  return <>
    <Box className={classes.inputAdressWrap}>
      <Grid container>
        <Grid item md={3}>
          <Typography align="right">Откуда</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField 
            error={error}
            helperText={error ? 'Адрес не найден' : undefined}
            ref={input}
            fullWidth 
            className={classes.input} 
            value={inputAdress}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  </>
}