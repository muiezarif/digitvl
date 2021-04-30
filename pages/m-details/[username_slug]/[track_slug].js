import React from "react";
import {useRouter} from "next/router";
import MusicDetail from "../../../components/MusicDetail";
import {NextSeo} from "next-seo";
import useSWR from "swr"


async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}

export default function mDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/beats/"+router.query.username_slug+"/"+router.query.track_slug
    const {data, error} = useSWR(url,fetcherFunction,{initialData:props})
    if (error){
        return <div>Failed to Load</div>
    }
    if (!data){
        return <div>Loading</div>
    }
    console.log(data)
    return (
        <div>
            <MusicDetail dataparams={router.query} seoparams={data} />
        </div>
    );
};
// mDetails.getInitialProps = async (ctx) => {
//     const res = await fetch('https://novamdigital.com/api/v1/beats/'+ctx.username_slug+'/'+ctx.track_slug)
//     const error_code = res.statusCode > 200 ? res.statusCode : false;
//     const seodata = await res.json();
//     return {
//         seoprops:seodata
//     }
// }
export async function getServerSideProps(context){

    const res = await fetch('https://novamdigital.com/api/v1/beats/'+context.params.username_slug+'/'+context.params.track_slug)
    // const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}