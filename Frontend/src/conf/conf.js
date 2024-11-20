const conf={
appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID)
}
// REACT_APP_APPWRITE_URL="https://cloud.appwrite.io/v1"
// REACT_APP_APPWRITE_PROJECT_ID="665c7c58003729ac0520"
// REACT_APP_APPWRITE_DATABASE_ID="665c7d560016536a560d"
// REACT_APP_APPWRITE_COLLECTION_ID="665c7d910023ee4a49f1"
// REACT_APP_APPWRITE_BUCKET_ID="665c7ff9001cc1569d2b"

// const conf={
//     appwriteUrl: "https://cloud.appwrite.io/v1",
//     appwriteProjectId: "665c7c58003729ac0520",
//     appwriteDatabaseId: "665c7d560016536a560d",
//     appwriteCollectionId: "665c7d910023ee4a49f1",
//     appwriteBucketId: "665c7ff9001cc1569d2b"
//     }

export default conf