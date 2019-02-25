
require("dotenv").config();

//Pulls keys from Spotify to LIRI
var keys = require("./keys.js");

//NPM packages pulled into JS assigned to vars
var moment = require('moment');
var fs = require("fs");
var cmd = require('node-cmd');
var chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request')

var command = process.argv[2];
var argument = process.argv[3];



for (i = 4; i < process.argv.length; i++) {
    argument += `+${process.argv[i]}`
}


//Command line argument for running OMDB Movie search
if (command === "movie-this") {
    //Automated search if user does not provide one
    if (process.argv[3] === undefined) {
        argument = `Happy Gilmore`
    }
    
    //API request to OMDB
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

        if (!error && response.statusCode === 200) {
        
        //Appends Movie JSON information to log.txt document
        console.log(`${chalk.red(JSON.parse(body).Title)}
        ${chalk.green('Release Year')}: ${chalk.blue(JSON.parse(body).Year)}
        ${chalk.green('IMDB Rating')}: ${chalk.blue(JSON.parse(body).imdbRating)}
        ${chalk.green('Rotten Tomatoes Rating')}: ${chalk.blue(JSON.parse(body).Ratings[1].Value)}
        ${chalk.green('Origin Country')}: ${chalk.blue(JSON.parse(body).Country)}
        ${chalk.green('Available Languages')}: ${chalk.blue(JSON.parse(body).Language)}
        ${chalk.green('Plot')}: ${chalk.blue(JSON.parse(body).Plot)}
        ${chalk.green('Actors')}: ${chalk.blue(JSON.parse(body).Actors)}`)
        }
        
        //Appends Movie Information to log.txt file
        fs.appendFile('log.txt', `
            ${JSON.parse(body).Title}
            Release Year: ${JSON.parse(body).Year}
            IMDB Rating: ${JSON.parse(body).imdbRating}
            Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
            Origin Country: ${JSON.parse(body).Country}
            Available Languages: ${JSON.parse(body).Language}
            Plot: ${JSON.parse(body).Plot}
            Actors: ${JSON.parse(body).Actors}
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
          }); 
    });
} 

//Function to run command line searches on command line
else if (command === "concert-this") {
    if (process.argv[3] === undefined) {
        argument = `Courtney Barnett`
    }
    
    var queryURL = `https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`;

    //API call to Bands In Town
    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var events  =  JSON.parse(body)[0];
        
        //Logs results to command line with specific stylings
        console.log(`${chalk.red(argument)}

        ${chalk.green('Venue Name')}: ${events.venue.name}
        ${chalk.green('Location')}: ${events.venue.city}
        ${chalk.green('Date')}: ${moment(events.datetime).format('L')}`
        )
        
        //Appends Concert JSON information to log.txt document
        fs.appendFile('log.txt', `
            ${argument}
            Venue Name: ${events.venue.name}
            Location: ${events.venue.city}
            Date: ${moment(events.datetime).format('L')}
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
        });
    });
} 

//Command line arguments for Spotify API request for songs
else if (command === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        argument = `Love Will Tear Us Apart`
    }
    spotify.search({ type: 'track', query: argument, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        trackdata = data.tracks.items[0];
        
        //Logged information from search with specific stylings attached to command line
        console.log(`
        ${chalk.red(trackdata.name)}
        ${chalk.green('Album')}: ${chalk.blue(trackdata.album.name)} 
        ${chalk.green('Artist')}: ${chalk.blue(trackdata.album.artists[0].name)} 
        ${chalk.green('Song Sample')}: ${chalk.blue(trackdata.preview_url)}`
        )
        
        //Appends song information to log.txt file
        fs.appendFile('log.txt', `
            ${trackdata.name}
        
            Album: ${trackdata.album.name} 
            Artist: ${trackdata.album.artists[0].name} 
            Song Sample: ${trackdata.preview_url}
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
          });
        });
} 

//Runs the command from random.txt file
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(`""`, "");
        data = data.replace(`,`, "");
        cmd.get(
            `node liri.js ${data}`,
            function (err, data, stderr) {
                console.log(data)
            }
        );
    });

}