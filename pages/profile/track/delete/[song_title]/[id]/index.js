import React from "react";
import {useRouter} from "next/router";



export default function deleteTrack(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            Delete Track
            {/*<MusicDetail dataparams={router.query} />*/}
        </div>
    );
};