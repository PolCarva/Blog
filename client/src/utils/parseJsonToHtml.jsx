import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import { extensions } from "../constants/tiptapExtensions";

const parseJsonToHtml = (json) => {
  parse(generateHTML(json, extensions));
};

export default parseJsonToHtml;