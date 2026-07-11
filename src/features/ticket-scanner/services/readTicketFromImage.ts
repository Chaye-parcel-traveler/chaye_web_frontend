import { compressTicketImage } from './compressTicketImage';
import { extractTicketText, OcrProgress } from './extractTicketText';
import { parseBoardingPassBarcode, parseTicketText } from './parseTicketData';
import { scanTicketBarcode } from './scanTicketBarcode';
import type { FlightTicketData } from '../types/FlightTicketData';

export const readTicketFromImage = async (
  file: File,
  onOcrProgress?: (progress: OcrProgress) => void,
): Promise<FlightTicketData> => {
  const compressedFile = await compressTicketImage(file);
  const barcodeText = await scanTicketBarcode(compressedFile).catch(() => null);

  if (barcodeText) {
    return {
      ...parseBoardingPassBarcode(barcodeText),
      rawText: barcodeText,
      source: 'barcode',
    };
  }

  const ocr = await extractTicketText(compressedFile, onOcrProgress);

  return {
    ...parseTicketText(ocr.text),
    confidence: ocr.confidence,
    rawText: ocr.text,
    source: 'ocr',
  };
};
