# Mobile app for CardDealer technical assignment (ignore this if you chose to implement for web)

## To get started

```
cd ./mobile-client
npm install
```

## To test the app

We have setup the skeleton of an Expo-based React-Native mobile app. Feel free to not use Expo, but in our experience it makes things much easier. 

Steps:
- Download the Expo Go app on your iphone or android
- Run `npm run start` on your computer to start the development server
- Use your phone's camera to scan the QR code and start running the app
- Follow these instructions if you run into issues: https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet

Fallback:
If the above does not work for you, try this:
- Install localtunnel : https://formulae.brew.sh/formula/localtunnel
- Run `lt --port 4000` to start a publically accessible tunnel to your computer
- Hardcode the resulting url as URL const in apolloGqlClient.ts 

If everything is working correctly, you should see a simple app with example data fetched from your server. Make sure the server is running at the same time. If you run into issues here, please feel free to contact us as debugging the raw setup is not the intent of the exercise.

In order to test as both Player A and Player B at same time, you might want to have two different phones. Alternatively, you can use the iPhone or Android simulator.