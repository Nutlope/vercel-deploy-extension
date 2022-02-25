let bobRossImages = [
  "https://bit.ly/3Ck6DTU",
  "https://bit.ly/3ozQCVk",
  "https://bit.ly/3omYDN6",
  "https://bit.ly/3osrfoi",
  "https://bit.ly/3qCPjax",
  "https://bit.ly/3CkRXE6",
];

const imgs = document.getElementsByTagName("img");

for (image of imgs) {
  const index = Math.floor(Math.random() * bobRossImages.length);
  image.src = bobRossImages[index];
}

# Bob Ross Chrome Extension

This is a Chrome Extension that replaces all images on YouTube.com with pictures of Bob Ross when enabled. It's a good "hello world" for Chrome Extensions.

## Usage

60 second video on how to build and use this Chrome Extension is [here!](https://www.youtube.com/watch?v=oB_g4_ptZVc&ab_channel=Nutlope) I'm working on a better video that will be public soon.
