import axios from 'axios'

export class Service {
   

    async createPost({ title, slug, content, featured_image, status, userID }) {
        try {
            const post = await axios.post('http://localhost:4000/createblog', {
                "document_id":slug,
                "title":title,
                "content":content,
                "featured_image":featured_image,
                "status":status,
                "user_id":userID
              });
              console.log(post);
              
            // await this.database.createDocument(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionId,
            //     slug,
            //     {
            //         title,
            //         content,
            //         featuredImage,
            //         status,
            //         userID,
            //     }
            // )
            return post.data;
        } catch (error) {
            console.log("Error in creating post Error: ", error);
        }
    }

    async updatePost(slug,{title, content, featured_image, status, user_id}){
        try {
console.log(slug, title, content, featured_image, status, user_id);
            const updateblog = await axios.post('http://localhost:4000/updateblog', {
                "document_id":slug,
                "title":title,
                "content":content,
                "featured_image":featured_image,
                "status":status, 
                "user_id":user_id
            })
           // title-post title-post <p>content newly of post <strong>mkn,n,</strong></p> C:/Users/DELL/Desktop/Programs/React/MegaBlog/Backend/images/anonymous_1727975945752.jpg active
            return updateblog;
            // await this.database.updateDocument(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionId,
            //     slug,
            //     {
            //         title,
            //         content,
            //         featuredImage,
            //         status
            //     }
            // )
        } catch (error) {
            console.log("Error in updating Post Error", error);
        }
    }

    async deletePost(slug){
        try {
            console.log("slug: ",slug);
            await axios.post('http://localhost:4000/deleteblog', {
                "document_id":slug 
            })
            // await this.database.deleteDocument(
            // conf.appwriteDatabaseId,
            // conf.appwriteCollectionId,
            // slug
            // )
            return true
           
        } catch (error) {
            console.log("Error in deleting the post Error: ",error);
            return false;
        }
      
    }

    async getPost(slug){
        try {
            const getpostdata = await axios.post('http://localhost:4000/getblog', {
                "document_id":slug 
            })
            console.log("this is get post data: ",getpostdata);
            return getpostdata.data; 
            // await this.database.getDocument(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionId,
            //     slug
            //    )
        } catch (error) {
            console.log("Error in getpost the post Error: ",error);
        }
           
    }

    async getPosts(){
        try {
            return await axios.post('http://localhost:4000/getblogs', {
                "status":"active"
            })
            // await this.database.listDocuments(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionId,
            //     queries
            //    )
        } catch (error) {
            console.log("Error in getposts the post Error: ",error);
        }
           
    }
    async getMyPosts(userid){
        try {
            return await axios.post('http://localhost:4000/getmyblogs', {
                "user_id":userid
            })
            // await this.database.listDocuments(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionId,
            //     [Query.equal("userID",userid)]
            //    )
        } catch (error) {
            console.log("Error in getmyposts the post Error: ",error);
        }
           
    }

    async uploadFile(file){
        try {
            const formdata = new FormData();
            formdata.append('image',file);
            const newUser = await axios.post('http://localhost:4000/uploadimage', formdata, {
               headers:{
                'Content-Type':'multipart/form-data',
               },
              });
              console.log("file uploaded: ",newUser);
            return newUser;
            // await this.bucket.createFile(
            //     conf.appwriteBucketId,
            //     ID.unique(),
            //     file
            // )
        } catch (error) {
            console.log("Error in uploadfile method Error: ",error);
        }
    }

    async deleteFile(fileId){
        try {
            await axios.post('http://localhost:4000/deleteimage', {
                "featured_image":fileId
            })
            // await this.bucket.deleteFile(
            //     conf.appwriteBucketId,
            //     fileId
            // )
            return true
        } catch (error) {
            console.log("Error in deletefile method Error: ",error);
            return false
        }
    }
    async getFilePreview(fileId){
        //console.log("File ID :",fileId);
        const data = await axios.post('http://localhost:4000/imagepreview', {
            "featured_image":fileId
        })
        // let {data }= data1
        // console.log("type of "+typeof data);
        // console.log("data : "+JSON.stringify(data));
        // console.log(data1.data.imagepreview1);
         return data.data.imagepreview1;
        // // this.bucket.getFilePreview(
        // //     conf.appwriteBucketId,
        // //     fileId
        // // )
    }
}

const service = new Service();
export default service;