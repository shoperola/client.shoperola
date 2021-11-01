import * as faceapi from "face-api.js";

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

const urlToObject = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  return URL.createObjectURL(file);
};

export async function getDescription(blob) {
  // const blob = await urlToObject(url);
  let img = await faceapi.fetchImage(blob);
  const detections = await faceapi
    .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
    .withFaceExpressions()
    .withAgeAndGender();
  return detections;
}
