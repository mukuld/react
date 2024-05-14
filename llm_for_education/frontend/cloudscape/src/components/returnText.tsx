import React, { useEffect, useState } from "react"
import { Button, Input, Textarea, Spinner, Container } from '@cloudscape-design/components'
import axios from "axios"

const URL = "https://6cjq3wqlwpx7vgejcmdgbnphse0gawjz.lambda-url.us-east-1.on.aws/"



export default function ReturnText() {
    const [value, setValue] = useState("");
    const [response, setResponse] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const sendToApi = async (value: any) => { 
        setResponse("")
        setIsloading(true)
    // let textstring = JSON.stringify({"question": value.transcript })
    let textstring = { "question": value }
    
    const apiResponse = await axios.post(URL,textstring )
  
    console.log("Value sent is: ", textstring)
    console.log("Value response: ", apiResponse)

        setResponse(apiResponse.data.Response);
        setIsloading(false)
    }

    // let textInput = value
    // console.log(textInput)
    return (
      <>
    <Input
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      placeholder="Enter your text"
      />
            <Button variant='primary' onClick={() => sendToApi(value)}>Submit</Button>
            {isLoading && (<Spinner  />)}
      
            <Container>{response}</Container>
      </>
  );
}