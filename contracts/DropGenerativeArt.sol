// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/base/ERC721Drop.sol";

contract DropGenerativeArt is ERC721Drop {
    string public script;
    
    mapping(uint256 => bytes32) public tokenToHash;
    mapping(bytes32 => uint256) public hashToToken;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient,
        string memory _script
    )
        ERC721Drop(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {
        script = _script;
    }

    function transferTokensOnClaim(address _to, uint256 _quantityBeingClaimed)
        internal
        virtual
        override
        returns (uint256 startTokenId)
    {
        startTokenId = super.transferTokensOnClaim(_to, _quantityBeingClaimed);
        _mintGenerative(_to, startTokenId, _quantityBeingClaimed);
    }

    function mintWithSignature(MintRequest calldata _req, bytes calldata _signature)
        public
        payable
        virtual
        override
        returns (address signer)
    {
        address receiver = _req.to == address(0) ? msg.sender : _req.to;
        _mintGenerative(receiver, _currentIndex, _req.quantity);
        signer = super.mintWithSignature(_req, _signature);
    }

    // Generative NFT logic
    function _mintGenerative(address _to, uint256 _startTokenId, uint256 _qty) internal virtual {
        for(uint256 i = 0; i < _qty; i += 1) {
            uint256 _id = _startTokenId + i;
            bytes32 mintHash = keccak256(abi.encodePacked(_id, blockhash(block.number - 1), _to));
        
            tokenToHash[_id] = mintHash;
            hashToToken[mintHash] = _id;
        }
    }
}