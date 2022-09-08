import { useEffect, useState } from "react";

export const useOldDate = (date) => {

    const [oldDate, setOldDate] = useState(false);

    useEffect(() => {
        setOldDate(  new Date(date).getTime() < new Date("26 June 2022").getTime())
    }, [date])
    
  return { oldDate };
}
