import { Technology } from '../types';

export const TECHNOLOGIES: Technology[] = [
  {
    name: 'React',
    variants: ['react', 'reactjs', 'react.js', 'react js'],
    category: 'framework'
  },
  {
    name: 'Vue',
    variants: ['vue', 'vuejs', 'vue.js', 'vue js', 'vue 3', 'vue3'],
    category: 'framework'
  },
  {
    name: 'Angular',
    variants: ['angular', 'angularjs', 'angular.js', 'angular js', 'angular 2+', 'angular2'],
    category: 'framework'
  },
  {
    name: 'Svelte',
    variants: ['svelte', 'sveltejs', 'svelte.js'],
    category: 'framework'
  },
  {
    name: 'Next.js',
    variants: ['next', 'nextjs', 'next.js', 'next js'],
    category: 'framework'
  },
  {
    name: 'Nuxt',
    variants: ['nuxt', 'nuxtjs', 'nuxt.js', 'nuxt js'],
    category: 'framework'
  },
  {
    name: 'Remix',
    variants: ['remix', 'remix.run', 'remixjs'],
    category: 'framework'
  },
  {
    name: 'Astro',
    variants: ['astro', 'astrojs', 'astro.js'],
    category: 'framework'
  },
  {
    name: 'SvelteKit',
    variants: ['sveltekit', 'svelte kit', 'svelte 5'],
    category: 'framework'
  },
  {
    name: 'FastAPI',
    variants: ['fastapi', 'fast api'],
    category: 'backend'
  },
  {
    name: 'Flask',
    variants: ['flask'],
    category: 'backend'
  },
  {
    name: 'Django',
    variants: ['django'],
    category: 'backend'
  },
  {
    name: 'TypeScript',
    variants: ['typescript', 'ts', 'type script'],
    category: 'language'
  },
  {
    name: 'JavaScript',
    variants: ['javascript', 'js', 'ecmascript', 'es6', 'es2015', 'es2020'],
    category: 'language'
  },
  {
    name: 'HTML',
    variants: ['html', 'html5', 'html 5'],
    category: 'language'
  },
  {
    name: 'CSS',
    variants: ['css', 'css3', 'css 3'],
    category: 'language'
  },
  {
    name: 'Redux',
    variants: ['redux', 'redux toolkit', 'redux-toolkit', '@reduxjs/toolkit'],
    category: 'library'
  },
  {
    name: 'Zustand',
    variants: ['zustand'],
    category: 'library'
  },
  {
    name: 'MobX',
    variants: ['mobx', 'mob-x'],
    category: 'library'
  },
  {
    name: 'Recoil',
    variants: ['recoil', 'recoiljs'],
    category: 'library'
  },
  {
    name: 'Jotai',
    variants: ['jotai'],
    category: 'library'
  },
  {
    name: 'TanStack Query',
    variants: ['tanstack query', 'react query', 'react-query', '@tanstack/react-query'],
    category: 'library'
  },
  {
    name: 'SWR',
    variants: ['swr'],
    category: 'library'
  },
  {
    name: 'Apollo Client',
    variants: ['apollo', 'apollo client', 'apollo-client', '@apollo/client'],
    category: 'library'
  },
  {
    name: 'TailwindCSS',
    variants: ['tailwind', 'tailwindcss', 'tailwind css'],
    category: 'styling'
  },
  {
    name: 'Sass',
    variants: ['sass', 'scss'],
    category: 'styling'
  },
  {
    name: 'Less',
    variants: ['less', 'lesscss'],
    category: 'styling'
  },
  {
    name: 'Styled Components',
    variants: ['styled components', 'styled-components', 'styledcomponents'],
    category: 'styling'
  },
  {
    name: 'Emotion',
    variants: ['emotion', '@emotion/react', '@emotion/styled'],
    category: 'styling'
  },
  {
    name: 'CSS Modules',
    variants: ['css modules', 'css-modules'],
    category: 'styling'
  },
  {
    name: 'Material UI',
    variants: ['material ui', 'material-ui', 'mui', '@mui/material'],
    category: 'library'
  },
  {
    name: 'Ant Design',
    variants: ['ant design', 'antd', 'ant-design'],
    category: 'library'
  },
  {
    name: 'Chakra UI',
    variants: ['chakra', 'chakra ui', 'chakra-ui'],
    category: 'library'
  },
  {
    name: 'shadcn/ui',
    variants: ['shadcn', 'shadcn/ui', 'shadcn ui'],
    category: 'library'
  },
  {
    name: 'Bootstrap',
    variants: ['bootstrap', 'bootstrap 5', 'bootstrap5'],
    category: 'styling'
  },
  {
    name: 'Jest',
    variants: ['jest', 'jestjs'],
    category: 'testing'
  },
  {
    name: 'Vitest',
    variants: ['vitest'],
    category: 'testing'
  },
  {
    name: 'Testing Library',
    variants: ['testing library', 'react testing library', '@testing-library', 'rtl'],
    category: 'testing'
  },
  {
    name: 'Cypress',
    variants: ['cypress', 'cypress.io'],
    category: 'testing'
  },
  {
    name: 'Playwright',
    variants: ['playwright'],
    category: 'testing'
  },
  {
    name: 'Enzyme',
    variants: ['enzyme'],
    category: 'testing'
  },
  {
    name: 'Webpack',
    variants: ['webpack', 'webpack 5', 'webpack5'],
    category: 'tool'
  },
  {
    name: 'Vite',
    variants: ['vite', 'vitejs', 'vite.js'],
    category: 'tool'
  },
  {
    name: 'Rollup',
    variants: ['rollup', 'rollupjs'],
    category: 'tool'
  },
  {
    name: 'Parcel',
    variants: ['parcel', 'parceljs'],
    category: 'tool'
  },
  {
    name: 'ESBuild',
    variants: ['esbuild', 'es-build'],
    category: 'tool'
  },
  {
    name: 'Turbopack',
    variants: ['turbopack'],
    category: 'tool'
  },
  {
    name: 'Git',
    variants: ['git', 'github', 'gitlab', 'bitbucket'],
    category: 'tool'
  },
  {
    name: 'npm',
    variants: ['npm'],
    category: 'tool'
  },
  {
    name: 'yarn',
    variants: ['yarn'],
    category: 'tool'
  },
  {
    name: 'pnpm',
    variants: ['pnpm'],
    category: 'tool'
  },
  {
    name: 'Docker',
    variants: ['docker', 'dockerfile', 'docker-compose'],
    category: 'tool'
  },
  {
    name: 'Kubernetes',
    variants: ['kubernetes', 'k8s'],
    category: 'tool'
  },
  {
    name: 'CI/CD',
    variants: ['ci/cd', 'ci cd', 'continuous integration', 'continuous deployment'],
    category: 'tool'
  },
  {
    name: 'GraphQL',
    variants: ['graphql', 'graph ql'],
    category: 'backend'
  },
  {
    name: 'REST API',
    variants: ['rest', 'rest api', 'restful', 'rest api'],
    category: 'backend'
  },
  {
    name: 'Node.js',
    variants: ['node', 'nodejs', 'node.js', 'node js'],
    category: 'backend'
  },
  {
    name: 'Express',
    variants: ['express', 'expressjs', 'express.js'],
    category: 'backend'
  },
  {
    name: 'Fastify',
    variants: ['fastify'],
    category: 'backend'
  },
  {
    name: 'NestJS',
    variants: ['nest', 'nestjs', 'nest.js'],
    category: 'backend'
  },
  {
    name: 'tRPC',
    variants: ['trpc', 't-rpc'],
    category: 'backend'
  },
  {
    name: 'MongoDB',
    variants: ['mongodb', 'mongo'],
    category: 'database'
  },
  {
    name: 'PostgreSQL',
    variants: ['postgresql', 'postgres', 'psql'],
    category: 'database'
  },
  {
    name: 'MySQL',
    variants: ['mysql'],
    category: 'database'
  },
  {
    name: 'Redis',
    variants: ['redis'],
    category: 'database'
  },
  {
    name: 'Firebase',
    variants: ['firebase'],
    category: 'cloud'
  },
  {
    name: 'Supabase',
    variants: ['supabase'],
    category: 'cloud'
  },
  {
    name: 'AWS',
    variants: ['aws', 'amazon web services'],
    category: 'cloud'
  },
  {
    name: 'Azure',
    variants: ['azure', 'microsoft azure'],
    category: 'cloud'
  },
  {
    name: 'GCP',
    variants: ['gcp', 'google cloud', 'google cloud platform'],
    category: 'cloud'
  },
  {
    name: 'Vercel',
    variants: ['vercel'],
    category: 'cloud'
  },
  {
    name: 'Netlify',
    variants: ['netlify'],
    category: 'cloud'
  },
  {
    name: 'Figma',
    variants: ['figma'],
    category: 'tool'
  },
  {
    name: 'Storybook',
    variants: ['storybook', 'storybookjs'],
    category: 'tool'
  },
  {
    name: 'ESLint',
    variants: ['eslint', 'es-lint'],
    category: 'tool'
  },
  {
    name: 'Prettier',
    variants: ['prettier'],
    category: 'tool'
  },
  {
    name: 'Babel',
    variants: ['babel', 'babeljs'],
    category: 'tool'
  },
  {
    name: 'Axios',
    variants: ['axios'],
    category: 'library'
  },
  {
    name: 'Fetch API',
    variants: ['fetch', 'fetch api'],
    category: 'library'
  },
  {
    name: 'Lodash',
    variants: ['lodash'],
    category: 'library'
  },
  {
    name: 'Ramda',
    variants: ['ramda', 'ramdajs'],
    category: 'library'
  },
  {
    name: 'RxJS',
    variants: ['rxjs', 'reactive extensions'],
    category: 'library'
  },
  {
    name: 'Three.js',
    variants: ['three', 'threejs', 'three.js'],
    category: 'library'
  },
  {
    name: 'D3.js',
    variants: ['d3', 'd3js', 'd3.js'],
    category: 'library'
  },
  {
    name: 'Chart.js',
    variants: ['chart', 'chartjs', 'chart.js'],
    category: 'library'
  },
  {
    name: 'Framer Motion',
    variants: ['framer motion', 'framer-motion'],
    category: 'library'
  },
  {
    name: 'GSAP',
    variants: ['gsap', 'greensock'],
    category: 'library'
  },
  {
    name: 'React Router',
    variants: ['react router', 'react-router', 'react-router-dom'],
    category: 'library'
  },
  {
    name: 'React Hook Form',
    variants: ['react hook form', 'react-hook-form'],
    category: 'library'
  },
  {
    name: 'Formik',
    variants: ['formik'],
    category: 'library'
  },
  {
    name: 'Zod',
    variants: ['zod'],
    category: 'library'
  },
  {
    name: 'Yup',
    variants: ['yup'],
    category: 'library'
  },
  {
    name: 'i18next',
    variants: ['i18next', 'i18n', 'react-i18next'],
    category: 'library'
  },
  {
    name: 'Prisma',
    variants: ['prisma'],
    category: 'backend'
  },
  {
    name: 'Drizzle',
    variants: ['drizzle', 'drizzle orm'],
    category: 'backend'
  },
  {
    name: 'TypeORM',
    variants: ['typeorm', 'type-orm'],
    category: 'backend'
  },
  {
    name: 'Sequelize',
    variants: ['sequelize'],
    category: 'backend'
  },
  {
    name: 'Agile',
    variants: ['agile', 'scrum', 'kanban'],
    category: 'other'
  },
  {
    name: 'Responsive Design',
    variants: ['responsive', 'responsive design', 'mobile first', 'mobile-first'],
    category: 'other'
  },
  {
    name: 'Accessibility',
    variants: ['accessibility', 'a11y', 'wcag', 'aria'],
    category: 'other'
  },
  {
    name: 'SEO',
    variants: ['seo', 'search engine optimization'],
    category: 'other'
  },
  {
    name: 'Performance Optimization',
    variants: ['performance', 'optimization', 'web performance', 'lighthouse'],
    category: 'other'
  },
  {
    name: 'PWA',
    variants: ['pwa', 'progressive web app', 'progressive web application'],
    category: 'other'
  },
  {
    name: 'WebSockets',
    variants: ['websocket', 'websockets', 'socket.io', 'socketio'],
    category: 'backend'
  },
  {
    name: 'Micro Frontends',
    variants: ['micro frontend', 'micro-frontend', 'microfrontend', 'module federation'],
    category: 'other'
  },
  {
    name: 'Monorepo',
    variants: ['monorepo', 'mono repo', 'turborepo', 'nx'],
    category: 'tool'
  },
  {
    name: 'Python',
    variants: ['python', 'python 3', 'python3', 'python 3.13', 'python>=3.13'],
    category: 'language'
  },
  {
    name: 'Rasterio',
    variants: ['rasterio'],
    category: 'library'
  },
  {
    name: 'Shapely',
    variants: ['shapely'],
    category: 'library'
  },
  {
    name: 'GDAL',
    variants: ['gdal', 'ogr'],
    category: 'tool'
  },
  {
    name: 'PostGIS',
    variants: ['postgis', 'post gis'],
    category: 'database'
  },
  {
    name: 'GeoAlchemy',
    variants: ['geoalchemy', 'geoalchemy2'],
    category: 'library'
  },
  {
    name: 'Celery',
    variants: ['celery'],
    category: 'backend'
  },
  {
    name: 'Alembic',
    variants: ['alembic'],
    category: 'backend'
  },
  {
    name: 'asyncio',
    variants: ['asyncio', 'async io', 'async/await'],
    category: 'library'
  },
  {
    name: 'uv',
    variants: ['uv'],
    category: 'tool'
  },
  {
    name: 'Ruff',
    variants: ['ruff'],
    category: 'tool'
  },
  {
    name: 'MapLibre GL',
    variants: ['maplibre', 'maplibregl', 'maplibre gl', 'maplibre-gl'],
    category: 'library'
  },
  {
    name: 'Deck.gl',
    variants: ['deck.gl', 'deckgl', 'deck gl'],
    category: 'library'
  },
  {
    name: 'Leaflet',
    variants: ['leaflet', 'leafletjs'],
    category: 'library'
  },
  {
    name: 'Turf.js',
    variants: ['turf', 'turfjs', 'turf.js'],
    category: 'library'
  },
  {
    name: 'OpenLayers',
    variants: ['openlayers', 'open layers'],
    category: 'library'
  },
  {
    name: 'Mapbox GL',
    variants: ['mapbox', 'mapbox gl', 'mapboxgl'],
    category: 'library'
  },
  {
    name: 'GeoServer',
    variants: ['geoserver', 'geo server'],
    category: 'backend'
  },
  {
    name: 'QGIS',
    variants: ['qgis', 'quantum gis'],
    category: 'tool'
  },
  {
    name: 'ArcGIS',
    variants: ['arcgis', 'arc gis', 'esri'],
    category: 'tool'
  },
  {
    name: 'GeoPandas',
    variants: ['geopandas', 'geo pandas'],
    category: 'library'
  },
  {
    name: 'Fiona',
    variants: ['fiona'],
    category: 'library'
  },
  {
    name: 'Pyproj',
    variants: ['pyproj', 'py proj'],
    category: 'library'
  },
  {
    name: 'Folium',
    variants: ['folium'],
    category: 'library'
  },
  {
    name: 'Bash',
    variants: ['bash', 'shell', 'sh'],
    category: 'tool'
  },
  {
    name: 'Zsh',
    variants: ['zsh', 'z shell'],
    category: 'tool'
  },
  {
    name: 'Fish',
    variants: ['fish', 'fish shell'],
    category: 'tool'
  },
  {
    name: 'Type Hinting',
    variants: ['type hinting', 'type hints', 'typing', 'mypy'],
    category: 'other'
  },
  {
    name: 'Earth Observation',
    variants: ['earth observation', 'eo', 'remote sensing', 'satellite imagery', 'satellite images'],
    category: 'other'
  },
  {
    name: 'GIS',
    variants: ['gis', 'geographic information system', 'geospatial'],
    category: 'other'
  },
  {
    name: 'CRS',
    variants: ['crs', 'coordinate reference system', 'projections', 'projection'],
    category: 'other'
  },
  {
    name: 'Raster Data',
    variants: ['raster', 'raster data', 'rasters'],
    category: 'other'
  },
  {
    name: 'Vector Data',
    variants: ['vector', 'vector data', 'vector geometry', 'vectors'],
    category: 'other'
  },
  {
    name: 'Digital Twins',
    variants: ['digital twin', 'digital twins'],
    category: 'other'
  },
  {
    name: 'Drone Imagery',
    variants: ['drone', 'drone imagery', 'uav', 'aerial imagery'],
    category: 'other'
  },
  {
    name: 'Pydantic',
    variants: ['pydantic'],
    category: 'library'
  },
  {
    name: 'NumPy',
    variants: ['numpy', 'np'],
    category: 'library'
  },
  {
    name: 'Pandas',
    variants: ['pandas', 'pd'],
    category: 'library'
  },
  {
    name: 'SciPy',
    variants: ['scipy'],
    category: 'library'
  },
  {
    name: 'Matplotlib',
    variants: ['matplotlib', 'pyplot'],
    category: 'library'
  },
  {
    name: 'Plotly',
    variants: ['plotly'],
    category: 'library'
  },
  {
    name: 'Seaborn',
    variants: ['seaborn'],
    category: 'library'
  },
  {
    name: 'Scikit-learn',
    variants: ['scikit-learn', 'sklearn', 'scikit learn'],
    category: 'library'
  },
  {
    name: 'TensorFlow',
    variants: ['tensorflow', 'tf'],
    category: 'library'
  },
  {
    name: 'PyTorch',
    variants: ['pytorch', 'torch'],
    category: 'library'
  },
  {
    name: 'Keras',
    variants: ['keras'],
    category: 'library'
  },
  {
    name: 'OpenCV',
    variants: ['opencv', 'cv2'],
    category: 'library'
  },
  {
    name: 'SQLAlchemy',
    variants: ['sqlalchemy', 'sql alchemy'],
    category: 'backend'
  },
  {
    name: 'Poetry',
    variants: ['poetry'],
    category: 'tool'
  },
  {
    name: 'Pipenv',
    variants: ['pipenv'],
    category: 'tool'
  },
  {
    name: 'Conda',
    variants: ['conda', 'anaconda', 'miniconda'],
    category: 'tool'
  },
  {
    name: 'Jupyter',
    variants: ['jupyter', 'jupyter notebook', 'jupyterlab'],
    category: 'tool'
  },
  {
    name: 'Pytest',
    variants: ['pytest', 'py.test'],
    category: 'testing'
  },
  {
    name: 'Unittest',
    variants: ['unittest', 'unit test'],
    category: 'testing'
  },
  {
    name: 'Black',
    variants: ['black'],
    category: 'tool'
  },
  {
    name: 'Flake8',
    variants: ['flake8'],
    category: 'tool'
  },
  {
    name: 'Pylint',
    variants: ['pylint'],
    category: 'tool'
  },
  {
    name: 'Uvicorn',
    variants: ['uvicorn'],
    category: 'backend'
  },
  {
    name: 'Gunicorn',
    variants: ['gunicorn'],
    category: 'backend'
  },
  {
    name: 'Nginx',
    variants: ['nginx'],
    category: 'backend'
  },
  {
    name: 'Apache',
    variants: ['apache', 'apache2', 'httpd'],
    category: 'backend'
  },
  {
    name: 'RabbitMQ',
    variants: ['rabbitmq', 'rabbit mq'],
    category: 'backend'
  },
  {
    name: 'Kafka',
    variants: ['kafka', 'apache kafka'],
    category: 'backend'
  },
  {
    name: 'Elasticsearch',
    variants: ['elasticsearch', 'elastic search', 'elastic'],
    category: 'database'
  },
  {
    name: 'Solr',
    variants: ['solr', 'apache solr'],
    category: 'database'
  },
  {
    name: 'Cassandra',
    variants: ['cassandra', 'apache cassandra'],
    category: 'database'
  },
  {
    name: 'DynamoDB',
    variants: ['dynamodb', 'dynamo db'],
    category: 'database'
  },
  {
    name: 'SQLite',
    variants: ['sqlite', 'sqlite3'],
    category: 'database'
  },
  {
    name: 'MariaDB',
    variants: ['mariadb', 'maria db'],
    category: 'database'
  },
  {
    name: 'Oracle',
    variants: ['oracle', 'oracle db'],
    category: 'database'
  },
  {
    name: 'SQL Server',
    variants: ['sql server', 'mssql', 'microsoft sql'],
    category: 'database'
  },
  {
    name: 'Terraform',
    variants: ['terraform'],
    category: 'tool'
  },
  {
    name: 'Ansible',
    variants: ['ansible'],
    category: 'tool'
  },
  {
    name: 'Jenkins',
    variants: ['jenkins'],
    category: 'tool'
  },
  {
    name: 'GitHub Actions',
    variants: ['github actions', 'gh actions'],
    category: 'tool'
  },
  {
    name: 'GitLab CI',
    variants: ['gitlab ci', 'gitlab-ci', 'gitlab ci/cd'],
    category: 'tool'
  },
  {
    name: 'CircleCI',
    variants: ['circleci', 'circle ci'],
    category: 'tool'
  },
  {
    name: 'Travis CI',
    variants: ['travis', 'travis ci'],
    category: 'tool'
  },
  {
    name: 'Jira',
    variants: ['jira', 'atlassian jira'],
    category: 'tool'
  },
  {
    name: 'Confluence',
    variants: ['confluence'],
    category: 'tool'
  },
  {
    name: 'Slack',
    variants: ['slack'],
    category: 'tool'
  },
  {
    name: 'Postman',
    variants: ['postman'],
    category: 'tool'
  },
  {
    name: 'Insomnia',
    variants: ['insomnia'],
    category: 'tool'
  },
  {
    name: 'Swagger',
    variants: ['swagger', 'openapi'],
    category: 'tool'
  },
  {
    name: 'Sentry',
    variants: ['sentry'],
    category: 'tool'
  },
  {
    name: 'New Relic',
    variants: ['new relic', 'newrelic'],
    category: 'tool'
  },
  {
    name: 'Datadog',
    variants: ['datadog', 'data dog'],
    category: 'tool'
  },
  {
    name: 'Grafana',
    variants: ['grafana'],
    category: 'tool'
  },
  {
    name: 'Prometheus',
    variants: ['prometheus'],
    category: 'tool'
  },
  {
    name: 'Splunk',
    variants: ['splunk'],
    category: 'tool'
  },
  {
    name: 'Catalan',
    variants: ['catalan', 'català', 'catalán'],
    category: 'other'
  },
  {
    name: 'Spanish',
    variants: ['spanish', 'español', 'castellano'],
    category: 'spoken-language'
  },
  {
    name: 'English',
    variants: ['english', 'inglés', 'ingles'],
    category: 'spoken-language'
  },
  {
    name: 'Code Review',
    variants: ['code review', 'peer review', 'pull request', 'pr review'],
    category: 'other'
  },
  {
    name: 'Stacked Diffs',
    variants: ['stacked diffs', 'stacked-diffs', 'stack diffs'],
    category: 'other'
  },
  {
    name: 'MacOS',
    variants: ['macos', 'mac os', 'osx', 'os x'],
    category: 'other'
  },
  {
    name: 'Linux',
    variants: ['linux', 'ubuntu', 'debian', 'centos', 'rhel'],
    category: 'other'
  },
  {
    name: 'Windows',
    variants: ['windows', 'win'],
    category: 'other'
  },
  {
    name: 'Data Structures',
    variants: ['data structures', 'algorithms', 'dsa'],
    category: 'other'
  },
  {
    name: 'OOP',
    variants: ['oop', 'object oriented', 'object-oriented programming'],
    category: 'other'
  },
  {
    name: 'Functional Programming',
    variants: ['functional programming', 'fp'],
    category: 'other'
  },
  {
    name: 'REST',
    variants: ['rest', 'restful api', 'rest api'],
    category: 'backend'
  },
  {
    name: 'Microservices',
    variants: ['microservices', 'micro services', 'microservice architecture'],
    category: 'backend'
  },
  {
    name: 'Serverless',
    variants: ['serverless', 'lambda', 'cloud functions'],
    category: 'cloud'
  },
  {
    name: 'S3',
    variants: ['s3', 'amazon s3', 'aws s3'],
    category: 'cloud'
  },
  {
    name: 'EC2',
    variants: ['ec2', 'amazon ec2', 'aws ec2'],
    category: 'cloud'
  },
  {
    name: 'Lambda',
    variants: ['aws lambda', 'lambda functions'],
    category: 'cloud'
  },
  {
    name: 'CloudFormation',
    variants: ['cloudformation', 'cloud formation'],
    category: 'cloud'
  },
  {
    name: 'ECS',
    variants: ['ecs', 'elastic container service'],
    category: 'cloud'
  },
  {
    name: 'EKS',
    variants: ['eks', 'elastic kubernetes service'],
    category: 'cloud'
  },
  {
    name: 'RDS',
    variants: ['rds', 'relational database service'],
    category: 'cloud'
  },
  {
  name: 'ArcGIS Pro',
  variants: ['arcgis pro'],
  category: 'tool'
},
{
  name: 'ArcGIS Online',
  variants: ['arcgis online', 'agol'],
  category: 'cloud'
},
{
  name: 'ArcGIS Enterprise',
  variants: ['arcgis enterprise'],
  category: 'backend'
},
{
  name: 'ArcPy',
  variants: ['arcpy'],
  category: 'library'
},
{
  name: 'ArcGIS API for JavaScript',
  variants: ['arcgis api js', 'arcgis javascript api'],
  category: 'library'
},
{
  name: 'FME',
  variants: ['fme', 'safe software fme'],
  category: 'tool'
},
{
  name: 'FME Form',
  variants: ['fme form', 'fme desktop'],
  category: 'tool'
},
{
  name: 'FME Flow',
  variants: ['fme flow', 'fme server'],
  category: 'tool'
},
{
  name: 'FME Cloud',
  variants: ['fme cloud'],
  category: 'cloud'
},
{
  name: 'SAP',
  variants: ['sap'],
  category: 'backend'
},
{
  name: 'SAP PM',
  variants: ['sap pm', 'sap-pm', 'plant maintenance'],
  category: 'backend'
},
{
  name: 'SAP GIS Integration',
  variants: ['sap gis', 'sap spatial', 'sap geospatial'],
  category: 'backend'
},
{
  name: 'WMS',
  variants: ['wms', 'web map service'],
  category: 'backend'
},
{
  name: 'WFS',
  variants: ['wfs', 'web feature service'],
  category: 'backend'
},
{
  name: 'WCS',
  variants: ['wcs', 'web coverage service'],
  category: 'backend'
},
{
  name: 'ETL',
  variants: ['etl', 'extract transform load'],
  category: 'other'
},
{
  name: 'Data Integration',
  variants: ['data integration'],
  category: 'other'
},
{
  name: 'Data Transformation',
  variants: ['data transformation'],
  category: 'other'
},
{
  name: 'Data Validation',
  variants: ['data validation'],
  category: 'other'
},
{
  name: 'GDAL Raster',
  variants: ['gdal raster'],
  category: 'tool'
},
{
  name: 'Sentinel',
  variants: ['sentinel-1', 'sentinel-2', 'copernicus'],
  category: 'other'
},
{
  name: 'Landsat',
  variants: ['landsat'],
  category: 'other'
},
{
  name: 'Google Earth Engine',
  variants: ['gee', 'google earth engine'],
  category: 'cloud'
},
{
  name: 'SNAP',
  variants: ['esa snap', 'snap toolbox'],
  category: 'tool'
},
{
  name: 'ENVI',
  variants: ['envi'],
  category: 'tool'
},
{
  name: 'Apache Sedona',
  variants: ['sedona', 'geospark', 'apache sedona'],
  category: 'backend'
},
{
  name: 'GeoMesa',
  variants: ['geomesa'],
  category: 'backend'
},
{
  name: 'GeoParquet',
  variants: ['geoparquet'],
  category: 'other'
},
{
  name: 'Parquet',
  variants: ['parquet'],
  category: 'database'
},
{
  name: 'DuckDB',
  variants: ['duckdb'],
  category: 'database'
},
{
  name: 'OpenStreetMap',
  variants: ['osm', 'openstreetmap'],
  category: 'other'
},
{
  name: 'Overpass API',
  variants: ['overpass', 'overpass api'],
  category: 'backend'
},
{
  name: 'Nominatim',
  variants: ['nominatim'],
  category: 'backend'
},
{
  name: 'Osmosis',
  variants: ['osmosis'],
  category: 'tool'
},
{
  name: 'File Geodatabase',
  variants: ['file geodatabase', 'gdb'],
  category: 'database'
},
{
  name: 'Enterprise Geodatabase',
  variants: ['enterprise geodatabase', 'sde'],
  category: 'database'
},
{
  name: 'Shapefile',
  variants: ['shapefile', 'shp'],
  category: 'other'
},
];
