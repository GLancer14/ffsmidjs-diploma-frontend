export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
  
    fileReader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      const reader = e.target as FileReader;
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("No result at image load"));
      }
    });
    
    fileReader.addEventListener('error', (e: ProgressEvent<FileReader>) => {
      const reader = e.target as FileReader;
      if (reader.error) {
        reject(new Error(reader.error.message));
      }
    });
    
    fileReader.readAsDataURL(file);
  });
}