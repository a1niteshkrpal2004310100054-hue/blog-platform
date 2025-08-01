import Quote from "@editorjs/quote";
import Inlinecode from "@editorjs/inline-code";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/List";
import Header from "@editorjs/header";
import { api } from "@/constant/api";

export const tool = {
  header: Header,
  list: List,
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CTRL+SHIFT+O",
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  inlineCode: {
    class: Inlinecode,
    shortcut: "CTRL+SHIFT+M",
  },
  image: {
    class: Image,
    config: {
     uploader: {
          async uploadByFile(file: File) {
            const formData = new FormData();
            formData.append("image", file);

            const res = await api.post(`/blog/upload`, formData)

            const data = await res.json();
            return {
              success: 1,
              file: {
                url: data.url,
              },
            };
          },
    },
  },
  Paragraph: Paragraph,
};
