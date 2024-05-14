# Demo Skeleton

Minimal skeleton for a SPA React website using Cloudscape

Features:

- Cloudscape design
- Navigation
- Authentication and Login page
- Amplify integrated for auth

Based on:

- Typescript 5
- Yarn 4
- Vite
- React 18

## Setup

1- install dependencies

~~~bash
yarn set version stable
yarn install
~~~

To have yarn and typescript working on vs code execute `yarn dlx @yarnpkg/sdks vscode` and when asked select the workspace version.

2 - configure auth

edit the `./src/.env` file to point to a cognito users pool:

~~~env
VITE_CONFIG_COGNITO_CALLBACK_URL=http://localhost:3000/
VITE_CONFIG_COGNITO_CUSTOM_DOMAIN=EDIT_ME
VITE_CONFIG_COGNITO_IDENTITYPOOL_ID=EDIT_ME
VITE_CONFIG_COGNITO_LOGOUT_URL=http://localhost:3000/
VITE_CONFIG_COGNITO_USERPOOL_ID=EDIT_ME
VITE_CONFIG_COGNITO_APPCLIENT_ID=EDIT_ME
VITE_CONFIG_COGNITO_IDENTITYPOOL_ID=EDIT_ME
VITE_REGION=us-east-1
~~~

3 - execute locally

~~~bash
yarn dev
~~~