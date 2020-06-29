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
    });
}