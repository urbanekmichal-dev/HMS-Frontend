// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
//apiBaseUrl: 'http://hotelmanagementsystem-env.eba-mc24nyan.us-east-1.elasticbeanstalk.com/'
  apiBaseUrl: 'http://localhost:8083/',
  S3url: 'https://hmsphotos.s3.amazonaws.com/'
  //apiBaseUrl: 'http://hotelmanagementsystem-env.eba-mc24nyan.us-east-1.elasticbeanstalk.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
