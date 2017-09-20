/* DOM */
let playerWrapper = document.querySelector('.player-wrapper');
let player = playerWrapper.querySelector('.player');
let playerControls = playerWrapper.querySelector('.player-controls');
let togglePlayButton = playerControls.querySelector('.toggle');
let progress = playerControls.querySelector('.progress');
let progressBar = progress.querySelector('.progress_filled');
let ranges = playerControls.querySelectorAll('.player-slider');
let skipButtons = playerControls.querySelectorAll('[data-skip]');


/*  */
function togglePlay(){
    const method = (player.paused) ? "play" : "pause";
    //player["play"]() && player["pause"]() || player.play() & player.pause()
    player[method]();

    //
    togglePlayButton.textContent = player.paused ? "⚫" : "⚪";
}

function skip(){
    player.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    //player["volume"] - player["playbackRate"] - video özelliklerine bak
    player[this.name] = this.value;
}

/* Event Listeners */

//Play - Pause
player.addEventListener('click', togglePlay);
togglePlayButton.addEventListener('click', togglePlay);

//Skip Buttons
skipButtons.forEach(element => element.addEventListener('click', skip));

//Ranges
ranges.forEach(element => element.addEventListener('mousemove', handleRangeUpdate));

//
player.addEventListener('loadedmetadata', () => {
    function handleProgress(){
        const percent = (player.currentTime / player.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }

    //first
    handleProgress();

    //Video Time
    player.addEventListener('timeupdate', handleProgress);

    //Player Progress Slide
    progress.addEventListener('click', scrub);
    //

    let mouseDown = false;
    //mouseDown && scrub(e) ---> (mouseDown) ? scrub(e)
    progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
    
    progress.addEventListener("mousedown", () => mouseDown = true);
    progress.addEventListener("mouseup", () => mouseDown = false);


    //
    function scrub(e){
        const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
        player.currentTime = scrubTime;
    }
});

//Player Finished
player.addEventListener('ended', () => {
    player.currentTime = 0;
    togglePlayButton.textContent = "⚫";
});

//speed kısmı ayarlanacak - range olmasın seçenekli olsun - 0.5x - 1x - 1.5x - 2x - 3x
//diğer javascript video özellikleri incelenecek
//github js vplayer kodlarına bakılacak 
//diğer playerlar incelenecek jwplayer - udemy player - youtube
//sağ-sol tuşları ile ileri geri

//bir nesne için offsetX - offsetY -> o nesnenin sol üst köşesinden uzaklık değerleri [mouseeventlerinde çalışıyor]
//bir nesne için pageX - pageY     -> o nesnenin sayfanın 0,0 noktasından uzaklık değerleri [mouseeventlerinde çalışıyor]
//bir nesne için offsetWidth - offsetHeight -> o nesnenin genişlik ve yükseklik değerleri 
//bir nesne için offsetLeft - offsetTop -> o nesnenin 0,0 noktasından parentına sol - üst uzaklığı _? çalışmadı _?
// Element.getBoundingClientRect(); elementin offset değerlerini toplu döndürüyor