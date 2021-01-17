# Image-Repo

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6084374ff100ff91df3d)

An Image Repository for the Shopify Backend Intern Challenge 2021

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [MySQL](https://www.mysql.com/downloads/) or use a cloud database hosting service
- [RabbitMQ](https://www.rabbitmq.com/download.html) or a cloud alternative (e.g., [CloudAMQP](https://www.cloudamqp.com/))
- [Redis](https://redis.io/download) or a cloud alternative

### Technologies Used

- [NodeJS](https://nodejs.org/en/download/) - A cross-platform JavaScript runtime
- [ExpressJS](https://expressjs.com/) - NodeJS application framework
- [MySQL](https://www.mysql.com/downloads/) - A relational database management system
- [Sequelize ORM](https://sequelize.org/) - A promise-based Node.js ORM for relational databases
- [RabbitMQ](https://www.rabbitmq.com/download.html) - An open-source message-broker software
- [Redis](https://redis.io/download) - An in-memory data structure store

### Project Pipeline

- [API Docs](https://documenter.getpostman.com/view/9950313/TVzViw96)
- [Hosted API](https://img-repository.herokuapp.com/)

### Installing/Running locally

* Clone or fork repo

```bash
  - git clone https://github.com/supercede/image-repo.git
  - cd image-repo
```

* Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials (ensure to provide the correct details)
* After configuring your database in accordance with the Sequelize config file (`src/config/sequelize.js`):

```
    - npm install
```

* Run `npm run dev` to start the server and watch for changes

### Documentation/Endpoints

- Check [Postman](https://documenter.getpostman.com/view/9950313/TVzViw96) documentation
