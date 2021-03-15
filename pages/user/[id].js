import {useRouter} from 'next/router'

export default function User({username}){
    const router = useRouter();
    const {id} = router.query;

    return <h1>Hello{id}</h1>
}

export function getServerSideProps({params}){
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: {car: data},
    }
}

//stick metatags no, user generated content, server side it
export async function getStaticProps(){

}

export async function getStaticPaths(){

}