# React Native URL Shortner

* A url shortner built with react native (frontend) and Firebase Cloud Functions (backend).

## Project Setup

1. Clone the repo to your device using

``` 
git clone https://github.com/utkarshbhatt12/url_shortner_react_native
```

2. `cd app && npm install && cd .. && cd backend/functions && npm install` 
3. Follow the [Official Firebase Admin SDK setup](https://firebase.google.com/docs/admin/setup) guide.
4. Place your service account key (**rename** to `service_acc.json` ) in the functions/src folder.
5. Run

``` 
firebase deploy --only functions,hosting
```

6. Connect your Android device to your PC and run the following command.

``` 
cd app && react-native run-android
```

Your app should be installed.

## Build debug apk

* Go to the main project directory in `/app` and run the following commands

``` 
// source: https://stackoverflow.com/a/56520717/2758318
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android && ./gradlew assembleDebug

```

* This will generate the app-debug.apk in the `app/build/outputs/apk/debug/app-debug.apk` directory.

* Navigate to `android/app/build/outputs/apk/debug/` . Run the following:

``` 
adb install app-debug.apk
```

* This will install the debug apk on your device.

## Backend APIs

### `/shortner` 

* Method: `POST` 
* Headers

``` 
{
    "Content-Type": "application/json",
    "Authorization": "Bearer ${your token}"
}
```

* Responses

1. Success:

``` 
    {
        "shortId": "e144ce220",
        "originalUrl": "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes"
    }
    ```

2. Rejection:

``` 
    {
        "success": false,
        "message": "details about the rejection..."
    }
    ```

### `/redirector` 

* Method: `GET` 
* Headers

``` 
{}
```

* Responses
1. Success

``` 
// 302 redirects to the originalUrl
```

2. Failure

``` 
// Shows 404
```

### `/history` 

* Method: `GET` 
* Headers

``` 
{
    "Content-Type": "application/json",
    "Authorization": "Bearer ${your token}"
}
```

* Responses
1. Success

``` 
{
    success: true,
    list: [{
        "createdAt": 1573414701472,
        "creator":"eAueexFm6be2r3kd3abDNMyhI9H2",
        "hits": 10,
        "originalUrl": "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes",
        "shortId": "e144ce220",
        }
    ]
}
```

2. Failure

``` 
    {
        "success": false,
        "message": "details about the rejection..."
    }
```

## Cloud Firestore Schema

* There's only 1 collection with the name `urlMaps` with an `<autoId>` document.
* Each document will have the following structure.

``` 
{
    "createdAt": 1573414701472,
    "creator":"eAueexFm6be2r3kd3abDNMyhI9H2",
    "hits": 10,
    "originalUrl": "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes",
    "shortId": "e144ce220",
}
```

* `createdAt` field is the server unix `timestamp` at the time of creation of this document.
* `creator` is the `uid` of the user who created this doc.
* `hits` is the count the short url was accessed.
* `originalUrl` is the original url that was sent in the request.
* `shortId` is the shortened code for this url. This id is guaranteed to be be unique during creation time.

## Firebase Hosting Config

* The urls are configured with the Firebase Cloud Functions.
* Any request to the connected domain hits the /redirect cloud function which then reads the shortId from the database and redirects the user to the appropriate url.

``` 
// .firebase.json
{
    "cleanUrls": true,
    "trailingSlash": false,
    "ignore": [
      "firebase.json",
      "explorer firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "public": "public",
    "rewrites": [
      {
        "source": "/*",
        "function": "redirector"
      }
    ]
  }
```

* The `rewrites` section in this json does all the work. Basically anything in front of the `/` of our default domain will trigger the `redirector` cloud function.

## License

[MIT License](./LICENSE)
