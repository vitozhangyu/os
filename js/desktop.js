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
            <h2 style="margin-bottom: 20px; color: #333; font-size: 18px;">Contact</h2>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">📧 Email</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                <a href="mailto:y.zhang12@tue.nl" style="color: #4a90e2; text-decoration: none;">y.zhang12@tue.nl</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">🌐 Social Media</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                <a href="https://www.linkedin.com/in/yu-zhang-479612161/" style="color: #4a90e2; text-decoration: none;">LinkedIn</a> | 
                <a href="https://github.com/vitozhangyu" style="color: #4a90e2; text-decoration: none;">GitHub</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">📍 Location</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">
                Rotterdam, Netherlands
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
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">💼 Experience</h3>
              <div style="margin: 0; font-size: 13px; color: #666;">
                <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">PhD Candidate</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Eindhoven University of Technology • Full-time</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Dec 2023 - Present</div>
                  <div style="font-size: 12px; font-style: italic;">Eindhoven, Netherlands</div>
                </div>
                <div style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">Technical Support Manager</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Raise3D • Full-time</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Jun 2021 - Jun 2023</div>
                  <div style="font-size: 12px; font-style: italic;">Rotterdam, Netherlands</div>
                </div>
              </div>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">🎓 Education</h3>
              <div style="margin: 0; font-size: 13px; color: #666;">
                <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">Master of Science</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Delft University of Technology • 2018 - 2020</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">GPA: 7.9/10.0</div>
                  <div style="font-size: 12px; font-style: italic;">Full-time in English</div>
                </div>
                <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">Bachelor of Science</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Delft University of Technology  • 2015 - 2018</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">GPA: 7.25/10.0</div>
                  <div style="font-size: 12px; font-style: italic;">Full-time in Dutch</div>
                </div>
                <div style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">[Certification Name]</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">[Institution] • [Year]</div>
                  <div style="font-size: 12px; color: #888; margin-bottom: 2px;">Score/Grade: [If applicable]</div>
                  <div style="font-size: 12px; font-style: italic;">[Add relevant skills or projects completed]</div>
                </div>
              </div>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #555; font-size: 14px;">💼 Skills</h3>
              <div style="margin: 0; font-size: 13px; color: #666;">
                <div style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                  <p style="margin: 0; font-size: 13px; color: #666;">
                    UI/UX Design, HTML5, CSS3, JavaScript, React, Figma, Adobe Creative Suite
                  </p>
                </div>
              </div>
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
              <h3 style="margin: 0 0 6px 0; color: #333; font-size: 14px; font-weight: bold;">Currently available technologies for continuous sodium monitoring in plasma or interstitial fluid: A scoping review</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; font-style: italic;">
                Yu Zhang, Hanneke M. van Santen, Ruben E.A. Musson, Panos Markopoulos, Yuan Lu
              </p>
              <p style="margin: 0; font-size: 12px; color: #888;">
                Sensing and Bio-Sensing Research, Vol.49, Issue 100850, August 2025 • 
                <a href="https://doi.org/10.1016/j.sbsr.2025.100850" style="color: #4a90e2; text-decoration: none;" target="_blank">DOI: 10.1016/j.sbsr.2025.100850</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 6px 0; color: #333; font-size: 14px; font-weight: bold;">[Publication Title 2]</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; font-style: italic;">
                [Author 1], [Author 2], [Author 3]
              </p>
              <p style="margin: 0; font-size: 12px; color: #888;">
                [Journal Name], Vol. [Volume], Issue [Issue], [Publication Date] • 
                <a href="[DOI URL]" style="color: #4a90e2; text-decoration: none;" target="_blank">DOI: [DOI Number]</a>
              </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px;">
              <h3 style="margin: 0 0 6px 0; color: #333; font-size: 14px; font-weight: bold;">[Publication Title 3]</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; font-style: italic;">
                [Author 1], [Author 2], [Author 3]
              </p>
              <p style="margin: 0; font-size: 12px; color: #888;">
                [Journal Name], Vol. [Volume], Issue [Issue], [Publication Date] • 
                <a href="[DOI URL]" style="color: #4a90e2; text-decoration: none;" target="_blank">DOI: [DOI Number]</a>
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
        title: 'iPod',
        icon: '🎵',
        dockIcon: 'https://img.icons8.com/ios-filled/50/333333/ipod.png',
        content: `
          <div class="ipod-classic">
            <div class="ipod-screen">
              <div class="ipod-header">
                <span class="ipod-header-title">Now Playing</span>
                <span class="ipod-header-battery"></span>
              </div>
              <div class="ipod-track-count">5 of 64</div>
              <div class="ipod-track-info">
                <div class="ipod-track-title">Last Summer Whisper</div>
                <div class="ipod-track-artist">Anri</div>
              </div>
              <div class="ipod-progress-bar">
                <div class="ipod-progress-fill"></div>
              </div>
              <div class="ipod-time-row">
                <span class="ipod-time-current">0:00</span>
                <span class="ipod-time-total">-5:06</span>
              </div>
              <div class="ipod-menu" style="display:none;">
                <div class="ipod-menu-item active">Now Playing</div>
                <div class="ipod-menu-item">Playlists</div>
                <div class="ipod-menu-item">Artists</div>
                <div class="ipod-menu-item">Songs</div>
                <div class="ipod-menu-item">Settings</div>
              </div>
            </div>
            <div class="ipod-wheel">
              <div class="ipod-wheel-btn ipod-menu-btn">MENU</div>
              <div class="ipod-wheel-btn ipod-prev-btn">&#x23EE;</div>
              <div class="ipod-wheel-btn ipod-next-btn">&#x23ED;</div>
              <div class="ipod-wheel-btn ipod-play-btn">&#x25B6;</div>
              <div class="ipod-wheel-center"></div>
            </div>
          </div>
        `,
        width: 320,
        height: 400,
        position: { left: '800px', top: '300px' }
      },
      {
        id: 'clock-app',
        title: 'Clock',
        icon: '🕐',
        dockIcon: 'https://img.icons8.com/ios-filled/50/ff6b6b/clock.png',
        content: `
          <div class="clock-container">
            <img src="images/twemco.png" alt="Twemco Clock" class="clock-background">
            <video id="clock-video" autoplay muted loop playsinline>
              <source src="videos/clock.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="clock-description">
              <h3 class="clock-title">Real-Time Amsterdam Clock</h3>
              <p class="clock-text">This interactive clock displays the current time in Amsterdam, Netherlands. The clock automatically synchronizes with the local Amsterdam timezone and updates in real-time. The vintage Twemco flip clock design provides a classic aesthetic while maintaining modern functionality.</p>
            </div>
          </div>
        `,
        width: 300,
        height: 250,
        position: { left: 'calc(100vw - 350px)', top: 'calc(100vh - 300px)' }
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
        <div class="window-controls">
          <button class="close-btn" aria-label="Close">✕</button>
          <button class="minimize-btn" aria-label="Minimize">−</button>
          <button class="maximize-btn" aria-label="Maximize">□</button>
        </div>
        <span class="title">${appConfig.title}</span>
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
    
    // Special handling for Clock app
    if (appConfig.id === 'clock-app') {
      this.setupClockApp(window);
    }
    
    return window;
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

  setupIPodControls(window) {
    // iPod System State
    const iPodState = {
      currentScreen: 'now-playing',
      selectedIndex: 0,
      playlists: [
        {
          name: 'Favorites',
          tracks: [
            { id: '6S20mJvr4vs', title: 'Last Summer Whisper', artist: 'Anri' },
            { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley' },
            { id: '9bZkp7q19f0', title: 'Gangnam Style', artist: 'PSY' }
          ]
        },
        {
          name: 'Chill Vibes',
          tracks: [
            { id: '6S20mJvr4vs', title: 'Last Summer Whisper', artist: 'Anri' },
            { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley' }
          ]
        }
      ],
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 306,
      player: null,
      searchResults: [],
      menuItems: ['now-playing', 'playlists', 'artists', 'songs', 'search', 'settings'],
      currentPlaylist: null,
      currentTrackIndex: 0
    };

    // Get DOM elements
    const clickWheel = window.querySelector('.ipod-wheel');
    const centerButton = window.querySelector('.ipod-wheel-center');
    const menuButton = window.querySelector('.ipod-menu-btn');
    const prevButton = window.querySelector('.ipod-prev-btn');
    const nextButton = window.querySelector('.ipod-next-btn');
    const playButton = window.querySelector('.ipod-play-btn');
    const ipodMenu = window.querySelector('.ipod-menu');
    const trackTitle = window.querySelector('.ipod-track-title');
    const trackArtist = window.querySelector('.ipod-track-artist');
    const progressFill = window.querySelector('.ipod-progress-fill');
    const currentTimeSpan = window.querySelector('.ipod-time-current');
    const totalTimeSpan = window.querySelector('.ipod-time-total');

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
        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        playerDiv.style.display = 'none';
        document.body.appendChild(playerDiv);

        iPodState.player = new YT.Player('youtube-player', {
          height: '1',
          width: '1',
          playerVars: {
            autoplay: 0,
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
          playNextTrack();
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
        iPodState.isPlaying = false;
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

    function playNextTrack() {
      if (iPodState.currentPlaylist && iPodState.currentTrackIndex < iPodState.currentPlaylist.tracks.length - 1) {
        iPodState.currentTrackIndex++;
        const track = iPodState.currentPlaylist.tracks[iPodState.currentTrackIndex];
        loadTrack(track.id, track.title, track.artist);
        playPause();
      }
    }

    function playPrevTrack() {
      if (iPodState.currentPlaylist && iPodState.currentTrackIndex > 0) {
        iPodState.currentTrackIndex--;
        const track = iPodState.currentPlaylist.tracks[iPodState.currentTrackIndex];
        loadTrack(track.id, track.title, track.artist);
        playPause();
      }
    }

    // Navigation System
    function updateMenuSelection() {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.ipod-menu-item');
      menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === iPodState.selectedIndex);
      });
    }

    function navigateMenu(direction) {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.ipod-menu-item');
      iPodState.selectedIndex = Math.max(0, Math.min(menuItems.length - 1, iPodState.selectedIndex + direction));
      updateMenuSelection();
    }

    function selectMenuItem() {
      if (!ipodMenu) return;
      const menuItems = ipodMenu.querySelectorAll('.ipod-menu-item');
      const selectedItem = menuItems[iPodState.selectedIndex];
      if (!selectedItem) return;
      
      const action = selectedItem.dataset.action;
      
      switch(action) {
        case 'now-playing':
          showNowPlaying();
          break;
        case 'playlists':
          showPlaylists();
          break;
        case 'artists':
          showArtists();
          break;
        case 'songs':
          showSongs();
          break;
        case 'search':
          showSearch();
          break;
        case 'settings':
          showSettings();
          break;
      }
    }

    function showNowPlaying() {
      iPodState.currentScreen = 'now-playing';
      if (ipodMenu) ipodMenu.style.display = 'none';
      const trackInfo = window.querySelector('.ipod-track-info');
      const progressContainer = window.querySelector('.ipod-progress-bar');
      if (trackInfo) trackInfo.style.display = 'block';
      if (progressContainer) progressContainer.style.display = 'block';
    }

    function showPlaylists() {
      iPodState.currentScreen = 'playlists';
      if (ipodMenu) {
        ipodMenu.style.display = 'block';
        ipodMenu.innerHTML = '';
        iPodState.playlists.forEach((playlist, index) => {
          const div = document.createElement('div');
          div.className = 'ipod-menu-item';
          div.dataset.action = 'playlist';
          div.dataset.index = index;
          div.textContent = playlist.name;
          ipodMenu.appendChild(div);
        });
        iPodState.selectedIndex = 0;
        updateMenuSelection();
      }
    }

    function showArtists() {
      iPodState.currentScreen = 'artists';
      if (ipodMenu) {
        ipodMenu.style.display = 'block';
        ipodMenu.innerHTML = '';
        const artists = [...new Set(iPodState.playlists.flatMap(p => p.tracks.map(t => t.artist)))];
        artists.forEach((artist, index) => {
          const div = document.createElement('div');
          div.className = 'ipod-menu-item';
          div.dataset.action = 'artist';
          div.dataset.artist = artist;
          div.textContent = artist;
          ipodMenu.appendChild(div);
        });
        iPodState.selectedIndex = 0;
        updateMenuSelection();
      }
    }

    function showSongs() {
      iPodState.currentScreen = 'songs';
      if (ipodMenu) {
        ipodMenu.style.display = 'block';
        ipodMenu.innerHTML = '';
        const allTracks = iPodState.playlists.flatMap(p => p.tracks);
        allTracks.forEach((track, index) => {
          const div = document.createElement('div');
          div.className = 'ipod-menu-item';
          div.dataset.action = 'song';
          div.dataset.videoId = track.id;
          div.dataset.title = track.title;
          div.dataset.artist = track.artist;
          div.textContent = `${track.title} - ${track.artist}`;
          ipodMenu.appendChild(div);
        });
        iPodState.selectedIndex = 0;
        updateMenuSelection();
      }
    }

    function showSearch() {
      iPodState.currentScreen = 'search';
      // Implementation for search screen
    }

    function showSettings() {
      iPodState.currentScreen = 'settings';
      if (ipodMenu) {
        ipodMenu.style.display = 'block';
        ipodMenu.innerHTML = '';
        const settings = ['Shuffle', 'Repeat', 'Equalizer', 'About'];
        settings.forEach((setting, index) => {
          const div = document.createElement('div');
          div.className = 'ipod-menu-item';
          div.dataset.action = 'setting';
          div.dataset.setting = setting;
          div.textContent = setting;
          ipodMenu.appendChild(div);
        });
        iPodState.selectedIndex = 0;
        updateMenuSelection();
      }
    }

    function goBack() {
      if (iPodState.currentScreen !== 'now-playing') {
        iPodState.currentScreen = 'now-playing';
        iPodState.selectedIndex = 0;
        if (ipodMenu) ipodMenu.style.display = 'none';
        showNowPlaying();
      }
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
            if (iPodState.currentScreen === 'menu' || iPodState.currentScreen === 'playlists' || 
                iPodState.currentScreen === 'artists' || iPodState.currentScreen === 'songs' || 
                iPodState.currentScreen === 'settings') {
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
        if (iPodState.currentScreen === 'menu' || iPodState.currentScreen === 'playlists' || 
            iPodState.currentScreen === 'artists' || iPodState.currentScreen === 'songs' || 
            iPodState.currentScreen === 'settings') {
          selectMenuItem();
        } else if (iPodState.currentScreen === 'now-playing') {
          playPause();
        }
      });
    }

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          iPodState.currentScreen = 'menu';
          iPodState.selectedIndex = 0;
          if (ipodMenu) {
            ipodMenu.style.display = 'block';
            ipodMenu.innerHTML = '';
            iPodState.menuItems.forEach((item, index) => {
              const div = document.createElement('div');
              div.className = 'ipod-menu-item';
              div.dataset.action = item;
              div.textContent = item.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
              ipodMenu.appendChild(div);
            });
            updateMenuSelection();
          }
        } else {
          goBack();
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          playPrevTrack();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (iPodState.currentScreen === 'now-playing') {
          playNextTrack();
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
          if (iPodState.currentScreen === 'menu' || iPodState.currentScreen === 'playlists' || 
              iPodState.currentScreen === 'artists' || iPodState.currentScreen === 'songs' || 
              iPodState.currentScreen === 'settings') {
            navigateMenu(-1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (iPodState.currentScreen === 'menu' || iPodState.currentScreen === 'playlists' || 
              iPodState.currentScreen === 'artists' || iPodState.currentScreen === 'songs' || 
              iPodState.currentScreen === 'settings') {
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
    showNowPlaying();
  }

  setupClockApp(window) {
    const video = window.querySelector('#clock-video');
    if (!video) return;

    // Function to get Amsterdam time and sync video
    const syncVideoToAmsterdamTime = async () => {
      try {
        // Fetch current Amsterdam time
        const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Amsterdam');
        const timeData = await response.json();
        const amsterdamTime = new Date(timeData.datetime);
        
        // Extract hours and minutes
        const hours = amsterdamTime.getHours();
        const minutes = amsterdamTime.getMinutes();
        
        // Convert to 12-hour format for video timeline
        const hour12 = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        
        // Use current time (no subtraction)
        const videoHour = hour12;
        const videoMinutes = minutes;
        
        // Calculate video start position in seconds
        // Assuming the video is 12 hours long (43200 seconds)
        const videoStartSeconds = ((videoHour - 1) * 60 * 60) + (videoMinutes * 60);
        
        console.log(`Amsterdam time: ${hours}:${minutes.toString().padStart(2, '0')}`);
        console.log(`Video starting at: ${videoHour}:${videoMinutes.toString().padStart(2, '0')}`);
        console.log(`Video position: ${videoStartSeconds} seconds`);
        
        return videoStartSeconds;
        
      } catch (error) {
        console.log('Could not fetch Amsterdam time, using local time:', error);
        
        // Fallback to local time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        const hour12 = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        const videoHour = hour12;
        
        const videoStartSeconds = ((videoHour - 1) * 60 * 60) + (minutes * 60);
        return videoStartSeconds;
      }
    };

    // Initialize video with time sync
    const initVideo = async () => {
      video.load();
      
      // Wait for video metadata to load
      video.addEventListener('loadedmetadata', async () => {
        const startPosition = await syncVideoToAmsterdamTime();
        
        // Set video start position
        video.currentTime = Math.min(startPosition, video.duration);
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Clock video started successfully');
          }).catch(error => {
            console.log('Clock video autoplay prevented:', error);
          });
        }
      });
      
      // Ensure video loops properly
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
      });
      
      // Handle errors
      video.addEventListener('error', (e) => {
        console.log('Clock video error:', e);
      });
      
      // When window becomes visible/focused, ensure video is playing
      window.addEventListener('click', () => {
        if (video.paused) {
          video.play();
        }
      });

      // Keep video playing even when tab is not active
      document.addEventListener('visibilitychange', () => {
        if (video.paused) {
          video.play();
        }
      });

      // Periodically check if video is still playing and restart if needed
      setInterval(() => {
        if (video.paused && !video.ended) {
          console.log('Clock video was paused, restarting...');
          video.play().catch(error => {
            console.log('Could not restart video:', error);
          });
        }
      }, 1000);

      // Handle page focus events
      window.addEventListener('focus', () => {
        if (video.paused) {
          video.play();
        }
      });

      // Handle when page becomes visible again
      window.addEventListener('pageshow', () => {
        if (video.paused) {
          video.play();
        }
      });
    };

    initVideo();
  }
}

// Initialize desktop when DOM is ready
let desktopApp;
document.addEventListener('DOMContentLoaded', () => {
  desktopApp = new DesktopApp();
}); 