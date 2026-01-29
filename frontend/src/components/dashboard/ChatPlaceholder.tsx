const ChatPlaceholder = () => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      
      <div className="mb-4 border-b pb-4">
        <h2 className="text-xl font-semibold">
          Ask questions about your document
        </h2>
        <p className="text-gray-600">
          Your document is ready. Start chatting below.
        </p>
      </div>

      <div className="h-64 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500">
        Chat interface will appear here
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
          disabled
        />
        <button
          disabled
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white opacity-50 cursor-not-allowed"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatPlaceholder;
