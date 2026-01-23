import { useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

export const useUserSession = () => {
    
    const startSession = useCallback(async () => {
        try {
            // Get device and browser information
            const userAgent = navigator.userAgent;
            const getBrowserInfo = () => {
                let browserName = "Unknown";
                let osName = "Unknown";

                if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox";
                else if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome";
                else if (userAgent.indexOf("Safari") > -1) browserName = "Safari";
                else if (userAgent.indexOf("Edge") > -1) browserName = "Edge";

                if (userAgent.indexOf("Windows") > -1) osName = "Windows";
                else if (userAgent.indexOf("Mac") > -1) osName = "macOS";
                else if (userAgent.indexOf("Linux") > -1) osName = "Linux";
                else if (userAgent.indexOf("Android") > -1) osName = "Android";
                else if (userAgent.indexOf("iPhone") > -1) osName = "iOS";

                return { browserName, osName };
            };

            const { browserName, osName } = getBrowserInfo();

            console.log("Device Info:", { browserName, osName });

            const response = await axios.post(
                `${API_BASE}/user-sessions/start`,
                {
                    device_name: `${browserName} on ${osName}`,
                    browser: browserName,
                    os: osName,
                    device_fingerprint: generateDeviceFingerprint(),
                },
                { withCredentials: true }
            );

            console.log("User session started:", response.data);

            if (response.data?.session_token) {
                sessionStorage.setItem("session_token", response.data.session_token);
                console.log("Session token stored in sessionStorage");
                return response.data.session_token;
            }
        } catch (error) {
            console.error("Error starting user session:", error);
            throw error;
        }
    }, []);

    const endSession = useCallback(async () => {
        try {
            const sessionToken = sessionStorage.getItem("session_token");

            if (!sessionToken) {
                return;
            }

            await axios.post(
                `${API_BASE}/user-sessions/end`,
                { session_token: sessionToken },
                { withCredentials: true }
            );

            sessionStorage.removeItem("session_token");
        } catch (error) {
            console.error("Error ending user session:", error);
            // Still remove token even if API call fails
            sessionStorage.removeItem("session_token");
        }
    }, []);

    // Listen for page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            endSession();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [endSession]);

    return {
        startSession,
        endSession,
    };
};

// Helper function to generate a unique device fingerprint
const generateDeviceFingerprint = (): string => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    const timestamp = new Date().getTime();

    const fingerprint = `${screenResolution}-${timezone}-${language}-${timestamp}`;
    return btoa(fingerprint); // Base64 encode for compact storage
};
