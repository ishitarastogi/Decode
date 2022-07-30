# <h1 align="center">Welcome to Decode 👩‍💻 </h1>

## Project Description 📜
This project allows you to contribute to the community through documentation, video tutorials, and projects while being incentivised. It use the Lens protocol (Social media graph) to achieve our objectives. We used the Lens protocol's <a href="https://docs.lens.xyz/docs/follow">Follow Module</a> and <a id="blob-path" href="https://docs.lens.xyz/docs/collect">Collect Module</a> to monteitize our creator in best way possible.

#### Follow Module 😎
Follow NFT is give to user who follow a profile. In our project we have added **feeFollowModule** which allows creators to earn money when someone follows.
This module is optional for creators. If they want to add they have to specify amount they want to earn and address in which they would like to receive reward.

#### Collect Module 🤑
Collects allow creators to monetize their content. We have embbeded collect module in publication component so creator have an option to set a collect module when posting a publication. This module will allow other users to mint NFTs that link to the publication's ContentURI. This module is also optional.


All the publications posted by creators uploaded on <a id="blob-path" href="https://docs.ipfs.tech/">IPFS</a>.

## Project Components

- Home: This is the Main page of our project which link you to the uploading Documents, project and video tutorial page.
- Explore: This Page displays the all the contents posted by creators on our platform **Decode** .
- Profile Icons: It contain three components:
  - My Profile: This page displays the profile data which includes(cover picture, profile picture, Bio, content,stats and the publications posted)
  - Create Profile: This page allows you to create Profile. It also has optional follow module.
  - Logout

## Tech stack used 👾

- ReactJs 
- GraphQl
- Apollo Client 

## Glimpse of Decode 🦄

### Home page
<img width="1440" alt="Screenshot 2022-07-30 at 4 23 12 PM" src="https://user-images.githubusercontent.com/46647968/181907767-cb3e9656-c9e8-4cc4-ac4c-4315147b5507.png">

### Uploading Docs page

In this page, you can clearly see we can add optional collect module to incentivise our content. Create have to add **Document Name**, **Document Link**, **Image** and **conetnt** to provide basic overview what's this Document is all about. All the specified field are mandatory.

In the collect module the default reward token is **MATIC**. Creator can speficy the amount and the address they want to recive the reward amount.


<img width="1286" alt="Screenshot 2022-07-30 at 4 23 46 PM" src="https://user-images.githubusercontent.com/46647968/181907769-3a01fb2a-4998-4b1e-9a0e-38e310d63536.png">

## How to run this Project? 🤖  
```
$ git clone https://github.com/ishitarastogi/Decode.git
$ npm install
$ npm start
```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
