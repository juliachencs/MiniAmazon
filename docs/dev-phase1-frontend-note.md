
## Create the mini-amazon-frontend project

To create a new React application mini-amazon-frontend using Vite with npm:

```bash
npm create vite@latest mini-amazon-frontend -- --template react-ts

Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
```

## convert to router
https://reactrouter.com/tutorials/quickstart

## Create a mock backend for debug
Use the Express Application Generator to quickly create a mock backend

```bash
  #change directory:
  cd mini-amazon-backend-mock

  #install dependencies:
  npm install

  # run the app:
  SET DEBUG=mini-amazon-backend-mock:* & npm start
```

## Issues and Fixes

- Failed to resolve import "react-router"
```bash
  npm install react-router-dom
```

## TODOs

- [] 


