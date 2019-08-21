pragma solidity ^0.4.17;

contract CampaignFactory{

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{

        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}



contract Campaign{

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; //tracks number of Yes votes that the request has received
        mapping(address => bool)approvals ;//tracks whoever has voted on a given requests


    }

    Request[] public requests;

    address public manager;
    uint public minimumContribution;
    //address[] public approvers;
    mapping(address => bool) public approvers;
    uint public approversCount; //total number of approvers
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    function Campaign(uint minimum, address creator) public{
        //manager = msg.sender;
        manager = creator;//since called from another contract
        minimumContribution = minimum;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);

       // approvers.push(msg.sender);
       approvers[msg.sender] = true;
       approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
         });
    requests.push(newRequest);

    }

    function approveRequest(uint index) public{

        // manipulate the copy of the request
        Request storage request = requests[index];
        //approver should be a donator
        require(approvers[msg.sender]);

        //check if the sender has already voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{

        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(
      uint, uint, uint, uint, address
    ){
      return(
        minimumContribution,
        this.balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestsCount() public view returns (uint){
      return requests.length;
    }
}
