import React from "react";
import {useRouter} from "next/router";
import BlogsDetail from "../../components/BlogsDetail";

export default function verifyDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <BlogsDetail dataparams={router.query} />
        </div>
    );
};
export function getServerSideProps(){

}