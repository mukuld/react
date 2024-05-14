
import { useNavigate } from "react-router-dom";
import { RadioGroup, Button, SpaceBetween, Container, Header } from "@cloudscape-design/components";
import { useState } from "react";
import Voiceortext from "../components/voiceortext";


function Entrypage() {
    const navigate = useNavigate();
    const [value, setValue] = useState("voice")
    
    return (

        <SpaceBetween size="m">
            <Header variant="h1">GenAI Powered Smart Education Assistant</Header>

            <RadioGroup 
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
                items={[
                    {
                        value: "voice",
                        label: "Voice to Text",
                        description: "Use this option to generate course using voice"
                    },
                       {
                        value: "text",
                        label: "Text to Generate",
                        description: "Use this option to generate course using text entry"
                    }
                ]}
            />
            <SpaceBetween direction="horizontal" size="s">
                Selection is: {value}
                </SpaceBetween>
            <Voiceortext value={value} />
        </SpaceBetween>

    )
}

export default Entrypage
