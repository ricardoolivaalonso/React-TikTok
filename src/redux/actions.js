import { v4 as uuidv4 } from 'uuid'
import { db, storage } from "../firebase/config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { collection, query, onSnapshot, where, addDoc, setDoc, getDoc, doc, deleteDoc, updateDoc, arrayUnion, increment  } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage" 
import { onAuthStateChanged, signOut } from "firebase/auth"
// 
import { isUserLoggedAction, loginUserAction, closeAuthModalAction } from "./actions/auth"
import { getCurrentUserAction, getAllUsersAction, getCurrentProfileAction } from "./actions/user"
import { getUserPostsAction, getAllPostsAction, createPostAction } from "./actions/posts"
import { closeProfileModalAction } from "./actions/profile"
import { openMediaModalAction } from "./actions/modal"
import { toast } from 'react-toastify'

export const getSession = () => {
    return async(dispatch) => {
        const auth = getAuth()

        try {
            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    const ref = doc(db, "users", user.uid)
                    const info = await getDoc(ref)
        
		            dispatch(isUserLoggedAction(true))
                    dispatch(loginUserAction(info.data()))
                    dispatch(getCurrentUserAction(info.data().uuid) )
                    dispatch(getAllPosts())
                }
            })

        } catch ( error ) { console.log(error)  }
    }
}

export const closeSession = () => {
    return async(dispatch) => {
        const auth = getAuth()

        try {
            signOut(auth)
            dispatch(isUserLoggedAction(false))
            toast.info("See you soon...")

        } catch ( error ) { console.log(error) }
    }
}

export const signUpUser = (email, name, password) => {
    return async(dispatch) => {
		const auth = getAuth()

        try {
            const createUser = await createUserWithEmailAndPassword(auth, email, password)
            const { user } = createUser
                
            await updateProfile(auth.currentUser, { displayName: name })
            const avatarPath = 'https://firebasestorage.googleapis.com/v0/b/roa-03.appspot.com/o/avatars%2Favatar-'
            const avatarMedia = '?alt=media'

            const setUser = {
                uuid: user.email.split('@')[0],
                name: user.displayName,
                avatar: `${avatarPath}${user.uid}${avatarMedia}`,
                bio: 'Tell us something about yourself!',
                following: [],
                followers: [],
                likes: 0,
                uuidDoc: user.uid
            }

            await setDoc(doc(db, "users", user.uid), setUser )
            dispatch(closeAuthModalAction())

            if(user.error) throw new Error({myStatus: user.error})

        } catch ( error ) { 
            console.log(error.code) 
            if(error.code == "auth/email-already-in-use") toast.info("Email already in use")
            if(error.code == "auth/weak-password") toast.info("Weak password (Min 6 characters)")
            if(error.code == "auth/invalid-email") toast.info("Enter a valid email address")
        }
    }
}

export const loginUser = (email, password) => {
    return async(dispatch) => {
        const auth = getAuth()

        try {
			const login = await signInWithEmailAndPassword(auth, email, password)
			const user = login.user 
            
            const ref = doc(db, "users", user.uid)
            const info = await getDoc(ref)

            dispatch(loginUserAction(info.data()))
            dispatch(getCurrentUserAction(info.data().uuid) )
            dispatch(closeAuthModalAction())
          
			if(user.error) throw new Error ({myStatus: user.error})

		} catch ( error ) {  
            if(error.code == 'auth/user-not-found' || error.code == "auth/wrong-password") toast.info("Incorrect account or password")
            else if(error.code == "auth/invalid-email") toast.info("Enter a valid email address")
            else toast.info("Something is wrong...")
        }
    }
}

export const refreshCurrentProfile = (path) => {
    return async(dispatch) => {
        try {
            const ref = collection(db, "users")
            const q = query(ref, where("uuid", "==", path))
            
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(doc => dispatch(getCurrentProfileAction(doc.data())) )
            })
        } catch ( error ) { console.log(error) }
        
    }
}

export const getCurrentProfile = (uuid) => {
    return async(dispatch) => {
        try {
            const ref = doc(db, "users", uuid)
            const info = await getDoc(ref)
            dispatch(getCurrentProfileAction(info.data()))
        } catch ( error ) { console.log(error) }
    }
}

export const getUserPosts = (uuid) => {
    return async (dispatch) => {
        try {
            const req = collection(db, "posts")
            const q = query(req, where("uuidUsername", "==", uuid)) 
            
            onSnapshot(q, (querySnapshot) => {
                let posts = []
                querySnapshot.forEach(doc => {
                    posts = [ 
                        ...posts, 
                        {
                            ...doc.data(),
                            uuidDoc: doc.id, 
                        }
                    ]   
                    return posts.sort((a, b) => b.time - a.time )
                })
                dispatch(getUserPostsAction(posts))
            })

        } catch (error) { console.log(error) }
    }
}

export const getAllPosts = () => {
    return async (dispatch) => {
        try {
            const q = collection(db, "posts")
            
            onSnapshot(q, (querySnapshot) => {
                let posts = []
                querySnapshot.forEach(doc => {
                    posts = [ 
                        ...posts, 
                        {
                            ...doc.data(),
                            uuidDoc: doc.id, 
                        }
                    ]   
                    return posts.sort((a, b) => b.time - a.time )
                })
                dispatch(getAllPostsAction(posts))
            })

        } catch (error) { console.log(error) }
    }
}

export const getUsers = () => {
    return async(dispatch) => {
        const q = collection(db, "users")
            
        onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach(doc => {
                users = [ 
                    ...users, 
                    {
                        ...doc.data(),
                        uuidDoc: doc.id, 
                    }
                ]   
                return users 
            })
            dispatch(getAllUsersAction(users))
        })
    }
} 

export const updateUserProfile = (name, bio,  inputRef) => {
    return async(dispatch) => {
		const auth = getAuth()

        try {
            const uuid = auth.currentUser.uid
            const file = inputRef.current.files[0]

            if(file){
                const fileRef = ref(storage, `avatars/avatar-${uuid}`)
                await uploadBytes(fileRef, file)
            }
            
            try {
                const ref = doc(db, "users", uuid)
                await updateDoc(ref, { name, bio })

                const info = await getDoc(ref)
                dispatch(loginUserAction(info.data()))
                dispatch(closeProfileModalAction())
                toast.info("Profile update!")

            } catch (error) { console.log(error) }

        } catch (error) { console.log(error) }
    }
}

export const sendPost = (post, videoRef, playerRef) => {
    return async(dispatch) => {
        try {
            const file = videoRef.current.files[0]
            const fileRef = ref(storage, `videos/${uuidv4()}-${file.name}`)
            await uploadBytes(fileRef, file)
            
            try {
                const url = await getDownloadURL(fileRef)
                post.media = url
                await addDoc(collection(db, "posts"), post )

                dispatch(createPostAction(post))
                toast.info("Your video was uploaded!")
                playerRef.current.src = ''

            } catch (error) { console.log(error) }

        } catch (error) { toast.info("Something is wrong... Try again!")    }
    }
}

export const sendMessage = (comment, uuidDoc) => {
    return async (dispatch) => {
        try {
            const ref = doc(db, "posts", uuidDoc)
            await updateDoc(ref, { comments: arrayUnion(comment) })
            
        } catch (error) { console.log(error) }
    }
}

export const openPost = (data, uuidDoc) => {
    return async(dispatch) => {
        const ref = doc(db, "posts", uuidDoc)
        await updateDoc(ref, { views: increment(1) })

        dispatch(openMediaModalAction(data))
    }
}

export const likePost = ({isLiked, uuidDoc}) => {
    return async (dispatch) => {
        try {
            const ref = doc(db, "posts", uuidDoc)
            await updateDoc(ref, { likes: isLiked })
            
        } catch (error) { console.log(error) }
    }
}

export const deletePost = ({uuid}) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(db, "posts", uuid))
            toast.info("Your post have been deleted!")
        } catch (error) { console.log(error) }
    }
}

export const likeComment = ({getComments, uuidDoc}) => {
    return async (dispatch) => {
        try {
            const ref = doc(db, "posts", uuidDoc)
            await updateDoc(ref, { comments: getComments })
        } catch (error) { console.log(error) }
    }
}

export const deleteComment = ({getComments, uuidDoc}) => {
    return async (dispatch) => {
        try {
            const ref = doc(db, "posts", uuidDoc)
            await updateDoc(ref, { comments: getComments })
            toast.info("Your comment have been deleted!")
        } catch (error) { console.log(error) }
    }
}

export const updateFollowers = ({getFollower, uuidDoc, uuid}) => {
    return async (dispatch) => {
        try {
            const ref = doc(db, "users", uuidDoc)
            await updateDoc(ref, { followers: getFollower })
    
            dispatch(refreshCurrentProfile(uuid))
        } catch (error) { console.log(error) }
    }
}


