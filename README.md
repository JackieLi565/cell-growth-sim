# Cell Growth Simulation

## Getting Started

First you will need to clone the repository:

```
git clone https://github.com/JackieLi565/cell-growth-sim
```

To deploy the application you will either need [Docker](https://www.docker.com/) or [Node.js](https://nodejs.org/en) installed on your machine.

### Docker

To build and run the Docker container, use the following commands:

```
docker build -t jitto .

docker run -p 3000:80 jitto
```

### NPM

If you prefer to use NPM:

```
npm install

npm run build

npm run preview
```

Once the application is running, you can access it in your web browser at: [http://localhost:3000](http://localhost:3000)
