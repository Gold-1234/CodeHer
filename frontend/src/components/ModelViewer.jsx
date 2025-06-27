import { useEffect } from "react";
import "../styles.css"; // Your CSS file
import '@google/model-viewer'; // <- Make sure this is included

const ModelViewer = () => {
  useEffect(() => {
  const viewer = document.querySelector("model-viewer");
  if (!viewer) return;

  const onProgress = (event) => {
    const progressBar = viewer.querySelector(".progress-bar");
    const updatingBar = viewer.querySelector(".update-bar");

    if (!progressBar || !updatingBar) return;

    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

    if (event.detail.totalProgress === 1) {
      progressBar.classList.add("hide");
    } else {
      progressBar.classList.remove("hide");
    }
  };

  viewer.addEventListener("progress", onProgress);

  // ✅ Delay to let model-viewer initialize before accessing `loaded`
  const checkLoaded = () => {
    if (viewer.loaded && typeof viewer.loaded.then === "function") {
      viewer.loaded.then(() => {
        console.log("✅ GLB Model fully loaded");
      });
    } else {
      // Try again after a short delay
      console.log('not loaded');
      
      setTimeout(checkLoaded, 100);
    }
  };

  checkLoaded();

  return () => {
    viewer.removeEventListener("progress", onProgress);
  };
}, []);

  return (
    <model-viewer
      src="/models/scene.glb"
      alt="3D Model"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      tone-mapping="neutral"
      poster="/poster.webp"
      camera-orbit="40deg 55deg auto"
      shadow-intensity="1"
      autoplay
      style={{ width: "100%", height: "500px", backgroundColor: "transparent" }}
    >
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
      </div>
      <button slot="ar-button" id="ar-button">
        View in your space
      </button>

      <div id="ar-prompt">
        <img src="/ar_hand_prompt.png" alt="AR prompt hand" />
      </div>
    </model-viewer>
  );
};

export default ModelViewer;