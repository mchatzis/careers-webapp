import React from "react";

function generateRandomNumber(min, max) {
    /*
      Returns random number between min and max, inclusive both sides.
    */
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = [
    '#522b69',
    'black',
    '#0e006a'
]

export default function CompanyCollage({ companies }){
    return (
        <>
            {companies.map((company, index)=> {
                if (index > array.length - 1){
                    return null;
                }
                const colorIndex = generateRandomNumber(0, colors.length - 1);

                const style = {
                'position': 'absolute',
                'top': array[index].top,
                'left': array[index].left,
                'color': colors[colorIndex],
                'fontSize': array[index].fontSize,
                'cursor': 'pointer',
                };

                return (
                <div 
                    key={company.name} 
                    style={style}
                    onClick={() => window.open(company.url, '_blank')}>
                    {company.name}</div>
                );
            })
            }
        </>
    )
}

const array = [
    {
        "top": "0%",
        "left": "50%",
        "fontSize": 50
    },
    {
        "top": "10%",
        "left": "0%",
        "fontSize": 36
    },
    {
        "top": "60%",
        "left": "70%",
        "fontSize": 25
    },
    {
        "top": "0%",
        "left": "70%",
        "fontSize": 22
    },
    {
        "top": "40%",
        "left": "40%",
        "fontSize": 38
    },
    {
        "top": "40%",
        "left": "0%",
        "fontSize": 47
    },
    {
        "top": "20%",
        "left": "80%",
        "fontSize": 27
    },
    {
        "top": "35%",
        "left": "20%",
        "fontSize": 25
    },
    {
        "top": "30%",
        "left": "40%",
        "fontSize": 38
    },
    {
        "top": "60%",
        "left": "60%",
        "fontSize": 29
    },
    {
        "top": "60%",
        "left": "70%",
        "fontSize": 50
    },
    {
        "top": "60%",
        "left": "0%",
        "fontSize": 37
    },
    {
        "top": "0%",
        "left": "30%",
        "fontSize": 49
    },
    {
        "top": "0%",
        "left": "40%",
        "fontSize": 24
    },
    {
        "top": "50%",
        "left": "30%",
        "fontSize": 35
    },
    {
        "top": "50%",
        "left": "50%",
        "fontSize": 36
    },
    {
        "top": "30%",
        "left": "70%",
        "fontSize": 44
    },
    {
        "top": "10%",
        "left": "60%",
        "fontSize": 47
    },
    {
        "top": "20%",
        "left": "30%",
        "fontSize": 24
    },
    {
        "top": "10%",
        "left": "0%",
        "fontSize": 34
    }
]