import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/plugins`;


interface Plugin {
  id: string;
  name: string;
  active: boolean;
  // add more plugin fields if needed
}

// Fetch all plugins, returns an array of Plugin
export const fetchPlugins = async (): Promise<Plugin[]> => {
  const res: AxiosResponse<Plugin[]> = await axios.get(`${API_URL}/`);
  return res.data;
};

// Upload a plugin zip file, returns any response data (adjust if you know specific type)
export const uploadPlugin = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("zipfile", file);
  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Activate a plugin by ID, returns any response data
export const activatePlugin = async (id: string): Promise<any> => {
  const res = await axios.post(`${API_URL}/${id}/activate`);
  return res.data;
};

// Deactivate a plugin by ID, returns any response data
export const deactivatePlugin = async (id: string): Promise<any> => {
  const res = await axios.post(`${API_URL}/${id}/deactivate`);
  return res.data;
};
