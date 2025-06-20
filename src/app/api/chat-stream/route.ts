import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { messages, sessionId } = await req.json()

    if (!messages || messages.length === 0) {
        // Handle case where messages array is empty, e.g., return an error or an empty response
        return new Response(JSON.stringify({ error: "No messages provided." }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content
    try {
        const response = await ragChat.chat(lastMessage, { streaming: true, sessionId });

        return aiUseChatAdapter(response);
    } catch (error) {
        console.error("Error during ragChat.chat or aiUseChatAdapter:", error); // Catch and log any errors
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}      