const UrlToFileList = async (imageUrl: string[]) => {
  const file = await Promise.all(
    imageUrl.map((url) => urlToFile(url, "image.jpg", "image/jpeg")),
  );
  const fileList = fileToFileList(file);
  return fileList;
};

const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string,
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

const fileToFileList = (files: File[]): FileList => {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  return dataTransfer.files;
};

export default UrlToFileList;
