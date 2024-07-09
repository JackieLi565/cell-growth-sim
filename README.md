# Cell Growth Simulation

- [Overview & Features](#overview--features)
- [Local Deployment](#local-deployment)
- [Project Structure](#project-structure)
- [Assumptions & Additions](#assumptions--additions)
- [Performance Analysis](#performance-metrics)

## Overview & Features

### Overview

This project simulates the growth of a bacterial colony on a petri dish represented as a grid. Users can visualize the growth process in real-time, control various aspects of the simulation, and interact with the grid to place or remove bacterial cells. The project also includes additional features to enhance user experience and accessibility.

### Features

1. Grid Representation:

- The simulation displays an interactive grid representing a petri dish.
- The growth rate of the bacterial can be dynamically adjustable.

2. User Controls:

- Start/Pause Button: Users can start or pause the simulation.
- Reset Button: Users can reset the simulation to its initial state.
- Time Interval Input: An input field allows users to set the time interval for cell division.
- Manual Cell Placement: Users can manually place or remove bacterial cells on the grid by clicking on the cells.

3. Data Visualization:

- A line graph that visualizes the growth rate of the total bacterial colony over time.
- A table to display the total number of cells over time.

## Local Deployment

First you will need to clone the repository:

```
git clone https://github.com/JackieLi565/cell-growth-sim
```

To deploy the application you will either need [Docker](https://www.docker.com/) or [Node.js](https://nodejs.org/en) installed on your machine.

### Using Docker

To build and run the Docker container, use the following commands:

```
docker build -t jitto .

docker run -p 3000:80 jitto
```

### Using NPM

If you prefer to use NPM:

```
npm install

npm run build

npm run preview
```

Once the application is running, you can access it in your web browser at: [http://localhost:3000](http://localhost:3000)

## Project Structure

The following [tree](<https://tree.nathanfriend.io/?s=(%27op7s!(%27fancy!true~fullPOCtrailingSlasCrootDot!true)~I(%27I%27cell-Jsim2srcM40Reusabl946buttFQandGorm%20inpuKMfeOures3feOur94%202BH2BJrOe2Bresize-HMuNlsBBB8UNliNes6aGunc7Gor%20H%20genera7Mstyles*3stylesMApp.KxMmain.Kx2DockerfileB0Local%20Docker%20imag9setup2package.jsF3depedencies2K5.jsFBB8TypeScriptE2vite.5.K0Vit9buildE%27)~versiF!%271%27)W%200BW82%5Cn*3*0Project%204compFenK5cFfig6%20such%20aQ7NF8%23%209e%20B**Ch!false~E%205ura7FonG%20fHgridIsource!Jgrowth-KtsM2*NtiOatQs%20W*%20%01WQONMKJIHGFECB987654320*>) is a basic overview of the project structure.

```
.
└── cell-growth-sim
    ├── src
    │   ├── components       # Reusable components such as buttons and forms inputs
    │   ├── features         # Project feature components
    │   │   ├── grid
    │   │   ├── growth-rate
    │   │   └── resize-grid
    │   ├── utils            # Utilities such as a function for grid generation
    │   ├── styles           # Project styles
    │   ├── App.tsx
    │   └── main.tsx
    ├── Dockerfile           # Local Docker image setup
    ├── package.json         # Project depedencies
    ├── tsconfig.json        # TypeScript configuration
    └── vite.config.ts       # Vite build configuration
```

Each reusable component contains the following [tree](<https://tree.nathanfriend.io/?s=(%27options!(%27fancy!true~fullPat3trailingSlas3rootDot!true)~4(%274%27252.tsx7%23%20React%20c8file5style.css7776%23%20C8related%20styles%27)~version!%271%27)6%200omponent2%5Bc0-name%5D3h!false~4source!5%5Cn*6*%207**80%20%0187654320*>) structure

```
.
└── [component-name]
    ├── [component-name].tsx    # React component file
    └── style.css               # Component related styles
```

Where as each feature contains the following [tree](<https://tree.nathanfriend.io/?s=(%27optiCs!(%27fancy!true~fullPat5trailingSlas5rootDot!true)~9(%279%273name%5D2api8888*%23%20OptiCal6irectory%20for%20type7hook7and6ata6ependancies%2001B1A...0nBnA%27)~versiC!%271%27)*%20%20023compCent-2%5Cn*3%5Bfeature-4%5D.5h!false~6%20d7s%2C%208***9source!A4css2B4tsx0Con%01CBA987654320*>) structure

```
.
└── [feature-name]
    ├── api                          # Optional directory for types, hooks, and data dependancies
    ├── [feature-component-1].tsx
    ├── [feature-component-1].css
    ├── ...
    ├── [feature-component-n].tsx
    └── [feature-component-n].css
```

## Assumptions & Additions

Throughout the development of this project the following options were made.

- The size of a petri dish cannot change during a simulation
- Once the the size of a petri dish changes the simulation state must restart
- The growth rate of the bacteria could dynamically change during a simulation

Based on the following assumptions, the following additions were made to cater to them:

- Row and Column size inputs are disabled during a simulation
- Responsive UI for mobile-web users

## Performance Metrics
