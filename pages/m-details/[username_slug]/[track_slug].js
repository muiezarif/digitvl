import React from "react";
import {useRouter} from "next/router";
// import MusicDetail from "../../../components/MusicDetail";
import dynamic from 'next/dynamic'
import {NextSeo} from "next-seo";
import useSWR from "swr"
const MusicDetail = dynamic(
    () => import('../../../components/MusicDetail'),
    { ssr: false }
)

async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}

export default function mDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/beats/"+router.query.username_slug+"/"+router.query.track_slug+"/"
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
            <NextSeo
                title={data.beats_detail.song_title}
                description={data.beats_detail.description}
                openGraph={{
                    url: 'https://www.digitvl.com/',
                    title: 'Listen to '+data.beats_detail.song_title,
                    description: 'Listen to '+data.beats_detail.song_title+' by '+data.beats_detail.username,
                    site_name: 'DIGITVL',
                }}
                twitter={{
                    handle: '@digitvl',
                    site: '@digitvl',
                    cardType: 'summary_large_image',
                }}
            />
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

    const res = await fetch('https://novamdigital.com/api/v1/beats/'+context.params.username_slug+'/'+context.params.track_slug+'/')
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}