import React from "react";


export default function About(){
    return (
        <div className='text-txt p-10 w-[95dvw]'>
            <h1 className='text-4xl font-bold mb-8'>Welcome to Direct-Jobs!</h1>
        
            <h2 className='text-2xl font-bold'>Find Fresh and Relevant Jobs</h2>
            <p className='break-words text-lg mb-2'>At <em>Direct-Jobs</em>, we understand how important finding the right job is for your career.
                That's why we have created a powerful platform that enables you to search for jobs based on your preferred title or location.</p>
            
            <h2 className='text-2xl font-bold'>Directly Scraped from Careers Websites</h2>
            <p className='break-words text-lg mb-2'>Unlike other job search platforms, we don't rely on outdated or unreliable sources. We believe in providing
                you with the most accurate and up-to-date job listings available. That's why we scrape directly from the
                careers websites of different companies.</p>
        
            <h2 className='text-2xl font-bold'>Twice-Weekly Updates</h2>
            <p className='break-words text-lg mb-4'>We know that timing is crucial when it comes to job searching. To ensure you always have access to fresh job
                opportunities, we update our database twice a week. This means you can stay ahead of the competition and be
                among the first to apply for new positions.</p>
            <p className="text-lg">If you have any questions or need assistance, feel free to reach out to our support team at mchatzis3@gmail.com. Happy job hunting!</p>
        </div>
    );
};