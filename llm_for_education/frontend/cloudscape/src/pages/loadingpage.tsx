
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useNavigate } from "react-router-dom";

function Page2() {
    const navigate = useNavigate();
    return (
        <SpaceBetween size="m">
            <Header variant="h1">Page 2</Header>
        </SpaceBetween>
    )
}

export default Page2
