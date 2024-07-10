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

4. User Experience

- A URL to share petri dish settings to other users.
- Local storage persistance to save petri dish sizes.

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

The following [tree](https://tree.nathanfriend.io/) is a basic overview of the project structure.

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

Each reusable component in the _Components_ directory contains the following tree structure.

```
.
└── [component-name]
    ├── [component-name].tsx    # React component file
    └── style.css               # Component related styles
```

Where as each feature in the _Features_ directory follows a recursive feature folder structure seen below.

```
.
└── [feature-name]
    ├── api                          # Optional directory for types, hooks, and data dependancies
    ├── [feature-component-1].tsx
    ├── styles.css
    └── [sub-feature-1]
        ├── [sub-component-1].tsx
        └── styles.css
```

### Key Components

Key components of the project include:

- **Data.tsx**: Displays the metrics of the application via a Table and Graph component.
- **Form.tsx**: A form component that allows the user to adjust petri dish settings.
- **Grid.tsx**: A petri dish that allows the user to add or remove bacteria
- **History.tsx**: A component that persists petri dish settings

I also created custom hooks and utility functions to power the logic and data interactions of the components:

- **useLocalStorage.ts**: A hook to access local storage to persist the history of all petri dishes
- **useUrlParams.ts**: A hook to subscribe to URL query parameter changes for users to share petri dish settings via a URL.
- **findNewCell.ts**: A function to search for empty adjacent cells

Without these components, hooks, and functions, the application wouldn't function correctly or provide a good user experience, as they are essential for managing state, saving data, and enabling user interactions.

## Assumptions & Additions

Throughout the development of this project, I assumed that the bacteria do not change. However, the growth rate is determined by the material of the petri dish. For example, different intervals could mean that the bacteria grow quicker on a certain material (higher interval value) compared to another (lower interval value).

Based on this assumption, the form the user fills out represents the properties of the petri dish (dimensions - width and height - and material - interval).

As a result, the 'History' feature was implemented, allowing the user to save, delete, and use different types of petri dishes.

## Performance Metrics

I decided to review the performance of my application based on the memory consumption.

The performance metrics was based on the following environment:

- OS: Windows 10 Home 64-bit
- Browser: Chrome Version 126.0.6478.127
- System memory: 32GB

grid - 20 x 20 - 71.3 mb
grid - 200 x 200 - 140 mb
grid - 400 x 400 - 349 mb
