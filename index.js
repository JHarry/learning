const { TwitterApi, ETwitterStreamEvent } = require("twitter-api-v2")
const secret = require("./secret.json")

// OAuth2 (app-only or user context)
// Create a client with an already known bearer token
const client = new TwitterApi(secret.token);

async function startstream() {
  // Get and delete old rules if needed
  const rules = await client.v2.streamRules();
  console.log(rules)

  if (rules.data?.length) {
    await client.v2.updateStreamRules({
      delete: { ids: rules.data.map(rule => rule.id) },
    });
  }

  // Add our rules
  await client.v2.updateStreamRules({
    add: [{         
      "value": "followers_count:250000",
    }]
    //value: 'context:31,1435307090197684225 lang:en followers_count:100000' }],
  });

  // Not needed to await this!
  const stream = client.v2.sampleStream({ autoConnect: false });

  // Assign yor event handlers
  // Emitted on Tweet
  stream.on(ETwitterStreamEvent.Data, (tweet)=>{
  });
  // Emitted only on initial connection success
  stream.on(ETwitterStreamEvent.Connected, () => console.log('Stream is started.'));

  // Start stream!
  await stream.connect({ autoReconnect: true, autoReconnectRetries: Infinity });


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
