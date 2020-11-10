import { getFormatTime } from "../utils/date"

export type TOrderData = { 
  data:{address: string, lat: number, lon: number}
  crew_id: number
}

export const OrdersApi = {
  createNewOrder: async (
    {data: {address, lat, lon}, crew_id}: TOrderData
  ): Promise<{
    code: number, 
    descr: string, 
    data: {
      order_id: number
    }
  } | string
  > => {
    try {
      const sourse_time = getFormatTime()
      await fetch('localhost', {
        method: "post",
        body: JSON.stringify({
          sourse_time,
          adresses: [
            {
              address,
              lat,
              lon
            }
          ],
          crew_id
        })
      })
      return await new Promise((res, rej)=>{
        setTimeout(()=> res({code: 0, descr: 'ok', data: {order_id: 12345}}), 500)
      })
    } catch (e) {
      return e.message as string
    }
    finally{

    }
  },
}