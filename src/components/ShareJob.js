import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

export default function ShareJob({jobUrl}) {
  let url = jobUrl;
  const shareOnFacebook = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookShareURL, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedinShareURL = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedinShareURL, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterShareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}`;
    window.open(twitterShareURL, "_blank");
  };
  return (
    <div>
      <h3>
        <span style={{ borderBottom: "3px solid #6495ED" }}>
          SHARE JOB OPENINGS
        </span>
      </h3>
      <span style={{ padding: "5px", cursor:"pointer" }}>
        <FacebookRoundedIcon target="__blank" onClick={shareOnFacebook} />
      </span>
      <span style={{ padding: "5px", cursor:"pointer" }}>
        <svg
          onClick={shareOnTwitter}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          target="__blank"
        >
          <path
            fill="currentColor"
            d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"
          />
        </svg>
      </span>
      <span style={{ padding: "5px", cursor:"pointer" }}>
        <svg
          onClick={shareOnLinkedIn}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          target="__blank"
        >
          <path
            fill="currentColor"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
          />
        </svg>
      </span>
    </div>
  );
}