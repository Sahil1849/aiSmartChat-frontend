import React, { useContext, useEffect, useState, useRef } from "react";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "../config/axios.config";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { RiCloseLine } from "react-icons/ri";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket.config";

const Project = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const projectId = useRef(null);
  const location = useLocation();

  useEffect(() => {
    projectId.current = location.state?.project?._id;
    if (!projectId.current) return;

    initializeSocket(projectId.current);

    receiveMessage("project-message", (data) => {
      console.log("data: ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Cleanup socket listeners when component unmounts
      receiveMessage("project-message", null);
    };
  }, [location.state?.project?._id]);

  useEffect(() => {
    if (!projectId.current) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [{ data: projectData }, { data: userData }] = await Promise.all([
          axios.get(`/project/${projectId.current}`),
          axios.get("/user/all"),
        ]);

        setProjects(projectData?.project);
        setUsers(userData?.users);
      } catch (error) {
        console.error("Error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.project?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserSelection = (userId) => {
    setSelectedUserId((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const addCollaborators = async () => {
    try {
      await axios.put("/project/add-user", {
        projectId: projectId.current,
        users: selectedUserId,
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const send = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      message: inputValue,
      sender: user,
    };
    sendMessage("project-message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  return (
    <main className="h-screen w-screen flex">
      {/* Left Sidebar */}
      <section className="relative w-[30%] bg-gray-200 flex flex-col">
        {/* Header */}
        <header className="p-2 px-4 flex justify-between items-center bg-purple-700">
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-bold flex gap-2 items-center"
          >
            <IoMdPersonAdd />
            Add Collaborator
          </button>
          <button
            onClick={() => setShowSidePanel(true)}
            className="p-2 bg-purple-400 rounded-full"
          >
            <FiUsers className="text-white" size={20} />
          </button>
        </header>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender?._id === user?._id ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`p-3 rounded-md max-w-[75%] ${
                    msg.sender?._id === user?._id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <small className="block mb-1">~ {msg.sender?.email}</small>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="p-4 flex items-center gap-2 bg-gray-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => e.key === "Enter" && send(e)}
          />
          <button
            onClick={send}
            disabled={!inputValue.trim()}
            className={`p-2 rounded-md ${
              inputValue.trim()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <IoIosSend size={22} />
          </button>
        </div>

        {/* Side Panel */}
        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-gray-200 absolute transition-all ${
            showSidePanel ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-purple-600">
            <h1 className="font-semibold text-white text-lg">Collaborators</h1>

            <button
              onClick={() => setShowSidePanel(!showSidePanel)}
              className="p-2 text-white bg-purple-400 rounded-full"
            >
              <RiCloseLine />
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            {projects.user &&
              projects.user.map((users) => {
                console.log(users);
                return (
                  <div className="user hover:bg-slate-100 p-2 flex gap-2 items-center">
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-2 text-white bg-purple-400">
                      <FaRegUser />
                    </div>
                    <h1 className="tracking-wide">{users.email}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Right Content Area */}
      <section className="w-full md:w-[70%] bg-white flex flex-col justify-center items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Project Details</h1>
        <p className="text-gray-600">
          {projects.description || "No details available for this project."}
        </p>
      </section>

      {/* Users Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[90%] space-y-4  max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Collaborator
            </h2>
            <div className="space-y-3 max-h-72 px-2 overflow-y-auto">
              {users?.map((user) => (
                <button
                  key={user.email}
                  onClick={() => handleUserSelection(user._id)}
                  className={`flex w-full items-center justify-between p-2 rounded-md border-2 hover:bg-gray-200 ${
                    selectedUserId.includes(user._id) ? "bg-gray-300" : ""
                  }`}
                >
                  {user.email}
                </button>
              ))}
            </div>
            <div className="flex justify-around gap-2">
              {/* Add User Button */}
              <button
                onClick={addCollaborators}
                disabled={selectedUserId.length === 0}
                className="w-full py-2 text-white font-semibold rounded-md bg-purple-600"
              >
                Add Collaborators
              </button>
              {/* Close */}
              <button
                onClick={() => setShowModal(!showModal)}
                className="w-full py-2 text-white font-semibold rounded-md bg-purple-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;