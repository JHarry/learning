// const numbers = [1, 2, 3]
// console.log('numbers', numbers)
// const increased = numbers.map(number => {
//   console.log('NUMBER TEST:', number)
//   const increasedNumber = number + 1
//   console.log('incrasedNumber test:', increasedNumber)
//   return increasedNumber
// })
// console.log('increased test:', increased)

const { TwitterApi, ETwitterStreamEvent } = require("twitter-api-v2") 
const database = []

// OAuth2 (app-only or user context)
// Create a client with an already known bearer token
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAIxTkAEAAAAAtmHK%2BCox2D35bqvxrCM5m7ZGrCU%3DBnALfg1QgeRZoNwW9UCPVY6cPw2jYcy2ZIobX5WS5V8K10zPgk');

async function addListToDatabase(listID, listName){ 
  const options = {
    'media.fields': ['media_key'],
    'tweet.fields': ['created_at', 'referenced_tweets', 'public_metrics'],
    expansions: ['attachments.media_keys']
  }
  const response = await client.v2.listTweets(listID, options);
  const tweets = response._realData.data
  const notRTweets = tweets.filter(tweet => !isR(tweet))
  // const notRTweets = tweets.filter(isNotR)
  database.push(...notRTweets)

  const rTweets = tweets.filter(tweet => isR(tweet))
  // const rTweets = tweets.filter(isR)
  const rTweetPromises = rTweets.map(addReadTweetToDatabase)
  await Promise.all(rTweetPromises)
}

function isR(tweet) {
  return tweet.referenced_tweets != null
}

// function isNotR(tweet) {
//   return !isR(tweet)
// }
// const isNotR = (tweet) => {
//   return !isR(tweet)
// }
// const isNotR = tweet => !isR(tweet)

async function addReadTweetToDatabase(rTweet) {
  const readID = rTweet.referenced_tweets[0].id
  const alreadyTweet = database.some(tweet => tweet.id === readID)
  if(!alreadyTweet) {
    const readTweet = await client.v2.singleTweet(readID)
    console.log("readTweet", readTweet)
    database.push(readTweet)
  } 
}

async function start() {
  database.length = 0;
  const cramerpromise = addListToDatabase('755078760567828481', "cramer")
  // const electionpromise = addListToDatabase('1323741541928763397', "election")
  const promises = [cramerpromise]
  await Promise.all(promises)
  console.log("database",database.length)

}

// 1. don't save replies or retweets of things that we've already got. 
// 2. get and store only the tweets that have been posted since the last time i checked (aren't already stored)
// 3. sort tweets in each response from most to least likes per minute
// ---> will checking when the tweet was posted contribute to my rate limit?

start()
 
// let use filter stuff according to their own criteria (keywords, list of accounts)