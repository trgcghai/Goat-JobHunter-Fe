import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ImageInsertModal from "./ImageInsertModal";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowImage?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  allowImage = true,
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const imageHandler = useCallback(() => {
    if (!allowImage) return;
    setShowImageModal(true);
  }, [allowImage]);

  const modules = useMemo(() => {
    const toolbarContainer = [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
      ["link"],
    ];

    if (allowImage) {
      toolbarContainer.push(["image"]);
    }

    return {
      toolbar: {
        container: toolbarContainer,
        handlers: allowImage ? { image: imageHandler } : {},
      },
    };
  }, [allowImage, imageHandler]);

  const formats = useMemo(() => {
    const baseFormats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "align",
      "list",
      "link",
    ];

    if (allowImage) {
      baseFormats.push("image");
    }

    return baseFormats;
  }, [allowImage]);

  const handleInsertImage = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    return editor ?? null;
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
          className="w-full [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px]"
          style={{
            width: "100%",
          }}
        />
      </div>

      {allowImage && (
        <ImageInsertModal
          open={showImageModal}
          getEditor={handleInsertImage}
          onCancel={() => setShowImageModal(false)}
        />
      )}
    </>
  );
}