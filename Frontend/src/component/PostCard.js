// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({document_id, title, featured_image}) {
    
//   return (
//     <Link to={`/post/${document_id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featured_image)} alt={title}
//                 className='rounded-xl' />

//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard



import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";  // Your service file
import { Link } from 'react-router-dom';

function PostCard({ document_id, title, featured_image }) {
  const [imageSrc, setImageSrc] = useState(''); // State to hold the image URL

  useEffect(() => {
    const fetchImagePreview = async () => {
      try {
        // Wait for the image URL to be fetched
        const previewUrl = await appwriteService.getFilePreview(featured_image);
        setImageSrc(previewUrl); // Set the image URL to state
      } catch (error) {
        console.error('Error fetching image preview:', error);
      }
    };

    fetchImagePreview();  // Call the function to fetch the image URL
  }, [featured_image]);  // Re-run if the `featured_image` changes

  return (
    <Link to={`/post/${document_id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {/* Display the image once the URL is fetched */}
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="rounded-xl" />
          ) : (
            <p>Loading...</p>  // Optionally, show a loading message while the image is being fetched
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
