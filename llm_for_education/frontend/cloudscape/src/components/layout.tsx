
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { AuthenticatedUser } from "../shared/auth-helper";
import { Alert, Button, Container, Header, SpaceBetween, SideNavigation, SideNavigationProps, TopNavigation, TopNavigationProps, AppLayout } from "@cloudscape-design/components";
import { login, logout } from "../shared/auth-helper";
import logo from "../assets/logo-white.png";
import logoBig from "../assets/logo-big.png";

import React from "react";
import Page1 from "../pages/entrypage";

function Layout() {

    let { cognitoUser } = useLoaderData() as {
        cognitoUser: AuthenticatedUser | null;
    };

    const navigate = useNavigate();

    // navigation / side menu
       const navItems = [
           {
               type: 'section',
               text: 'Manage',
               href: "#",
               items: 
                   [
                   { type: 'link', text: 'Entry Page', href: '/entrypage', },
                   { type: 'link', text: 'Page 2', href: '/loadingpage', },
                   { type: 'link', text: 'Output', href: '/outputpage', },
          ],
        } as SideNavigationProps.Section,
      ];
    
    // const navItems = [
    //     { type: "link", text: "Entry Page", href: "/entrypage", },
    //     { type: 'link', text: 'Output', href: '/outputpage', },
    //     { type: "link", text: "Test Speech", href: "/loadingpage" }
    // ]

    const i18nStrings = {
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
    };

    const profileActions = [
        { type: 'button', id: 'documentation', text: 'Documentation' },
        { type: 'button', id: 'signout', text: 'Sign out', onclick: ()=>logout() },
    ];

    let utilities: TopNavigationProps.Utility[] = [];
    // login component
    let content: JSX.Element = <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 30,
        alignItems: "center",
    }}>
        <div>
            <img src={logoBig} alt="aws logo" width={300} />
        </div>
        <div>
            <Button onClick={login}>Login</Button>
        </div>
        {/* <Container>
            <Button onClick={() => alert("I've been clicked")}>Click me</Button>
        </Container> */}
    </div>


    let navigation = <SideNavigation items={navItems} activeHref="#"></SideNavigation>;

    content = <Outlet />;
    
    // authenticated content
    // if (cognitoUser !== null && cognitoUser !== undefined) {
    //     // logged in scenario, adding top right menu
    //     utilities = [
    //         { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
    //         {
    //             type: 'menu-dropdown',
    //             text: `${cognitoUser.userName}`,
    //             description: cognitoUser.email,
    //             iconName: 'user-profile',
    //             items: profileActions,
    //         },
    //     ]
    //     // authenticated
    //     content = <Outlet />;
    // }

    return (
        <React.Fragment>
            <TopNavigation
                i18nStrings={i18nStrings}
                identity={{
                    href: '/',
                    title: 'LLM for Education',
                    logo: { src: logo, alt: 'Demo name' },
                }}
                utilities={utilities}
            />
            <AppLayout
                toolsHide
                stickyNotifications
                toolsOpen={false}
                contentType="table"
                content={ <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "90vh",
                    flexGrow: 1,
                }}>{content}</div>}
                navigation={navigation}
            />
        </React.Fragment>

    )
}

export default Layout
