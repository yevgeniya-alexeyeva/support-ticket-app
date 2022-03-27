import axios from "axios";

// const API_URL = "/ticket/";

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    "http://localhost:5000/ticket",
    ticketData,
    config
  );

  return data;
};

const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get("http://localhost:5000/ticket", config);

  return data;
};

const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    "http://localhost:5000/ticket/" + ticketId,
    config
  );

  return data;
};

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    "http://localhost:5000/ticket/" + ticketId,
    { status: "closed" },
    config
  );

  return data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
