import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true)
        axios
            .post('http://localhost:8080/books', data)
            .then((res) => {
                setLoading(false)
                enqueueSnackbar('Book created successfully', { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false)
                alert('An error occurred. Pleace try again later.')
                enqueueSnackbar('An error occurred. Pleace try again later.', { variant: 'error' })
                console.log('API Error:', error)
            })
    }


    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? <Spinner /> : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className="my-4">
                        <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
                        <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl' />
                    </div>
                    <div className="my-4">
                        <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
                        <input type='text' value={author} onChange={(event) => setAuthor(event.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl' />
                    </div>
                    <div className="my-4">
                        <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
                        <input type='number' value={publishYear} onChange={(event) => setPublishYear(event.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl' />
                    </div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
                </div>
            )}
        </div>
    )
}

export default CreateBook
