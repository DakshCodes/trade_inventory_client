import { Button, Upload, message } from 'antd'
import React from 'react'
import { IoMdAdd } from "react-icons/io"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { UploadFirmImage } from '../../apicalls/firms'

const Image = ({ title , selectedFirm , getData }) => {

    const [showPreview = false, setShowPreview] = React.useState(false)
    // const [images = [], setImages] = React.useState(selectedFirm.images);
    const [file = null, setFile] = React.useState(null);
    const dispatch = useDispatch();


    const upload = async () => {
        console.log(file)
        try {
            dispatch(SetLoader(true));
            // uploading image to cloudinary
            const formData = new FormData();
            formData.append("file", file);
            console.log("id : ", selectedFirm._id);
            formData.append("firmId", selectedFirm._id);

            const response = await UploadFirmImage(formData);

            dispatch(SetLoader(false));

            if (response.success) {
                message.success(response.message);
                // setImages([...images, response.data])
                // setShowPreview(false);
    //             setFile(null);
                getData();
            } else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }
    return (

        <div className=' border border-dashed border-sky-500 p-4 '>

            <Upload
                listType='picture'
                beforeUpload={() => false}
                onChange={(info) => {
                    setFile(info.file)
                    // setShowPreview(true);
                }}
                // fileList={file ? [file] : []}
                // showUploadList={showPreview}

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
                    disabled={!file}
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
