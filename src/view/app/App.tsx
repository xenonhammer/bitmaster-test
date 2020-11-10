import { Button, CircularProgress, Container, Divider, Fade, Grid, IconButton, List, Snackbar, Typography } from '@material-ui/core';
import React, {   useEffect, useState } from 'react';
import { createMap, getAddressByClick, getCoordinates, setTaxiOnMap } from '../../utils/yandex-map';
import { CardTaxi } from '../components/Card/card';
import { Header } from '../components/header/header';
import { InputAddress } from '../components/input/inputAddress';
import { ListItemTaxi } from '../components/listItem/listItem';
import { useStyleApp } from './style-app';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../redux/store';
import { taxiThunks } from '../../redux/actions/taxiActions';
import { TTaxi } from '../../types/types';
import { orderThunks } from '../../redux/actions/orderActions';
import CloseIcon from '@material-ui/icons/Close';


function App() {
  const classes = useStyleApp()
  const [inputValue, setInputValue] = useState('')
  const {taxi, progress, order} = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const [map, setMap] = useState()
  const [sortTaxi, setSortTaxi] = useState<TTaxi[]>([])
  const [myPosition, setMyPosition] = useState<{coords: number[], address: string}|undefined>()
  const mapRef = React.useRef<HTMLDivElement>(null)
  const [errorAdress, setErrorAdress] = useState(false)
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  useEffect(()=>{
    ymaps.ready(()=>{
      setMap( prev => {
        prev = createMap(mapRef)
        getAddressByClick(prev, setInputValue)
        return prev
      })
    })
    return () => console.log('unmount')
  },[mapRef])

async function getTaxi(){
  try{
    const data = await getCoordinates( map, inputValue)
    setMyPosition(data)
    await dispatch(taxiThunks.getDataByAdress(data.address, data.coords[0], data.coords[1]))
    setErrorAdress(false)
  } catch (e) {
    setErrorAdress(true)
  }
}

  useEffect(()=>{
    if(!!inputValue) getTaxi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[map, inputValue])

  const sortByUp = React.useCallback(function (data:TTaxi[]): void {
    setSortTaxi(data.sort(
      (a,b) => getDist(myPosition!.coords, [a.lat, a.lon])-getDist(myPosition!.coords, [b.lat, b.lon])))
    }, [myPosition])

  useEffect(()=>{
    if(!!taxi.taxiList.length) {
      setTaxiOnMap(map, taxi.taxiList)
      sortByUp (taxi.taxiList)
    }
  },[taxi.taxiList, map, sortByUp])

  useEffect(()=>{
    if(!!order.order_id) {
      setIsOrderCreated(true)
    }
  },[order.order_id])

  const handleOrder = () => {
    if(!!inputValue) {
      setErrorAdress(false)
      dispatch(orderThunks.sendOrder(
        {
         data: {address: myPosition?.address!, lat: myPosition?.coords[0]!, lon: myPosition?.coords[1]!},
         crew_id: sortTaxi[0].crew_id
        }
      ))
    } else {
      setErrorAdress(true)
    }
  }

  function getDist(me:number[],taxi:number[]): number {
    return ymaps.coordSystem.geo.getDistance(me, taxi).toFixed(2)
  }


  return <>

    <Header />

    <Snackbar  
      open={isOrderCreated} 
      message={`Заказ ${order.order_id} создан`}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      action={
        <>
          <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setIsOrderCreated(false)}>
            <CloseIcon fontSize="small" />
          </IconButton> 
        </>
      }
    />

    <Fade in={progress.isShow}><CircularProgress className={classes.circular} /></Fade>

    <Container maxWidth="md" className={classes.rootContainer}>
      <Grid container>
        <Grid item md={8} sm={10} xs={12}>
          <InputAddress error={errorAdress} inputAdress={inputValue} setInputAdress={setInputValue}/>
        </Grid>
      </Grid>


      <Grid container>
        <Grid item md={8} sm={10} xs={12}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Typography align="right">Подходящий экпаж:</Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              {sortTaxi.length > 0 && <CardTaxi car={sortTaxi[0]} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      <Grid container spacing={2}>

        <Grid item md={8}>
          <div className={classes.map} ref={mapRef}></div>
        </Grid>


        <Grid item md={4} >
          <List className={classes.taxiList}>
            {sortTaxi.map(elem => <React.Fragment key={elem.lat}>
            <ListItemTaxi
              car_color={elem.car_color}
              car_mark={elem.car_mark}
              car_model={elem.car_model}
              distance={getDist(myPosition!.coords, [elem.lat, elem.lon])}
            />
            <Divider hidden />
          </React.Fragment>)}
          </List>
        </Grid>
      </Grid>

      <div className={classes.addOrderWrap}>
        <Button className={classes.addOrder} variant='outlined' onClick={handleOrder}>Заказать</Button>
      </div>

    </Container>
  </>
}

export default App;