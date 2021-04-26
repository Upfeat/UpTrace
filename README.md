**Running this Project on Your Machine**
Before hosting the app on google cloud, you must configure a few things

**First Steps**
* Download the project from this repo
* Navigate to the google cloud console under the google account the project will be hosted under 
* Create a new project, then enable billing for that project and link a valid billing account
* Keep the project ID handy as you will need it for many things 

**Setting up the Google Cloud CLI**
* Download the Google Cloud SDK to your computer, you may need to refer to the docs for this step(It is different for Windows/Mac/Linux) 
* Sign into your google account using 'gcloud auth login'
* Link the CLI to your project using 'gcloud config set project [PROJECT_ID]'

* *This project uses a few google cloud APIs such as: **App Engine**, **Cloud Functions**, **Firestore**, **Secrets Manager**, **Google Maps***
    * **Setting up App Engine**
        * Navigate to the app engine page 
        * Create a new application hosted in us-central, with a runtime of nodejs and a standard environment
        * Wait for the google to create the app 

    * **Setting up Cloud Functions**
        * Navigate to the cloud functions page
        * Wait for google to finish the initialization steps
        * *These next steps require the CLI to have been successfully configured*
        * From the projects root folder, navigate to UpTraceCloudFunctions/acs
        * Certain fields in this file need to be changed to match the new environment: PROJECT_ID, APP_URL
        * To deploy the function, run the command: 'gcloud functions deploy acs --runtime nodejs10 --trigger-http --allow-unauthenticated'

    * **Setting up Firestore**
        * Navigate to the datastore page
        * In the top section of the screen, there should be a button that says 'SWITCH TO NATIVE MODE', select it
        * Navigate to https://console.firebase.google.com/u/0/ and if logged into the correct account select "Add project"
        * Your project name should appear in the dropdown selection, select it and hit continue
        * Confirm the 'Pay as you go' Blaze plan and hit "Confim Plan" 
        * Finish the remaining steps in the "Create a project" flow, the decision is yours on whether you want to add Google Analytics when it prompts you
        * Once the project is ready, click the cog icon in the top left and hit "Project settings"
        * In the "General" tab under the "Your apps" section click the web icon from the list of iOS-Andriod-Web-Unity icons
        * Enter your apps name, keep "Firebase Hosting" unchecked and hit the register button
        * You should be presented with a code snipped containing your firebaseConfig object. Save that somewhere handy
        * From the root folder, navigate to the UpTraceNuxt folder and open it from your choice of IDE
        * From within the IDE, navigate to plugins/firebase.js and replace the firebaseConf object with the one you saved

    * **Setting up Secret Manager**
        * Navigate to the Secret Manager API page
        * Enable the secret Manager API
        * Create the following 4 secrets:
        * Name: SecretIDP Value: Metadata provided by the identity provider
        * Name: SecretSP Value:  Metadata provided by the service provider
        * Name: SecretAT Value:  An access token
        * Name: SecretRT Value:  A refresh token
        * After the secrets have been created navigate to the IAM page on the gcloud console
        * Press the "Edit member" icon for your email address
        * Select "Add role" and add the "Secret Manager Admin" role to your account 
        * Press the "Edit member" icon for the apps service account
        * Select "Add role" and add the "Secret Manager Admin" role to your apps service account

    * **Setting up Google Maps** 
        * Navigate to the Google Maps platform page in the gcloud console, you should see a list of APIs
        * Enable the "Maps JavaScript" API
        * Enable the "Places" API
        * Click on the "Credentials" tab
        * At the top of it, there is a "CREATE CREDENTIALS" button, once clicked it will generate an API key for you
        * From the root directory of the project folder, from within your IDE, navigate to UpTraceNuxt/components/GoogleMapsController.vue
        * Replace the data field "apiKey" with the generated API key

    * **Deploying the app to App Engine**
        * From the root directory of the project, navigate to UpTraceNuxt
        * Make sure the dependancies have been installed by running "npm install" in the command line  
        * Run the command "npm run deploy" to deploy to app engine
    
    * **Running the app locally**
        * Run the command "npm run dev" to start a local development server
    * **Getting the metadata**
        * Look here to get started: https://samlify.js.org/#/basic




