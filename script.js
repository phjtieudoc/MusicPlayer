$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
		playPauseButton = $("#play-pause-button"),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "Mr.Siro",
		name: "Lắng Nghe Nước Mắt",
		url: "https://docs.google.com/uc?export=download&id=1Ecg3BZ1CItVsfusAnykh1MfaML4SNhT-",
		picture: "https://avatar-nct.nixcdn.com/song/2018/05/06/5/1/b/4/1525584753612_640.jpg"
	}, {
    artist: "Hà Anh Tuấn",
    name: "Tháng Tư Là Lời Nói Dối Của Em",
    url: "https://docs.google.com/uc?export=download&id=1D8e6YTLNHDEooxq_VbxP3vScyOcm8QHm",
    picture: "https://avatar-nct.nixcdn.com/song/2017/09/22/1/a/3/6/1506063956390_640.jpg"
}, {
    artist: "Tino",
    name: "Ừ Có Anh Đây",
    url: "https://docs.google.com/uc?export=download&id=1emYz8dFA0a0AwtVZGiMqk9_LV9USvEC8",
    picture: "https://photo-zmp3.zadn.vn/covers/0/4/047305f465f0aa64c22ed49787b02548_1510199251.jpg"
}, {
    artist: "JayKii",
    name: "Sao Em Nỡ",
    url: "https://docs.google.com/uc?export=download&id=1Yc_IIps7kjGtv3TYDhc9uTne-blEPF3Y",
    picture: "https://data.chiasenhac.com/data/cover/90/89895.jpg"
}, {
    artist: "Nguyễn Đình Vũ",
    name: "Chúng Ta Dừng Lại Ở Đây Thôi",
    url: "https://docs.google.com/uc?export=download&id=1sCCIGG-lWUkibZg8SeUYBkp6mvGfF655",
    picture: "https://avatar-nct.nixcdn.com/song/2019/09/26/a/a/9/f/1569463314685_640.jpg"
}, {
    artist: "Thanh Hưng",
    name: "Sai Người Sai Thời Điểm",
    url: "https://docs.google.com/uc?export=download&id=1Y3AdWH6PyKZ5ODwjr1XbaQgGvXQP0PEw",
    picture: "https://data.chiasenhac.com/data/cover/89/88857.jpg"
}, {
    artist: "Soobin Hoàng Sơn",
    name: "Yêu Thương Ngày Đó",
    url: "https://docs.google.com/uc?export=download&id=1INJlKojJxuZB0Q7aRkMV42Pcy_NsRioj",
    picture: "https://photo-zmp3.zadn.vn/cover/d/0/b/8/d0b8df07498b8f0549eed787569efba6.jpg"
}, {
    artist: "Trung Quân",
    name: "Cánh Đồng Yêu Thương",
    url: "https://docs.google.com/uc?export=download&id=1_qYzpWclu5XLMAE4PynQZ320wbFVvyJa",
    picture: "https://data.chiasenhac.com/data/cover/71/70389.jpg"
}, {
    artist: "Hồ Phong An",
    name: "Giá Như Anh Là Người Vô Tâm",
    url: "https://docs.google.com/uc?export=download&id=19OQl77m_eOLJejlqrRY0-eZa0qARJtUD",
    picture: "https://data.chiasenhac.com/data/cover/94/93072.jpg"
}, {
    artist: "Vương Anh Tú",
    name: "Anh Biết Anh Sai Rồi",
    url: "https://docs.google.com/uc?export=download&id=1dHf8OzTl1PHwCVk6CJwxPWus_RV-14YR",
    picture: "https://data.chiasenhac.com/data/cover/72/71073.jpg"
}, {
    artist: "Mr.Siro",
    name: "Đừng Rời Xa Anh",
    url: "https://docs.google.com/uc?export=download&id=1EVMomTHHEsDb6mRH3NUzROg2JAyWPyUl",
    picture: "https://data.chiasenhac.com/data/cover/68/67050.jpg"
}, {
    artist: "Vương Anh Tú",
    name: "Anh Sẽ Ổn Thôi",
    url: "https://docs.google.com/uc?export=download&id=1yNBdRY7Yn6-_n1lQEN3DIhE1yUwbVHi4",
    picture: "https://photo-zmp3.zadn.vn/covers/7/8/78822d9ca7bae4240a7f9048e776dc4e_1474520373.jpg"
},{
    artist: "Lương Gia Hùng",
    name: "Cô Đơn Sẽ Tốt Hơn",
    url: "https://docs.google.com/uc?export=download&id=18B074pWzzgVhbpCnjPYdx37k53-YeAhl",
    picture: "https://zmp3-photo-fbcrawler.zadn.vn/cover/3/2/d/5/32d5cb46f04e2fccd0897770ae29f791.jpg"
}, {
    artist: "Soobin Hoàng Sơn",
    name: "Xin Đừng Lặng Im",
    url: "https://docs.google.com/uc?export=download&id=1e9TeZkwRCSkmk0trL2NnqKfPWS912dgf",
    picture: "https://avatar-nct.nixcdn.com/song/2017/07/26/0/5/a/f/1501064298342_640.jpg"
}, {
    artist: "Dình Dũng",
    name: "Sai Lầm Của Anh",
    url: "https://docs.google.com/uc?export=download&id=1rxfB1BUGYbInBzBoqeBMwvILYBJOS-R-",
    picture: "https://avatar-nct.nixcdn.com/song/2019/10/21/4/6/1/e/1571623691373_640.jpg"
}];
	
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
		albumArt.find('img').attr('src', currArtwork);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audio = new Audio();

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
});
