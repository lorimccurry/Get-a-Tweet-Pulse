Get a Twitter Pulse
===================

This is the capstone project for Nashville Software School front end section. It enables the user to search a word, phrase or hashtag and opens a streaming search of the Twitter API. Results with attached geo-coordinates are populated on a Google map.

==================

Getting it to work for you:

1) Clone the repository

2) Install the dependencies: npm install

3) Register for a twitter application to obtain your own credentials

3) Run the server using your twitter application credentials:

    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SEC,
    access_token: process.env.TW_ACCESS_TOKEN,
    access_token_secret: process.env.TW_ACCESS_TKSEC

==================

This project utilizes socket io, node, jade, less, javascript, jQuery, express, foundation 5, grunt, mongoose, mongoDB, Twit (npm twitter dependency), Google maps API, and hosting with amazonaws.
