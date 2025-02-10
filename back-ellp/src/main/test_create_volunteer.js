import axios from "axios";

const testCreateVolunteer = async () => {
  try {
    const response = await axios.post("http://localhost:5000/volunteers", {
      name: "Test Volunteer",
      email: "testvolunteer@example.com",
    });
    console.log(" Voluntário criado com sucesso:", response.data);
  } catch (error) {
    console.error(" Erro ao criar voluntário:", error.response?.data || error.message);
  }
};

testCreateVolunteer();