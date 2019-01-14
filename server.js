var express = require('express');
var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');
var redirectUri = 'https://' + process.env.PROJECT_NAME + '.glitch.me/callback';
var tokenExpirationEpoch;
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUri
});

app.use(express.static('public'));

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get("/authorize", function (request, response) {
    var scopesArray = ["user-top-read"]
    var authorizeURL = spotifyApi.createAuthorizeURL(scopesArray);
    console.log(authorizeURL)
    response.redirect(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/callback", function (request, response) {
    var authorizationCode = request.query.code;
    // Check folks haven't just gone direct to the callback URL
    if (!authorizationCode) {
        response.redirect('/');
    } else {
        var dataToSendObj;
        spotifyApi.authorizationCodeGrant(authorizationCode)
            .then(function (data) {
                // Set the access token and refresh token
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
                // Save the amount of seconds until the access token expired
                tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
                console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
                spotifyApi.getMyTopTracks({
                    time_range: "long_term",
                    limit: 10,
                    offset: 0
                })
                    .then(function (data) {
                        console.log(data.body.items);
                        var tracktitlelist = [];
                        var urilist = [];
                        var genrelist=[];
                        for (var x in data.body.items) {
                            var val = data.body.items[x];
                            urilist.push(val.artists[0].id);
                            tracktitlelist.push(val.name);
                        }
                        dataToSendObj = { 'message': tracktitlelist };
                        /*console.log(urilist);
                        spotifyApi.getArtists(urilist)
                            .then(function (dataa) {
                                for(var i=0;i<10;i++){
                                    genrelist.push(dataa.body.artists[i].genres[0]);
                                    console.log(genrelist);
                                }
                            })*/
                        response.render(__dirname + '/views/callback.html', dataToSendObj);
                    })
            }, function (err) {
                console.log('Something went wrong when retrieving the access token!', err.message);
            });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});