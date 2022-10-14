import React, { useState, useEffect } from "react";
import { getFileUrlFromServer } from "@API/fileService";

/**
 * Get file path
 * @param {*string} hash file hash
 * @param {*json} params
 * @returns {*string} filePath
 */
export default function useFilePath(hash, params) {
  const [filePath, setFilePath] = useState(null);

  async function getFilePath(hash, params) {
    const response = await getFileUrlFromServer(hash, params);
    if (response.status === 200) {
      setFilePath(response?.data?.url);
    }
  }

  useEffect(() => {
    if (hash) {
      getFilePath(hash, params);
    }
  }, [hash, params]);

  return filePath;
}
