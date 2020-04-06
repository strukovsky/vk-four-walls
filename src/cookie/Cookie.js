import Cookies from "js-cookie"

export default class Cookie {
    static setAuth() {
        Cookies.set("auth", "1", {expires: 365})
    }

    static getCountOfActivities()
    {
        let countOfActivities = Cookies.get("activitiesCount");
        if(typeof countOfActivities === "undefined" || countOfActivities ===  null)
            countOfActivities = 4;
        return parseInt(countOfActivities);
    }

    static setCountOfActivities(count)
    {
        Cookies.set("activitiesCount", count, {expires: 365})
    }


    static setEndOfDay(hour) {

        Cookies.set("end", hour, {expires: 365})
    }

    static addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static getEmptyString() {
        let countOfActivities = Cookie.getCountOfActivities();
        return ','.repeat(countOfActivities - 1);
    }

    static setCurrentActivities(activities) {
        let currentActivities = Cookie.getCurrentActivities();



        if (currentActivities.toString() === Cookie.getEmptyString()) {
            let end = Cookie.getEndOfDay();
            let options = { hour:'numeric', minute:'numeric' };
            let date = new Date();
            let currentHour = date.getHours();
            if (currentHour >= end) {
                date.setMinutes(0);
                date.setHours(end);
                date = Cookie.addDays(date, 1);
                options = { weekday: 'short', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' };
                let formattedDate = date.toLocaleDateString("ru-RU", options);
                Cookies.set("until", formattedDate, {expires: 365})
            }
            else{
                date.setHours(end);
                date.setMinutes(0);
                Cookies.set("until", end + ":00", {expires: 365});
            }

            Cookies.set("until-date", date.getTime(), {expires: 365});
            Cookies.set("current", activities, {expires: 365});
        } else
            Cookies.set("current", activities, {expires: 365});

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
        let until = Cookies.get("until");
        if(typeof until === "undefined")
            return null;
        else return until;
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
        let count = Cookie.getCountOfActivities();
        console.log(parseInt(count));
        try {
            let array = JSON.parse(Cookies.get("current"));
            let length = array.length;
            if(array.length < count)
            {
                for(let i = length; i < count; i++)
                {
                    array.push(null);
                }
            }
            if(array.length > count)
            {
                let newArray = [];
                array.forEach((item)=>{
                    if(item !== null)
                        newArray.push(item);
                });
                let newLength = newArray.length;
                if(newLength <= count)
                {
                    for(let i = newLength; i < count; i++)
                    {
                        newArray.push(null);
                    }
                }
                else
                {
                    Cookie.setCountOfActivities(newLength);

                }
                return newArray;
            }
            return array;
        } catch (e) {
            console.log(e);
            let emptyArray = [];
            for(let i = 0; i < count; i++)
                emptyArray.push(null);
            return emptyArray;
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