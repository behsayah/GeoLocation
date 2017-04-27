var objGeolocation = {
    googleApiKey: '',
    lat: '',
    lng: '',
    action(country,state){
        if(country.toLowerCase() == 'us'){
            document.getElementById('freeShippingLimit').className += 'hidden';
        }
    },
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(objGeolocation.resHandler, objGeolocation.handelError)
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    },
    resHandler(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        var url = this.setGoogleApiURL(this.lat, this.lng);
        var jsonResult = this.reqGoogleApi(url);
        var objResult = JSON.parse(jsonResult);
        var
    },
    setGoogleApiURL(lat, lng) {
        var eleGooglApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;
        if (this.googleApiKey != '')
        { eleGooglApi += '&key=' + this.googleApiKey; }
        return eleGooglApi;
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
    getCountryShort(obj) {
        return obj.result[0].address_components[6].short_name;
    },
    getCountryLong(obj) {
        return obj.result[0].address_components[6].long_name;
    },
    getStateShort(obj) {
        return obj.result[0].address_components[5].short_name;
    },
    getStateLong(obj) {
        return obj.result[0].address_components[5].long_name;
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