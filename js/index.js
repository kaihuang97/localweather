$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://ip-api.com/json",
        success: location
    });

    function location(data) {
        // var darkSkyURL = "https://api.darksky.net/forecast/e5d936bd471e33d6600f3ec145250457/";
        var darkSkyURL = "https://api.darksky.net/forecast/c1c79c93374cb0e0b5e2439d84fd12f5/";
        var location = data.lat + "," + data.lon;
        var city = data.city;
        var region = data.region;
        var darkSkyAPI = darkSkyURL + location;
        $("#currentLocation").text(city + ", " + region);
        weather(darkSkyAPI);
    }

    function weather(darkSkyAPI) {
        $.ajax({
            type: "GET",
            url: darkSkyAPI,
            dataType: "jsonp",
            success: getTemp
        });

        function getTemp(data) {
            var temp = Math.round(data.currently.temperature);
            var icon = data.currently.icon;
            summary = data.currently.summary;
            console.log(summary);
            $("#temperature").text(temp + "°F");
            getSkyCons(icon, temp);
            var unsplashAPI = "https://api.unsplash.com/photos/random";
            wallpaper(unsplashAPI);
        }

        function getSkyCons(icon, temp) {
            /*
            var skycons = new Skycons({
                "monochrome": false,
                "colors": {
                    "main": "#333333",
                    "moon": "#78586F",
                    "fog": "#78586F",
                    "fogbank": "#B4ADA3",
                    "cloud": "#B4ADA3",
                    "snow": "#7B9EA8",
                    "leaf": "#7B9EA8",
                    "rain": "#7B9EA8",
                    "sun": "#FF8C42"
                }
            });
            skycons.add('skycon', icon);
            */
            var skycons = new Skycons({
                "color": "white"
            });
            skycons.add("skycon", icon);
            skycons.play();
        }

        function wallpaper(unsplashAPI) {
            $.ajax({
                headers: {
                    "Accept-Version": "v1",
                    "Authorization": "Client-ID 10c20ade5ab0257ce7ba5ad938efa572f6add11cec4f2ec4e45ecad170de8f53"
                },
                // using test 6084292b78479ead8972f469747ee02d056696a9f869ad5e4fcdaeddd7bd6ea7
                type: "GET",
                url: unsplashAPI,
                data: {
                    count: 1,
                    query: summary
                },
                success: getWallpaper
            });

            function getWallpaper(data) {
                var image = data[0].urls.regular;
                document.body.background = image;
            }
        }
    }
});
