import { Button, Upload } from 'antd'
import React from 'react'
import { IoMdAdd } from "react-icons/io"

const Image = ({title}) => {

    const upload = () => {
        alert("Image uploaded")
    }
    return (

            <div className=' border border-dashed border-sky-500 p-4 '>

                <Upload
                    listType='picture'
                    beforeUpload={() => false}

                >
                    <div className='rounded-full p-2 border border-dashed border-sky-500  '>
                        <IoMdAdd className='text-2xl' />
                    </div>
                </Upload>
                <div>
                    {title}
                </div>

                <div className="flex justify-end gap-5 mt-5">


                    <button
                        className='bg-sky-500 text-white rounded-md hover:bg-sky-400 px-3 py-1 '
                        // disabled={!file}
                        onClick={upload}
                    >Upload</button>

                </div>

                <div className="img">
                    {/* mapped images will be here  */}
                </div>
            </div>

            
            
    )
}

export default Image
