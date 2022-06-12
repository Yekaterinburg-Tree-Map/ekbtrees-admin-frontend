import { baseUrl } from '@/api/config'
import { useState } from 'react'
import { fetchFile } from '@/api/files'

import styles from './ImagePreview.module.css'

export default function ImagePreview({
  fileId
}) {
  const [imageData, setImageData] = useState(null)

  useState(() => {
    fetchFile(fileId)
      .then((data) => {
        console.log(data)
        setImageData(data)
      })
      .catch((err) => {
        console.error(err)
        setImageData(null)
      })
  }, [])

  return <div className={styles.imageContainer}>
    {/* TODO remove btn */}
    {imageData && <img
      src={`${baseUrl}${imageData.uri}`}
      alt={`image_${fileId}`}
    /> || <></>
    }
  </div>
}
