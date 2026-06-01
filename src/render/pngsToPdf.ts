// src/render/pngsToPdf.ts
// Multi-page PDF assembly via pdf-lib. One page per PNG, page sized to PNG.

import { PDFDocument } from "pdf-lib";

export async function pngsToPdf(
  pngs: Uint8Array[],
  outPath: string,
): Promise<{ pageCount: number; sizeBytes: number }> {
  const pdf = await PDFDocument.create();
  for (const png of pngs) {
    const img = await pdf.embedPng(png);
    const page = pdf.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  const bytes = await pdf.save();
  await Bun.write(outPath, bytes);
  return { pageCount: pngs.length, sizeBytes: bytes.length };
}
