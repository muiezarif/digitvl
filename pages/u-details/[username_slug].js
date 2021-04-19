import React from "react";
import {useRouter} from "next/router";
import UserDetail from "../../components/UserDetail";

export default function mDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <UserDetail params={router.query} />
        </div>
    );
};