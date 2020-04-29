# New Years Predictions
_Note: Project is in Danish._

Simple webapp to display results from a quiz attempting to predict the outcome of 25 events in 2019 and 2020.

See https://new-years-predictions.web.app

The main purpose of the project was to get a chance to play around with Vue and Firebase.
As such there are many things that could definitely be improved upon like
* Adding tests
* Adding CI
* Adding an interface to input the answers instead of using the Firebase console
* Improve component separation
* Moving CSS to separate files and cleaning it up
* Dynamically loading language specific strings
* Better error handling
* ... and much more

## Project setup
```
npm ci
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deploys to firebase
```
firebase deploy
```

### Firebase Connection
For the application to work it needs to have a firebase connection.

A file describing the connection is assumed to be placed in `environments/firebase.ts`.

Go to the project settings in Firebase and find the Firebase SDK snippet for Config.

Copy this snippet into `environments/firebase.ts`.
