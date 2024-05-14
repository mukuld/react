import React, {useState, useEffect} from 'react'
import { Button, Input, SpaceBetween, Spinner, Textarea, Container } from '@cloudscape-design/components'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios"

const URL = "https://6cjq3wqlwpx7vgejcmdgbnphse0gawjz.lambda-url.us-east-1.on.aws/"



// async function ReadResponse() {
//     const response =  await axios.get(URL)
//     console.log("Response is: ", response)
//     return response;
// }

export default function ReturnVoice() {
    const [response, setResponse] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();



    const sendToApi = async (value: any) => { 
        setResponse("")
        setIsloading(true)
    // let textstring = JSON.stringify({"question": value.transcript })
    let textstring = { "question": value.transcript }

    SpeechRecognition.stopListening()
    const apiResponse = await axios.post(URL,textstring )
  
    console.log("Value sent is: ", textstring)
    console.log("Value response: ", apiResponse)

        setResponse(apiResponse.data.Response);
        setIsloading(false)
}

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
      <>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
            <div>
        <Textarea
          value={transcript}
          disabled>
        </Textarea>

        <SpaceBetween direction='horizontal' size="s">
          <Button variant='primary' onClick={() => SpeechRecognition.startListening({
              continuous: true,
              language: "en-US"
            })}>Click here to record.</Button>
            <Button variant='primary' onClick={() => { sendToApi({ transcript }) }}>Click here to stop and Submit.</Button>
            <Button variant='primary' onClick={() => resetTranscript()}>Reset</Button>
            {isLoading && (<Spinner  />)}
      
            <Container>{response}</Container>
            </SpaceBetween>
        </div>
      </>
    )
}
