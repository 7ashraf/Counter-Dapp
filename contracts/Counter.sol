pragma solidity ^0.8.9;

contract counter{
    uint private count = 0;

    function incrementCounter() public{
        count++;
    }
    function decrementCounter() public{
        count--;
    }
    function getCount() public view returns(uint) {
        return count;
    }
}