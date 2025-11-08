// Bus Management Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the dashboard
    initializeDashboard();

    // Add event listeners
    addEventListeners();

    // Simulate real-time updates
    startRealTimeUpdates();
});

function initializeDashboard() {
    console.log('Pragati Tracker Dashboard initialized');

    // Add loading animation to cards
    const cards = document.querySelectorAll('.bus-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function addEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });

    // Track buttons
    const trackButtons = document.querySelectorAll('.track-btn');
    trackButtons.forEach(button => {
        button.addEventListener('click', trackBus);
    });

    // Logout button
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Add hover effects to cards
    const busCards = document.querySelectorAll('.bus-card');
    busCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });
}

function handleNavigation(event) {
    event.preventDefault();
    console.log('Navigation clicked');

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked item
    const navItem = event.target.closest('.nav-item');
    if (navItem) {
        navItem.classList.add('active');
    }

    // Update page title based on navigation
    const navText = event.target.textContent.trim();
    console.log('Navigation text:', navText);

    const headerElement = document.querySelector('.content-header h1');
    if (headerElement) {
        headerElement.textContent = navText;
    }

    // Show/hide content based on navigation
    showContent(navText);

    // Add a subtle animation
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0.7';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 150);
    }
}

function showContent(section) {
    console.log('Showing content for:', section);

    // Hide all content sections
    const dashboardContent = document.getElementById('dashboard-content');
    const routesContent = document.getElementById('routes-content');
    const busPassContent = document.getElementById('bus-pass-content');

    if (!dashboardContent || !routesContent) {
        console.error('Content sections not found!');
        return;
    }

    dashboardContent.style.display = 'none';
    routesContent.style.display = 'none';
    if (busPassContent) {
        busPassContent.style.display = 'none';
    }

    // Show selected content
    switch (section) {
        case 'Dashboard':
            dashboardContent.style.display = 'grid';
            console.log('Dashboard content shown');
            break;
        case 'Routes':
            routesContent.style.display = 'flex';
            console.log('Routes content shown');
            // Initialize map if not already done
            if (!window.mapInitialized) {
                console.log('Initializing map...');
                setTimeout(() => {
                    if (typeof google !== 'undefined' && google.maps) {
                        initializeGoogleMap();
                    } else {
                        console.log('Google Maps not loaded yet, showing fallback');
                        showMapFallback();
                    }
                }, 500);
            } else {
                console.log('Map already initialized');
            }
            break;

        case 'Bus Pass':
            const busPassContent = document.getElementById('bus-pass-content');
            if (busPassContent) {
                busPassContent.style.display = 'block';
                console.log('Bus Pass content shown');
                // Initialize bus pass data if not already done
                if (!window.busPassInitialized) {
                    initializeBusPassData();
                    window.busPassInitialized = true;
                }
            }
            break;

        default:
            dashboardContent.style.display = 'grid';
    }
}

function toggleFavorite(event) {
    event.preventDefault();
    const button = event.target.closest('.favorite-btn');
    const icon = button.querySelector('i');

    // Toggle between filled and empty star
    if (icon.classList.contains('fas')) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Removed from favorites', 'info');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Added to favorites', 'success');
    }

    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function trackBus(event) {
    event.preventDefault();
    const button = event.target.closest('.track-btn');
    const card = button.closest('.bus-card');
    const busNumber = card.querySelector('.bus-number').textContent;

    // Add loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
    button.disabled = true;

    // Navigate to routes page and focus on the specific bus
    setTimeout(() => {
        // Switch to routes section
        navigateToRoutes(busNumber);

        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;

        showNotification(`Tracking Bus ${busNumber} on map`, 'success');
    }, 1000);
}

function navigateToRoutes(busNumber) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to routes nav item
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        if (link.textContent.trim().includes('Routes')) {
            link.closest('.nav-item').classList.add('active');
        }
    });

    // Update page title
    const headerElement = document.querySelector('.content-header h1');
    if (headerElement) {
        headerElement.textContent = 'Routes';
    }

    // Show routes content
    showContent('Routes');

    // Focus on the specific bus after a short delay to ensure map is loaded
    setTimeout(() => {
        focusOnSpecificBus(busNumber);
    }, 1500);
}

function focusOnSpecificBus(busNumber) {
    console.log(`Focusing on Bus ${busNumber}`);

    // Focus on bus in the map if available
    if (typeof focusOnBus === 'function') {
        focusOnBus(busNumber);
    }

    // Highlight the bus in the panel
    document.querySelectorAll('.bus-item').forEach(item => {
        item.classList.remove('highlighted');
    });

    const busItem = document.querySelector(`[data-bus="${busNumber}"]`);
    if (busItem) {
        busItem.classList.add('highlighted');

        // Scroll to the bus item smoothly
        busItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });

        // Add a pulse animation
        busItem.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => {
            busItem.style.animation = '';
        }, 2000);
    }

    // Show additional notification
    setTimeout(() => {
        showNotification(`Bus ${busNumber} located and highlighted`, 'success');
    }, 500);
}

function handleCardHover(event) {
    const card = event.target.closest('.bus-card');
    const trackBtn = card.querySelector('.track-btn');

    // Add subtle glow effect
    trackBtn.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.4)';
}

function handleCardLeave(event) {
    const card = event.target.closest('.bus-card');
    const trackBtn = card.querySelector('.track-btn');

    // Remove glow effect
    trackBtn.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.3)';
}

function startRealTimeUpdates() {
    // Simulate real-time status updates
    setInterval(() => {
        updateBusStatuses();
    }, 30000); // Update every 30 seconds
}

function updateBusStatuses() {
    const statusElements = document.querySelectorAll('.status');
    const statuses = ['on-time', 'delayed', 'early'];
    const statusTexts = ['On-time', 'Delayed', 'Early'];

    statusElements.forEach(statusEl => {
        // Randomly update some statuses (20% chance)
        if (Math.random() < 0.2) {
            const randomIndex = Math.floor(Math.random() * statuses.length);
            const newStatus = statuses[randomIndex];
            const newText = statusTexts[randomIndex];

            // Remove old status classes
            statusEl.className = 'status';
            // Add new status class
            statusEl.classList.add(newStatus);
            statusEl.textContent = newText;

            // Add update animation
            statusEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                statusEl.style.transform = 'scale(1)';
            }, 300);
        }
    });
}

function handleLogout(event) {
    event.preventDefault();

    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Add loading state
        const button = event.target.closest('.logout-btn');
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        // Simulate logout process
        setTimeout(() => {
            showNotification('Logged out successfully', 'success');

            // Fade out the entire app
            const appContainer = document.querySelector('.app-container');
            appContainer.style.transition = 'opacity 0.5s ease';
            appContainer.style.opacity = '0';

            // Simulate redirect to login page
            setTimeout(() => {
                alert('Redirecting to login page...');
                // In a real app, you would redirect to login page
                // window.location.href = '/login';

                // Reset for demo purposes
                appContainer.style.opacity = '1';
                button.innerHTML = originalIcon;
                button.disabled = false;
            }, 1000);
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#dcfce7' : '#dbeafe'};
        color: ${type === 'success' ? '#166534' : '#1e40af'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some interactive features
document.addEventListener('keydown', function (event) {
    // Add keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case '1':
                event.preventDefault();
                document.querySelector('.nav-link').click();
                break;
            case 'f':
                event.preventDefault();
                document.querySelectorAll('.nav-link')[1].click();
                break;
        }
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Google Maps Integration
let map;
let busMarkers = [];
let routePolylines = [];
window.mapInitialized = false;

// Simple global initMap function for Google Maps API callback
window.initMap = function () {
    console.log('Google Maps API loaded, initializing map...');
    initializeGoogleMap();
};

// Bus locations and routes data - All routes to Surampalem
const busData = {
    1: {
        name: 'Bus 1',
        driver: 'Ramesh Babu',
        route: 'Rajahmundry → Surampalem',
        currentLocation: { lat: 17.0005, lng: 81.8040 }, // Rajahmundry
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem (Pragati Engineering College - near highway 15)
        speed: 45,
        status: 'online'
    },
    3: {
        name: 'Bus 3',
        driver: 'Srinivas Reddy',
        route: 'Kakinada → Surampalem',
        currentLocation: { lat: 16.9891, lng: 82.2711 }, // Kakinada
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem (near highway 15)
        speed: 38,
        status: 'delayed'
    },
    4: {
        name: 'Bus 4',
        driver: 'Venkata Rao',
        route: 'Pithapuram → Surampalem',
        currentLocation: { lat: 17.1167, lng: 82.2500 }, // Pithapuram
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem (near highway 15)
        speed: 52,
        status: 'online'
    },
    8: {
        name: 'Bus 8',
        driver: 'Prasad Raju',
        route: 'Peddapuram → Surampalem',
        currentLocation: { lat: 17.0833, lng: 82.1333 }, // Peddapuram
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem (near highway 15)
        speed: 41,
        status: 'early'
    },
    90: {
        name: 'Bus 90',
        driver: 'Kiran Kumar',
        route: 'Samalkot → Surampalem',
        currentLocation: { lat: 17.0500, lng: 82.1667 }, // Samalkot
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem (near highway 15)
        speed: 47,
        status: 'online'
    },
    12: {
        name: 'Bus 12',
        driver: 'Suresh Babu',
        route: 'Amalapuram → Surampalem',
        currentLocation: { lat: 16.5833, lng: 82.0167 }, // Amalapuram
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 43,
        status: 'early'
    },
    15: {
        name: 'Bus 15',
        driver: 'Ravi Teja',
        route: 'Mandapeta → Surampalem',
        currentLocation: { lat: 16.8667, lng: 81.9333 }, // Mandapeta
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 39,
        status: 'online'
    },
    22: {
        name: 'Bus 22',
        driver: 'Mahesh Kumar',
        route: 'Tuni → Surampalem',
        currentLocation: { lat: 17.3500, lng: 82.5500 }, // Tuni
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 35,
        status: 'delayed'
    },
    25: {
        name: 'Bus 25',
        driver: 'Naresh Reddy',
        route: 'Yanam → Surampalem',
        currentLocation: { lat: 16.7333, lng: 82.2167 }, // Yanam
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 48,
        status: 'online'
    },
    30: {
        name: 'Bus 30',
        driver: 'Vijay Krishna',
        route: 'Ramachandrapuram → Surampalem',
        currentLocation: { lat: 16.8333, lng: 82.3000 }, // Ramachandrapuram
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 44,
        status: 'early'
    },
    35: {
        name: 'Bus 35',
        driver: 'Srinivas Rao',
        route: 'Kotananduru → Surampalem',
        currentLocation: { lat: 16.7833, lng: 81.8833 }, // Kotananduru
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 32,
        status: 'delayed'
    },
    40: {
        name: 'Bus 40',
        driver: 'Rajesh Kumar',
        route: 'Uppada → Surampalem',
        currentLocation: { lat: 17.0833, lng: 82.3500 }, // Uppada
        destination: { lat: 17.0200, lng: 82.2280 }, // Surampalem
        speed: 41,
        status: 'online'
    }
};

// Direct map initialization function
function initializeMapDirectly() {
    console.log('Direct map initialization started');

    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    } else {
        console.log('Google Maps not loaded, showing fallback');
        showMapFallback();
    }
}

// Initialize Google Map
function initializeGoogleMap() {
    console.log('initializeGoogleMap called, mapInitialized:', window.mapInitialized);
    if (window.mapInitialized) return;

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element not found!');
        return;
    }

    // Center map on Surampalem (Pragati Engineering College location - near highway 15)
    const collegeLocation = { lat: 17.0200, lng: 82.2280 };

    try {
        // Create map
        map = new google.maps.Map(mapElement, {
            zoom: 10,
            center: collegeLocation,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#f8fafc' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#dbeafe' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#ffffff' }]
                }
            ]
        });

        console.log('Google Map created successfully');
    } catch (error) {
        console.error('Error creating Google Map:', error);
        showMapFallback();
        return;
    }

    // Add Surampalem (Pragati Engineering College) marker
    const collegeMarker = new google.maps.Marker({
        position: collegeLocation,
        map: map,
        title: 'Pragati Engineering College, Surampalem',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
                    <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">🏫</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    // Add info window for college
    const collegeInfoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 8px; font-family: Inter, sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a;">Pragati Engineering College</h4>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Location:</strong> Surampalem, East Godavari</p>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>All Bus Routes:</strong> Destination Point</p>
                <div style="margin-top: 8px;">
                    <span style="padding: 4px 8px; background: #fbbf24; color: white; border-radius: 12px; font-size: 12px;">Main Campus</span>
                </div>
            </div>
        `
    });

    collegeMarker.addListener('click', () => {
        collegeInfoWindow.open(map, collegeMarker);
    });

    // Add Aditya Engineering College marker (nearby reference)
    const adityaLocation = { lat: 17.0195, lng: 82.2275 }; // Slightly offset from Pragati, near highway 15
    const adityaMarker = new google.maps.Marker({
        position: adityaLocation,
        map: map,
        title: 'Aditya Engineering College, Surampalem',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="17.5" r="15" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
                    <text x="17.5" y="22" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">🏫</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(35, 35)
        }
    });

    const adityaInfoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 8px; font-family: Inter, sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a;">Aditya Engineering College</h4>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Location:</strong> Surampalem, East Godavari</p>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Note:</strong> Reference location</p>
                <div style="margin-top: 8px;">
                    <span style="padding: 4px 8px; background: #94a3b8; color: white; border-radius: 12px; font-size: 12px;">Reference Point</span>
                </div>
            </div>
        `
    });

    adityaMarker.addListener('click', () => {
        adityaInfoWindow.open(map, adityaMarker);
    });

    // Add bus markers and routes
    Object.keys(busData).forEach(busId => {
        addBusToMap(busId, busData[busId]);
    });

    // Add event listeners for map controls
    document.getElementById('refresh-map').addEventListener('click', refreshMap);
    document.getElementById('fullscreen-map').addEventListener('click', toggleFullscreen);

    // Initialize search functionality
    initializeMapSearch();

    // Add bus item click handlers
    document.querySelectorAll('.bus-item').forEach(item => {
        item.addEventListener('click', function () {
            const busId = this.dataset.bus;
            focusOnBus(busId);
        });
    });

    window.mapInitialized = true;

    // Start real-time updates
    startBusTracking();
}

function addBusToMap(busId, busInfo) {
    // Create bus marker
    const busMarker = new google.maps.Marker({
        position: busInfo.currentLocation,
        map: map,
        title: `${busInfo.name} - ${busInfo.driver}`,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="#667eea" stroke="#4f46e5" stroke-width="2"/>
                    <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">${busId}</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
        }
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 8px; font-family: Inter, sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a;">${busInfo.name}</h4>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Driver:</strong> ${busInfo.driver}</p>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Route:</strong> ${busInfo.route}</p>
                <p style="margin: 4px 0; color: #64748b; font-size: 14px;"><strong>Speed:</strong> ${busInfo.speed} km/h</p>
                <div style="margin-top: 8px;">
                    <span style="padding: 4px 8px; background: ${getStatusColor(busInfo.status)}; color: white; border-radius: 12px; font-size: 12px; text-transform: uppercase;">${busInfo.status}</span>
                </div>
            </div>
        `
    });

    // Add click listener to marker
    busMarker.addListener('click', () => {
        // Close all other info windows
        busMarkers.forEach(marker => {
            if (marker.infoWindow) {
                marker.infoWindow.close();
            }
        });
        infoWindow.open(map, busMarker);
    });

    // Store marker with info window
    busMarker.infoWindow = infoWindow;
    busMarkers.push(busMarker);

    // Draw route line
    const routeLine = new google.maps.Polyline({
        path: [busInfo.currentLocation, busInfo.destination],
        geodesic: true,
        strokeColor: '#667eea',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: map
    });

    routePolylines.push(routeLine);
}

function getStatusColor(status) {
    switch (status) {
        case 'online': return '#16a34a';
        case 'delayed': return '#dc2626';
        case 'early': return '#ca8a04';
        default: return '#64748b';
    }
}

function focusOnBus(busId) {
    const busInfo = busData[busId];
    if (busInfo && map) {
        map.setCenter(busInfo.currentLocation);
        map.setZoom(12);

        // Find and click the corresponding marker
        const markerIndex = Object.keys(busData).indexOf(busId);
        if (busMarkers[markerIndex]) {
            google.maps.event.trigger(busMarkers[markerIndex], 'click');
        }

        // Highlight the bus item
        document.querySelectorAll('.bus-item').forEach(item => {
            item.classList.remove('highlighted');
        });
        document.querySelector(`[data-bus="${busId}"]`).classList.add('highlighted');
    }
}

function refreshMap() {
    const refreshBtn = document.getElementById('refresh-map');
    const originalIcon = refreshBtn.innerHTML;

    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    refreshBtn.disabled = true;

    // Simulate refresh
    setTimeout(() => {
        // Update bus positions (simulate movement)
        Object.keys(busData).forEach((busId, index) => {
            const bus = busData[busId];
            // Simulate small movement
            bus.currentLocation.lat += (Math.random() - 0.5) * 0.01;
            bus.currentLocation.lng += (Math.random() - 0.5) * 0.01;

            // Update marker position
            if (busMarkers[index]) {
                busMarkers[index].setPosition(bus.currentLocation);
            }
        });

        refreshBtn.innerHTML = originalIcon;
        refreshBtn.disabled = false;
        showNotification('Map refreshed successfully', 'success');
    }, 1500);
}

function toggleFullscreen() {
    const mapContainer = document.querySelector('.map-container');

    if (!document.fullscreenElement) {
        mapContainer.requestFullscreen().then(() => {
            document.getElementById('fullscreen-map').innerHTML = '<i class="fas fa-compress"></i>';
        });
    } else {
        document.exitFullscreen().then(() => {
            document.getElementById('fullscreen-map').innerHTML = '<i class="fas fa-expand"></i>';
        });
    }
}

function startBusTracking() {
    // Update bus positions every 10 seconds
    setInterval(() => {
        if (window.mapInitialized && document.getElementById('routes-content').style.display !== 'none') {
            Object.keys(busData).forEach((busId, index) => {
                const bus = busData[busId];

                // Simulate realistic movement towards destination
                const lat_diff = bus.destination.lat - bus.currentLocation.lat;
                const lng_diff = bus.destination.lng - bus.currentLocation.lng;

                // Move 1% closer to destination each update
                bus.currentLocation.lat += lat_diff * 0.01;
                bus.currentLocation.lng += lng_diff * 0.01;

                // Update speed randomly
                bus.speed = Math.max(20, Math.min(60, bus.speed + (Math.random() - 0.5) * 10));

                // Update marker position
                if (busMarkers[index]) {
                    busMarkers[index].setPosition(bus.currentLocation);
                }

                // Update UI
                updateBusInfoPanel(busId, bus);
            });
        }
    }, 10000);
}

function updateBusInfoPanel(busId, busInfo) {
    const busItem = document.querySelector(`[data-bus="${busId}"]`);
    if (busItem) {
        const speedElement = busItem.querySelector('.speed');
        const distanceElement = busItem.querySelector('.distance');

        if (speedElement) {
            speedElement.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${Math.round(busInfo.speed)} km/h`;
        }

        // Calculate approximate distance (simplified)
        const distance = Math.random() * 20 + 5; // Simulate distance calculation
        if (distanceElement) {
            distanceElement.innerHTML = `<i class="fas fa-road"></i> ${distance.toFixed(1)} km`;
        }
    }
}

// Show map fallback when Google Maps is not available
function showMapFallback() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    mapElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem; color: #667eea;"></i>
                <h3 style="margin: 0 0 0.5rem 0; color: #0f172a;">Loading Google Maps...</h3>
                <p style="margin: 0; color: #64748b;">Please wait while we initialize the live tracking system.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; max-width: 400px;">
                <div style="background: linear-gradient(135deg, #667eea20, #764ba220); padding: 1rem; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 0.25rem;">🚌 Bus 1</div>
                    <div style="font-size: 0.8rem; color: #64748b;">Rajahmundry Route</div>
                </div>
                <div style="background: linear-gradient(135deg, #667eea20, #764ba220); padding: 1rem; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 0.25rem;">🚌 Bus 3</div>
                    <div style="font-size: 0.8rem; color: #64748b;">Kakinada Route</div>
                </div>
                <div style="background: linear-gradient(135deg, #667eea20, #764ba220); padding: 1rem; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 0.25rem;">🚌 Bus 4</div>
                    <div style="font-size: 0.8rem; color: #64748b;">Pithapuram Route</div>
                </div>
                <div style="background: linear-gradient(135deg, #667eea20, #764ba220); padding: 1rem; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 0.25rem;">🚌 Bus 8</div>
                    <div style="font-size: 0.8rem; color: #64748b;">Peddapuram Route</div>
                </div>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <button onclick="location.reload()" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-refresh" style="margin-right: 0.5rem;"></i>Refresh Map
                </button>
            </div>
        </div>
    `;

    // Add event listeners for demo mode
    setTimeout(() => {
        const refreshBtn = document.getElementById('refresh-map');
        const fullscreenBtn = document.getElementById('fullscreen-map');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                showNotification('Map refresh simulated', 'info');
            });
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                showNotification('Fullscreen mode - Demo', 'info');
            });
        }

        // Initialize search even in fallback mode
        initializeMapSearch();

        // Add bus item click handlers
        document.querySelectorAll('.bus-item').forEach(item => {
            item.addEventListener('click', function () {
                const busId = this.dataset.bus;
                showNotification(`Focusing on Bus ${busId} (Demo Mode)`, 'info');

                // Highlight the bus item
                document.querySelectorAll('.bus-item').forEach(i => i.classList.remove('highlighted'));
                this.classList.add('highlighted');
            });
        });
    }, 100);
}

// Map Search Functionality
function initializeMapSearch() {
    const searchInput = document.getElementById('map-search');
    const clearBtn = document.getElementById('clear-search');
    const suggestions = document.getElementById('search-suggestions');

    if (!searchInput) return;

    // Search input event listeners
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSearchSuggestions);
    searchInput.addEventListener('blur', hideSearchSuggestions);

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }

    // Suggestion items
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('mousedown', function (e) {
            e.preventDefault(); // Prevent blur event
            selectLocation(this.dataset.location, this.textContent.trim());
        });
    });
}

function handleSearchInput(event) {
    const value = event.target.value;
    const clearBtn = document.getElementById('clear-search');

    if (value.length > 0) {
        clearBtn.style.display = 'block';
        filterSuggestions(value);
    } else {
        clearBtn.style.display = 'none';
        showAllSuggestions();
    }
}

function showSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
        suggestions.style.display = 'block';
    }
}

function hideSearchSuggestions() {
    setTimeout(() => {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }, 200);
}

function clearSearch() {
    const searchInput = document.getElementById('map-search');
    const clearBtn = document.getElementById('clear-search');

    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    if (clearBtn) {
        clearBtn.style.display = 'none';
    }

    showAllSuggestions();

    // Reset map to default view
    if (map) {
        map.setCenter({ lat: 16.9891, lng: 82.2711 });
        map.setZoom(10);
    }
}

function filterSuggestions(query) {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    const lowerQuery = query.toLowerCase();

    suggestionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function showAllSuggestions() {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.style.display = 'flex';
    });
}

function selectLocation(location, displayName) {
    const searchInput = document.getElementById('map-search');
    const suggestions = document.getElementById('search-suggestions');

    if (searchInput) {
        searchInput.value = displayName;
    }
    if (suggestions) {
        suggestions.style.display = 'none';
    }

    // Location coordinates - All routes leading to Surampalem
    const locations = {
        'rajahmundry': { lat: 17.0005, lng: 81.8040 },
        'kakinada': { lat: 16.9891, lng: 82.2711 },
        'pithapuram': { lat: 17.1167, lng: 82.2500 },
        'peddapuram': { lat: 17.0833, lng: 82.1333 },
        'samalkot': { lat: 17.0500, lng: 82.1667 },
        'college': { lat: 17.0200, lng: 82.2280 }, // Surampalem (near highway 15)
        'surampalem': { lat: 17.0200, lng: 82.2280 }
    };

    const coords = locations[location];
    if (coords && map) {
        map.setCenter(coords);
        map.setZoom(12);

        // Show notification
        showNotification(`Showing ${displayName} on map`, 'success');

        // Highlight related bus if any
        highlightRelatedBus(location);
    }
}

function highlightRelatedBus(location) {
    // Map locations to bus routes
    const locationToBus = {
        'rajahmundry': '1',
        'kakinada': '3',
        'pithapuram': '4',
        'peddapuram': '8',
        'samalkot': '90',
        'college': null // All buses go to college
    };

    const busId = locationToBus[location];
    if (busId) {
        // Highlight the bus in the panel
        document.querySelectorAll('.bus-item').forEach(item => {
            item.classList.remove('highlighted');
        });

        const busItem = document.querySelector(`[data-bus="${busId}"]`);
        if (busItem) {
            busItem.classList.add('highlighted');

            // Scroll to the bus item
            busItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Additional debugging for map loading
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, checking Google Maps availability');

    // Check if Google Maps is already loaded
    if (typeof google !== 'undefined' && google.maps) {
        console.log('Google Maps already available');
    } else {
        console.log('Google Maps not yet loaded, waiting for callback');
    }

    // Add a timeout to check if maps failed to load
    setTimeout(() => {
        if (typeof google === 'undefined') {
            console.error('Google Maps failed to load after 10 seconds');
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #dc2626; background: #fee2e2; border-radius: 8px; padding: 2rem;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3 style="margin: 0 0 0.5rem 0;">Maps Failed to Load</h3>
                        <p style="margin: 0; text-align: center;">Please check your internet connection<br>and refresh the page.</p>
                        <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">Refresh Page</button>
                    </div>
                `;
            }
        }
    }, 10000);
});

// Ensure routes section works properly
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, setting up routes functionality');

    // Test if routes content exists
    const routesContent = document.getElementById('routes-content');
    if (routesContent) {
        console.log('Routes content found');
    } else {
        console.error('Routes content not found!');
    }

    // Add additional click handler for routes navigation
    setTimeout(() => {
        const routesNavLink = document.querySelector('a[href="#"]:has(span:contains("Routes"))');
        if (!routesNavLink) {
            // Fallback selector
            const allNavLinks = document.querySelectorAll('.nav-link');
            allNavLinks.forEach(link => {
                if (link.textContent.trim().includes('Routes')) {
                    link.addEventListener('click', function (e) {
                        console.log('Routes link clicked via fallback');
                        e.preventDefault();
                        showContent('Routes');
                    });
                }
            });
        }
    }, 500);
});

// Bus Pass Management System
let busPassData = [];
let editingRowId = null;

// Initialize Bus Pass Data
function initializeBusPassData() {
    console.log('Initializing Bus Pass data...');
    
    // Load data from localStorage or create sample data
    const savedData = localStorage.getItem('busPassData');
    if (savedData) {
        busPassData = JSON.parse(savedData);
    } else {
        // Create sample data
        busPassData = [
            {
                id: 1,
                rollNo: '24A31A0501',
                name: 'Rajesh Kumar',
                branch: 'CSE',
                section: 'A',
                feeStatus: 'paid',
                busNo: 1
            },
            {
                id: 2,
                rollNo: '24A31A0502',
                name: 'Priya Sharma',
                branch: 'ECE',
                section: 'B',
                feeStatus: 'pending',
                busNo: 3
            },
            {
                id: 3,
                rollNo: '24A31A0503',
                name: 'Arjun Reddy',
                branch: 'EEE',
                section: 'A',
                feeStatus: 'overdue',
                busNo: 4
            },
            {
                id: 4,
                rollNo: '24A31A0504',
                name: 'Sneha Patel',
                branch: 'MECH',
                section: 'C',
                feeStatus: 'paid',
                busNo: 8
            },
            {
                id: 5,
                rollNo: '24A31A0505',
                name: 'Vikram Singh',
                branch: 'CIVIL',
                section: 'D',
                feeStatus: 'pending',
                busNo: 90
            }
        ];
        saveBusPassData();
    }
    
    renderBusPassTable();
    addBusPassEventListeners();
}

// Save data to localStorage
function saveBusPassData() {
    localStorage.setItem('busPassData', JSON.stringify(busPassData));
}

// Render the bus pass table
function renderBusPassTable() {
    const tbody = document.getElementById('bus-pass-tbody');
    if (!tbody) return;
    
    if (busPassData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-users"></i>
                    <h4>No Students Found</h4>
                    <p>Click "Add Student" to add your first bus pass entry.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = busPassData.map(student => `
        <tr data-id="${student.id}" ${editingRowId === student.id ? 'class="editing"' : ''}>
            <td>
                <span class="roll-number">${student.rollNo}</span>
            </td>
            <td>
                ${editingRowId === student.id ? 
                    `<input type="text" class="editable-input" value="${student.name}" data-field="name" placeholder="Enter name">` :
                    student.name
                }
            </td>
            <td>
                ${editingRowId === student.id ? 
                    `<select class="editable-select" data-field="branch">
                        <option value="CSE" ${student.branch === 'CSE' ? 'selected' : ''}>CSE</option>
                        <option value="ECE" ${student.branch === 'ECE' ? 'selected' : ''}>ECE</option>
                        <option value="EEE" ${student.branch === 'EEE' ? 'selected' : ''}>EEE</option>
                        <option value="MECH" ${student.branch === 'MECH' ? 'selected' : ''}>MECH</option>
                        <option value="CIVIL" ${student.branch === 'CIVIL' ? 'selected' : ''}>CIVIL</option>
                    </select>` :
                    student.branch
                }
            </td>
            <td>
                ${editingRowId === student.id ? 
                    `<select class="editable-select" data-field="section">
                        <option value="A" ${student.section === 'A' ? 'selected' : ''}>A</option>
                        <option value="B" ${student.section === 'B' ? 'selected' : ''}>B</option>
                        <option value="C" ${student.section === 'C' ? 'selected' : ''}>C</option>
                        <option value="D" ${student.section === 'D' ? 'selected' : ''}>D</option>
                        <option value="E" ${student.section === 'E' ? 'selected' : ''}>E</option>
                    </select>` :
                    student.section
                }
            </td>
            <td>
                ${editingRowId === student.id ? 
                    `<select class="editable-select" data-field="feeStatus">
                        <option value="paid" ${student.feeStatus === 'paid' ? 'selected' : ''}>Paid</option>
                        <option value="pending" ${student.feeStatus === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="overdue" ${student.feeStatus === 'overdue' ? 'selected' : ''}>Overdue</option>
                    </select>` :
                    `<span class="status-badge ${student.feeStatus}">
                        <i class="fas fa-${getStatusIcon(student.feeStatus)}"></i>
                        ${student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                    </span>`
                }
            </td>
            <td>
                ${editingRowId === student.id ? 
                    `<input type="number" class="editable-input bus-number-cell" value="${student.busNo}" data-field="busNo" min="1" max="999">` :
                    `<span class="bus-number-cell">${student.busNo}</span>`
                }
            </td>
            <td>
                <div class="action-buttons">
                    ${editingRowId === student.id ? 
                        `<button class="action-btn save-btn" onclick="saveStudent(${student.id})">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button class="action-btn edit-btn" onclick="cancelEdit()">
                            <i class="fas fa-times"></i> Cancel
                        </button>` :
                        `<button class="action-btn edit-btn" onclick="editStudent(${student.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>`
                    }
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status icon
function getStatusIcon(status) {
    switch (status) {
        case 'paid': return 'check-circle';
        case 'pending': return 'clock';
        case 'overdue': return 'exclamation-triangle';
        default: return 'question-circle';
    }
}

// Add event listeners for Bus Pass functionality
function addBusPassEventListeners() {
    const addStudentBtn = document.getElementById('add-student-btn');
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', addNewStudent);
    }
}

// Add new student
function addNewStudent() {
    const newId = Math.max(...busPassData.map(s => s.id), 0) + 1;
    const newRollNo = generateRollNumber();
    
    const newStudent = {
        id: newId,
        rollNo: newRollNo,
        name: '',
        branch: 'CSE',
        section: 'A',
        feeStatus: 'pending',
        busNo: 1
    };
    
    busPassData.unshift(newStudent);
    editingRowId = newId;
    renderBusPassTable();
    saveBusPassData();
    
    // Focus on the name input
    setTimeout(() => {
        const nameInput = document.querySelector(`tr[data-id="${newId}"] input[data-field="name"]`);
        if (nameInput) {
            nameInput.focus();
        }
    }, 100);
    
    showNotification('New student added. Please fill in the details.', 'info');
}

// Generate roll number
function generateRollNumber() {
    const year = new Date().getFullYear().toString().slice(-2);
    const existingNumbers = busPassData
        .map(s => s.rollNo)
        .filter(roll => roll.startsWith(`${year}A31A05`))
        .map(roll => parseInt(roll.slice(-2)))
        .filter(num => !isNaN(num));
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `${year}A31A05${nextNumber.toString().padStart(2, '0')}`;
}

// Edit student
function editStudent(id) {
    if (editingRowId !== null) {
        showNotification('Please save or cancel the current edit first.', 'info');
        return;
    }
    
    editingRowId = id;
    renderBusPassTable();
    
    // Focus on the first editable field
    setTimeout(() => {
        const firstInput = document.querySelector(`tr[data-id="${id}"] .editable-input, tr[data-id="${id}"] .editable-select`);
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

// Save student
function saveStudent(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (!row) return;
    
    const studentIndex = busPassData.findIndex(s => s.id === id);
    if (studentIndex === -1) return;
    
    // Get values from inputs
    const nameInput = row.querySelector('input[data-field="name"]');
    const branchSelect = row.querySelector('select[data-field="branch"]');
    const sectionSelect = row.querySelector('select[data-field="section"]');
    const feeStatusSelect = row.querySelector('select[data-field="feeStatus"]');
    const busNoInput = row.querySelector('input[data-field="busNo"]');
    
    // Validate required fields
    if (!nameInput.value.trim()) {
        showNotification('Name is required!', 'error');
        nameInput.focus();
        return;
    }
    
    if (!busNoInput.value || busNoInput.value < 1) {
        showNotification('Valid bus number is required!', 'error');
        busNoInput.focus();
        return;
    }
    
    // Update student data
    busPassData[studentIndex] = {
        ...busPassData[studentIndex],
        name: nameInput.value.trim(),
        branch: branchSelect.value,
        section: sectionSelect.value,
        feeStatus: feeStatusSelect.value,
        busNo: parseInt(busNoInput.value)
    };
    
    editingRowId = null;
    renderBusPassTable();
    saveBusPassData();
    
    showNotification('Student information saved successfully!', 'success');
}

// Cancel edit
function cancelEdit() {
    // If it's a new student (empty name), remove it
    if (editingRowId !== null) {
        const student = busPassData.find(s => s.id === editingRowId);
        if (student && !student.name.trim()) {
            busPassData = busPassData.filter(s => s.id !== editingRowId);
        }
    }
    
    editingRowId = null;
    renderBusPassTable();
    saveBusPassData();
}

// Delete student
function deleteStudent(id) {
    const student = busPassData.find(s => s.id === id);
    if (!student) return;
    
    if (confirm(`Are you sure you want to delete ${student.name || 'this student'}?`)) {
        busPassData = busPassData.filter(s => s.id !== id);
        renderBusPassTable();
        saveBusPassData();
        showNotification('Student deleted successfully!', 'success');
    }
}

// Enhanced notification function for error type
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = 'info-circle';
    let bgColor = '#dbeafe';
    let textColor = '#1e40af';
    
    switch (type) {
        case 'success':
            icon = 'check-circle';
            bgColor = '#dcfce7';
            textColor = '#166534';
            break;
        case 'error':
            icon = 'exclamation-triangle';
            bgColor = '#fee2e2';
            textColor = '#dc2626';
            break;
        case 'info':
        default:
            icon = 'info-circle';
            bgColor = '#dbeafe';
            textColor = '#1e40af';
            break;
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add keyboard shortcuts for Bus Pass
document.addEventListener('keydown', function(event) {
    // ESC to cancel edit
    if (event.key === 'Escape' && editingRowId !== null) {
        cancelEdit();
    }
    
    // Ctrl+S to save (when editing)
    if ((event.ctrlKey || event.metaKey) && event.key === 's' && editingRowId !== null) {
        event.preventDefault();
        saveStudent(editingRowId);
    }
    
    // Ctrl+N to add new student (when on Bus Pass page)
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        const busPassContent = document.getElementById('bus-pass-content');
        if (busPassContent && busPassContent.style.display !== 'none') {
            event.preventDefault();
            addNewStudent();
        }
    }
});

// Initialize Bus Pass when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Bus Pass will be initialized when the section is first accessed
    window.busPassInitialized = false;
});