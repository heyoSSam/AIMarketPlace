// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract AIMarketPlace {
    address public owner;

    mapping(address => uint256) private earnings;

    constructor() {
        owner = msg.sender;
    }

    struct AI {
        uint256 modelId;
        string name; 
        string description;
        uint[] ratings;
        uint256 price;
        address owner; 
    }

    AI[] AIListings; 

    modifier idCheck(uint256 modelId){
        require(modelId < AIListings.length, "There is no model with such ID");
        _;
    }

    function listModel(string memory name, string memory description, uint256 price) external {
        AI memory model = AI(AIListings.length, name, description, new uint[](0), price, msg.sender);
        AIListings.push(model);
    }

    function purchaseModel(uint256 modelId) public payable idCheck(modelId){
        AI memory model = AIListings[modelId];
        earnings[model.owner] += msg.value;
        model.owner = msg.sender;
    }

    function rateModel(uint256 modelId, uint8 rating) external idCheck(modelId){
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        AI storage model = AIListings[modelId];
        model.ratings.push(rating);
    }

    function withdrawFunds() external {
        require(earnings[msg.sender] > 0, "Balance is empty");
        payable(msg.sender).transfer(earnings[msg.sender]);
    }

    function getModelDetails(uint256 modelId) public view idCheck(modelId) returns(AI memory){
        AI memory model = AIListings[modelId];
        return model;
    }
}