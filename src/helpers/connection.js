const deleteImage = require('./deleteImage');
const RabbitMQ = require('./rabbitmq');
const subscriber = require('./rabbitmq');

module.exports = {
  async rabbitmq() {
    RabbitMQ.init();
  },
  async subscribe() {
    await subscriber.init();
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
