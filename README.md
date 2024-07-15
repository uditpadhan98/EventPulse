# EventPulse README

Welcome to EventPulse, the ultimate event management platform designed for college clubs to manage events efficiently and effectively. This README file will guide you through the setup, features, and usage of EventPulse.

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Contributing](#contributing)

## Introduction

EventPulse is a comprehensive event management platform tailored for college clubs. It allows clubs to organize, promote, and manage their events seamlessly. With EventPulse, clubs can streamline their event planning process, improve communication, and increase participation.

## Installation

Follow these steps to install EventPulse:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/uditpadhan98/eventPulse.git
   ```
2. **Navigate to the Directory**
   ```bash
   cd eventPulse
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Run the Application**
   ```bash
   npm start
   ```

## Configuration

To configure EventPulse, follow these steps:

1. **Database Configuration**: Update the database configuration in `backend/index.js` with your database credentials.
2. **Environment Variables**: Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URL=your mongoDB uri
   BASE=http://localhost:3000
   ```

## Contributing

We welcome contributions to EventPulse! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.
