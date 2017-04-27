var objGeolocation = {
    googleApiKey: '',
    googleResponse:'',
    lat: '',
    lng: '',

    bundleObj(position){
        objResult = objGeolocation.resHandler(position);
        var country = objGeolocation.getCountryShort(objResult);
        var state = objGeolocation.getStateShort(objResult)
        objGeolocation.action(country,state);
    },
    action(country,state){
        // Actions theat you want to do.
        //It is not necessary part
    },
    //The start point of the module.
    //Just set bundleObj() and action().
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(objGeolocation.bundleObj, objGeolocation.handelError)
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    },
    //Get client's Latitude and Longitude and get the exact address from GoogleAPI
    resHandler(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        var url = this.setGoogleApiURL(this.lat, this.lng);
        this.reqGoogleApi(url);
        return JSON.parse(objGeolocation.googleResponse);
        
    },
    //Create a Google URL
    setGoogleApiURL(lat, lng) {
        var eleGooglApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;
        if (this.googleApiKey != '')
        { eleGooglApi += '&key=' + this.googleApiKey; }
        return eleGooglApi;
    },
    //Use Ajax to call location information from GoogleApi
    reqGoogleApi(url) {
        var xhttp
        if (window.XMLHttpRequest)
        { xhttp = new XMLHttpRequest(); }
        else
        { xhttp = new ActiveXObject('Microsoft.XMLHTTP') };
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                objGeolocation.googleResponse = this.responseText;
            }
        }

        xhttp.open('GET', url, false);
        xhttp.send();

    },
    //Sample Function to return Country Name (Short Name)
    getCountryShort(obj) {
        return obj.results[0].address_components[5].short_name;
    },
    //Sample Function to return Country Name (Long Name)
    getCountryLong(obj) {
        return obj.results[0].address_components[5].long_name;
    },
    //Sample Function to return State Name (Short Name)
    getStateShort(obj) {
        return obj.results[0].address_components[4].short_name;
    },
    //Sample Function to return State Name (Long Name)
    getStateLong(obj) {
        return obj.results[0].address_components[4].long_name;
    },
    //Error Handler
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