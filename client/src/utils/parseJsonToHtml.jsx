import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

const parseJsonToHtml = (json) => {
  parse(generateHTML(json, [Bold, Italic, Document, Paragraph, Text]));
};

export default parseJsonToHtml;