import { RouteObject, defer } from "react-router-dom";
import Layout from "./components/layout";
import Entrypage from "./pages/entrypage";
import Loadingpage from "./pages/loadingpage";
import Outputpage from "./pages/outputpage";
import Home from "./pages/homepage";
import { getUserData } from "./shared/router-helper";

// ROUTES
export const routes = [{
    path: "/",
    element: <Layout />,
    errorElement: <h1> Error</h1>,
    loader: getUserData,

    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "/entrypage",
            element: <Entrypage />,

        },
        {
            path: "/page2",
            element: <Loadingpage />,

        },
        {
            path: "/outputpage",
            element: <Outputpage />
    }]
}] as RouteObject[];


// AUTH SETTINGS
// @ts-ignore
export const [_, domain] =
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/.exec(
        import.meta.env.VITE_CONFIG_COGNITO_CALLBACK_URL!,
    );

export const amplifyConfigBase = {
    aws_project_region: import.meta.env.VITE_REGION,
    aws_cognito_region: import.meta.env.VITE_REGION,
    federationTarget: "COGNITO_USER_POOLS",
    aws_appsync_graphqlEndpoint:
        import.meta.env.VITE_CONFIG_APPSYNC_URL || "none",
    aws_appsync_region: import.meta.env.VITE_REGION,
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        domain: domain,
        // OPTIONAL - Cookie path
        path: "/",
        // OPTIONAL - Cookie expiration in days
        expires: 1,
        // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        sameSite: "strict",
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        secure: true,
    },
    aws_cognito_identity_pool_id: import.meta.env
        .VITE_CONFIG_COGNITO_IDENTITYPOOL_ID,
    aws_user_pools_id: import.meta.env
        .VITE_CONFIG_COGNITO_USERPOOL_ID,
    aws_user_pools_web_client_id: import.meta.env
        .VITE_CONFIG_COGNITO_APPCLIENT_ID,

    oauth: {
        domain:
            import.meta.env.VITE_CONFIG_COGNITO_CUSTOM_DOMAIN +
            ".auth." +
            import.meta.env.VITE_REGION +
            ".amazoncognito.com",
        scope: ["openid", "profile"],
        redirectSignIn: import.meta.env
            .VITE_CONFIG_COGNITO_CALLBACK_URL,
        redirectSignOut: import.meta.env
            .VITE_CONFIG_COGNITO_LOGOUT_URL,
        responseType: "token",
    },
};
