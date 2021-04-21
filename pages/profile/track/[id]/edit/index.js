import React from "react";
import {useRouter} from "next/router";



export default function editTrack(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            Edit Track
            {/*<MusicDetail dataparams={router.query} />*/}
        </div>
    );
};