import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import {
  getDocument,
  //   GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const readPDF = async (req: Request, res: Response) => {
  try {
    // Path to the PDF file
    const fileName = req.body.file;
    const pdfPath = path.join(__dirname, fileName || "");

    // Check if the PDF file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "PDF file not found" });
    }

    // Read the PDF file into a Uint8Array
    const data = new Uint8Array(fs.readFileSync(pdfPath));

    // // Disable worker warnings (since we're in Node.js)
    // GlobalWorkerOptions.workerSrc = "";

    // Load the PDF document
    const loadingTask = getDocument({ data });
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

      // // Combine the strings into a single text
      // const pageText = formatedText.join(" ");

      // fullText += pageText + "\n";
    }

    // Return the extracted text as JSON
    return res.json(fullText);
  } catch (error) {
    console.error("Error reading PDF:", error);
    return res.status(500).json({ error: "Error reading PDF" });
  }
};

router.post("/", async (req, res) => {
  await readPDF(req, res);
});

export default router;
