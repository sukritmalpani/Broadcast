import React, { useState } from "react";
import axios from "axios";

export default function Publisher() {
  const [stream, setStream] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  async function init() {
    console.log("OK");
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(mediaStream);
    document.getElementById("video").srcObject = mediaStream;
    const peer = createPeer();
    mediaStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, mediaStream));
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };
    console.log("Here");
    const { data } = await axios.post(
      "http://localhost:5000/broadcast",
      payload
    );

    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function togglePause() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (isPaused) {
          track.enabled = true;
        } else {
          track.enabled = false;
        }
      });
      setIsPaused(!isPaused);
    }
  }

  return (
    <div className="flex  bg-[#44455B] flex-row min-h-screen justify-center items-center h-full">
      <div className="flex rounded-lg p-5 flex-row min-h-screen min-w-full justify-around items-center h-full">
        <div className=" bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-700 p-4 w-6/12 h-full">
          <div className="rounded-lg bg-white p-2">
            <video className="rounded-lg w-full" autoPlay id="video"></video>
          </div>
          <button
            className="mt-4 ml-20 mr-20 bg-[#FFB001] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            id="my-button"
            onClick={init}
          >
            Start
          </button>
          <button
            id="pause-button"
            className="mt-4 ml-15 mr-20 bg-[#F9AB40] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={togglePause}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        <div className="bg-gradient-to-r rounded-lg from-purple-800 to-blue-700 p-2 h-full">
          <div className="rounded-lg bg-white p-2 h-[40rem] w-96">
            {/* <video className="rounded-lg" autoPlay id="video"></video> */}
          </div>
        </div>
      </div>
    </div>
  );
}
