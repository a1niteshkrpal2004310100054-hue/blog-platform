import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/blogger-logo.png";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useState, useRef } from "react";
import { tool } from "@/components/tools";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { api } from "@/constant/api";
import toast from "react-hot-toast";

const Blog = () => {
  const defaultImage = "/vite.svg";
  const editorRef = useRef<EditorJS | null>(null);
  const [preview, setPreview] = useState<string>(defaultImage);

  interface Inputs {
    title: string;
    image: File | null;
    content: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      image: null,
      content: "",
    },
  });

  // Initialize EditorJS
  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      placeholder: "What's on your mind?",
      tools: tool,
      onReady: () => {
        editorRef.current = editor;
      },
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  // Handle file change and set value in RHF
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue("image", file, { shouldValidate: true, shouldDirty: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Clean preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview !== defaultImage) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Title input autosize
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  //  Submit form
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const contentData = await editorRef.current?.save();

    if (!contentData || contentData.blocks.length === 0) {
      setValue("content", "", { shouldValidate: true });
      alert("Editor content is required.");
      return;
    }

    const finalData = {
      ...data,
      content: JSON.stringify(contentData),
    };

    console.log(" Submitted Data:", finalData);
    try {
      const res = await api.post(`/blog/create`, finalData);
      console.log(res.data);
      toast.success("Form Submitted");
    } catch (error) {
      console.log(error);
      toast.error("Submit failed");
    }
  };

  return (
    <>
      <nav className="mx-auto max-w-[900px] w-full flex items-center justify-between p-2">
        <img src={Logo} alt="Logo" className="h-10 opacity-40" />
        <Button variant="outline" className="bg-gray-200" form="SubmitForm">
          Upload
        </Button>
      </nav>

      <form
        id="SubmitForm"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[900px] w-full"
      >
        {/* Title */}
        <textarea
          placeholder="Blog title"
          className="w-full text-4xl font-medium h-20 mt-10 outline-none resize-none leading-tight placeholder:opacity-40"
          {...register("title", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={handleTitleChange}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}

        <hr className="w-full my-5" />

        {/* Image */}
        <div className="relative aspect-video border-4 bg-white border-gray mt-10 overflow-hidden">
          <Label
            htmlFor="uploadbanner"
            className="block w-full h-full cursor-pointer"
          >
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-fill"
            />
            <Input
              id="uploadbanner"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleInputChange}
            />
          </Label>
          {errors.image && (
            <span className="text-red-500 z-30">Banner Image is required</span>
          )}
        </div>

        {/* Editor */}
        <div id="textEditor" className="font-gelasio border-4 mt-10"></div>
        {errors.content && (
          <span className="text-red-500">Content is required</span>
        )}
      </form>
    </>
  );
};

export default Blog;
