# Fullstack 🏅 Space X API

### 🛠 Technologies Used

The following tools were used in the construction of the project:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [MongoDB] 

### Prerequisites

Before you start, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MongoDB](https://www.postgresql.org/).
Also, it is good to have an editor to work with the code, such as [VSCode](https://code.visualstudio.com/).

You will need to clone the project to your local machine, running:

```bash
git clone https://github.com/kevin504-max/back-spacex-app
```

### 🎲 Running the Back End (server)

To populate the database with users, you need to make a POST request to "127.0.0.1:3300/api/launches".

#### Running locally

- Install the dependencies with

```bash
  npm install
```

- To start the server, use the command

```bash
 npm run start
```

### 🎲 Features

- [x] Develop routes
  - <summary>[GET] /</summary>
  - <summary>[GET] /launches</summary>
  - <summary>[GET] /launches/stats</summary>
- [x] Populate the database with a script that stores data from the SpaceX API launches.
- [x] Develop a CRON job to run daily at 9:00 AM and store new launches.

#### Organization:

- Application of Clean Code standards.
- Decoupled functions.
- Validation of asynchronous calls to prevent freezes.
- Commits following the conventional commit [conventionconvensão](https://www.conventionalcommits.org/en/v1.0.0/).
- Git workflow using good practices with the help of GitFlow.
- Eslint.