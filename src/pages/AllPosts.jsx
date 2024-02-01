import { useState, useEffect } from "react"
import appwriteService from "../appwrite/configuration"
import { Container, PostCard } from "../components"


const AllPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents) 
            }
        })
    }, [])
//isko useffect ke andar rakhna hai
//    console.log(posts, 'posts in all post')
    return(
        <div className="h-4/6 w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                {
                    posts.map((post) => {
                        // console.log(post, 'posts in loop')
                        return <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    })
                }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts