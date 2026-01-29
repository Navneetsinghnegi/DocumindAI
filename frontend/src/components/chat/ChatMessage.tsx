interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

const ChatMessage = ({ role, content, isLoading }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-800"}
        `}
      >
        {isLoading ? (
          <span className="animate-pulse">Thinking…</span>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
