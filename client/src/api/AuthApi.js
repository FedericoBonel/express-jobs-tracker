const AUTH_URI = "http://localhost:5000/api/v1/auth";

/**
 * Authenticates user information and returns response status and response payload
 * if an error ocurred returns response status and null data
 */
const authenticate = async (userInformation) => {
    try {
        const response = await fetch(`${AUTH_URI}/login`, {
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
        console.log(`Error while authenticating: ${err}`);
    }
};

const registerUser = async (user) => {
    try {
        const response = await fetch(`${AUTH_URI}/register`, {
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(user),
        });

        const responseStatus = response.status;
        const { data } = await response.json();

        return {
            status: responseStatus,
            data: responseStatus === 201 ? data : null,
        };
    } catch (error) {
        console.log(`Error while registering new user: ${error}`);
    }
};

export { authenticate, registerUser };
