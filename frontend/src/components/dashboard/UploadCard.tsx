import  { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface UploadCardProps {
  onUploadSuccess: () => void;
}

const UploadCard = ({ onUploadSuccess}: UploadCardProps) => {
  const [file, setFile] = useState<File | null>();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    // Simulate an API call / Upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // TRIGGER THE PROP LOGIC HERE
      onUploadSuccess();
      
      // Optional: Reset state after success
      
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center text-center">
        
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Upload your document
        </h2>
        <p className="text-gray-500 text-lg mb-10">
          Upload a PDF or text document to start chatting with it.
        </p>

        {/* Custom Styled File Input Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <label className="group relative">
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.txt"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <div className={`
              cursor-pointer font-semibold px-6 py-2.5 rounded-full transition-all active:scale-95 border
              ${isUploading 
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-transparent hover:border-indigo-200'
              }
            `}>
              Choose File
            </div>
          </label>
          
          <span className="text-slate-400 font-medium truncate max-w-50">
            {file ? file.name : "No file chosen"}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`
            w-full sm:w-64 py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
            ${!file || isUploading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98]'
            }
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={20} />
              Upload document
            </>
          )}
        </button>

        {/* Support info */}
        <p className="mt-6 text-xs text-gray-400">
          Supported formats: .pdf, .txt (Max 10MB)
        </p>
      </div>
    </div>
  );
};

export default UploadCard;