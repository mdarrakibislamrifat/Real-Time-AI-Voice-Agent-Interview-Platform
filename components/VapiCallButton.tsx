"use client";

import { Vapi } from "@vapi-ai/web";
import { useEffect, useRef } from "react";

const VapiCallButton = () => {
    const vapiRef = useRef<Vapi | null>(null);

    useEffect(() => {
        const vapi = new Vapi();
        vapiRef.current = vapi;

        // Optional: listen to events like call started or ended
        vapi.on("call-start", () => {
            console.log("Call started!");
        });

        vapi.on("call-end", () => {
            console.log("Call ended.");
        });

        return () => {
            vapiRef.current?.end(); // Clean up
        };
    }, []);

    const handleCall = async () => {
        try {
            await vapiRef.current?.start(
                undefined,
                undefined,
                undefined,
                process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
                {
                    variableValues: {
                        username: "Rakib",
                        userid: "rakib-001",
                    },
                }
            );
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };

    return (
        <button
            onClick={handleCall}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-5"
        >
            Start Workflow Call
        </button>
    );
};

export default VapiCallButton;
