import React from 'react'

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
  console.log(allcampaign);

  const daysLeft = (deadline) => {
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff < 0) return 0; // Return 0 if deadline has passed
    return (diff / (1000 * 3600 * 24)).toFixed(0); // Return the remaining days
  };

  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allcampaign && allcampaign.length > 0 ? (
          allcampaign.map((campaign, i) => (
            <div
              onClick={() => (setDonate(campaign), setOpenModel(true))}
              key={campaign.id || i}
              className={`cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded ${daysLeft(campaign.deadline) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img 
                src={campaign.image || "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg"} 
                alt="Campaign" 
                className='object-cover w-full h-64 rounded'
              />
              <div className="py-5 pl-2">
                <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                  Days Left: {daysLeft(campaign.deadline)}
                </p>
                <a href="/" aria-label='Article' className='inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700'>
                  <p className='text-2xl font-bold leading-5'>{campaign.title}</p>
                </a>
                <p className='mb-4 text-gray-700'>{campaign.description}</p>
                <div className="flex space-x-4">
                  <p className='font-semibold'>Target: {campaign.target} ETH</p>
                  <p className='font-semibold'> Raised: {campaign.amountCollected} ETH</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No campaigns available</p>
        )}
      </div>
    </div>
  );
}

export default Card;
