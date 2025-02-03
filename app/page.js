"use client";
import React, { useState, useEffect, useContext } from "react";
import { CrowdFundingContext } from "@/Context/CrowdFunding";
import { Hero, Card, Popup } from "../Components/index.js";

const Index = () => {
  const {
    titleData,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    connectWallet,
    getDonations,
    currentAccount,
    isLoading
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      // Check if wallet is connected
      if (!currentAccount) {
        console.log("Please connect your wallet first");
        return;
      }

      const allCampaignsData = await getCampaigns();
      if (allCampaignsData) {
        setAllCampaigns(allCampaignsData);
      }

      const userCampaignsData = await getUserCampaigns();
      if (userCampaignsData) {
        setUserCampaigns(userCampaignsData);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchCampaigns();
    }
  }, [currentAccount]);

  const handleDonate = async (campaign) => {
    try {
      setDonateCampaign(campaign);
      setOpenModel(true);
    } catch (error) {
      console.error("Error handling donation:", error);
    }
  };

  // if (!currentAccount) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <button
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //         onClick={connectWallet}
  //       >
  //         Connect Wallet
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading campaigns...</p>
        </div>
      ) : (
        <>
          <Card
            title="All Listed Campaigns"
            allCampaigns={allCampaigns}
            setOpenModel={setOpenModel}
            setDonate={handleDonate}
          />
          
          {userCampaigns.length > 0 && (
            <Card
              title="Your Created Campaigns"
              allCampaigns={userCampaigns}
              setOpenModel={setOpenModel}
              setDonate={handleDonate}
            />
          )}
        </>
      )}

      {openModel && (
        <Popup
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;