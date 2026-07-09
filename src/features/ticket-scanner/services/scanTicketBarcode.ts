const barcodeFormats = ['qr_code', 'aztec', 'pdf417', 'data_matrix'] as const;

export const scanTicketBarcode = async (file: File): Promise<string | null> => {
  const { BarcodeDetector } = await import('barcode-detector/ponyfill');
  const bitmap = await createImageBitmap(file);

  try {
    const detector = new BarcodeDetector({
      formats: [...barcodeFormats],
    });
    const barcodes = await detector.detect(bitmap);

    return barcodes[0]?.rawValue ?? null;
  } finally {
    bitmap.close();
  }
};
