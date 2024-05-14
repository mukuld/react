import React, { useState } from 'react'
import axios from 'axios'

const URL = "https://6cjq3wqlwpx7vgejcmdgbnphse0gawjz.lambda-url.us-east-1.on.aws/"

export default function ReadResponse() {
    const [response, setResponse] = useState([])
    axios.get(URL).then(res => {
        setResponse(res.data.Response)
    })
    console.log("Response is: ", response)
    return (
          <div>
            {/* console.log(response) */}
           </div>
  )
}
