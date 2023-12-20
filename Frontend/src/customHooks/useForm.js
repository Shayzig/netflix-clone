import { useEffect, useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export function useForm(initialState, callBack) {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        callBack?.(fields)
    }, [fields])



    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setFields(prevFields => ({
            ...prevFields,
            [field]: value
        }))
    }

    function register(field, type = '') {
        return {
            type,
            name: field,
            id: field,
            onChange: handleChange,
            value: fields[field]
        }
    }

    return [register, fields, setFields]
}