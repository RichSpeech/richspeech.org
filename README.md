# richspeech.org

The official website for the [Rich Speech](https://richspeech.org) open-source initiative.

Rich Speech defines modern transcription schemas, representations, and evaluation standards for speech AI — capturing disfluencies, paralinguistics, prosody, code-mixing, and dialects without sacrificing clean normalized text readability.

---

## What's in this repository

This is a Next.js (App Router) + Tailwind CSS web application serving the landing site. The RSML specification and npm documentation live in a separate app at [docs.richspeech.org](https://docs.richspeech.org):

- **`/`**: Overview of the Rich Speech initiative, ecosystem components, and online editor link.
- **`/prespeech-py`** & **`/rsml-py`**: Python speech preprocessing and dataset utilities (currently under active development, marked as Coming Soon).

---

## Local Development

### Prerequisites

- Node.js 18.18+ or 20+
- npm (or yarn / pnpm / bun)

### Running locally

```bash
# Clone the repository
git clone https://github.com/richspeech/richspeech-org.git
cd richspeech-org

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

### Code quality & production build

```bash
# Lint with ESLint
npm run lint

# Build static production export
npm run build
```

---

## Project Structure

```
richspeech-org/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with navbar and footer
│   │   ├── page.tsx           # Home page
│   │   ├── prespeech-py/      # PreSpeech (Py) page (Coming Soon)
│   │   └── rsml-py/           # RSML Python page (Coming Soon)
│   ├── components/
│   │   ├── home/              # Hero, ecosystem cards, waveforms
│   │   ├── layout/            # Sticky navbar and responsive footer
│   │   └── ui/                # Buttons, icons, logo, and page shells
│   └── lib/
│       └── constants.ts       # Site metadata, navigation items, ecosystem configs
├── public/                    # Static assets
└── nginx.conf                 # Production server configuration
```

---

## Docker Deployment

A multi-stage `Dockerfile` is provided for running behind Nginx:

```bash
# Build the image
docker build -t richspeech-org .

# Run container on port 80
docker run -p 8080:80 richspeech-org
```

---

## Related Projects

- **[RSML (OpenBhasha/RSML)](https://github.com/OpenBhasha/RSML)**: Core RSML specification, test suites, and npm toolkit.
- **[Rich Speech Editor](https://editor.richspeech.org)**: Web-based interactive annotator for authoring and verifying RSML transcripts.
- **[`rsml` on npm](https://www.npmjs.com/package/rsml)**: Client-side annotation UI widget and syntax engine.

---

## License

This project is open-source and released under the [MIT License](LICENSE).
