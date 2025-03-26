
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { isValidUrl } from "@/utils/imageUtils";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit, isLoading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Please enter an image URL");
      return;
    }
    
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (starting with http:// or https://)");
      return;
    }
    
    onUrlSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter image URL (https://example.com/image.jpg)"
          value={url}
          onChange={handleUrlChange}
          className={`transition-all duration-300 pr-12 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          disabled={isLoading}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <ExternalLink size={16} />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-destructive animate-fade-in">
          {error}
        </p>
      )}
      
      <Button 
        type="submit" 
        className="w-full button-highlight"
        disabled={isLoading}
      >
        Convert from URL
      </Button>
    </form>
  );
};

export default UrlInput;
