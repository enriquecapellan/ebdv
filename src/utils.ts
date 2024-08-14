export const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressedImage = resizeBase64Image(reader.result as string);
      resolve(compressedImage);
    };
    reader.readAsDataURL(blob);
  });
};

export function resizeBase64Image(base64Image: string): Promise<string> {
  return new Promise((resolve) => {
    const maxSizeInMB = 0.5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const img = new Image();
    img.src = base64Image;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
      const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
      canvas.width = newWidth;
      canvas.height = newHeight;
      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const dataURL = canvas.toDataURL("image/jpeg", 0.5);
        resolve(dataURL);
      }
    };
  });
}
