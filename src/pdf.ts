import express from "express";
import type { Request, Response } from "express";
import path from "path";
import {
  getDocument,
  //   GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

export const readPDF = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    // Check if the PDF file exists
    if (!file) {
      return res.status(400).send('No file with the name "file" was uploaded.');
    }

    // // Disable worker warnings (since we're in Node.js)
    // GlobalWorkerOptions.workerSrc = "";

    // Load the PDF document
    const loadingTask = getDocument(file.path);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let fullText = [];

    // Loop through each page and extract text
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);

      // Get the text content of the page
      const textContent = await page.getTextContent();

      // Extract the text strings from the text content items
      let formatedText: any = [];
      formatedText = textContent.items.map((item: any) => ({
        str: item.str,
        width: item.width,
        height: item.height,
        x: item.transform[4],
        y: item.transform[5],
      }));

      fullText.push({
        pageNum: pageNum,
        text: formatedText,
      });
    }

    // Return the extracted text as JSON
    return res.json(fullText);
  } catch (error: any) {
    console.error("Error reading PDF:", error);
    return res.status(500).json({ error: error?.message });
  }
};

router.post("/", async (req, res) => {
  await readPDF(req, res);
});

export default router;
