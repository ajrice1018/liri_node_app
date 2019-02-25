# liri_node_app

Language interpretation interface utilizing Node.js on the command line to search Spotify for song information, Bands In Town for Concert information, and OMDB for movie information

##Using LIRI
LIRI is a command line app that utilizes the terminal on a computer to access information. If you want to use LIRI these commands will allow you to access the funtionality of it.
    *Commands
        *spotify-this-song
            *node liri.js spotify-this-song Heroes
            *Specifity can be added by placing the band name after the song if there is more than one track titled 
        *concert-this
            *node liri.js concert-this Rolling Stones
            *Will return next tour date for band
        *movie-this
            *node liri.js movie-this The Matrix
            *Will return relevant information(actors, ratings, etc.) for the film
        *do-what-it-says
            *node liri.js do-what-it-says
            *accesses the random.txt file and runs a predetermined command from the .txt file

All searches are logged in a log.txt file using File System writing.

##Techonologies Utilized
*Node.js
*JavaScript
*Spotify API
*OMDB API
*Bands In Town API

##Videos of Search Functions
[Spotify Search Example](videos/spotify.mov)
[Bands In Town Search Example](videos/bandsintown.mov)
[OMDB Search Example](videos/omdb.mov)
[Random.txt Example](videos/random.mov)

## NPM Packages Used
*Axios
*BandsinTown
*Chalk
*dotenv
*moment
*node-cmd
*node-spotify-api
*request
*spotify


##Requirements to run code
*Install NPM packages

*Requires Spoitify API key and secret
    *Go to Spoity Developers and create key [Spotify API Link](https://developer.spotify.com/my-applications/#!/)
    *Either add keys to keys.js file or create a .env and place keys there. 

*Node.js loaded in the terminal
