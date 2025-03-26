
import React from "react";
import ImageTransformer from "@/components/ImageTransformer";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-6 border-b border-border/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
              B
            </div>
            <h1 className="text-xl font-medium">Blobify</h1>
          </div>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Github size={16} />
            <span className="hidden sm:inline">View on GitHub</span>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <p className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">
                Simple • Fast • Secure
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Transform Images to Blob URLs
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Convert your images to blob URLs for web development with a simple, 
              elegant, and powerful tool.
            </p>
          </div>
          
          <ImageTransformer />
        </div>
      </main>
      
      <footer className="py-6 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto w-full text-center text-sm text-muted-foreground">
          <p>
            Designed with precision and simplicity in mind. All processing happens locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
