import Cookies from "js-cookie"
export default class Cookie {
    static setAuth() {
        Cookies.set("auth", "1", {expires: 180})
    }


    static setEndOfDay(hour) {

        Cookies.set("end", hour, {expires: 180})
    }

    static addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static setCurrentActivities(activities) {
        let currentActivities = Cookie.getCurrentActivities();

        if (currentActivities.toString() === ",,,") {
            let end = Cookie.getEndOfDay();
            let options = { hour:'numeric', minute:'numeric' };
            let date = new Date();
            let currentHour = date.getHours();
            if (currentHour > end) {
                date.setMinutes(0);
                date.setHours(end);
                date = Cookie.addDays(date, 1);


                options = { weekday: 'short', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' };
                let formattedDate = date.toLocaleDateString("ru-RU", options);
                console.log(formattedDate);
                Cookies.set("until", formattedDate, {expires: 180})
            }
            else{
                date.setHours(end);
                date.setMinutes(0);
                Cookies.set("until", end + ":00", {expires: 180});
            }

            Cookies.set("until-date", date.getTime(), {expires: 180});
            Cookies.set("current", activities, {expires: 180});
        } else
            Cookies.set("current", activities)

    }

    static getUntilDate()
    {
        return Cookies.get("until-date");
    }

    static removeActivities()
    {
        Cookies.remove("current");
    }

    static removeDate()
    {
        Cookies.remove("until-date");
        Cookies.remove("until");
    }

    static addToStats(activities, date)
    {
        let stats = Cookie.getStats();
        stats.push({
            date: date,
            activities: activities
        });
        Cookies.set("stats", JSON.stringify(stats));

    }

    static getUntil() {
        return Cookies.get("until");
    }


    static getStats()
    {
        let stats;
        try{
            stats = JSON.parse(Cookies.get("stats"));
        }
        catch (e) {
            console.log(e);
            stats = [];
        }
        return stats;
    }

    static getCurrentActivities() {
        try {
            return JSON.parse(Cookies.get("current"));
        } catch (e) {
            console.log(e);
            return [null, null, null, null]
        }
    }

    static deleteStats() {
        Cookies.remove("stats");
    }

    static getEndOfDay() {
        let end = Cookies.get("end");
        if(typeof end === "undefined")
            end = 20;
        return end;
    }

    static isAuth() {
        return Cookies.get("auth") === "1";
    }
}