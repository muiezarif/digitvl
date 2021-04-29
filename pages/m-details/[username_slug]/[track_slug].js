import React from "react";
import {useRouter} from "next/router";
import MusicDetail from "../../../components/MusicDetail";
import {NextSeo} from "next-seo";


export default function mDetails({seoprops}){
    const router = useRouter();
    console.log(seoprops)
    return (
        <div>
            <NextSeo
                title={seoprops.beats_detail.song_title}
                description={seoprops.beats_detail.description}
                openGraph={{
                    url: 'https://www.digitvl.com/',
                    title: seoprops.beats_detail.song_title,
                    description: seoprops.beats_detail.description,
                    site_name: 'DIGITVL',
                }}
                twitter={{
                    handle: '@digitvl',
                    site: '@digitvl',
                    cardType: 'summary_large_image',
                }}
            />
            <MusicDetail dataparams={router.query} />
        </div>
    );
};
// mDetails.getInitialProps = async (ctx) => {
    // console.log(ctx)
    // const res = await fetch('https://novamdigital.com/api/v1/beats/'+ctx.req.params.username_slug+'/'+ctx.req.params.track_slug)
    // const error_code = res.statusCode > 200 ? res.statusCode : false;
    // const seodata = await res.json();
    // return {
    //     seoprops:seodata
    // }
// }
export async function getServerSideProps(context){

    const res = await fetch('https://novamdigital.com/api/v1/beats/'+context.params.username_slug+'/'+context.params.track_slug)
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: {seoprops:seodata}}
}