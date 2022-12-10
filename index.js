const { TwitterApi, ETwitterStreamEvent } = require("twitter-api-v2")

// OAuth2 (app-only or user context)
// Create a client with an already known bearer token
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAIxTkAEAAAAAtmHK%2BCox2D35bqvxrCM5m7ZGrCU%3DBnALfg1QgeRZoNwW9UCPVY6cPw2jYcy2ZIobX5WS5V8K10zPgk');

async function start() {

  const tweets = await client.v2.listTweets('755078760567828481', { 'media.fields': ['media_key'], expansions: ['attachments.media_keys'] });
  console.log(tweets._realData.data.length)

}

start()


// - Also want to send people things that are relevant to them based on AI learning of prior replies and 
// - Let you sort your timeline or a list’s timeline by new stuff that’s getting the highest rate of engagement
// - Lead finding with context
