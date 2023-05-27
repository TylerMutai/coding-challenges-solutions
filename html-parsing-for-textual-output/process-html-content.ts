import {Cheerio} from "cheerio";

const axios = require("axios")
const cheerio = require('cheerio');

export function getLineSeparator() {
  return "\n------------------------------------------------\n";
}

function getUrlDomain(url: string) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

function extractText(html: string): string {
  const $ = cheerio.load(html);
  const text = getTextFromNode($("body"));

  return text.trim();

  function getTextFromNode(node: Cheerio<any>): string {
    if (node.length === 0) {
      return "";
    }

    const nodeType = node[0].type;
    if (nodeType === "text") {
      return node[0].data.trim() + " ";
    }

    let text = "";

    node.contents().each((_, childNode) => {
      text += getTextFromNode($(childNode));
    });

    return text;
  }
}


const IGNORED_LINKS = [
  "#"
]

// returns index 0 as the filename and index 1 as the text content.
export async function fetchAndSaveContent(targetUrl: string, link: string): Promise<string[]> {
  let overallContent = ["", ""];
  console.info(`Processing Link: ${link}\n`)
  const baseDomain = getUrlDomain(targetUrl);
  console.info(`Using base domain as: ${baseDomain}\n`);
  if (IGNORED_LINKS.includes(link) || !link.includes(baseDomain)) {
    console.info(`Link ignored: ${link}${getLineSeparator()}`)
    return overallContent;
  }
  try {
    // Fetch the content
    const response = await axios.get(link);
    const content = response.data;

    // Extract text from the HTML content
    const textContent = extractText(content);

    overallContent = [link, textContent];
  } catch (error) {
    console.error(`Error fetching content from ${link}:`, (error as any)?.message);
  }
  console.info(`Link processed: ${link}`)
  console.info(getLineSeparator())
  return overallContent;
}