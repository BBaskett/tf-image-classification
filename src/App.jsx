import React from "react";
import Predictions from "./components/predicitons/Predictions";
import Preview from "./components/preview/Preview";

import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

import sampleImg from "./images/sample.jpeg";
import tfImg from "./images/tensorflow.svg";

import "./App.css";

const classificationCount = 3;

function App() {
  const sampleRef = React.useRef(null);
  const previewRef = React.useRef(null);
  const [predictions, setPredictions] = React.useState([]);
  const [userImg, setUserImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function classifyImage(img) {
    setLoading(true);
    tf.backend();
    const model = await mobilenet.load();
    const modelPredictions = await model.classify(img, classificationCount);
    setLoading(false);
    return setPredictions(modelPredictions);
  }
  return (
    <React.Fragment>
      <header>
        <img src={tfImg} alt="tf_logo" />
        <span>
          <em>Image Classification</em>
        </span>
      </header>
      <main>
        <span className="description">
          Display the top
          {classificationCount} classifications (and respective confidence
          intervals) of an image.
        </span>
        <hr />
        <h3>Images</h3>
        <section className="images">
          <div className="sample">
            <h5>Sample Image</h5>
            <div className="img-container">
              <img src={sampleImg} alt="sample_img" ref={sampleRef} />
            </div>
            <button onClick={() => classifyImage(sampleRef.current)}>
              Classify
            </button>
          </div>
          <div className="user">
            <h5>User Image</h5>
            <input
              type="file"
              src=""
              alt="image_input"
              accept="image/*"
              onChange={(event) => {
                setUserImg({
                  url: URL.createObjectURL(event.target.files[0]),
                  name: event.target.files[0].name,
                });
              }}
            />
            <div className="img-container">
              <Preview data={userImg} ref={previewRef} />
            </div>
            <button
              onClick={() => {
                classifyImage(previewRef.current);
              }}
            >
              Classify
            </button>
          </div>
        </section>
        <hr />
        <h3>Predictions</h3>
        <section className="predictions">
          <Predictions data={predictions} status={loading} />
        </section>
      </main>
      <footer>
        <span>
          This site leverages the{" "}
          <a
            href="https://www.tensorflow.org/js/models"
            target="_blank"
            rel="noreferrer"
          >
            TensorFlow
          </a>{" "}
          model,{" "}
          <a
            href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet"
            target="_blank"
            rel="noreferrer"
          >
            MobileNets
          </a>
          , which are small, low-latency, low-power models parameterized to meet
          the resource constraints of a variety of use cases.
        </span>
      </footer>
    </React.Fragment>
  );
}

export default App;
