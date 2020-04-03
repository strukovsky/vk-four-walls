import Cookies from "js-cookie"

class Cookie{
    static setAuth()
    {
        Cookies.set("auth", "1", {expires: 180})
    }

    static setStartOfDay(hour)
    {
        Cookies.set("start", hour, {expires: 180})
    }

    static setEndOfDay(hour)
    {
        Cookies.set("end", hour, {expires: 180})
    }
}