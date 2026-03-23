import { useEffect } from "react";
import "../styles.css"; // Your CSS file

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

  return () => {
    viewer.removeEventListener("progress", onProgress);
  };
}, []);

  return (
    <model-viewer
      src="/models/scene.glb"
      alt="3D Model"
      camera-controls
      tone-mapping="neutral"
      poster="/poster.webp"
      camera-orbit="40deg 55deg auto"
      shadow-intensity="1"
      autoplay
      animation_name="Take 001"

      style={{ width: "100%", height: "500px", backgroundColor: "transparent" }}
    >
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
      </div>

    </model-viewer>
  );
};

export default ModelViewer;