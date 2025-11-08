# 🚌 Pragati Tracker - College Bus Transport Management System

A comprehensive web-based bus transport management system designed for **Pragati Engineering College, Surampalem**. This system provides real-time bus tracking, attendance management, route visualization, and analytics for efficient college transportation operations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

### 🏠 Dashboard
- **Real-time Bus Status**: View all active buses with current status (On-time, Delayed, Early)
- **Quick Actions**: Track buses, mark favorites, and view driver information
- **Interactive Cards**: Hover effects and smooth animations for better UX
- **12 Active Routes**: Covering major locations around Surampalem

### 🗺️ Routes & Live Tracking
- **Google Maps Integration**: Real-time bus location tracking on interactive maps
- **Route Visualization**: Clear route lines from origin to Pragati Engineering College
- **Bus Information Panel**: Live updates on speed, distance, and ETA
- **Search Functionality**: Quick location and route search
- **12 Buses Tracked**: Buses 1, 3, 4, 8, 12, 15, 22, 25, 30, 35, 40, 90

### 📊 Analytics (Attendance Insights)
- **Summary Cards**: 
  - Total Students (1,247)
  - Buses Running Today (12)
  - Average Attendance (87.5%)
  - Absentees Today
- **Interactive Charts**:
  - 📈 Line Chart: Daily Attendance Trend (7/30 days)
  - 📊 Bar Chart: Attendance by Branch (CSE, ECE, EEE, MECH, CIVIL)
  - 🥧 Pie Chart: Bus Usage Distribution
- **Advanced Filters**: Filter by Bus No, Branch, and Date Range
- **Export Functionality**: Download attendance data as CSV
- **Attendance Logs Table**: Detailed daily records with color-coded percentages

### 🎫 Bus Pass Management
- **Student Database**: Manage student bus pass information
- **Editable Fields**:
  - Roll No (10-digit format: 24A31A05XX)
  - Name (text input)
  - Branch (CSE, ECE, EEE, MECH, CIVIL)
  - Section (A, B, C, D, E)
  - Bus Fee Status (Paid/Pending/Overdue with color badges)
  - Bus No (number input)
- **CRUD Operations**: Add, Edit, Save, Delete student records
- **Local Storage**: Data persistence across sessions
- **Inline Editing**: Edit → Save workflow with validation

### 🎨 Design & UX
- **Modern UI**: Clean, professional interface with soft shadows and rounded corners
- **Color Theme**: Luxurious yellow-green-blue gradient palette
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, hover states, and transitions
- **Toast Notifications**: Real-time feedback for user actions
- **Keyboard Shortcuts**: Enhanced productivity with hotkeys

## 🎥 Demo

### Live Routes Covered
1. **Bus 1**: Rajahmundry ↔ Surampalem
2. **Bus 3**: Kakinada ↔ Surampalem
3. **Bus 4**: Pithapuram ↔ Surampalem
4. **Bus 8**: Peddapuram ↔ Surampalem
5. **Bus 12**: Amalapuram ↔ Surampalem
6. **Bus 15**: Mandapeta ↔ Surampalem
7. **Bus 22**: Tuni ↔ Surampalem
8. **Bus 25**: Yanam ↔ Surampalem
9. **Bus 30**: Ramachandrapuram ↔ Surampalem
10. **Bus 35**: Kotananduru ↔ Surampalem
11. **Bus 40**: Uppada ↔ Surampalem
12. **Bus 90**: Samalkot ↔ Surampalem

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation

### Libraries & Frameworks
- **Google Maps API**: Real-time map integration and route visualization
- **Chart.js**: Interactive and responsive charts for analytics
- **Font Awesome 6.0**: Icon library for UI elements
- **Google Fonts (Inter)**: Modern typography

### Data Storage
- **LocalStorage**: Client-side data persistence for bus pass records

### Design Principles
- **Responsive Web Design**: Mobile-first approach
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Accessibility**: ARIA labels and semantic HTML

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Google Maps API and CDN resources)
- Text editor or IDE (VS Code, Sublime Text, etc.)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pragati-tracker.git
   cd pragati-tracker
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

### Configuration

**Google Maps API Key** (Optional - for production):
- Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
- Replace the API key in `index.html`:
  ```html
  <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=geometry">
  </script>
  ```

## 🚀 Usage

### Navigation
- **Dashboard**: View all buses and their current status
- **Routes**: Track buses in real-time on Google Maps
- **Analytics**: View attendance insights and statistics
- **Bus Pass**: Manage student bus pass information

### Dashboard Features
1. Click on any bus card to view details
2. Click the star icon to mark/unmark favorites
3. Click "Track Bus" to navigate to the Routes page with the bus highlighted

### Routes Features
1. Use the search bar to find locations or routes
2. Click on bus markers for detailed information
3. Click on bus items in the panel to focus on specific buses
4. Use refresh button to update bus positions
5. Use fullscreen button for expanded map view

### Analytics Features
1. Toggle between 7 and 30 days for attendance trends
2. Use filters to narrow down data by Bus No, Branch, or Date Range
3. Click "Apply Filters" to update the view
4. Click "Export" to download attendance data as CSV
5. View color-coded attendance percentages in the table

### Bus Pass Features
1. Click "Add Student" to create a new record
2. Click "Edit" to modify student information
3. Click "Save" to confirm changes
4. Click "Delete" to remove a student record
5. Use keyboard shortcuts:
   - `Escape`: Cancel editing
   - `Ctrl+S`: Save changes
   - `Ctrl+N`: Add new student

## 📁 Project Structure

```
pragati-tracker/
│
├── index.html              # Main HTML file with all sections
├── styles.css              # Complete stylesheet with responsive design
├── script.js               # JavaScript functionality for all features
├── test-map.html          # Google Maps testing file
├── README.md              # Project documentation
│
└── assets/                # (Optional) Images and resources
    ├── screenshots/       # Application screenshots
    └── icons/            # Custom icons (if any)
```

### Code Organization

#### HTML Structure
- **Sidebar Navigation**: Fixed sidebar with menu items
- **Main Content Area**: Dynamic content sections
- **Dashboard Section**: Bus cards grid
- **Routes Section**: Map container and bus info panel
- **Analytics Section**: Summary cards, charts, and data table
- **Bus Pass Section**: Student management table

#### CSS Architecture
- **Global Styles**: Reset, typography, and base styles
- **Component Styles**: Sidebar, cards, tables, charts
- **Section-Specific Styles**: Isolated styles for each feature
- **Responsive Breakpoints**: 1024px, 768px, 640px, 480px
- **Animations**: Fade-in, slide-in, and hover effects

#### JavaScript Modules
- **Navigation System**: Page switching and routing
- **Dashboard**: Bus cards and status management
- **Routes**: Google Maps integration and real-time tracking
- **Analytics**: Chart.js integration and data visualization
- **Bus Pass**: CRUD operations and localStorage management
- **Utilities**: Notifications, date formatting, and helpers

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Real-time bus status with interactive cards*

### Routes & Tracking
![Routes](screenshots/routes.png)
*Live bus tracking with Google Maps integration*

### Analytics
![Analytics](screenshots/analytics.png)
*Comprehensive attendance insights and statistics*

### Bus Pass Management
![Bus Pass](screenshots/bus-pass.png)
*Student bus pass database management*

## 🎯 Key Highlights

### Performance
- ⚡ Fast loading times with optimized assets
- 🔄 Real-time updates without page refresh
- 💾 Efficient data storage with localStorage
- 📱 Smooth animations at 60fps

### Security
- 🔒 Client-side data validation
- 🛡️ XSS protection with sanitized inputs
- 🔐 Secure API key handling (for production)

### Scalability
- 📈 Modular code structure for easy expansion
- 🔧 Configurable bus routes and data
- 🎨 Themeable design system
- 🌐 Multi-language support ready

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code style and formatting
- Test thoroughly before submitting
- Update documentation as needed

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

## 📝 Future Enhancements

- [ ] User authentication and role-based access
- [ ] SMS/Email notifications for bus delays
- [ ] Mobile app (React Native/Flutter)
- [ ] Backend integration with Node.js/Express
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway for bus pass fees
- [ ] QR code-based attendance system
- [ ] Parent portal for tracking students
- [ ] Driver mobile app for updates
- [ ] Advanced analytics with ML predictions
- [ ] Multi-language support (Telugu, Hindi)
- [ ] Dark mode theme
- [ ] Offline mode with service workers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Pragati Engineering College

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Authors

- **Development Team** - *Initial work* - [Pragati Engineering College](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Pragati Engineering College** for project requirements and support
- **Google Maps Platform** for mapping services
- **Chart.js** for beautiful charts
- **Font Awesome** for icon library
- **Open Source Community** for inspiration and resources

## 📞 Contact

**Pragati Engineering College**
- 📍 Location: Surampalem, East Godavari District, Andhra Pradesh
- 🌐 Website: [www.pragati.ac.in](https://www.pragati.ac.in)
- 📧 Email: info@pragati.ac.in
- 📱 Phone: +91-XXXXXXXXXX

**Project Link**: [https://github.com/yourusername/pragati-tracker](https://github.com/yourusername/pragati-tracker)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ for Pragati Engineering College

</div>
