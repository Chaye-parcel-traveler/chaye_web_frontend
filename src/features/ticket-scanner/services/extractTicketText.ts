type TesseractModule = {
  createWorker: (
    language?: string,
    oem?: unknown,
    options?: {
      logger?: (message: { progress: number; status: string }) => void;
    },
  ) => Promise<{
    recognize: (image: File) => Promise<{
      data: {
        confidence?: number;
        text: string;
      };
    }>;
    terminate: () => Promise<unknown>;
  }>;
};

export type OcrProgress = {
  progress: number;
  status: string;
};

export const extractTicketText = async (
  file: File,
  onProgress?: (progress: OcrProgress) => void,
) => {
  const { createWorker } = (await import(
    'tesseract.js'
  )) as unknown as TesseractModule;
  const worker = await createWorker('eng', undefined, {
    logger: (message) => {
      onProgress?.({
        progress: message.progress,
        status: message.status,
      });
    },
  });

  try {
    const result = await worker.recognize(file);

    return {
      confidence: result.data.confidence,
      text: result.data.text,
    };
  } finally {
    await worker.terminate();
  }
};
