
# Fundora - A CrowdFunding DApp

A decentralized crowdfunding platform built on Ethereum using Solidity for smart contracts and React for the frontend. This project allows users to create crowdfunding campaigns, donate to campaigns, and track the progress of each campaign transparently using blockchain technology.

## Features

- **Create Campaigns**: Users can create new crowdfunding campaigns by specifying a title, description, target amount, and deadline.
- **Donate to Campaigns**: Users can donate ETH to campaigns that they are interested in supporting.
- **Track Donations**: Users can view the donation history for each campaign, including the list of donators and the amount they donated.
- **Interactive UI**: Built with React for a seamless and user-friendly experience. The DApp integrates with MetaMask for wallet connection.
- **Smart Contracts**: Utilizes a Solidity-based smart contract deployed on the Ethereum blockchain to handle campaign creation, donations, and tracking.

## Tech Stack

- **Solidity**: For creating the Ethereum smart contract that handles campaign creation and donations.
- **React**: Frontend framework for building the interactive user interface.
- **Ethers.js**: JavaScript library for interacting with Ethereum from the frontend.
- **Hardhat**: Development environment for Ethereum, used for compiling, testing, and deploying smart contracts.
- **MetaMask**: A browser extension that allows users to interact with the Ethereum blockchain.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MetaMask](https://metamask.io/) (browser extension)

### 1. Clone the Repository

```bash
git clone https://github.com/Pankajjoshi11/Fundora_crowdfunding_platform.git
cd Fundora_crowdfunding_platform
```

### 2. Install Dependencies

Install the necessary dependencies for both the frontend and backend.

```bash
npm install
```

### 3. Deploy the Smart Contract

Use Hardhat to deploy the smart contract locally:

```bash
npx hardhat ignition deploy ./ignition/modules/CrowdFunding.js
```

Make sure you have Hardhat installed and running a local Ethereum network, or deploy to a testnet if needed.

### 4. Run the Frontend

Start the React development server:

```bash
npm run dev
```

This will launch the frontend at `http://localhost:3000`.

### 5. Connect Your MetaMask Wallet

When the frontend is loaded, connect your MetaMask wallet to interact with the DApp. You'll be able to create campaigns, donate, and track donations directly from the UI.

## Usage

### Create a Campaign

- Enter the campaign details: title, description, target amount (ETH), and deadline.
- Submit the form to create the campaign on the Ethereum blockchain.

### Donate to a Campaign

- Browse through the listed campaigns.
- Click on a campaign to view its details.
- Donate ETH to support the campaign.

### Track Donations

- Campaign owners and donators can view the list of donators and the total amount collected in each campaign.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Your contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
