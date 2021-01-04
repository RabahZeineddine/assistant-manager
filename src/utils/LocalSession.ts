
export const setSession = (name: string, value: any) => {
    if (value)
        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem(name, JSON.stringify(value));
        }
        else {
            setCookie(name, JSON.stringify(value));
        }
}


const setCookie = (cname: string, cvalue: string) => {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


export const getSession = (name: string) => {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        const item = sessionStorage.getItem(name)
        return item ? JSON.parse(item) : item;
    }
    else {
        // Sorry! No Web Storage support.. use cookie instead..
        return JSON.parse(getCookie(name));
    }
}


export const sessionCheck = (name: string) => {

    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.getItem(name)) {
            return true;
        }
        return false;
    }
    else {
        // No storage , use cookie..
        return checkCookie(name);
    }
}

const getCookie = (name: string) => {
    name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";

}

const checkCookie = (cname: string) => {
    var username = getCookie(cname);

    if (username !== "" && username != null) {
        return true;
    }
    else {
        return false;
    }
}

export const deleteSession = (name: string) => {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.removeItem(name);
    }
    else {
        deleteCookie(name);
    }
}

export const clear = () => {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.clear()
    }
    else {
        deleteAllCookies()
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteCookie(name)
    }
}

const deleteCookie = (cname: string) => {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
