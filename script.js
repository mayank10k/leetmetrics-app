document.addEventListener("DOMContentLoaded",function(){

    const searchButton=document.getElementById("search-button");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label")
    const mediumLabel=document.getElementById("medium-label")
    const hardLabel=document.getElementById("hard-label")
    const cardStatsContainer=document.querySelector(".stats-cards");

    //return true or flase based on a regex
    function validateUsername(username){
        if(username.trim()==""){
            alert("Username can't be empty");
            return false;
        }
        const regex=/^[A-Za-z][A-Za-z0-9_-]{2,29}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;


    }


    async function fetchUserDetails(username) {
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent="Searchig...";
            searchButton.disabled=true;

            const response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details")
            }
            const data= await response.json();
            console.log("logging data",data);
        }
        catch(error){
            statsContainer.innerHTML=`<p>No Data Found</p>`
        }finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;

        }

    }

    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("logging username",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })




})