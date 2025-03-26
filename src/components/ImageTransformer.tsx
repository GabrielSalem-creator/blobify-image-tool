
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, RefreshCw } from "lucide-react";
import FileUpload from "./FileUpload";
import BlobUrlDisplay from "./BlobUrlDisplay";
import { fileToBlob, revokeBlob } from "@/utils/imageUtils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ImageTransformer: React.FC = () => {
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    // Clean up blob URL when component unmounts
    return () => {
      if (blobUrl) {
        revokeBlob(blobUrl);
      }
    };
  }, []);

  const handleFileSelect = async (file: File) => {
    try {
      setIsLoading(true);
      
      // Revoke previous blob URL to prevent memory leaks
      if (blobUrl) {
        revokeBlob(blobUrl);
      }
      
      const newBlobUrl = await fileToBlob(file);
      setBlobUrl(newBlobUrl);
      setShowResult(true);
      toast.success("Image successfully converted to blob URL");
    } catch (error) {
      console.error("Error converting file to blob:", error);
      toast.error("Failed to convert image to blob URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (blobUrl) {
      revokeBlob(blobUrl);
    }
    setBlobUrl("");
    setShowResult(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Card className="mb-6 overflow-hidden shadow-lg border-primary/10 bg-gradient-to-b from-background to-background/95">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cn(
              "transition-all duration-500",
              showResult && "md:border-r md:pr-6"
            )}>
              <h2 className="text-xl font-medium mb-4 text-primary">
                Image to Blob URL Converter
              </h2>
              
              <p className="text-sm text-muted-foreground mb-6">
                Upload an image to convert it to a blob URL that you can use in your applications.
              </p>
              
              <FileUpload 
                onFileSelect={handleFileSelect} 
                isLoading={isLoading}
              />
              
              {isLoading && (
                <div className="mt-4 flex items-center justify-center text-muted-foreground text-sm animate-fade-in">
                  <RefreshCw size={14} className="animate-spin mr-2" />
                  Processing image...
                </div>
              )}
            </div>
            
            <div className={cn(
              "transition-all duration-500",
              !showResult && "hidden md:block md:opacity-50"
            )}>
              {showResult ? (
                <BlobUrlDisplay 
                  blobUrl={blobUrl} 
                  onClear={handleClear}
                  isLoading={isLoading} 
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center p-6">
                  <div className="max-w-xs">
                    <div className="bg-primary/10 rounded-full p-3 inline-block mb-4">
                      <Info size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Image Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload an image to see the blob URL and preview here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="glass-card rounded-xl p-5 transition-all duration-500 animate-fade-in border border-primary/5 bg-gradient-to-b from-background/90 to-background/80 shadow-md">
        <h3 className="text-md font-medium mb-3 text-primary">What is a Blob URL?</h3>
        <p className="text-sm text-muted-foreground">
          A Blob URL (or Object URL) is a URL that points to an object in the browser's memory. 
          It can be used to reference files or data stored in memory, such as images, without 
          having to upload them to a server. Blob URLs are useful for temporarily displaying 
          user-selected files or for passing data between browser contexts.
        </p>
        
        <Separator className="my-4" />
        
        <h3 className="text-md font-medium mb-3 text-primary">How to use Blob URLs</h3>
        <p className="text-sm text-muted-foreground mb-3">
          You can use blob URLs in HTML elements that accept URLs, such as:
        </p>
        
        <div className="bg-secondary/80 rounded-lg p-3 text-sm font-mono mb-3 overflow-x-auto">
          {'<img src="blob:https://example.com/1234-5678-9abc-def0" />'}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Remember to call <span className="font-mono">URL.revokeObjectURL(blobUrl)</span> when 
          you're done with the URL to free up memory.
        </p>
      </div>
    </div>
  );
};

export default ImageTransformer;
