import React from 'react'
import Docs from '../docs/Docs';
import Project from '../project/Project'
import Video from '../video/Video'
import img8 from "../layout/img/img8.jpeg";
import img9 from "../layout/img/img9.jpeg";
import video from "../layout/img/video.jpg";
import { FiCamera } from "react-icons/fi";
import {Link} from "react-router-dom";
import './Home.css'
function Home() {
  return (
    <div>
      <div class="container">
        {/* <div class="image">
          <img
            src={logos}
            alt="img"
            width="400"
            height="300"
            style={{ float: "right" }}
          ></img>{" "}
        </div> */}
        <div class="text">
          <span className="heading">
            Welcome to <span className="logo-heading">Decode</span>
          </span>
          <br />
          Upload Documents, Project or video tutorials to our platform and earn
          money for your hard work.
        </div>
      </div>
      {/* <div className="main">
        <div className="text">
          Sometimes it's better to leave something alone, to pause, and that's
          very true of programming."
          <img
            src={logos}
            alt="img"
            width="400"
            height="300"
            style={{ float: "right" }}
          ></img>
        </div>
      </div> */}
      <main class="grid">
        <article>
          <img src={img8} alt="Sample photo" width="350" height="200" />
          <div class="text">
            <h3>Upload tutorial Docs</h3>
            <p>Write technical or nontechnical blogs and get monetize.</p>
            <Link to="./docs">
              {" "}
              <button>Upload Docs</button>
            </Link>{" "}
          </div>
        </article>
        <article>
          <img src={img9} alt="Sample photo" width="350" height="200" />
          <div class="text">
            <h3>Upload Project Tutorials</h3>
            <p>Upload yourprojects with proper readme and earn money.</p>
            <Link to="./project">
              {" "}
              <button>Upload Projects</button>
            </Link>{" "}
          </div>
        </article>
        <article>
          <img src={video} alt="Sample photo" width="350" height="200" />
          <div class="text">
            <h3>Upload Video Tutorial</h3>
            <p>
              Upload creative and knowledgeble video and get a chance to earn
              money.
            </p>
            <Link to="./video">
              {" "}
              <button>Upload Video</button>
            </Link>{" "}
          </div>
        </article>
      </main>
      <footer>
        <div>
          <h1>Decode</h1>
          <p>
            Welcome to Decode. Its time to show your skills to the world, Add
            videp, project or docs tutorial.
          </p>
          and get a chance to earn moneny and NFT for your content.
        </div>
        <div class="social">
          <FiCamera />
          <i class="fa-brands fa-instagram-square"></i>
          <i class="fa-brands fa-twitter-square"></i>
          <i class="fa-brands fa-youtube-square"></i>
          <i class="fa-brands fa-whatsapp-square"></i>
        </div>
      </footer>
    </div>
  );
}

export default Home
