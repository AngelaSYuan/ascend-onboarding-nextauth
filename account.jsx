import React from 'react'
import {useSession, signOut, getSession} from 'next-auth/react'

const account = () => {
    //{required: true}
    const {data: session, status} = useSession()

    if (status === 'authenticated') {
        return (
            <div>
                <p>
                    Welcome in {session.user.name}!
                    <button onClick={() => signOut()}>Sign out</button>
                </p>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>
                    You are not signed in.
                </p>
            </div>
        );
    }
}

export default account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }

    return {
        props: {session},
    }
}
