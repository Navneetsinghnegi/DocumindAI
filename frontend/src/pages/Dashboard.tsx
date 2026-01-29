import { useState } from "react";
import UploadCard from "../components/dashboard/UploadCard";

import ChatWindow from "../components/chat/ChatWindow";


const Dashboard = () => {
  const [documentUploaded, setDocumentUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        
        {/* HEADER */}
        <header className="mb-8 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            DocuMind AI
          </h1>
          <p className="text-gray-600 mt-1">
            Upload a document and start asking questions.
          </p>
        </header>

        {/* MAIN CONTENT */}
        {documentUploaded ? (<ChatWindow />): 
          <UploadCard onUploadSuccess={() => setDocumentUploaded(true)} />
        
          
        }

      </div>
    </div>
  );
};

export default Dashboard;
