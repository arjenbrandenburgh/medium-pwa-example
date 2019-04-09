// server.js
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors')
const webPush = require('web-push');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

app.post('/notifications', (req, res) => {
  const subscription = req.body.notification;

  console.log(`Subscription received`);

  res.status(201).json({});

  const payload = JSON.stringify({
    notification: {
      title: 'Notifications are cool',
      body: 'Know how to send notifications through Angular with this article!',
      icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
      vibrate: [100, 50, 100],
      data: {
        url: 'https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac'
      }
    }
  });

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});