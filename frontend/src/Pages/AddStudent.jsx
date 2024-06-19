import { useState } from "react";
import axios from "axios";
import SERVER_URL from "../ServerURL";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { enqueueSnackbar } from "notistack"; // Import Snackbar hook
import { MdContactMail } from "react-icons/md";
import Spinner from "../components/Spinner";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const data = { name, email, contact };
      setLoading(true);
      const resp = await axios.post(`${SERVER_URL}/user`, data);
      console.log(resp.data);
      setLoading(false);
      enqueueSnackbar("Student Added Succcessfully", { variant: "success" });
      navigate("/user");
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        Add New Student
      </h1>
      {loading ? <Spinner/>: ""}
      <div className="flex flex-col border-2 border-sky-300 rounded-sm w-[600px] p-4 mx-auto my-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Email Id</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-600 m-8 text-white rounded-sm"
          onClick={handleSave}
        >
          Save
        </button>
        <BackButton />
      </div>
    </>
  );
};

export default AddStudent;
