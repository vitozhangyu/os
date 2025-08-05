// desktop.js - Enhanced Mac System 7 desktop with proper window management

class DesktopApp {
  constructor() {
    this.zIndex = 20;
    this.windows = new Map();
    this.minimizedWindows = new Map();
    this.activeWindow = null;
    this.draggedWindow = null;
    this.dragOffset = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.setupDesktop();
    this.setupDock();
    this.createDefaultApps();
    this.setupGlobalEvents();
  }

  setupDesktop() {
    this.desktop = document.getElementById('desktop');
    if (!this.desktop) return;

    // Desktop click to deselect windows
    this.desktop.addEventListener('click', (e) => {
      if (e.target === this.desktop) {
        this.deselectAllWindows();
      }
    });
  }

  setupDock() {
    this.dock = document.getElementById('dock');
    if (!this.dock) return;

    // Clear existing dock items
    this.dock.innerHTML = '';
  }

  createDefaultApps() {
    // Create app definitions with spread positions and dock icons
    const apps = [
      {
        id: 'contact-app',
        title: 'Contact',
        icon: '📧',
        dockIcon: 'https://img.icons8.com/ios-filled/50/4a90e2/contacts.png',
        content: `
          <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; color: #333; font-size: 18px;">Contact Information</h2>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">📧 Email</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                <a href="mailto:your.email@example.com" style="color: #4a90e2; text-decoration: none;">your.email@example.com</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">🌐 Social Media</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                <a href="#" style="color: #4a90e2; text-decoration: none;">LinkedIn</a> | 
                <a href="#" style="color: #4a90e2; text-decoration: none;">Instagram</a> | 
                <a href="#" style="color: #4a90e2; text-decoration: none;">GitHub</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">📍 Location</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                Eindhoven, Netherlands
              </p>
            </div>
          </div>
        `,
        width: 400,
        height: 350,
        position: { left: '50px', top: '80px' }
      },
      {
        id: 'cv-app',
        title: 'Curriculum Vitae',
        icon: '📄',
        dockIcon: 'https://img.icons8.com/ios-filled/50/28ca42/resume.png',
        content: `
          <div style="padding: 20px;">
            <h2 style="margin-bottom: 15px; color: #333; font-size: 18px;">Curriculum Vitae</h2>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">🎓 Education</h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #666;">
                <li>Bachelor of Design, Design Academy Eindhoven</li>
                <li>Master of Interaction Design, TU Eindhoven</li>
                <li>Certification in Frontend Development</li>
              </ul>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">💼 Skills</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                UI/UX Design, HTML5, CSS3, JavaScript, React, Figma, Adobe Creative Suite
              </p>
            </div>
            <button onclick="desktopApp.downloadCV()" style="
              background: #4a90e2; color: white; border: none; padding: 8px 16px; 
              border-radius: 6px; cursor: pointer; font-size: 12px; transition: background 0.2s;
            ">Download CV</button>
          </div>
        `,
        width: 450,
        height: 400,
        position: { left: '500px', top: '120px' }
      },
      {
        id: 'publications-app',
        title: 'Publications',
        icon: '📚',
        dockIcon: 'https://img.icons8.com/ios-filled/50/ff6b6b/library.png',
        content: `
          <div style="padding: 20px;">
            <h2 style="margin-bottom: 15px; color: #333; font-size: 18px;">Publications</h2>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Design Journal, 2024</h3>
              <p style="margin: 0 0 15px 0; font-size: 13px; color: #666;">
                "The Art of Dual Interfaces" - Exploring the intersection of modern and retro design
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Web Design Weekly, 2023</h3>
              <p style="margin: 0 0 15px 0; font-size: 13px; color: #666;">
                "Retro Computing in Modern Web Design" - Nostalgia meets functionality
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
              <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">UX Magazine, 2023</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                "User-Centered Design in Healthcare" - Improving patient experiences
              </p>
            </div>
          </div>
        `,
        width: 500,
        height: 350,
        position: { left: '1000px', top: '80px' }
      },
      {
        id: 'portfolio-app',
        title: 'Portfolio',
        icon: '🎨',
        dockIcon: 'https://img.icons8.com/ios-filled/50/9c88ff/portfolio.png',
        content: `
          <div style="padding: 20px;">
            <h2 style="margin-bottom: 15px; color: #333; font-size: 18px;">Portfolio Projects</h2>
            <div style="display: grid; gap: 15px;">
              <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Responsive Web Design Portfolio</h3>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
                  A modern portfolio website with dual interfaces
                </p>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666;">Web Design</span>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666; margin-left: 5px;">JavaScript</span>
              </div>
              <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Mobile App UI Design</h3>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
                  Comprehensive mobile application design system
                </p>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666;">UI/UX</span>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666; margin-left: 5px;">Mobile</span>
              </div>
              <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Brand Identity Design</h3>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
                  Complete brand identity for tech startup
                </p>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666;">Branding</span>
                <span style="background: rgba(255, 255, 255, 0.2); padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #666; margin-left: 5px;">Logo Design</span>
              </div>
            </div>
          </div>
        `,
        width: 550,
        height: 450,
        position: { left: '200px', top: '500px' }
      },
      {
        id: 'ipod-app',
        title: 'iPod Classic',
        icon: '🎵',
        dockIcon: 'https://img.icons8.com/ios-filled/50/333333/ipod.png',
        content: `
          <div style="padding: 20px; display: flex; justify-content: center; align-items: center; height: 100%;">
            <div style="
              width: 240px; height: 320px; 
              background: linear-gradient(145deg, #e6e6e6 0%, #ffffff 50%, #d4d4d4 100%);
              border-radius: 12px; 
              border: 2px solid #b0b0b0;
              box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.8),
                inset 0 -2px 4px rgba(0, 0, 0, 0.1);
              position: relative;
              overflow: hidden;
            ">
              <!-- iPod Screen - Classic monochrome LCD -->
              <div style="
                position: absolute; top: 12px; left: 12px; right: 12px; bottom: 80px;
                background: #000; border-radius: 4px; overflow: hidden;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
              ">
                <!-- Classic iPod Screen Interface -->
                <div id="ipod-screen" style="
                  width: 100%; height: 100%; 
                  background: #000; 
                  color: #fff; 
                  font-family: 'Courier New', monospace;
                  font-size: 10px;
                  padding: 8px;
                  overflow: hidden;
                  position: relative;
                ">
                  <!-- Header with play icon, title, and battery -->
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 9px;
                  ">
                    <div style="color: #fff;">▶</div>
                    <div style="font-weight: bold;">Now Playing</div>
                    <div style="color: #fff;">🔋</div>
                  </div>
                  
                  <!-- Track counter -->
                  <div style="
                    text-align: center;
                    margin-bottom: 8px;
                    font-size: 9px;
                    color: #ccc;
                  ">5 of 64</div>
                  
                  <!-- Track info -->
                  <div id="track-info" style="
                    text-align: center;
                    margin-bottom: 12px;
                    font-size: 10px;
                  ">
                    <div id="track-title" style="margin-bottom: 4px;">Last Summer Whisper</div>
                    <div id="track-artist" style="color: #999; font-size: 9px;">Anri</div>
                  </div>
                  
                  <!-- Progress bar -->
                  <div id="progress-container" style="
                    margin-bottom: 8px;
                  ">
                    <div id="progress-bar" style="
                      width: 100%; 
                      height: 2px; 
                      background: #333; 
                      position: relative;
                      margin-bottom: 4px;
                    ">
                      <div id="progress-fill" style="
                        height: 100%; 
                        background: #fff; 
                        width: 0%;
                        transition: width 0.3s;
                      "></div>
                    </div>
                    <div id="time-display" style="
                      display: flex;
                      justify-content: space-between;
                      font-size: 8px; 
                      color: #999;
                    ">
                      <span id="current-time">0:00</span>
                      <span id="total-time">-5:06</span>
                    </div>
                  </div>
                  
                  <!-- Menu items (hidden by default, shown when navigating) -->
                  <div id="ipod-menu" style="display: none; height: calc(100% - 40px); overflow-y: auto;">
                    <div class="menu-item active" data-action="now-playing">▶ Now Playing</div>
                    <div class="menu-item" data-action="playlists">📋 Playlists</div>
                    <div class="menu-item" data-action="artists">👤 Artists</div>
                    <div class="menu-item" data-action="songs">🎵 Songs</div>
                    <div class="menu-item" data-action="search">🔍 Search</div>
                    <div class="menu-item" data-action="settings">⚙️ Settings</div>
                  </div>
                  
                  <!-- Search Screen (hidden by default) -->
                  <div id="search-screen" style="display: none; height: calc(100% - 20px);">
                    <div style="text-align: center; margin-bottom: 8px; font-weight: bold;">Search</div>
                    <div style="margin-bottom: 8px;">
                      <input type="text" id="search-input" placeholder="Search songs..." style="
                        width: 100%; 
                        background: #000; 
                        border: 1px solid #333; 
                        color: #fff; 
                        padding: 4px;
                        font-family: inherit;
                        font-size: 9px;
                      ">
                    </div>
                    <div id="search-results" style="
                      height: calc(100% - 60px); 
                      overflow-y: auto;
                      font-size: 9px;
                    "></div>
                  </div>
                </div>
              </div>
              
              <!-- iPod Click Wheel - Classic design -->
              <div id="click-wheel" style="
                position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
                width: 60px; height: 60px;
                background: linear-gradient(145deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
                border-radius: 50%;
                border: 2px solid #a0a0a0;
                box-shadow: 
                  0 4px 8px rgba(0, 0, 0, 0.2),
                  inset 0 2px 4px rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                user-select: none;
                transition: all 0.2s ease;
              ">
                <!-- Center Button -->
                <div id="center-button" style="
                  width: 20px; height: 20px;
                  background: linear-gradient(145deg, #e0e0e0 0%, #c0c0c0 100%);
                  border-radius: 50%;
                  border: 1px solid #a0a0a0;
                  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 8px;
                  color: #666;
                  font-weight: bold;
                  transition: all 0.1s ease;
                ">OK</div>
              </div>
              
              <!-- Menu Button -->
              <div id="menu-button" style="
                position: absolute; bottom: 82px; left: 50%; transform: translateX(-50%);
                width: 30px; height: 16px;
                background: linear-gradient(145deg, #d0d0d0 0%, #b0b0b0 100%);
                border-radius: 8px;
                border: 1px solid #a0a0a0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                color: #666;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.1s ease;
              ">MENU</div>
              
              <!-- Previous/Next Buttons -->
              <div id="prev-button" style="
                position: absolute; bottom: 82px; left: 12px;
                width: 30px; height: 16px;
                background: linear-gradient(145deg, #d0d0d0 0%, #b0b0b0 100%);
                border-radius: 8px;
                border: 1px solid #a0a0a0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                color: #666;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.1s ease;
              ">⏮</div>
              
              <div id="next-button" style="
                position: absolute; bottom: 82px; right: 12px;
                width: 30px; height: 16px;
                background: linear-gradient(145deg, #d0d0d0 0%, #b0b0b0 100%);
                border-radius: 8px;
                border: 1px solid #a0a0a0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                color: #666;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.1s ease;
              ">⏭</div>
              
              <!-- Play/Pause Button -->
              <div id="play-button" style="
                position: absolute; bottom: 104px; left: 50%; transform: translateX(-50%);
                width: 30px; height: 16px;
                background: linear-gradient(145deg, #d0d0d0 0%, #b0b0b0 100%);
                border-radius: 8px;
                border: 1px solid #a0a0a0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                color: #666;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.1s ease;
              ">⏸</div>
            </div>
          </div>
        `,
        width: 320,
        height: 400,
        position: { left: '800px', top: '300px' }
      }
    ];

    // Create apps and add to dock
    apps.forEach(app => {
      this.createApp(app);
      this.addDockItem(app);
    });
  }

  createApp(appConfig) {
    const window = this.createWindow(appConfig);
    this.windows.set(appConfig.id, window);
    this.desktop.appendChild(window);
  }

  createWindow(appConfig) {
    const window = document.createElement('div');
    window.className = 'window';
    window.id = appConfig.id;
    window.style.left = appConfig.position.left;
    window.style.top = appConfig.position.top;
    window.style.width = appConfig.width + 'px';
    window.style.height = appConfig.height + 'px';
    window.style.zIndex = ++this.zIndex;

    window.innerHTML = `
      <div class="title-bar">
        <span class="title">${appConfig.title}</span>
        <div class="window-controls">
          <button class="minimize-btn" aria-label="Minimize">−</button>
          <button class="maximize-btn" aria-label="Maximize">□</button>
          <button class="close-btn" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="window-content">
        ${appConfig.content}
      </div>
    `;

    this.setupWindowEvents(window, appConfig);
    
    // Special handling for iPod app
    if (appConfig.id === 'ipod-app') {
      this.setupIPodControls(window);
    }
    
    return window;
  }

  setupIPodControls(window) {
    // iPod System State
    const iPodState = {
      currentScreen: 'now-playing',
      selectedIndex: 0,
      playlists: [],
      currentTrack: null,
      isPlaying: false, // Start paused like in the image
      currentTime: 0,
      duration: 306, // Track duration
      player: null,
      searchResults: [],
      menuItems: ['now-playing', 'playlists', 'artists', 'songs', 'search', 'settings']
    };

    // Get DOM elements with null checks
    const clickWheel = window.querySelector('#click-wheel');
    const centerButton = window.querySelector('#center-button');
    const menuButton = window.querySelector('#menu-button');
    const prevButton = window.querySelector('#prev-button');
    const nextButton = window.querySelector('#next-button');
    const playButton = window.querySelector('#play-button');
    const ipodMenu = window.querySelector('#ipod-menu');
    const searchScreen = window.querySelector('#search-screen');
    const searchInput = window.querySelector('#search-input');
    const searchResults = window.querySelector('#search-results');
    const trackTitle = window.querySelector('#track-title');
    const trackArtist = window.querySelector('#track-artist');
    const progressFill = window.querySelector('#progress-fill');
    const currentTimeSpan = window.querySelector('#current-time');
    const totalTimeSpan = window.querySelector('#total-time');

    // Check if all required elements exist
    if (!clickWheel || !centerButton || !menuButton || !prevButton || !nextButton || !playButton) {
      console.error('Required iPod elements not found');
      return;
    }

    // Add hover effects to buttons
    const buttons = [centerButton, menuButton, prevButton, nextButton, playButton];
    buttons.forEach(button => {
      if (button) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
          button.style.filter = 'brightness(1.2)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
          button.style.filter = 'brightness(1)';
        });
        button.addEventListener('mousedown', () => {
          button.style.transform = 'scale(0.95)';
          // Play click sound (simulated)
          console.log('Click!');
        });
        button.addEventListener('mouseup', () => {
          button.style.transform = 'scale(1.1)';
        });
      }
    });

    // YouTube API Integration
    function loadYouTubeAPI() {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = function() {
          createPlayer();
        };
      }
    }

    function createPlayer() {
      try {
        // Create hidden iframe for YouTube player
        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        playerDiv.style.display = 'none';
        document.body.appendChild(playerDiv);

        iPodState.player = new YT.Player('youtube-player', {
          height: '1',
          width: '1',
          playerVars: {
            autoplay: 0, // Start paused like in the image
            mute: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
          }
        });
      } catch (error) {
        console.error('Error creating YouTube player:', error);
      }
    }

    function onPlayerReady(event) {
      console.log('YouTube player ready');
      // Load track but don't autoplay
      loadTrack('6S20mJvr4vs', 'Last Summer Whisper', 'Anri');
    }

    function onPlayerStateChange(event) {
      switch(event.data) {
        case YT.PlayerState.PLAYING:
          iPodState.isPlaying = true;
          if (playButton) playButton.textContent = '⏸';
          break;
        case YT.PlayerState.PAUSED:
          iPodState.isPlaying = false;
          if (playButton) playButton.textContent = '▶';
          break;
        case YT.PlayerState.ENDED:
          iPodState.isPlaying = false;
          if (playButton) playButton.textContent = '▶';
          break;
      }
    }

    function onPlayerError(event) {
      console.error('YouTube player error:', event.data);
    }

    // Track Management
    function loadTrack(videoId, title, artist) {
      if (iPodState.player && iPodState.player.loadVideoById) {
        iPodState.player.loadVideoById(videoId);
        iPodState.currentTrack = { videoId, title, artist };
        if (trackTitle) trackTitle.textContent = title;
        if (trackArtist) trackArtist.textContent = artist;
        iPodState.isPlaying = false; // Start paused
        if (playButton) playButton.textContent = '▶';
      }
    }

    function playPause() {
      if (iPodState.player) {
        if (iPodState.isPlaying) {
          iPodState.player.pauseVideo();
        } else {
          iPodState.player.playVideo();
        }
      }
    }

    function seekForward() {
      if (iPodState.player) {
        const currentTime = iPodState.player.getCurrentTime();
        iPodState.player.seekTo(currentTime + 10, true);
      }
    }

    function seekBackward() {
      if (iPodState.player) {
        const currentTime = iPodState.player.getCurrentTime();
        iPodState.player.seekTo(Math.max(0, currentTime - 10), true);
      }
    }

    // Navigation System
    function updateMenuSelection() {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.menu-item');
      menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === iPodState.selectedIndex);
      });
    }

    function navigateMenu(direction) {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.menu-item');
      iPodState.selectedIndex = Math.max(0, Math.min(menuItems.length - 1, iPodState.selectedIndex + direction));
      updateMenuSelection();
    }

    function selectMenuItem() {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.menu-item');
      const selectedItem = menuItems[iPodState.selectedIndex];
      if (!selectedItem) return;
      
      const action = selectedItem.dataset.action;
      
      switch(action) {
        case 'now-playing':
          showNowPlaying();
          break;
        case 'search':
          showSearch();
          break;
        case 'playlists':
          showPlaylists();
          break;
        default:
          console.log('Feature coming soon:', action);
      }
    }

    function showNowPlaying() {
      iPodState.currentScreen = 'now-playing';
      if (ipodMenu) ipodMenu.style.display = 'none';
      if (searchScreen) searchScreen.style.display = 'none';
      // Show the track info and progress bar
      const trackInfo = document.querySelector('#track-info');
      const progressContainer = document.querySelector('#progress-container');
      if (trackInfo) trackInfo.style.display = 'block';
      if (progressContainer) progressContainer.style.display = 'block';
    }

    function showSearch() {
      iPodState.currentScreen = 'search';
      if (ipodMenu) ipodMenu.style.display = 'none';
      if (searchScreen) searchScreen.style.display = 'block';
      if (searchInput) searchInput.focus();
    }

    function showPlaylists() {
      iPodState.currentScreen = 'playlists';
      // Implementation for playlists screen
    }

    function goBack() {
      if (iPodState.currentScreen !== 'now-playing') {
        iPodState.currentScreen = 'now-playing';
        iPodState.selectedIndex = 0;
        if (ipodMenu) ipodMenu.style.display = 'none';
        if (searchScreen) searchScreen.style.display = 'none';
        showNowPlaying();
      }
    }

    // Search Functionality
    async function searchYouTube(query) {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=YOUR_API_KEY`);
        const data = await response.json();
        iPodState.searchResults = data.items || [];
        displaySearchResults();
      } catch (error) {
        console.error('Search error:', error);
        // Fallback: simulate search results
        iPodState.searchResults = [
          { id: { videoId: '6S20mJvr4vs' }, snippet: { title: 'Last Summer Whisper', channelTitle: 'Anri' } },
          { id: { videoId: 'dQw4w9WgXcQ' }, snippet: { title: 'Never Gonna Give You Up', channelTitle: 'Rick Astley' } }
        ];
        displaySearchResults();
      }
    }

    function displaySearchResults() {
      if (!searchResults) return;
      searchResults.innerHTML = '';
      iPodState.searchResults.forEach((result, index) => {
        const div = document.createElement('div');
        div.className = 'search-result';
        div.style.cssText = `
          padding: 4px 0;
          border-bottom: 1px solid #333;
          cursor: pointer;
          font-size: 9px;
        `;
        div.textContent = `${result.snippet.title} - ${result.snippet.channelTitle}`;
        div.addEventListener('click', () => {
          loadTrack(result.id.videoId, result.snippet.title, result.snippet.channelTitle);
          showNowPlaying();
        });
        searchResults.appendChild(div);
      });
    }

    // Progress Update
    function updateProgress() {
      if (iPodState.player && iPodState.isPlaying) {
        const currentTime = iPodState.player.getCurrentTime();
        const duration = iPodState.player.getDuration();
        
        if (duration > 0) {
          const progress = (currentTime / duration) * 100;
          if (progressFill) progressFill.style.width = progress + '%';
          
          const currentMinutes = Math.floor(currentTime / 60);
          const currentSeconds = Math.floor(currentTime % 60);
          const totalMinutes = Math.floor(duration / 60);
          const totalSeconds = Math.floor(duration % 60);
          const remainingTime = duration - currentTime;
          const remainingMinutes = Math.floor(remainingTime / 60);
          const remainingSeconds = Math.floor(remainingTime % 60);
          
          if (currentTimeSpan) currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
          if (totalTimeSpan) totalTimeSpan.textContent = `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
      }
    }

    // Click Wheel Controls
    let startY = 0;
    let startX = 0;
    let isDragging = false;

    if (clickWheel) {
      clickWheel.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();
      });

      clickWheel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const deltaX = e.clientX - startX;
        
        if (Math.abs(deltaY) > 5 || Math.abs(deltaX) > 5) {
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // Vertical scrolling - menu navigation or seeking
            if (iPodState.currentScreen === 'menu') {
              navigateMenu(deltaY > 0 ? 1 : -1);
            } else if (iPodState.currentScreen === 'now-playing') {
              if (iPodState.player) {
                const currentTime = iPodState.player.getCurrentTime();
                const duration = iPodState.player.getDuration();
                const seekTime = currentTime + (deltaY * 0.1);
                iPodState.player.seekTo(Math.max(0, Math.min(seekTime, duration)), true);
              }
            }
          } else {
            // Horizontal scrolling - volume control (simulated)
            console.log(deltaX > 0 ? 'Volume Up' : 'Volume Down');
          }
          
          startY = e.clientY;
          startX = e.clientX;
        }
      });

      clickWheel.addEventListener('mouseup', () => {
        isDragging = false;
      });

      clickWheel.addEventListener('mouseleave', () => {
        isDragging = false;
      });
    }

    // Button Controls
    if (centerButton) {
      centerButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'menu') {
          selectMenuItem();
        } else if (iPodState.currentScreen === 'now-playing') {
          playPause();
        }
      });
    }

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          // Show menu
          iPodState.currentScreen = 'menu';
          iPodState.selectedIndex = 0;
          if (ipodMenu) ipodMenu.style.display = 'block';
          updateMenuSelection();
        } else {
          goBack();
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          seekBackward();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          seekForward();
        }
      });
    }

    if (playButton) {
      playButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          playPause();
        }
      });
    }

    // Search Input
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchYouTube(searchInput.value);
        }
      });
    }

    // Keyboard Controls
    window.addEventListener('keydown', (e) => {
      if (!window.classList.contains('active')) return;
      
      switch(e.key) {
        case ' ':
          e.preventDefault();
          if (centerButton) centerButton.click();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (iPodState.currentScreen === 'menu') {
            navigateMenu(-1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (iPodState.currentScreen === 'menu') {
            navigateMenu(1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (prevButton) prevButton.click();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (nextButton) nextButton.click();
          break;
        case 'Escape':
          e.preventDefault();
          goBack();
          break;
      }
    });

    // Progress update interval
    setInterval(updateProgress, 1000);

    // Initialize
    loadYouTubeAPI();
    showNowPlaying(); // Start with now playing screen
  }

  setupWindowEvents(window, appConfig) {
    const titleBar = window.querySelector('.title-bar');
    const closeBtn = window.querySelector('.close-btn');
    const minimizeBtn = window.querySelector('.minimize-btn');
    const maximizeBtn = window.querySelector('.maximize-btn');

    // Window dragging
    titleBar.addEventListener('mousedown', (e) => {
      // Don't start drag if clicking on window controls
      if (e.target.closest('.window-controls')) return;
      
      this.startDrag(window, e);
    });

    // Window controls
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeWindow(window);
    });

    minimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.minimizeWindow(window);
    });

    maximizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.maximizeWindow(window);
    });

    // Focus window on click
    window.addEventListener('mousedown', (e) => {
      // Don't focus if clicking on controls
      if (!e.target.closest('.window-controls')) {
        this.focusWindow(window);
      }
    });

    // Double click title bar to maximize
    titleBar.addEventListener('dblclick', (e) => {
      // Don't maximize if clicking on controls
      if (!e.target.closest('.window-controls')) {
        this.maximizeWindow(window);
      }
    });
  }

  addDockItem(appConfig) {
    const dockItem = document.createElement('div');
    dockItem.className = 'dock-item';
    dockItem.dataset.app = appConfig.id;
    
    dockItem.innerHTML = `
      <img src="${appConfig.dockIcon}" alt="${appConfig.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div style="display: none; width: 32px; height: 32px; align-items: center; justify-content: center; font-size: 20px;">${appConfig.icon}</div>
      <div class="app-name">${appConfig.title}</div>
    `;
    
    dockItem.addEventListener('click', () => {
      this.toggleWindow(appConfig.id);
    });

    this.dock.appendChild(dockItem);
  }

  startDrag(window, e) {
    this.draggedWindow = window;
    this.dragOffset.x = e.clientX - window.offsetLeft;
    this.dragOffset.y = e.clientY - window.offsetTop;
    
    this.focusWindow(window);
    document.body.style.cursor = 'move';
    window.classList.add('dragging');
    
    e.preventDefault();
  }

  handleMouseMove(e) {
    if (!this.draggedWindow) return;
    
    const newLeft = e.clientX - this.dragOffset.x;
    const newTop = e.clientY - this.dragOffset.y;
    
    // Constrain to viewport bounds
    const maxLeft = window.innerWidth - this.draggedWindow.offsetWidth;
    const maxTop = window.innerHeight - this.draggedWindow.offsetHeight;
    
    this.draggedWindow.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
    this.draggedWindow.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
  }

  handleMouseUp() {
    if (this.draggedWindow) {
      this.draggedWindow.classList.remove('dragging');
      this.draggedWindow = null;
      document.body.style.cursor = '';
    }
  }

  focusWindow(window) {
    if (this.activeWindow) {
      this.activeWindow.classList.remove('active');
    }
    window.classList.add('active');
    window.style.zIndex = ++this.zIndex;
    this.activeWindow = window;
    
    // Update dock item state
    this.updateDockState(window.id, true);
  }

  deselectAllWindows() {
    if (this.activeWindow) {
      this.activeWindow.classList.remove('active');
      this.activeWindow = null;
    }
    
    // Clear all dock active states
    document.querySelectorAll('.dock-item').forEach(item => {
      item.classList.remove('active');
    });
  }

  closeWindow(window) {
    window.style.display = 'none';
    this.minimizedWindows.delete(window.id);
    this.updateDockState(window.id, false);
  }

  minimizeWindow(window) {
    window.style.display = 'none';
    this.minimizedWindows.set(window.id, window);
    this.updateDockState(window.id, false);
  }

  maximizeWindow(window) {
    if (window.classList.contains('maximized')) {
      // Restore
      window.classList.remove('maximized');
      window.style.width = window.dataset.originalWidth || '400px';
      window.style.height = window.dataset.originalHeight || '300px';
      window.style.left = window.dataset.originalLeft || '60px';
      window.style.top = window.dataset.originalTop || '80px';
    } else {
      // Maximize
      window.classList.add('maximized');
      window.dataset.originalWidth = window.style.width;
      window.dataset.originalHeight = window.style.height;
      window.dataset.originalLeft = window.style.left;
      window.dataset.originalTop = window.style.top;
      
      window.style.width = 'calc(100vw - 40px)';
      window.style.height = 'calc(100vh - 80px)';
      window.style.left = '20px';
      window.style.top = '20px';
    }
  }

  toggleWindow(appId) {
    const window = this.windows.get(appId);
    if (!window) return;

    if (window.style.display === 'none' || getComputedStyle(window).display === 'none') {
      // Show window
      window.style.display = 'block';
      this.minimizedWindows.delete(appId);
      this.focusWindow(window);
    } else {
      // Hide window
      window.style.display = 'none';
      this.minimizedWindows.set(appId, window);
      this.updateDockState(appId, false);
    }
  }

  updateDockState(appId, isActive) {
    const dockItem = this.dock.querySelector(`[data-app="${appId}"]`);
    if (dockItem) {
      if (isActive) {
        dockItem.classList.add('active');
      } else {
        dockItem.classList.remove('active');
      }
    }
  }

  setupGlobalEvents() {
    // Global mouse events for dragging
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseup', () => this.handleMouseUp());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'w':
            e.preventDefault();
            if (this.activeWindow) {
              this.closeWindow(this.activeWindow);
            }
            break;
          case 'm':
            e.preventDefault();
            if (this.activeWindow) {
              this.minimizeWindow(this.activeWindow);
            }
            break;
        }
      }
    });
  }

  downloadCV() {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'resume.pdf';
    link.click();
  }
}

// Initialize desktop when DOM is ready
let desktopApp;
document.addEventListener('DOMContentLoaded', () => {
  desktopApp = new DesktopApp();
}); 