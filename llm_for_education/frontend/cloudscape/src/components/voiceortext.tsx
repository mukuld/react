import React, {useState} from 'react'
import ReturnVoice from './returnVoice';
import ReturnText from './returnText';

  export default function Voiceortext(props: { value: string; }) {
     

    if (props.value === "voice") {
      return (
        <ReturnVoice  />
      );
    }
    return (
      <ReturnText />
    )
  }