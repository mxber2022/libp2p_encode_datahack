# Image Sharing with js-libp2p

## Overview

This project IMG is designed to facilitate the sharing of image files using the js-libp2p library. js-libp2p is a modular network stack for peer-to-peer applications, and it provides a robust framework for building decentralized applications that can communicate directly between peers without the need for centralized servers.

The primary goal of this project is to demonstrate how you can leverage js-libp2p to create a simple image sharing application. Users can share image files with each other over a peer-to-peer network, ensuring privacy, security, and decentralization.

## Features

- **Peer-to-Peer Communication**: The project utilizes js-libp2p to establish direct communication channels between peers, allowing them to share image files without relying on a centralized server.

- **Image Sharing**: Users can upload and share image files with their peers. These files are transmitted directly from sender to receiver without passing through any intermediaries.

- **Decentralization**: There is no central server involved in the image sharing process. All communication occurs directly between peers, promoting decentralization and user autonomy.

## Prerequisites

Before you can run this project, you'll need to have the following prerequisites in place:

- **Node.js**: Ensure you have Node.js installed on your system.

- **npm**: Make sure you have npm (Node Package Manager) installed.

## Getting Started

Follow these steps to get started with the project:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/mxber2022/libp2p_encode_datahack
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

   ```
   cd libp2p_encode_datahack
   npm install
   ```

3. **Run the Application**: Start the application using the following command:

   ```
   npm run relay
   npm start
   ```

4. **Access the Web Interface**: Open your web browser and go to `http://localhost:3000` to access the image sharing interface.

## Usage

- **Upload Images**: Use the web interface to upload image files that you want to share. These images will be stored locally and made available for sharing with other peers.

- **Share Images**: To share an image with another peer, you can provide them with your peer ID. They can then connect to your node, request the image, and receive it directly from your node.

- **Receive Images**: When you receive a peer's ID, you can connect to their node and request specific images from them. The images will be transferred directly to your device.

## Contributing

Contributions to this project are welcome. You can contribute by:

- Reporting issues.
- Implementing new features.
- Fixing bugs.
- Improving documentation.

Please follow the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project is built on top of the js-libp2p library, which is a powerful tool for creating peer-to-peer applications. We would like to acknowledge the js-libp2p community for their contributions and support.

---

Enjoy sharing images securely and without relying on centralized servers with this js-libp2p image sharing project! If you have any questions or encounter issues, please feel free to open an issue or reach out to the project maintainers.