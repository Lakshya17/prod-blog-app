import { useState, useEffect } from "react";
import {Container, PostForm} from '../components'
import appwriteService from '../appwrite/configuration'
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    
    // if(slug){
    //     appwriteService.getPost(slug)
    //     .then((post) => {
    //         console.log(post, 'fsdadsfsd')
    //         if(post){
    //             setPost(post)
    //         }
    //     })
    //     console.log(post, slug, 'sdfasfasdfas')
    // }else{
    //     navigate('/')
    // }

    useEffect(() => {
        // console.log(slug, 'this is slug')
        if(slug){
            appwriteService.getPost(slug)
                .then((post) => {
                    if(post){
                        setPost(post)
                    }
                })
        }else{
            navigate('/')
        }
    }, [slug, navigate])

    // console.log(post, 'this is fosrsrsr')

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;