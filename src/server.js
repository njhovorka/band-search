const express = require('express');
const bodyParser = require("body-parser");
const stringSimilarity = require("string-similarity")
const app = express();
const router = express.Router();
const fs = require('fs');

// store band names in array
var bandText = fs.readFileSync("./fake_band_names_mit.txt", "utf-8");
var bandList = bandText.split("\n")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Modified from `findBestMatch` function of `string-smilarity` library
function findBestMatches(mainString, targetStrings) {
  const ratings = [];
  let bestMatchIndex = 0;
  for (let i = 0; i < targetStrings.length; i++) {
    const currentTargetString = targetStrings[i];
    // compare two strings using Dice's Coefficient
    var currentRating = stringSimilarity.compareTwoStrings(mainString.toLowerCase(), currentTargetString.toLowerCase())
    // Additional scoring for matching first characters of band name (more accurate results for short queries)
    if(mainString.toLowerCase() === currentTargetString.toLowerCase().substring(0, mainString.length)){
      currentRating += mainString.length / 5;
    }
    ratings.push({target: currentTargetString, rating: currentRating})
    if (currentRating > ratings[bestMatchIndex].rating) {
      bestMatchIndex = i
    }
  }
  const bestMatch = ratings[bestMatchIndex]
  return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

// the main algorithm for ranking relevant artist names.
function rankArtists(query){
  var similarity = findBestMatches(query, bandList)
  const sortedArtists = similarity.ratings.sort(function (a, b){
    return b.rating - a.rating;
  });
  var rankedArtists = [];
  for(var i = 0; i < sortedArtists.length; i++) {
    rankedArtists[i] = {artist: sortedArtists[i].target, rank: i + 1}
  }
  return rankedArtists;
};

app.post('/api/query', (req, res) => {
  res.json(rankArtists(req.body.query));
});

app.listen(8080)
