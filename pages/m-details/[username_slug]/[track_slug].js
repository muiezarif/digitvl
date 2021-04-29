import React from "react";
import {useRouter} from "next/router";
import MusicDetail from "../../../components/MusicDetail";
import {NextSeo} from "next-seo";


export default function mDetails({seoprops}){
    const router = useRouter();
    console.log(seoprops)
    return (
        <div>
            <MusicDetail dataparams={router.query} seoparams={seoprops} />
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
    return {props: {seoprops:seodata}}
}