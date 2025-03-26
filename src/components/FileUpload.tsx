
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-all duration-300 h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6",
        isDragging ? "border-primary bg-primary/5 scale-[1.02] shadow-lg" : "border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/5",
        isLoading && "opacity-50 pointer-events-none"
      )}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      
      <div className="bg-primary/10 rounded-full p-4 mb-4">
        <Image size={32} className="text-primary" />
      </div>
      
      <p className="text-lg font-medium mb-1">
        Drag & drop an image here
      </p>
      
      <p className="text-sm text-muted-foreground mb-4">
        Supports JPG, PNG, GIF, SVG, WEBP
      </p>
      
      <Button 
        variant="outline" 
        className="button-highlight border-primary/20 hover:border-primary/40 hover:bg-primary/10"
        size="sm"
        disabled={isLoading}
      >
        <FileUp size={16} className="mr-2" />
        Browse Files
      </Button>
    </div>
  );
};

export default FileUpload;
