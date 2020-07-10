export function getJSON(url) {
    return fetch(url)
    .then((response) => {
        if(!response.ok) {
            throw Error(response.statusText);
        } else{
            return response.json();
        }
    })
    .catch((error) => {
        console.log(error);
        document.querySelector("#errorDisplay").innerHTML = `
        ERROR: Something went wrong! Please refresh the page and try again!
        `
    });
}