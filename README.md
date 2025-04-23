# BOLT12 Username Guide

A comprehensive web application for creating human-readable Bitcoin usernames using BOLT12 offers and BIP353. This project helps users set up and manage their Bitcoin Lightning Network identities with a user-friendly interface.

## Features

- 🌩️ Create BOLT12 offers using Core Lightning
- 👤 Set up human-readable Bitcoin usernames
- 🔒 Manage DNS records for BIP353 compliance
- 🎨 Modern, Apple-style dark theme UI
- 📱 Responsive design for all devices
- 🛠️ Integration with popular Lightning wallets

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Core Lightning node with experimental features enabled
- Access to DNS records for a domain you control

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bolt12-username-guide.git
cd bolt12-username-guide
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your Core Lightning node details.

## Development

Start the development server:

```bash
# Start the frontend development server
npm run dev

# In a separate terminal, start the backend server
npm run server
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Endpoints

### Create BOLT12 Offer
```http
POST /api/offers
Content-Type: application/json

{
  "amount": number,
  "description": string
}
```

Response:
```json
{
  "offer": "lno1pg0pu..."
}
```

## Project Structure

```
bolt12-username-guide/
├── src/                 # Frontend source code
│   ├── components/      # React components
│   ├── App.tsx         # Main application
│   └── styles.css      # Global styles
├── server/             # Backend code
│   ├── index.ts        # Express server
│   └── lightning.ts    # Lightning service
├── public/             # Static assets
└── documentation/      # Project documentation
```

## Configuration

### Core Lightning Setup

1. Enable experimental features in your Core Lightning configuration:
```
# ~/.lightning/config
enable-experimental-offers=true
network=bitcoin
```

2. Ensure your node is fully synced and has available channels.

### DNS Configuration

To set up your Bitcoin username, create a TXT record:

```
Record: _bitcoin._username.yourdomain.com
Value: bolt12=lno1pg0pu...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run server` - Start backend server

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite

- Backend:
  - Express.js
  - Core Lightning
  - Node.js

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

```bash
# Run frontend tests
npm run test

# Run backend tests
npm run test:server
```

## Security Considerations

- Never expose your Lightning node's credentials
- Keep your DNS records secure
- Regularly update dependencies
- Monitor your node's activity
- Use environment variables for sensitive data

## Troubleshooting

### Common Issues

1. **Blank Screen**
   - Check if the development server is running
   - Verify all dependencies are installed
   - Check console for errors

2. **BOLT12 Offer Creation Fails**
   - Verify Core Lightning node is running
   - Check experimental features are enabled
   - Ensure node has available channels

3. **DNS Record Issues**
   - Allow time for DNS propagation (up to 48 hours)
   - Verify record format matches BIP353
   - Use `dig` command to check record status

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Seth for Privacy's Guide](https://sethforprivacy.com/guides/setting-up-a-bitcoin-username/)
- [BOLT12 Documentation](https://bolt12.org/)
- [Core Lightning Team](https://github.com/ElementsProject/lightning)
- [BIP353 Specification](https://github.com/bitcoin/bips/blob/master/bip-0353.mediawiki)

