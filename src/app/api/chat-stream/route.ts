import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided." }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    if (!lastMessage.trim()) {
      return new Response(JSON.stringify({ error: "Empty message content." }), { status: 400 });
    }

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
    });

    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("Error during ragChat.chat or aiUseChatAdapter:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
