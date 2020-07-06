let myMap

window.onload = () => {

    const ironhackMAD = {
        lat: 40.3925087,
        lng: -3.7004703
    };


    myMap = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 16,
        center: ironhackMAD
    });    

}

