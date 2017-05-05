import React, { Component } from 'react'
import ReactNative from 'react-native'
import BackgroundFetch from "react-native-background-fetch"

export function fetchBackground() {
// Configure it.
    BackgroundFetch.configure({
      stopOnTerminate: false
    }, function() {
      console.log("FACK MA MOMMA");

      // To signal completion of your task to iOS, you must call #finish!
      // If you fail to do this, iOS can kill your app.
      BackgroundFetch.finish();
    }, function(error) {
      console.log("[js] RNBackgroundFetch failed to start");
    });
}
