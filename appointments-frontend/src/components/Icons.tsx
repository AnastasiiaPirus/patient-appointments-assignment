export function Doctor() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M4 22v-1c0-1.87 0-2.804.402-3.5A3 3 0 0 1 5.5 16.402C6.196 16 7.13 16 9 16l3 4l3-4c1.87 0 2.804 0 3.5.402a3 3 0 0 1 1.098 1.098C20 18.196 20 19.13 20 21v1M15.937 8l1.018-4.136C17.188 2.917 16.483 2 15.523 2H8.477c-.96 0-1.665.917-1.432 1.864L8.063 8m7.874 0v2c0 2.209-1.762 4-3.937 4s-3.937-1.791-3.937-4V8m7.874 0H8.063M12 4v2m1-1h-2"
                  color="currentColor"/>
        </svg>
    );
}

export function Patient() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>)
}

export function Cross() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48">
            <path fill="currentColor"
                  d="M18.5 8.5v8.75c0 .69-.56 1.25-1.25 1.25H8.5v11h8.75c.69 0 1.25.56 1.25 1.25v8.75h11v-8.75c0-.69.56-1.25 1.25-1.25h8.75v-11h-8.75c-.69 0-1.25-.56-1.25-1.25V8.5zM16 8.25A2.25 2.25 0 0 1 18.25 6h11.5A2.25 2.25 0 0 1 32 8.25V16h7.75A2.25 2.25 0 0 1 42 18.25v11.5A2.25 2.25 0 0 1 39.75 32H32v7.75A2.25 2.25 0 0 1 29.75 42h-11.5A2.25 2.25 0 0 1 16 39.75V32H8.25A2.25 2.25 0 0 1 6 29.75v-11.5A2.25 2.25 0 0 1 8.25 16H16z"/>
        </svg>)
}

export function Clock() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="100%" height="100%"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
}

export function Status() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="100%" height="100%"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>);
}