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

    if (!isIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reUrl,
            config: { chunkOverlap: 50, chunkSize: 1000 }
        })

        await redis.sadd("indexed-urls", reUrl) //sadd adds the URL to the Redis Set
    }
    

  return (
    <div>
        hi there
        <iframe
            src={reUrl}
            style={{ width: '80%', height: '100vh', border: 'none' }}
        />
    </div>
  )
}

export default page