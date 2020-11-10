import { TGetTaxiData } from "../types/types"
//import { getFormatTime } from "../utils/date"

export const TaxiApi = {
  getTaxiDataByCoordinates: async (
    {address, lat, lon}: {address: string, lat: number, lon: number}
    ): Promise<TGetTaxiData | string
    > => {
      try {
        const taxiList = [
          {
            "crew_id":123,
            "car_mark":"Chevrolet",
            "car_model":"Lacetti",
            "car_color":"синий",
            "car_number":"Е234КУ",
            "driver_name":"Деточкин",
            "driver_phone":"7788",
            "lat":56.855532,
            "lon":53.217462,
            "distance":300
          },{
            "crew_id":125,
            "car_mark":"Hyundai",
            "car_model":"Solaris",
            "car_color":"белый",
            "car_number":"Ф567АС",
            "driver_name":"Петров",
            "driver_phone":"8899",
            "lat":56.860581,
            "lon":53.209223,
            "distance":600
          }
        ]
        //const sourse_time = getFormatTime()
        
        // await fetch('localhost', {
        //   method: "post",
        //   body: JSON.stringify({
        //     sourse_time,
        //     adresses: [
        //       {
        //         address,
        //         lat,
        //         lon
        //       }
        //     ]
        //   })
        // })
        return await new Promise((res, rej)=>{
          setTimeout(()=> res({code: 0, descr: 'ok', data: {crews_info:taxiList}}),1000)
        })
      } catch (e) {
        return e.message as string
      }
      finally{
  
      }
  },
}