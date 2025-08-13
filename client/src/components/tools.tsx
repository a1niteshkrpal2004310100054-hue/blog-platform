import Quote from "@editorjs/quote";
import Inlinecode from "@editorjs/inline-code";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/List";
import Header from "@editorjs/header";
import { store } from "@/redux/store";
import { addUploadImage } from "@/redux/blogSlice";
import { api } from "@/constant/api";

// const uploadedImages = new Set();

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
          formData.append("contentImage", file);

          const { data } = await api.post(`/blog/blogUpload`, formData);
          console.log(data.url);
          store.dispatch(addUploadImage(data.url));
          return {
            success: 1,
            file: {
              url: data.url,
            },
          };
        },
      },
    },
  },
  Paragraph: Paragraph,
};
