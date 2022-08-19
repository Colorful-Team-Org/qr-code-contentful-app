# QR Code app

This app renders preview links in the Contentful web app as QR codes allowing editors to preview draft content and unpublished changes on mobile devices.

The app is designed to be used in the sidebar section of the web app. In addition to rendering a QR code, the app can display a short help text. 

URLs with custom prefixes will be displayed as read-only QR codes. When provided URLs begin with the prefix `http://` or `https://` editors can click on the QR code to open the preview link in the browser.

Preview links can be added to multiple content types and the app supports multiple configurations per content type. This is useful when you want to add different preview environments to the same entry, for example, iOS app & Android app, Legacy app & new app, Staff app & Public app.

To find more about working with previews in the Contentful web app, read the [official documentation](https://www.contentful.com/help/setup-content-preview/).

## Set up

The app can be installed in any space using the installation link below:

https://app.contentful.com/deeplink?link=apps&id=2MSfdMlOwZxcIHnkGz4qRg
 
After installation, create a new preview configuration by adding the preview URL and selecting supported content types from the list. Note that only the content types you select will display the QR code in the sidebar.

For dynamic parts of the preview URL, use tokens like 
`{entry.sys.id}`, `{entry.fields.slug}`, `{entry.fields.environment}` and so on. These tokens will be resolved to a correct URL when rendering the QR code. 

For example, if your preview URL structure is `http://my-domain.com/article/{entry.fields.slug}` the the entry with the slug `fall-2022-hackathon-winners` will display a QR code for the URL `http://my-domain.com/article/fall-2022-hackathon-winners`.

You will find the list of available _tokens_ in the sidebar of the configuration view.

![App setup](/documentation/Screenshot-app-setup.png)

![App setup](/documentation/Screenshot-qrcode-config.png)

![Contentful entry](/documentation/Screenshot-entry.png)

## Dev notes

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is   
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set: 

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)


Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.
