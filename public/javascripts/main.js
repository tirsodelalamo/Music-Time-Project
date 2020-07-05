window.onload = () => {


    const Madrid = {

        lat: 40.4021314,
        lng: -3.7235911

    }

    myMap = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 16,
        center: Madrid
    });

    getUsers()

}

function getUsers() {
    axios
    .get("/api")
        .then(response => {
            console.log("LA RESPUESTA DEL SERVIDOR ES", response)
            placeUsers(response.data.users)
        })
        .catch(error => console.log(error))
}


function placeUsers(users) {
    users.forEach(user => {
        const center = {
            lat: user.location.coordinates[1],
            lng: user.location.coordinates[0]
        }
        new google.maps.Marker({
            position: center,
            map: myMap,
            title: user.name
        })
    })

    
}