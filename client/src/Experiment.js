import React, { useState, useEffect } from "react";
import Consent from "./Consent";
import DemoSurvey from "./DemoSurvey";
import Ratings from "./Ratings";
import Debrief from "./Debrief";
import io from "socket.io-client";
import Video from "./Video";

const socket = io.connect("http://localhost:3001");

function Experiment() {
    const [idsReady, setIdsReady] = useState([]);
    const [page, setPage] = useState(1);
    const [room, setRoom] = useState("");
    const [responses, setResponses] = useState([]);
    const stimOrder = ["dominant", "bossy", "trustworthy", "happy"];
    const [demoData, setDemoData] = useState({
        age: "",
        education: "",
        gender: "",
        sex: "",
        ethnicity: "",
        race: [],
    });

    const nextPage = () => {
        setPage(page + 1);
    };

    const buttonClick = () => {
        socket.emit("nextPageClicked", room);
    };

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("joinRoom", room);
            console.log("joined ", room);
        }
    };

    useEffect(() => {
        /* When both participants are done, move to next page */
        if (idsReady.length === 2) {
            nextPage();
            setIdsReady([]);
        }
    }, [idsReady]);

    useEffect(() => {
        socket.on("nextPageReady", (id) => {
            setIdsReady((idsReady) => [...new Set([...idsReady, id])]);
        });
    }, [socket]);

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;

            case 2:
                return (
                    <Ratings
                        nextPage={nextPage}
                        stimOrder={stimOrder}
                        responses={responses}
                        setResponses={setResponses}
                    />
                );
            case 3:
                return (
                    <DemoSurvey
                        nextPage={nextPage}
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            case 4:
                return <Video />;
            case 5:
                return <Debrief />;
            default:
        }
    };
    /*
    case 2:
                return (
                    <Ratings
                        nextPage={nextPage}
                        stimOrder={stimOrder}
                        responses={responses}
                        setResponses={setResponses}
                    />
                );
    */

    return (
        <div>
            {conditionalComponent()}
            <input
                placeholder="Room Number..."
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            <button onClick={buttonClick} type="button">
                Next
            </button>
            <button onClick={joinRoom} type="button">
                Join Room
            </button>
        </div>
    );
}

export default Experiment;
