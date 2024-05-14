import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logoBig from "../assets/logo-big.png";
import { login, logout } from "../shared/auth-helper";
import { fontSizeHeadingXl } from "@cloudscape-design/design-tokens";

function Home() {
    
    return (<div>    
        <div>

            <Header>
            The Cloud Guru
            </Header>
            <br></br>
            <br></br>
            <br></br>
            {/* <Button onClick={login}>Login</Button> */}
        </div>
    <div>
        <img src={logo} alt="aws logo" width={100} />
    </div>
    </div>)
    
}

export default Home