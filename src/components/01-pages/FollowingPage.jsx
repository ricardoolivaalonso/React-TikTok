import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "../../redux/actions"

import { AsideSection } from '../02-sections/AsideSection'
import { TimelineCardComponent } from '../03-components/TimelineCardComponent'
import { EmptyElement } from "../04-elements/EmptyElement"

export const FollowingPage = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector( state => state.AllPostsReducer )

    useEffect(()=>{
        dispatch(getAllPosts())
    },[dispatch])

    return (
        <main className='main-content'>
            <AsideSection />
            <section className='timeline'>
                <div className='timeline__scroll'>
                    {
                        posts.length > 0 ? 
                        <>{ posts.map( (post,i) => <TimelineCardComponent key={i+post.uuidDoc} data={post}/> ) }</> :
                        <EmptyElement>No post found ...</EmptyElement>
                    }
                </div>
            </section>
        </main>
    )
}
