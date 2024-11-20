// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../component/index";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);
//     // post?console.log("post.userID: ",post.userID):console.log("no post for user");
//     // userData?console.log("userData.$id: ",userData.userdata.$id):console.log("user data null");
//     const isAuthor = post && userData ? post.userID === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((slugpost) => {
//                 console.log("Inside the useEffect func");
//                 if (slugpost){
//                     console.log("Inside the if : ", slugpost);
//                     setPost(slugpost);
//                     console.log("post added",slugpost);
//                     console.log("post state variable: ",post)
//                 } 
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [post,slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featured_image);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse('"'+post.content+'"')}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;
    const [src, setsrc] = useState("");
    // const url1 = "http://localhost:4000/images/";
    const url = (path) => {
        let cut = path.split('/');
        let filename = cut[cut.length - 1];
        return "http://localhost:4000/images/" + filename;
    }
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const slugpost = await appwriteService.getPost(slug);
                console.log(slugpost[0].featured_image);
                if (slugpost) {

                    setPost(slugpost);
                    setsrc(url(slugpost[0].featured_image));
                    console.log("post state value: ", post);
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post.");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost(slug);
            console.log("deletePost called: ", status);
            if (status) {
                await appwriteService.deleteFile(post[0].featured_image);
                console.log("deleteFile called");
                setPost(null);
                navigate("/");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={src}
                        alt={post[0].title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post[0].title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post[0].content)}
                </div>
            </Container>
        </div>
    ) : null;
}
