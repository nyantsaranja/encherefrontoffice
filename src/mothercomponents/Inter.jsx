import {useEffect} from "react";

export const Inter = () => {
    useEffect(() => {
        sessionStorage.removeItem("user");
        window.location.href="login"
    }, []);

    return (
        <></>
    );
}