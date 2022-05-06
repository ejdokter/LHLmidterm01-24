// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC53ed0e5311ddee27527aadf0397f75ec';
const authToken = '367107304dbec28a0239fd512b8e84b6';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your order has been accepted! We are pouring the cereal!',
     from: '+19704699159',
     to: '+14039912192'
   })
  .then(message => console.log(message.status));



  // SELECT sum(prep_time), line_items.order_id FROM products JOIN line_items ON product_id = products.id WHERE line_items.order.id = 1 GROUP BY line_items.order_id;
