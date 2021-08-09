const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
	authToken: "4dcab741f6e7d14c-5a2cc4edf2d9ea8d-63074b3d0a45ec28",
	name: "Misko Bot",
	avatar: "",
});

app.use("/viber/webhook", bot.middleware());

// bot.onTextMessage(/^hi|hello$/i, (message, response) =>
//     response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`)));

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});

bot.onError(err => console.log(err));

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>
	onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`)));

// app.get('/*', (req, res) => {
//   console.log(req)
//   res.send('Hello World!')
// })

// app.post('/*', (req, res) => {
//   console.log(req)
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

