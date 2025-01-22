import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({ books }) => {
    console.log('BooksCard books prop:', books); // Debugging line

    if (!books || !Array.isArray(books)) {
        console.error('BooksCard: books prop is not an array or is undefined');
        return <div>Error: books prop is not an array or is undefined</div>;
    }

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((item) => (
                <BookSingleCard key={item._id} book={item} />
            ))}
        </div>
    )
}

export default BooksCard
