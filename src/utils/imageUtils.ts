
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
 * Loads an image from a URL and converts it to a blob URL
 */
export const urlToBlob = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      
      xhr.onerror = () => {
        reject(new Error("Network error occurred while fetching the image."));
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const blobUrl = URL.createObjectURL(blob);
          resolve(blobUrl);
        } else {
          reject(new Error(`Failed to load image: ${xhr.statusText}`));
        }
      };
      
      xhr.send();
    } catch (error) {
      reject(error);
    }
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
