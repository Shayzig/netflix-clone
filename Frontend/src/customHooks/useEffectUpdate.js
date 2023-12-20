import { useEffect, useRef } from "react";


export function useEffectUpdate(callBack, dependencies) {
    const isFirst = useRef(true)

    useEffect(() => {

        if (isFirst.current) {
            isFirst.current = false
            return
        }

        return callBack()
    }, dependencies)
}