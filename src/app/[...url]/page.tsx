import { ragChat } from '@/lib/rag-chat'
import React, { Component } from 'react'

interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

// function reconstructURL({url} : {url:string[]}){

//     const decodedComponent = url.map( (Component) => decodeURIComponent(Component))

//     return decodedComponent.join('/')
// }
 
const page = async ({ params }: PageProps ) => {
    console.log('params', params)
    
    // const reUrl = reconstructURL({ url: params.url as string[]})
    // await ragChat.context.add({
    //     type: "html",
    //     source: reUrl,
    //     config: { chunkOverlap: 50, chunkSize: 1000 }
    // })

  return (
    <div>
        hi there
    </div>
  )
}

export default page