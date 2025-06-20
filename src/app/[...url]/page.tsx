import ChatWrapper from '@/components/ChatWrapper'
import { ragChat } from '@/lib/rag-chat'
import { redis } from '@/lib/redis'
import React from 'react'

interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructURL({url} : {url:string[]}){

    const decodedComponent = url.map( (component) => decodeURIComponent(component))

    return decodedComponent.join('/')
}
 
const page = async ({ params }: PageProps ) => {
    const reUrl = reconstructURL({ url: params.url as string[]})

    const isIndexed = await redis.sismember("indexed-urls", reUrl)  //sismember checks if the URL is already indexed in Redis Set (name of set, to check)

    const sessionId = "mock-session"

    if (!isIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reUrl,
            config: { chunkOverlap: 50, chunkSize: 200 }  
        })

        console.log("Adding URL to Redis Set:", reUrl)
        await redis.sadd("indexed-urls", reUrl) //sadd adds the URL to the Redis Set
    }
    else {
        console.log("URL already indexed:", reUrl)
    }

  return(
    <div className='flex max-h-screen gap-10 justify-between items-center p-10 bg-zinc-900'>
        <div>
            <iframe 
                src={reUrl} 
                className='w-[70vw] h-[90vh] border-2 border-zinc-800 rounded-lg shadow-lg'
                title="Webpage Content"
            />
        </div>
        <ChatWrapper sessionId={sessionId} />
    </div>
  ) 
}

export default page 