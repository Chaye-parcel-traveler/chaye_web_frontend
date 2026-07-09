const MAX_IMAGE_SIDE = 1800;
const JPEG_QUALITY = 0.86;

export const compressTicketImage = async (file: File): Promise<File> => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height),
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    return file;
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
  );

  if (!blob) {
    return file;
  }

  return new File([blob], replaceExtension(file.name, 'jpg'), {
    lastModified: file.lastModified,
    type: 'image/jpeg',
  });
};

const replaceExtension = (filename: string, nextExtension: string) =>
  filename.replace(/\.[^.]+$/, '') + `.${nextExtension}`;
