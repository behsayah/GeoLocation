var objGeolocation = {
    googleApiKey: '',
    lat: '',
    lng: '',
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(objGeolocation.resHandler, objGeolocation.handelError)
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    },
    setGoogleApiURL(lat, lng) {
        var eleGooglApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;
        if (this.googleApiKey != '')
        { eleGooglApi += '&key=' + this.googleApiKey; }
    },
    reqGoogleApi(url) {
        var xhttp
        if (window.XMLHttpRequest)
        { xhttp = new XMLHttpRequest(); }
        else
        { xhttp = new ActiveXObject('Microsoft.XMLHTTP') };
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                return this.responseText;
            }
        }

        xhttp.open('GET', url, true);
        xhttp.send();

    },
    getCountry(position) {

    },
    getState(position) {

    },
    handelError(error) {
        switch (error.code) {
            case (error.PERMISSION_DENIED):
                console.log('User denied the request for GeoLocation');
                break;
            case (error.POSITION_UNAVAILABLE):
                console.log('Location information is unavailable');
                break;
            case (error.TIMEOUT):
                console.log('The request to get user location time out');
                break;
            case (error.UNKNOW_ERROR):
                console.log('An unknown error occured');
                break;
        }
    }

}