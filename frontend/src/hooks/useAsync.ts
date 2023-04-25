import { useCallback, useEffect, useState } from "react";
import { RequestStatus } from "../types";

export default function <T, E = string>(
    asyncFunction: (
        ...args: any[]
    ) => Promise<T>,
    immediate = true
) {
    const [status, setStatus] = useState<RequestStatus>("idle");

    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    const execute = useCallback(async (...args: any[]) => {
        setStatus("pending");
        setValue(null);
        setError(null);
        try {
            const response = await asyncFunction(...args);
            setValue(response);
            setStatus("success");
        } catch (error) {
            setError(error as E);
            setStatus("error");
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error };
};
