import {
  Box,
  Button,
  Input,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DATA } from "../redux/reducers/dbSlice";
import formattedDateTime from "../utiles/dateFormater";

function DataEntry({ handleModalState, isModaOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    discription: "",
    createdAt: "",
    finishedAt: "Not finished yet",
    completed: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateUniqueId = () => {
    try {
      const timestamp = new Date().toISOString();
      const uniqueId = `id_${timestamp}_${Math.floor(Math.random() * 1000)}`;
      return uniqueId;
    } catch (error) {
      console.error("Error generating unique ID:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      createdAt: formattedDateTime(),
      id: generateUniqueId(),
    };

    console.log("Form submitted:", updatedFormData);
    dispatch(ADD_DATA(updatedFormData));
    setFormData({
      title: "",
      discription: "",
      createdAt: "",
      finishedAt: "Not finished yet",
      completed: false,
    });
    handleModalState();
  };

  const { mode } = useSelector((state) => state.theme);

  return (
    <div>
      <Modal
        open={isModaOpen}
        onClose={handleModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center px-5"
      >
        <Box
          className={`flex gap-5 justify-center items-center flex-col  ${
            mode == "dark" ? "bg-black text-white" : "bg-white"
          } text-white p-5 rounded-lg w-3/5 min-w-[300px]`}
        >
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="discription"
                className="block text-sm font-medium text-white"
              >
                discription
              </label>
              <TextareaAutosize
                minRows={4}
                placeholder="Discription"
                name="discription"
                value={formData.discription}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md resize-y focus:outline-none focus:border-blue-500 text-black"
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default DataEntry;
