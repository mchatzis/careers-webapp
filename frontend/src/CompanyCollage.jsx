import React from "react";

export default function CompanyCollage({ companies }){
    return (
        <>
            {companies.map((company, index)=> {
                if (index > companyStyles.length - 1){
                    return null;
                }

                return (
                    <div 
                        key={company.name} 
                        style={companyStyles[index]}
                        onClick={() => window.open(company.url, '_blank')}
                        >{company.name}</div>
                );
            })}
        </>
    )
}

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

const fixedPositions = [
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

const companyStyles = fixedPositions.map((style)=> {
    return {
        ...style, 
        'color': colors[generateRandomNumber(0, colors.length - 1)],
        'position': 'absolute',
        'cursor': 'pointer'
    }
});