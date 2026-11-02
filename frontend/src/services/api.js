
const API_BASE_URL = "http://localhost:8080/api";

// Get all societies
export const getSocieties = async () => {
    const response = await fetch(`${API_BASE_URL}/societies`);

    if (!response.ok) {
        throw new Error("Failed to fetch societies");
    }

    return response.json();
};

// Add a new society
export const addSociety = async (societyData) => {
    const response = await fetch(`${API_BASE_URL}/societies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(societyData)
    });

    if (!response.ok) {
        throw new Error("Failed to add society");
    }

    return response.json();
};
