import { createStyles, makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey"
export type TUseStypeApp = typeof useStyleApp
export const useStyleApp = makeStyles(()=>createStyles({
  rootContainer: {},
  titlePage: {},
  input: {
    margin: "0 20px",
  },
  inputAdressWrap: {
    margin: "40px 0"
  },
  card: {
    margin: "0 20px",
    display: 'inline-block',
    
  },
  cardInfo: {
    display: 'inline-block',
    margin: "0 20px"
  },
  cardIcon: {
    display: 'inline-block',
  },
  iconWrap: {
    width: "70px",
    height: "70px"
  },
  icon: {
    width: "70%",
    height: "70%"
  },
  carNumber: {
    width: 100,
    textAlign: 'center',
    border: "1px solid #eee",
    borderColor: grey[500],
    borderRadius: 5
  },
  taxiList: {
    border: "1px solid",
    borderColor: grey[500],
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  listItemDist: {
    position: 'absolute',
    right: 20,
    bottom: 5
  },
  taxiItemIconStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  taxiItemIconEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  map: {
    width: 500,
    height: 500,
    
  },
  addOrder: {
    display: 'block',
    margin: "50px auto"
  },
  addOrderWrap: {
    display: 'block',
  },
  circular: {
    position: 'fixed',
    top: "50%",
    left: "50%",
    zIndex: 1000
  }
}))