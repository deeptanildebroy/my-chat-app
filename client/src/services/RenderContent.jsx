import React from 'react'

const RenderContent = ({file}) => {
    const { text,imageUrl } = file
  return (
    <div>
        <img src={imageUrl} alt={text}/>
        <p>{text}</p>
    </div>
  )
}

export default RenderContent