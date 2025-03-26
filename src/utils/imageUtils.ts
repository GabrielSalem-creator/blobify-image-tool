
/**
 * Converts a File object to a blob URL
 */
export const fileToBlob = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const blobUrl = reader.result as string;
      resolve(blobUrl);
    });
    reader.readAsDataURL(file);
  });
};

/**
 * Validates if a string is a valid URL
 */
export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Revokes a blob URL to free up memory
 */
export const revokeBlob = (blobUrl: string): void => {
  if (blobUrl && blobUrl.startsWith('blob:')) {
    URL.revokeObjectURL(blobUrl);
  }
};
