import React from "react";


export default function Job({ job, index, url }){
    return (
        <div key={index} 
            className='flex justify-start items-center py-[7dvh] h-[20dvh] bg-white rounded-lg hover:bg-gray-200 hover:cursor-pointer p-3 mr-1 gap-[15dvw]'
            onClick={() => window.open(url, '_blank')}
        >
            {Object.keys(job).map((key)=>{
                return (
                    <div key={key} className='w-[25dvw] whitespace-normal'>
                        {job[key]}
                    </div>
                );
            })}
        </div>
    );
}