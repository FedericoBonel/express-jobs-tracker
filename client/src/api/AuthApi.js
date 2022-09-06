const AUTH_URI = "http://localhost:5000/api/v1/auth/login";

/**
 * Authenticates user information and returns response status and response payload
 * if an error ocurred returns response status and null data
 */
const authenticate = async (userInformation) => {
    try {
        const response = await fetch(AUTH_URI, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userInformation),
        });
        const responseStatus = response.status;
        const { success, data } = await response.json();
        return {
            status: responseStatus,
            data: success ? data : null,
        };
    } catch (err) {
        console.log(err);
    }
};

export { authenticate };
