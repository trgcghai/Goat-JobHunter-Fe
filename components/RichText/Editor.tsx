import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./quill-fonts.css";
import ImageInsertModal from "./ImageInsertModal";

import Quill from "quill";
const Font = Quill.import('formats/font');
const Size = Quill.import('formats/size');

// Đăng ký custom fonts
// @ts-expect-error -- whitelist fonts
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'inter',
  'lucida',
  'times-new-roman',
  'verdana'
];
// @ts-expect-error -- whitelist fonts
Quill.register(Font, true);


// Đăng ký custom font sizes
// @ts-expect-error -- whitelist fonts
Size.whitelist = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '64px'];

// @ts-expect-error -- whitelist fonts
Quill.register(Size, true);

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
 allowImage = true
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
      [{
        font: [
          'arial',
          'comic-sans',
          'courier-new',
          'georgia',
          'helvetica',
          'inter',
          'lucida',
          'times-new-roman',
          'verdana'
        ]
      }],
      [{ size: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '64px'] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ];

    if (allowImage) {
      toolbarContainer.push(["image"]);
    }

    return {
      toolbar: {
        container: toolbarContainer,
        handlers: allowImage ? { image: imageHandler } : {}
      }
    };
  }, [allowImage, imageHandler]);

  const formats = useMemo(() => {
    const baseFormats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "align",
      "list",
      "link"
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
          className="w-full [&_.ql-container]:border-0! [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px] [&_.ql-formats]:mr-2!"
          style={{
            width: "100%"
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