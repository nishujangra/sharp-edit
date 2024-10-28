# Sharp Edit - Image Processing Web Application

## Overview

Sharp Edit is a full-stack web application that allows users to upload images and apply various image manipulations in real time. Built using the MERN stack and TypeScript, it features image brightness, saturation, rotation adjustments, and format conversion between PNG and JPEG. The application leverages the powerful Sharp library for backend image processing.

## Features

- **Real-Time Image Preview**: See changes in brightness, saturation, and rotation applied to your image instantly.
- **Image Manipulations**: Adjust brightness, saturation, and rotation of images.
- **Format Conversion**: Convert images between PNG and JPEG formats.
- **Responsive Design**: Modern UI with Tailwind CSS for a seamless user experience.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, Sharp, TypeScript
- **Database**: None (File-based image storage)
- **API**: RESTful APIs for image manipulation

## Setup Instructions

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/sharp-edit.git
   cd sharp-edit
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Backend Server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5000`.

## Usage

1. **Upload an Image**

   Navigate to the `/image` route and upload an image. The image URL will be provided for manipulation.

2. **Adjust Image Properties**

   Use the sliders to adjust brightness, saturation, and rotation. The image preview will update in real time.

3. **Convert Image Format**

   Select the desired format (JPEG or PNG) to convert the image. The processed image will be displayed with the selected format.

4. **Download the Processed Image**

   After applying the desired manipulations and format conversion, download the final image using the provided download button.

## API Endpoints

- **POST /api/manipulate**
  - **Description**: Adjusts the brightness, saturation and rotation of the uploaded image.
  - **Request Body**:
    ```json
    {
      "fileName": "image.jpg",
      "brightness": 1.2,
      "saturation": 1.5,
      "rotation": 90

    }
    ```
  - **Response**: Base64-encoded image data.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**
3. **Make Your Changes**
4. **Commit and Push**
5. **Submit a Pull Request**


## Acknowledgements

- **Sharp**: For its powerful image processing capabilities.
- **Tailwind CSS**: For its utility-first CSS framework.
- **React & Vite**: For a modern frontend development experience.

## Contact

For questions or support, please contact [ndjangra1027@gmail.com](mailto:ndjangra1027@gmail.com).


### Key Sections:

- **Overview**: Briefly describes what the project does and its main features.
- **Technologies Used**: Lists the technologies used in both frontend and backend.
- **Setup Instructions**: Detailed steps for setting up the backend and frontend.
- **Usage**: Instructions on how to use the application.
- **API Endpoints**: Details about the available API endpoints.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Information about the project's license.
- **Acknowledgements**: Credits to libraries and frameworks used.
- **Contact**: Your contact information for support or inquiries.