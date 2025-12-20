import { useEffect, useMemo, useRef, useState } from "react";
import { Photo } from "react-photo-album";

interface UseBlogImagesInputOptions {
  maxDisplayed?: number;
  maxUpload?: number;
  maxSizeMb?: number;
}

export function useBlogImagesInput(
  open: boolean,
  { maxDisplayed = 5, maxUpload = 90, maxSizeMb = 5 }: UseBlogImagesInputOptions = {}
) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (!open) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer?.types.includes("Files")) {
        dragCounter.current++;
        if (dragCounter.current === 1) setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;
    };

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      dragCounter.current = 0;
      setIsDragging(false);
    };
  }, [open]);

  const handleFilesAdded = (files: File[]) => {
    if (!files?.length) return;

    const accepted = files.filter(
      (file) => file.size <= maxSizeMb * 1024 * 1024
    );

    const remainingSlots = maxUpload - imageFiles.length;
    const limited = accepted.slice(0, Math.max(remainingSlots, 0));

    if (!limited.length) return;

    const newImageFiles = [...imageFiles, ...limited];
    setImageFiles(newImageFiles);

    limited.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setIsDragging(false);
    dragCounter.current = 0;
  };

  const resetImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    setIsDragging(false);
    dragCounter.current = 0;
  };

  const formattedImageUrls: Photo[] = useMemo(() => {
    if (imagePreviews.length <= maxDisplayed) {
      return imagePreviews.map((preview, index) => ({
        src: preview,
        width: 16,
        height: 9,
        alt: `Image ${index + 1}`
      }));
    }

    return imagePreviews.slice(0, maxDisplayed).map((preview, index) => {
      if (index === maxDisplayed - 1) {
        return {
          src: preview,
          width: 16,
          height: 9,
          alt: `Image ${index + 1}`,
          title: `+${imagePreviews.length - maxDisplayed} more`,
          "aria-isLastWithMore": true,
          "aria-moreCount": imagePreviews.length - maxDisplayed
        };
      }
      return { src: preview, width: 16, height: 9, alt: `Image ${index + 1}` };
    });
  }, [imagePreviews, maxDisplayed]);

  return {
    imageFiles,
    imagePreviews,
    isDragging,
    formattedImageUrls,
    handleFilesAdded,
    resetImages
  };
}