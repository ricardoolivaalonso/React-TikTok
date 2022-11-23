import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "../../redux/actions"

import { AsideSection } from '../02-sections/AsideSection'
import { TimelineCardComponent } from '../03-components/TimelineCardComponent'
import { EmptyElement } from "../04-elements/EmptyElement"

export const ForYouPage = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector( state => state.AllPostsReducer )
    const { wordToSearch } = useSelector( state => state.SearchReducer )
    let currentPosts 

    wordToSearch !== null ?
        currentPosts = posts.filter( post => post.description.toLowerCase().includes(wordToSearch)) : 
        currentPosts = posts
    
    currentPosts.sort((a, b) => b.timestamp - a.timestamp)

    useEffect(()=>{
        dispatch(getAllPosts())
    },[dispatch])

    return (
        <main className='main-content'>
            <AsideSection />
            <section className='timeline'>
                <div className='timeline__scroll'>
                    {
                        currentPosts.length > 0 ? 
                        <>{ currentPosts.map( (post,i) => <TimelineCardComponent key={i+post.uuidDoc} data={post}/> ) }</> :
                        <EmptyElement>No post found ...</EmptyElement>
                    }
                </div>
            </section>
        </main>
    )
}
