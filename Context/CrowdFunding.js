"use client"
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdFundingAddress, CrowdFundingABI } from "./constants";

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const titleData = "Crowd Funding Contract";

    const getProviderOrSigner = async (needSigner = false) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);

            if (needSigner) {
                const signer = await provider.getSigner();
                return signer;
            }
            return provider;
        } catch (error) {
            console.error("Error in getProviderOrSigner:", error);
            throw error;
        }
    };

    const createCampaign = async (campaign) => {
        try {
            setIsLoading(true);
            const signer = await getProviderOrSigner(true);
            const contract = fetchContract(signer);
            const address = await signer.getAddress();

            const tx = await contract.createCampaign(
                address,  // owner address
                campaign.title,
                campaign.description,
                campaign.target,  // amount in wei
                Math.floor(new Date(campaign.deadline).getTime() / 1000)  // Unix timestamp
            );

            await tx.wait();
            console.log("Campaign created successfully");
        } catch (error) {
            console.error("Error in createCampaign:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    // const createCampaign= async (campaign)=>{
    //     const{title,description,amount,deadline} = campaign;
    //     const web3Modal= new Web3Modal();
    //     const connection = await web3Modal.connect();
    //     const provider=new ethers.providers.Web3Provider(connection);
    //     const signer=provider.getSigner();
    //     const contract=fetchContract(signer);
    //     console.log(currentAccount)
    //     try{
    //         const transaction = await contract.createCampaign(
    //             currentAccount,  // owner address
    //             title,
    //             description,
    //             ethers.utils.parseUnits(amount,18),  // amount in wei
    //             new Date(deadline).getTime(), // deadline
    //         )
    //         await transaction.wait();
    //         console.log("contract call success", transaction);
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    const getCampaigns = async () => {
        try {
            const provider = await getProviderOrSigner();
            const contract = fetchContract(provider);

            const campaigns = await contract.getCampaigns();
            
            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target.toString()),
                deadline: new Date(campaign.deadline * 1000),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                pId: i
            }));

            return parsedCampaigns;
        } catch (error) {
            console.error("Error in getCampaigns:", error);
            throw error;
        }
    };

    const getUserCampaigns = async () => {
        try {
            const provider = await getProviderOrSigner();
            const contract = fetchContract(provider);
            const signer = await getProviderOrSigner(true);
            const address = await signer.getAddress();

            const allCampaigns = await contract.getCampaigns();
            
            const filteredCampaigns = allCampaigns.filter(
                (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
            );

            const parsedCampaigns = filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target.toString()),
                deadline: new Date(campaign.deadline * 1000),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                pId: i
            }));

            return parsedCampaigns;
        } catch (error) {
            console.error("Error in getUserCampaigns:", error);
            throw error;
        }
    };

    const donate = async (pId, amount) => {
        try {
            setIsLoading(true);
            const signer = await getProviderOrSigner(true);
            const contract = fetchContract(signer);

            const tx = await contract.donateToCampaign(pId, {
                value: ethers.parseEther(amount)
            });

            await tx.wait();
            console.log("Donation successful");
        } catch (error) {
            console.error("Error in donate:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const getDonations = async (pId) => {
        try {
            const provider = await getProviderOrSigner();
            const contract = fetchContract(provider);

            const [donators, donations] = await contract.getDonators(pId);
            
            const parsedDonations = donators.map((donator, i) => ({
                donator,
                donation: ethers.formatEther(donations[i].toString())
            }));

            return parsedDonations;
        } catch (error) {
            console.error("Error in getDonations:", error);
            throw error;
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("Please install MetaMask");
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error in connectWallet:", error);
            throw error;
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return;
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        
        // Add wallet change listener
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount("");
                }
            });
        }
    }, []);

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                isLoading,
                connectWallet,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};