import { useCallback, useEffect } from "react";
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteSerivce from '../../appwrite/configuration';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({post}) => {
    // console.log(post, 'another poset')
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        // console.log(data,' this is the new dataa')
        if(post){
            const file = data.image[0] ? await appwriteSerivce.uploadFile(data.image[0]) : null
            // console.log(file, 'fieles')
            if(file){
                appwriteSerivce.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteSerivce.updatePost(post.$id, {...data, featuredImage: file ? file.$id: undefined})
            // console.log(dbPost,'dppsot')
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = await appwriteSerivce.uploadFile(data.image[0])
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteSerivce.createPost({
                    ...data, 
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof(value) === 'string'){
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, '-')
                    .replace(/\s/g, '-')
        }
        return '';
    })

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    // console.log(post, 'THisis the PostForm')

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteSerivce.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;