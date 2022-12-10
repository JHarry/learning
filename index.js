const { TwitterApi, ETwitterStreamEvent } = require("twitter-api-v2")

// OAuth 1.0a (User context)
// const userClient = new TwitterApi({
//   appKey: 'XJvBgIntlTvVFIsKBaigyDBmP',
//   appSecret: 'QeHmyLbIsGCnZkAnXdISzusz6PfODDTUuvFdJZJnDLGHJgLaE4',
//   // Following access tokens are not required if you are
//   // at part 1 of user-auth process (ask for a request token)
//   // or if you want a app-only client (see below)
//   accessToken: '3270434107-VpqyrpoMLmqqq4IQusFDwsNclB2EPYy2ieIbFrj',
//   accessSecret: '56DPCRkrscjgZluq1x3tn4MRf19OQLE3p3OAjabwhtCbu',
// });

// OAuth2 (app-only or user context)
// Create a client with an already known bearer token
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAIxTkAEAAAAAtmHK%2BCox2D35bqvxrCM5m7ZGrCU%3DBnALfg1QgeRZoNwW9UCPVY6cPw2jYcy2ZIobX5WS5V8K10zPgk');

async function startstream() {

  const tweets = await client.v2.listTweets('755078760567828481', { 'media.fields': ['media_key'], expansions: ['attachments.media_keys'] });

  console.log(tweets)
  
  // // Get and delete old rules if needed
  // const rules = await client.v2.streamRules();
  // if (rules.data?.length) {
  //   await client.v2.updateStreamRules({
  //     delete: { ids: rules.data.map(rule => rule.id) },
  //   });
  //  }

  // // Add our rules
  // await client.v2.updateStreamRules({
  //   add: [{ value: 'context:31,1435307090197684225 lang:en followers_count:100000' }],
  // });

  // // if the tweet is a retweet, include only the underlying tweet if it's the first time it's been referenced
  // // // don't include replies

  //   const stream = await client.v2.searchStream({
  //     'tweet.fields': ['referenced_tweets', 'author_id'],
  //     expansions: ['referenced_tweets.id'],
  //   });
  //   // Enable auto reconnect
  //   stream.autoReconnect = true;

  //   stream.on(ETwitterStreamEvent.Data, async tweet => {
  //     console.log("tweet",tweet)
  //   });  
}

startstream()


// - Also want to send people things that are relevant to them based on AI learning of prior replies and 
// - Let you sort your timeline or a list’s timeline by new stuff that’s getting the highest rate of engagement
// - Lead finding with context
