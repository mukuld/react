import { useEffect } from "react";
import { amplifyConfigBase, routes } from "./configs";
import { Amplify, Hub } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


export default function App() {

    // auth init
    // the .env file must be edited with the correct values 

    // default config
    const amplifyConfig = amplifyConfigBase;

    // for localhost work
    if (window.location.hostname.includes("localhost")) {
        // replace redirect urls
        amplifyConfig.cookieStorage.domain = "localhost";
        amplifyConfig.oauth.redirectSignIn = "http://localhost:3000/";
    }
    console.debug("amplify config", amplifyConfig);
    Amplify.configure(amplifyConfig);


    const router = createBrowserRouter(routes);

    //listen for main auth events
    useEffect(() => {
        Hub.listen("auth", async (message) => {
            const {
                payload: { event, data },
            } = message;

            console.debug("[AUTH] processing event", event);
            switch (event) {
                case "cognitoHostedUI":
                    break;
                case "signIn":
                    console.debug("[AUTH] signed in", event);
                    break;
                case "signIn_failure":
                case "signOut":
                    console.debug("[AUTH] signout", data);
                    break;
                case "customOAuthState": {
                    // redirect to original page
                    if (data !== "/") {
                        console.debug("[AUTH] redirecting to ", data);
                        window.location.replace(data);
                    }
                    break;
                }
                default:
                    break;
            }
        });
    }, []);

    return (
        <RouterProvider router={router} />
    );
}