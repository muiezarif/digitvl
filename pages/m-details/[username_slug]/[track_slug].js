import React from "react";
import {useRouter} from "next/router";
import MusicDetail from "../../../components/MusicDetail";


export default function mDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <MusicDetail dataparams={router.query} />
        </div>
    );
};
export function getServerSideProps(){

}