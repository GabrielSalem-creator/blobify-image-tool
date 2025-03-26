
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface BlobUrlDisplayProps {
  blobUrl: string;
  onClear: () => void;
  isLoading: boolean;
}

const BlobUrlDisplay: React.FC<BlobUrlDisplayProps> = ({ 
  blobUrl, 
  onClear,
  isLoading
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blobUrl);
      setCopied(true);
      toast.success("Blob URL copied to clipboard");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy URL");
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Generated Blob URL</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClear}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="preview" className="w-1/2">Preview</TabsTrigger>
          <TabsTrigger value="url" className="w-1/2">URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-0">
          <div className="relative aspect-video bg-secondary/50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-primary" />
              </div>
            ) : (
              <img 
                src={blobUrl} 
                alt="Blob preview" 
                className="max-h-full max-w-full object-contain transition-opacity duration-500"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.classList.add('image-loaded');
                }}
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="mt-0">
          <div className="bg-secondary/50 rounded-lg p-3 overflow-x-auto whitespace-nowrap mb-4 text-sm font-mono">
            {isLoading ? (
              <div className="h-6 w-full animate-pulse-subtle bg-muted-foreground/10 rounded" />
            ) : (
              blobUrl
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full button-highlight"
        onClick={handleCopy}
        disabled={isLoading || !blobUrl}
      >
        {copied ? (
          <>
            <Check size={16} className="mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} className="mr-2" />
            Copy Blob URL
          </>
        )}
      </Button>
    </div>
  );
};

export default BlobUrlDisplay;
