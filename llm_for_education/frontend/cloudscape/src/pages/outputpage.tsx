import React from 'react'
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
// import { useNavigate } from "react-router-dom";
import ReadResponse from '../components/readResponse';

export default function Page3() {
    // const navigate = useNavigate();
  return (
    <SpaceBetween size="m">
      <Header variant="h1">Page 3</Header>
      <ReadResponse/>
          <Container></Container>
          <Button onClick={()=>console.log("I've been clicked")}>Click me</Button>
        </SpaceBetween>
  )
}
