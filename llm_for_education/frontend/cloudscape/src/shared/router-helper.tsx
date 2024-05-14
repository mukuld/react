import { getCurrentAuthenticatedUserFromCognito } from "./auth-helper";

export const getUserData = async () => {
    console.debug("[ROUTING] GET USER DATA");
    const cognitoUser = await getCurrentAuthenticatedUserFromCognito();
    console.debug("cognito user", cognitoUser);
    if (!cognitoUser) {
        return {};
    }
    console.debug("ret user", cognitoUser);
    return ({ cognitoUser });
}