import React from "react";
import { Button, Container, Link } from "@mui/material";
import Predictions from "./components/Predictions";

import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

import sampleImg from "./assets/IMG_2420.jpg";

import "./App.css";

const classificationCount = 3;

function App() {
  const sampleRef = React.useRef(null);
  const userRef = React.useRef(null);
  const previewRef = React.useRef(null);
  const [predictions, setPredictions] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function classifyImage(img) {
    setLoading(true);
    tf.backend();
    const model = await mobilenet.load();
    const modelPredictions = await model.classify(img, classificationCount);
    console.log(modelPredictions);
    setLoading(false);
    return setPredictions(modelPredictions);
  }
  return (
    <React.Fragment>
      <header>
        <h1>TensorFlow</h1>
        <span>Image Classification</span>
      </header>
      <Container maxWidth="md">
        <div className="Container">
          <main>
            <p>
              Display the top
              {classificationCount} classifications (and respective confidence
              intervals) of an image.
            </p>

            <section className="inputs">
              <section className="left">
                <p>Sample Image</p>
                <img
                  src={sampleImg}
                  alt="sample_img"
                  ref={sampleRef}
                  height="250"
                  width="250"
                />
                <p>
                  <Button
                    variant="contained"
                    onClick={() => classifyImage(sampleRef.current)}
                  >
                    Classify Sample Image
                  </Button>
                </p>
              </section>
              <section className="right">
                <p>Upload Your Own Image</p>
                <span>
                  <input
                    type="file"
                    src=""
                    alt="image_input"
                    accept="image/*"
                    ref={userRef}
                    onChange={() =>
                      setPreview(URL.createObjectURL(userRef.current.files[0]))
                    }
                  />
                  <a href="" onClick={() => setPreview(null)}>
                    X
                  </a>
                </span>
                {preview ? <img src={preview} ref={previewRef}></img> : ""}
                <p>
                  <Button
                    variant="contained"
                    onClick={() => classifyImage(previewRef.current)}
                  >
                    Classify Your Image
                  </Button>
                </p>
              </section>
            </section>
            <p>Predictions</p>

            {predictions.length == 0 ? (
              <p>No Image Classified</p>
            ) : (
              <Predictions data={predictions} />
            )}
          </main>
          <footer>
            <p>
              This site leverages the{" "}
              <Link
                href="https://www.tensorflow.org/js/models"
                target="_blank"
                rel="noreferrer"
              >
                TensorFlow
              </Link>{" "}
              model,{" "}
              <Link
                href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet"
                target="_blank"
                rel="noreferrer"
              >
                MobileNets
              </Link>
              , which are small, low-latency, low-power models parameterized to
              meet the resource constraints of a variety of use cases.
            </p>
          </footer>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
