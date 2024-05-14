import { Auth } from "aws-amplify";

export const login = async () => {
    await Auth.federatedSignIn();
};

export const logout = async () => {
    console.debug("sign out")
    await Auth.signOut();
};

export interface AuthenticatedUser {
    userName: string;
    name?: string;
    surname?: string;
    groups: string[];
    email: string;
}

export const getIdJwtToken = async () => {
    // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
};

export const getCurrentAuthenticatedUserFromCognito = async (): Promise<AuthenticatedUser | undefined> => {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        return extractUserInfoFromCognito(currentUser);
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const extractUserInfoFromCognito = (user: any): AuthenticatedUser => {
    if (!user) throw Error("No user info from Cognito");

    const groups: string[] =
        user.signInUserSession.idToken.payload["cognito:groups"] || [];

    const username = user.username as string;
    const payload = user.signInUserSession.idToken.payload;
    const userObj = {
        userName: username,
        name: payload["given_name"],
        surname: payload["family_name"],
        groups: groups,
        email: payload["email"],
    } as AuthenticatedUser;

    return userObj;
};