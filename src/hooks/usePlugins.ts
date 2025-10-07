import { useState, useEffect, ChangeEvent } from "react";
import {
  fetchPlugins,
  uploadPlugin,
  activatePlugin,
  deactivatePlugin,
} from "../services/pluginService";

interface Plugin {
  id: string;
  name: string;
  active: boolean;
  // Add other plugin fields as needed
}

export const usePlugins = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const getPlugins = async (): Promise<void> => {
    try {
      const data: Plugin[] = await fetchPlugins();
      setPlugins(data);
    } catch {
      setMessage("Failed to fetch plugins");
    }
  };

  useEffect(() => {
    getPlugins();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }
    setLoading(true);
    try {
      await uploadPlugin(file);
      setMessage("Plugin uploaded and extracted successfully");
      setFile(null);
      getPlugins();
    } catch {
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePlugin = async (id: string, active: boolean): Promise<void> => {
    setLoading(true);
    try {
      if (active) {
        await deactivatePlugin(id);
      } else {
        await activatePlugin(id);
      }
      setMessage(`Plugin ${active ? "deactivated" : "activated"}`);
      getPlugins();
    } catch {
      setMessage("Failed to toggle plugin");
    } finally {
      setLoading(false);
    }
  };

  return {
    plugins,
    file,
    loading,
    message,
    handleFileChange,
    handleUpload,
    togglePlugin,
  };
};
