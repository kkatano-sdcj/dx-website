# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
TechNews Hub (dx-website) - AI・テクノロジーの最前線から社内ニュースまで配信できるWebサイト。動画、テキスト、音声ファイルをアップロードして、多様なメディア形式でコンテンツを配信できるプラットフォーム。

## Essential Commands

### Frontend Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Strapi CMS Backend
```bash
cd strapi-backend
npm install          # Install dependencies
npm run develop      # Start Strapi in development mode with admin panel
npm run start        # Start Strapi in production mode
npm run build        # Build Strapi admin panel
```

## Architecture

### Frontend Structure
- **Framework**: React 18 with TypeScript, Vite as build tool
- **Routing**: React Router v7 for single-page application navigation
- **Styling**: Tailwind CSS for utility-first styling
- **API Communication**: Axios for HTTP requests to Strapi backend
- **State Management**: React hooks (useState, useEffect) with custom hooks for data fetching

### Backend Structure
- **CMS**: Strapi 4.15.5 with SQLite database (development)
- **API**: REST endpoints at `http://localhost:1337/api`
- **Content Types**: Article, Category, Author, Tag, Podcast, Event

### Key Integration Points
- Frontend fetches data from Strapi API using services in `/src/services/api.ts`
- Custom hooks in `/src/hooks/` encapsulate data fetching logic
- API base URL configured in `api.ts` as `http://localhost:1337/api`
- Strapi content types define the data structure that frontend TypeScript interfaces mirror

## Content Categories
The platform supports 7 main content categories:
1. AI系ニュース - AI-related news
2. AI活用情報 - AI utilization information
3. テクニカルターム解説 - Technical term explanations
4. 学習コンテンツ - Learning content (beginner/intermediate/advanced levels)
5. Podcast - Audio content with RSS feed support
6. 社内ニュース - Company news
7. イベント告知 - Event announcements

## Content Type Relationships
- Articles have relations with Category, Author, and Tags
- Events and Podcasts are standalone entities
- All content types support image uploads via Strapi's upload plugin

## API Patterns
- List endpoints: `GET /api/{content-type}` with optional populate, filters, sort, pagination
- Detail endpoints: Use filters with slug/id for specific items
- Relations populated via `populate` parameter in API calls
- Frontend TypeScript interfaces in `api.ts` match Strapi's response structure

## Development Ports
- Frontend: http://localhost:5173 (Vite default)
- Strapi Admin: http://localhost:1337/admin
- Strapi API: http://localhost:1337/api

## Development Guidelines (from .cursor/rules)

### Important Rules
1. **技術スタックのバージョンは変更しない** - Do not change versions of frameworks, APIs, or libraries without explicit approval
2. **UI/UXデザインの変更禁止** - Do not modify UI/UX design (layout, colors, fonts, spacing) without approval
3. **明示的に指示されていない変更は行わない** - Only implement explicitly requested changes
4. **重複実装の防止** - Before implementing, check for existing similar features, functions, components, or API endpoints

### Development Process
1. タスク分析と計画 - Analyze tasks, confirm tech stack, identify requirements and potential issues
2. タスク実行 - Execute steps one by one with progress reporting
3. 品質管理 - Validate results, debug issues, verify functionality
4. 最終確認 - Ensure all tasks are complete and aligned with requirements
5. 結果報告 - Report implementation summary, steps taken, and any issues encountered

## Future Implementation Plan (from .kiro/specs)

### Planned Architecture Evolution
The project specifications indicate a future migration to:
- **Frontend**: Next.js 14+ with App Router (currently React with Vite)
- **Backend**: Node.js + Express.js custom API (currently Strapi CMS)
- **Database**: Supabase PostgreSQL for production (currently SQLite)
- **File Storage**: Azure Blob Storage for media files
- **Authentication**: JWT + bcrypt with NextAuth.js

### Key Requirements
- Support for video (MP4, AVI, MOV), audio (MP3, WAV, AAC), and text content
- File size limits: 100MB for video, 50MB for audio
- Content approval workflow (draft → pending → published)
- Responsive design with mobile-first approach
- Accessibility compliance (WCAG 2.1 AA)
- Performance targets: 3-second FCP, progressive loading
- Offline support with caching

### Security Considerations
- JWT authentication with role-based access control
- File type validation and size restrictions
- CSRF token verification
- Input sanitization and XSS protection