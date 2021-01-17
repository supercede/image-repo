const deleteImage = require('./deleteImage');
const RabbitMQ = require('./rabbitmq');
const subscriber = require('./rabbitmq');
require('dotenv').config();

module.exports = {
  async rabbitmq() {
    RabbitMQ.init('amqp://localhost');
  },
  async subscribe() {
    await subscriber.init('amqp://localhost');
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
