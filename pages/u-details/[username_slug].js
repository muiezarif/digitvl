import React from "react";
import {useRouter} from "next/router";
// import UserDetail from "../../components/UserDetail";
import dynamic from 'next/dynamic'
import useSWR from "swr"
import {NextSeo} from "next-seo";
const UserDetail = dynamic(
    () => import('../../components/UserDetail'),
    { ssr: false }
)

async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}
export default function mDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/profile/"+router.query.username_slug+"/detail/"
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
                title={data.profile_detail.username}
                description={`Checkout ${data.profile_detail.username} account on DIGITVL`}
                openGraph={{
                    url: 'https://www.digitvl.com/',
                    title: data.profile_detail.username,
                    description: `Checkout ${data.profile_detail.username} account on DIGITVL`,
                    site_name: 'DIGITVL',
                }}
                twitter={{
                    handle: '@digitvl',
                    site: '@digitvl',
                    cardType: 'summary_large_image',
                }}
            />
            <UserDetail params={router.query} />
        </div>
    );
};
export async function getServerSideProps(context){
    const res = await fetch('https://novamdigital.com/api/v1/profile/'+context.params.username_slug+'/detail/')
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}