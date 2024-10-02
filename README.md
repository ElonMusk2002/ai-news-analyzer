# AI News Analyzer

This project is a Next.js application that utilizes Google's Gemini 1.5 flash AI model to analyze news articles. The application offers features like:

- **Sentiment analysis**: Determining the overall sentiment of the article (positive, negative, or neutral).
- **Key topic extraction**: Identifying the main topics discussed in the article.
- **Named entity recognition**: Extracting important entities like people, organizations, and locations.
- **Readability score**: Assessing the article's readability.
- **Bias detection**: Detecting potential political bias in the article.
- **Fact check suggestions**: Providing suggestions for fact-checking the information presented.
- **Content classification**: Categorizing the article based on its content.

## Project Structure

The project is structured as follows:

- `.env.local`: Contains environment variables (e.g., API key).
- `components.json`: Lists the available components from the Shadcn UI library.
- `jsconfig.json`: TypeScript configuration file.
- `next.config.mjs`: Next.js configuration file.
- `package.json`: Project dependencies and scripts.
- `postcss.config.mjs`: PostCSS configuration file.
- `tailwind.config.js`: Tailwind CSS configuration file.
- `lib/utils.js`: Contains utility functions.
- `public/favicon.ico`: Favicon for the website.
- `styles/globals.css`: Global CSS styles.
- `components/ui`: Contains UI components from Shadcn UI.
- `pages/`:
  - `AINewsAnalyzer.js`: The main component for analyzing articles.
  - `index.js`: The landing page of the application.
  - `_app.js`: The main application component.
  - `_document.js`: The document structure for server-side rendering.
  - `api/analyze.js`: API endpoint for analyzing text.
- `fonts/`: Contains fonts used in the application.

## Usage

1. **Paste article text or URL**: Enter the text or the URL of the news article you want to analyze into the input field.
2. **Analyze the text**: Click the "Analyze" button to initiate the analysis process.
3. **View the results**: The application displays the analysis results, including:
   - **Summary**: A concise summary of the article's main points.
   - **Sentiment**: The overall sentiment of the article.
   - **Key Topics**: The main topics discussed in the article.
   - **Named Entities**: Important entities extracted from the article.
   - **Readability**: The article's readability score.
   - **Bias**: Potential political bias detected in the article.
   - **Fact Check Suggestions**: Suggestions for fact-checking the information.
   - **Content Classification**: The article's content category.

## Key Files

- `pages/api/analyze.js`: This file handles the API request to analyze text. It extracts text from URLs, calls the Gemini 1.5 flash model, and returns the analysis results in JSON format.
- `pages/AINewsAnalyzer.js`: This component is responsible for interacting with the API, displaying analysis results, and managing user input. It uses various UI components for input, output, and interaction.
- `pages/index.js`: This component represents the landing page of the application, showcasing the features and providing a button to launch the analysis section.

## Libraries and Technologies

- **Next.js**: A React framework for building server-rendered applications.
- **Google Generative AI**: API for accessing Gemini 1.5 flash and other AI models.
- **Puppeteer**: A Node.js library for browser automation, used to extract text from web pages.
- **Shadcn UI**: A library of reusable UI components.
- **Tailwind CSS**: A utility-first CSS framework.
- **Framer Motion**: A library for creating animations and motion.
- **lucide-react**: A library of React icons.
- **recharts**: A charting library for creating visualizations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
