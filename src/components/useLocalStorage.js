import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const clearLocalStorage = () => {
        localStorage.clear();
    }

    return [value, setValue, clearLocalStorage];
};
