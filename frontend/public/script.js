import { useEffect } from "react";

const ModelViewer = () => {
  useEffect(() => {
    const viewer = document.querySelector("model-viewer");
    if (!viewer) {
      console.warn("model-viewer not found in DOM.");
      return;
    }

    const onProgress = (event) => {
      const progressBar = viewer.querySelector(".progress-bar");
      const updatingBar = viewer.querySelector(".update-bar");

      if (!progressBar || !updatingBar) return;

      updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

      if (event.detail.totalProgress === 1) {
        progressBar.classList.add("hide");
        viewer.removeEventListener("progress", onProgress);
      } else {
        progressBar.classList.remove("hide");
      }
    };

    const onLoad = () => {
      console.log("✅ GLB Model has been loaded successfully!");
    };

    viewer.addEventListener("progress", onProgress);
    viewer.addEventListener("load", onLoad);

    return () => {
      viewer.removeEventListener("progress", onProgress);
      viewer.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <model-viewer
      src="/models/scene.glb"
      alt="3D scene"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      tone-mapping="neutral"
      poster="/poster.webp"
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
        <img src="/ar_hand_prompt.png" alt="AR prompt" />
      </div>
    </model-viewer>
  );
};

export default ModelViewer;