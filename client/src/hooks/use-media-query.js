import { useEffect, useState } from "react";

// Custom hook to get window sizes
export function useMediaQuery(query) {
    const [value, setValue] = useState(false);

    useEffect(() => {
        function onChange(event) {
            setValue(event.matches);
        }

        const result = matchMedia(query);
        result.addEventListener('change', onChange); // Add event listener on change
        setValue(result.matches);

        return () => result.removeEventListener('change', onChange); // Remove event listener on Component Unmount
    }, [query]);

    return value;
}