//loads youtube api
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const [firstScriptTag] = document.getElementsByTagName('script');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

//youtube iFrame calls this once code is ran
// eslint-disable-next-line no-unused-vars
var onYouTubeIframeAPIReady = () => {
  // eslint-disable-next-line no-undef
  player = new YT.Player('player', {
    height: '100',
    width: '100',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: window.onPlayerReady,
      onStateChange: window.onPlayerStateChange,
    },
  });
};

//waits until youtube api is ready
let playAndFormatVideo = (videoId) => {
  setTimeout(playAndFormatVideo, 500, videoId);
};

// function youtube api calls when the video player is ready
// eslint-disable-next-line no-unused-vars
var onPlayerReady = () => {
  playAndFormatVideo = (videoId) => {
    document.getElementById('loader').classList.toggle('hidden');
    document.getElementById('loader').style.animationPlayState = 'running';
    document.getElementById('player').classList.toggle('hidden');
    player.loadVideoById(videoId);
  };
}; //youtube api calls this when state changes on a video

//function youtube api calls when the player changes state, used to end the video
// eslint-disable-next-line no-unused-vars
var onPlayerStateChange = (event) => {
  const videoContainer = document.getElementById('videoContainer');
  if (event.data === 0) {
    videoContainer.style.animationPlayState = 'running';
    setTimeout(() => {
      videoContainer.style.animationPlayState = 'paused';
      player.stopVideo();
      videoContainer.classList.toggle('hidden');
    }, 1000);
  } else if (event.data === 1) {
    if (videoContainer.className === 'hidden') {
      videoContainer.classList.toggle('hidden');
    }
  }
};

//changes svg background
function addImageAndSVG(parent, href, mapObject) {
  const imageTag = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'image'
  );
  imageTag.setAttribute('id', 'backGround');
  imageTag.setAttribute('width', '100%');
  imageTag.setAttribute('height', '100%');
  imageTag.setAttribute('href', href);
  parent.appendChild(imageTag);
  mapObject.forEach((el) => {
    let shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      el.shape
    );

    if (el.shape === 'circle') {
      shape.setAttribute('cx', el.x);
      shape.setAttribute('cy', el.y);
      shape.setAttribute('r', el.r);
      shape.setAttribute('stroke-width', '25');
      shape.setAttribute('stroke', 'transparent');
      shape.setAttribute('fill', 'transparent');
    } else {
      shape.setAttribute('x', el.x);
      shape.setAttribute('y', el.y);
      shape.setAttribute('width', el.width);
      shape.setAttribute('height', el.height);
      shape.setAttribute('class', el.class);
      shape.setAttribute('fill', 'transparent');
      const viewportWidth = window.innerWidth;
      const viewportHeight = viewportWidth * (9 / 16);

      if (el.button) {
        const button = document.createElement('img');
        button.setAttribute('src', el.button);
        button.style.position = 'absolute';
        button.style.top = String((el.y * viewportHeight) / 1080) + 'px';
        button.style.left = String((el.x * viewportWidth) / 1920) + 'px';
        button.setAttribute('class', 'svgButton');

        button.onclick = function () {
          player.stopVideo();
          player.loadVideoById(el.dataVideo);
        };

        document.body.appendChild(button);
      } else {
        //this is where the on/off hover elements get set
        const popUp = document.createElement('img');

        shape.onmouseover = function () {
          popUp.setAttribute('src', el.src);
          popUp.setAttribute('data-video', el.dataVideo);
          popUp.setAttribute('id', 'popUp');
          popUp.style.position = 'absolute';
          popUp.style.top = String((el.y * viewportHeight) / 1080) + 'px';
          popUp.style.left = String((el.x * viewportWidth) / 1920 - 5) + 'px';
          popUp.style.width = '13vw';
          popUp.style.height = 'auto';

          popUp.onclick = function (e) {
            player.stopVideo();
            player.loadVideoById(e.target.getAttribute('data-video'));
          };

          document.body.appendChild(popUp);

          popUp.onmouseout = function () {
            setTimeout(() => {
              popUp.remove();
            }, 990);
          };
        };
      }
    }

    shape.setAttribute('data-video', el.dataVideo);

    shape.onclick = function (e) {
      player.stopVideo();
      player.loadVideoById(e.target.getAttribute('data-video'));
    };

    parent.appendChild(shape);
  });
} //this function just adds events of a certain type to a collection of elements

function addEventsTo(collection, event, fn) {
  for (let i = 0; i < collection.length; i++) {
    collection[i].addEventListener(event, fn);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  //gather elements from the page
  const backgroundSVG = document.getElementById('backgroundSVG');
  const landingPage = document.getElementById('landingPageSVG');
  const loadingCircle = document.getElementById('loader');
  const videoContainer = document.getElementById('videoContainer');
  // eslint-disable-next-line no-unused-vars

  const landingEvent = (e) => {
    const mobileDiv = document.createElement('div');
    mobileDiv.setAttribute('id', 'mobileContainer');
    const selection = e.target.getAttribute('data-selection');

    if (selection === 'moxyo') {
      document.getElementById('navAlt').classList.add('hide');
      addImageAndSVG(backgroundSVG, 'images/moxyoHeroImage2.jpg', [
        {
          shape: 'rect',
          x: '1500',
          y: '835',
          width: '225',
          height: '150',
          dataVideo: 'aLnKPaN5s0Y',
        },
        {
          shape: 'rect',
          x: '650',
          y: '480',
          width: '200',
          height: '100',
          dataVideo: 'F_il0me_fiE',
        },
        {
          shape: 'rect',
          x: '1685',
          y: '230',
          width: '185',
          height: '125',
          dataVideo: '2h9YLSja0-A',
        },
        {
          shape: 'rect',
          x: '325',
          y: '255',
          width: '390',
          height: '100',
          dataVideo: 'hLZKN4DTGtY',
        },
        {
          shape: 'rect',
          x: '950',
          y: '850',
          width: '300',
          height: '200',
          dataVideo: '8kLllmv82Ak',
        },
        {
          shape: 'rect',
          x: '540',
          y: '650',
          width: '200',
          height: '150',
          dataVideo: 'bTDUXbbjaBo',
        },
        {
          shape: 'rect',
          x: '575',
          y: '900',
          width: '275',
          height: '150',
          dataVideo: '9yq2twFsYRk',
        },
        {
          shape: 'rect',
          x: '175',
          y: '700',
          width: '200',
          height: '150',
          dataVideo: 'IIl6-rRS2qU',
        },
        {
          shape: 'rect',
          x: '1500',
          y: '600',
          width: '400',
          height: '150',
          dataVideo: 'FRv64Toj4tU',
        },
      ]);
      const mobileBackground = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      mobileBackground.setAttribute('viewBox', '0 0 428 857');
      addImageAndSVG(mobileBackground, 'images/moxyoMobile.jpg', [
        {
          shape: 'circle',
          x: '135',
          y: '280',
          r: '20',
          dataVideo: 'aLnKPaN5s0Y',
        },
        {
          shape: 'circle',
          x: '215',
          y: '225',
          r: '20',
          dataVideo: 'F_il0me_fiE',
        },
        {
          shape: 'circle',
          x: '275',
          y: '315',
          r: '20',
          dataVideo: '2h9YLSja0-A',
        },
        {
          shape: 'circle',
          x: '320',
          y: '315',
          r: '20',
          dataVideo: 'hLZKN4DTGtY',
        },
        {
          shape: 'circle',
          x: '360',
          y: '340',
          r: '20',
          dataVideo: '8kLllmv82Ak',
        },
        {
          shape: 'circle',
          x: '275',
          y: '540',
          r: '20',
          dataVideo: 'bTDUXbbjaBo',
        },
        {
          shape: 'circle',
          x: '350',
          y: '660',
          r: '20',
          dataVideo: '9yq2twFsYRk',
        },
        {
          shape: 'circle',
          x: '370',
          y: '800',
          r: '20',
          dataVideo: 'FRv64Toj4tU',
        },
      ]); //mobileDiv.setAttribute('id', 'mobileSVG');

      mobileDiv.appendChild(mobileBackground);
      document.body.appendChild(mobileDiv);
      document
        .getElementById('productButton')
        .setAttribute(
          'href',
          'https://www.dropbox.com/s/nq8qdfv4k0x5906/mxy-ces2022-deck-v1.pdf?dl=0'
        );
      document.getElementById('player').classList.toggle('hidden');
    } else if (selection === 'bodyguardz') {
      //adds mobile view cards
      // document.getElementsByTagName('html').style.backgroundColor = '#4AA0C1'
      document.getElementById('navAlt').classList.add('hide');
      mobileDiv.setAttribute('class', 'bodyGaurdzMobile');
      const aceImg = document.createElement('img');
      aceImg.setAttribute('src', 'images/bodygaurdzMobile/AceProPoster.png');
      aceImg.setAttribute('data-video', 'YhhsOgdPMas');
      mobileDiv.appendChild(aceImg);
      document.getElementById('nav').classList.add('hidden');

      aceImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const carveImg = document.createElement('img');
      carveImg.setAttribute('src', 'images/bodygaurdzMobile/CarvePoster.png');
      mobileDiv.appendChild(carveImg);
      carveImg.setAttribute('data-video', 'w38GlvoQbX0');

      carveImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
        document.getElementById('nav').classList.remove('hidden');
      };

      const motusImg = document.createElement('img');
      motusImg.setAttribute('src', 'images/bodygaurdzMobile/MotusPoster.png');
      mobileDiv.appendChild(motusImg);
      motusImg.setAttribute('data-video', '5gdUiPbIMrA');

      motusImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const pureImg = document.createElement('img');
      pureImg.setAttribute('src', 'images/bodygaurdzMobile/Pure3Poster.png');
      mobileDiv.appendChild(pureImg);
      pureImg.setAttribute('data-video', '0nVOdiTSJ0s');

      pureImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const solitudeImg = document.createElement('img');
      solitudeImg.setAttribute(
        'src',
        'images/bodygaurdzMobile/SolitudePoster.png'
      );
      mobileDiv.appendChild(solitudeImg);
      solitudeImg.setAttribute('data-video', '1WR1OvhN4iE');

      solitudeImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      document.body.appendChild(mobileDiv);
      document
        .getElementById('productButton')
        .setAttribute(
          'href',
          'https://www.dropbox.com/s/t4hl47xewcgyppa/bgz-ces2022-deck-v1.pdf?dl=0'
        );
      addImageAndSVG(backgroundSVG, 'images/bodyGuardHero.jpg', [
        {
          shape: 'rect',
          x: '272',
          y: '150',
          width: '240',
          height: '320',
          dataVideo: '1WR1OvhN4iE',
          src: 'images/bodygaurdzMobile/SolitudePoster.png',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '544',
          y: '235',
          width: '240',
          height: '320',
          dataVideo: 'tVpwcDEks4c',
          src: 'images/bodygaurdzMobile/CarvePoster.png',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '824',
          y: '150',
          width: '240',
          height: '320',
          dataVideo: 'YhhsOgdPMas',
          src: 'images/bodygaurdzMobile/AceProPoster.png',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '1376',
          y: '150',
          width: '240',
          height: '320',
          dataVideo: '0nVOdiTSJ0s',
          src: 'images/bodygaurdzMobile/Pure3Poster.png',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '1104',
          y: '240',
          width: '240',
          height: '320',
          dataVideo: '5gdUiPbIMrA',
          src: 'images/bodygaurdzMobile/MotusPoster.png',
          class: 'opacity-0',
        },
      ]);
    } else if (selection === 'lander') {
      //document.getElementById('nav').classList.add('hide');
      document.getElementById('navAlt').classList.remove('hide');
      addImageAndSVG(backgroundSVG, 'images/landerHeroImage.jpg', [
        {
          shape: 'rect',
          x: '95',
          y: '400',
          width: '256',
          height: '150',
          dataVideo: '_GC3f5hSaFM',
          button: 'images/landerButton/cascadePowerbank.svg',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '304',
          y: '700',
          width: '176',
          height: '130',
          dataVideo: '3e8GWKsYen0',
          button: 'images/landerButton/flintWhite.svg',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '720',
          y: '180',
          width: '256',
          height: '150',
          dataVideo: 'LHii2WDibkE',
          button: 'images/landerButton/cairnMiniWhite.svg',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '1120',
          y: '650',
          width: '240',
          height: '135',
          dataVideo: 'yceRkEyI1vE',
          button: 'images/landerButton/cairnLanternWhite.svg',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '1440',
          y: '275',
          width: '240',
          height: '115',
          dataVideo: 'RwT3jaC1I78',
          button: 'images/landerButton/cairnXLWhite.svg',
          class: 'opacity-0',
        },
        {
          shape: 'rect',
          x: '1560',
          y: '775',
          width: '240',
          height: '125',
          dataVideo: '3TXn5YLhFD8',
          button: 'images/landerButton/boulderWhite.svg',
          class: 'opacity-0',
        },
      ]); //adds mobile view cards

      const boulderLanternImg = document.createElement('img');
      boulderLanternImg.setAttribute(
        'src',
        'images/landerMobile/mobileBoulderLantern.jpg'
      );
      boulderLanternImg.setAttribute('data-video', '3TXn5YLhFD8');
      mobileDiv.appendChild(boulderLanternImg);

      boulderLanternImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const cairnLanternImg = document.createElement('img');
      cairnLanternImg.setAttribute(
        'src',
        'images/landerMobile/mobileCairnLantern.jpg'
      );
      mobileDiv.appendChild(cairnLanternImg);
      cairnLanternImg.setAttribute('data-video', 'yceRkEyI1vE');

      cairnLanternImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const cairnMiniLanternImg = document.createElement('img');
      cairnMiniLanternImg.setAttribute(
        'src',
        'images/landerMobile/mobileCairnMiniLantern.jpg'
      );
      mobileDiv.appendChild(cairnMiniLanternImg);
      cairnMiniLanternImg.setAttribute('data-video', 'LHii2WDibkE');

      cairnMiniLanternImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const cairnXLLanternImg = document.createElement('img');
      cairnXLLanternImg.setAttribute(
        'src',
        'images/landerMobile/mobileCairnXLLantern.jpg'
      );
      mobileDiv.appendChild(cairnXLLanternImg);
      cairnXLLanternImg.setAttribute('data-video', 'RwT3jaC1I78');

      cairnXLLanternImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const cascadePowerBankImg = document.createElement('img');
      cascadePowerBankImg.setAttribute(
        'src',
        'images/landerMobile/mobileCascadePowerbank.jpg'
      );
      mobileDiv.appendChild(cascadePowerBankImg);
      cascadePowerBankImg.setAttribute('data-video', '_GC3f5hSaFM');

      cascadePowerBankImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      const flintLightImg = document.createElement('img');
      flintLightImg.setAttribute(
        'src',
        'images/landerMobile/mobileFlintLight.jpg'
      );
      mobileDiv.appendChild(flintLightImg);
      flintLightImg.setAttribute('data-video', '3e8GWKsYen0');

      flintLightImg.onclick = function (e) {
        player.stopVideo();
        player.loadVideoById(e.target.getAttribute('data-video'));
      };

      document.body.appendChild(mobileDiv);
      document
        .getElementById('productButton')
        .setAttribute(
          'href',
          'https://www.dropbox.com/s/qk2ma0rpwzb7kod/ldr-ces2022-deck-v2.pdf?dl=0'
        );
    }

    landingPage.remove();
    backgroundSVG.classList.toggle('hidden');
    backgroundSVG.addEventListener('click', () => {
      if (videoContainer.classList[0] !== 'hidden') {
        player.stopVideo();
        videoContainer.classList.toggle('hidden');
      }
    });
    const backButton = document.getElementById('nav');
    backButton.classList.toggle('hidden');
    backButton.addEventListener('click', () => {
      location.reload();
    });

    if (selection !== 'moxyo') {
      videoContainer.classList.toggle('hidden');
      loadingCircle.classList.toggle('hidden');
      playAndFormatVideo(e.target.getAttribute('data-video'));
    }
  }; //adds the function just above to all the rectangle tags

  addEventsTo(document.querySelectorAll('rect'), 'click', landingEvent, {
    once: true,
  });
});
