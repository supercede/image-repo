const deleteImage = require('./deleteImage');
const RabbitMQ = require('./rabbitmq');
const subscriber = require('./rabbitmq');
require('dotenv').config();

module.exports = {
  async rabbitmq() {
    RabbitMQ.init(process.env.RabbitMQ_URL);
  },
  async subscribe() {
    await subscriber.init(process.env.RabbitMQ_URL);
    // Delete Image
    subscriber.consume(
      'DELETE_USER_IMAGE',
      async msg => {
        const url = msg.content.toString();
        await deleteImage(url);
        subscriber.acknowledgeMessage(msg);
      },
      3,
    );
  },
};
