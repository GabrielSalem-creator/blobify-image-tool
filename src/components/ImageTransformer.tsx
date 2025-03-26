
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, RefreshCw } from "lucide-react";
import FileUpload from "./FileUpload";
import UrlInput from "./UrlInput";
import BlobUrlDisplay from "./BlobUrlDisplay";
import { fileToBlob, urlToBlob, revokeBlob } from "@/utils/imageUtils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ImageTransformer: React.FC = () => {
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("upload");
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

  const handleUrlSubmit = async (url: string) => {
    try {
      setIsLoading(true);
      
      // Revoke previous blob URL to prevent memory leaks
      if (blobUrl) {
        revokeBlob(blobUrl);
      }
      
      const newBlobUrl = await urlToBlob(url);
      setBlobUrl(newBlobUrl);
      setShowResult(true);
      toast.success("Image successfully converted to blob URL");
    } catch (error) {
      console.error("Error converting URL to blob:", error);
      toast.error("Failed to convert image URL to blob URL");
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
      <Card className={cn(
        "mb-6 overflow-hidden transition-all duration-500",
        showResult ? "opacity-100" : "opacity-100"
      )}>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cn(
              "transition-all duration-500",
              showResult && "md:border-r md:pr-6"
            )}>
              <h2 className="text-xl font-medium mb-4">
                Image to Blob URL
              </h2>
              
              <p className="text-sm text-muted-foreground mb-6">
                Upload an image or provide a URL to convert it to a blob URL that you can use in your applications.
              </p>
              
              <Tabs 
                defaultValue="upload" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="upload" className="w-1/2" disabled={isLoading}>
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="url" className="w-1/2" disabled={isLoading}>
                    URL
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-0">
                  <FileUpload 
                    onFileSelect={handleFileSelect} 
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="url" className="mt-0">
                  <UrlInput 
                    onUrlSubmit={handleUrlSubmit} 
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
              
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
                    <div className="bg-muted/30 rounded-full p-3 inline-block mb-4">
                      <Info size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Image Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload an image or provide a URL to see the blob URL and preview here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className={cn(
        "glass-card rounded-xl p-5 transition-all duration-500 animate-fade-in",
        showResult ? "opacity-100" : "opacity-80"
      )}>
        <h3 className="text-md font-medium mb-3">What is a Blob URL?</h3>
        <p className="text-sm text-muted-foreground">
          A Blob URL (or Object URL) is a URL that points to an object in the browser's memory. 
          It can be used to reference files or data stored in memory, such as images, without 
          having to upload them to a server. Blob URLs are useful for temporarily displaying 
          user-selected files or for passing data between browser contexts.
        </p>
        
        <Separator className="my-4" />
        
        <h3 className="text-md font-medium mb-3">How to use Blob URLs</h3>
        <p className="text-sm text-muted-foreground mb-3">
          You can use blob URLs in HTML elements that accept URLs, such as:
        </p>
        
        <div className="bg-secondary/80 rounded-lg p-3 text-sm font-mono mb-3">
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
