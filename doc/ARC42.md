# GLAMorous Europe #

**Inhalt:**

[1. Introduction and goals](#1-introduction-and-goals)<br/>
[2. Constraints](#2-constraints)<br/>
[3. Context and scope](#3-context-and-scope)<br/>
[4. Solution strategy](#4-solution-strategy)<br/>
[5. Building block view](#5-building-block-view)<br/>
[6. Runtime view](#6-runtime-view)<br/>
[7. Deployment view](#7-deployment-view)<br/>
[8. Crosscutting concepts](#8-crosscutting-concepts)<br/>
[9. Architecture decisions](#9-architecture-decisions)<br/>
[10. Quality](#10-quality)<br/>
[11. Risks and technical debt](#11-risks-and-technical-debt)<br/>
[12. Glossary](#12-glossary)<br/>
[13. Appendix](#13-appendix)<br/>

# 1. Introduction and goals
**Project name:** GLAMorous Europe

**Short description:**  
GLAMorous Europe brings together users and digital collections from European GLAM institutions (Galleries, Libraries, Archives & Museums) in an artistic and creative way. The app uses a swipe system that allows users to browse digital artworks and create a personalized collection. This collection can be further edited and shared in new, creative ways.

**Goals:**
- Promote accessibility and discovery of European cultural objects.
- Provide a platform for users to interactively discover and combine artworks.
- Use of open licenses and links to further information.

# 2. Constraints
**Technology stack:**  
  - Frontend: React
  - Backend: Node.js
  - Third-party services: Use of Wikipedia APIs for further information.
  
**Licensing:**  
  Use of openly licensed content, such as cultural objects licensed under Creative Commons.

# 3. Context and scope
**Context diagram:**  
The app is at the center and communicates with
- **Users:** Interact with the cultural objects via the mobile app.
- **GLAM institutions:** Provide the digital collections.
- **External APIs:** (e.g. Wikipedia) for further information.

**Context description:**
- Users interact with the app via a swipe system.
- External data sources are integrated to enrich the app with additional information about the artworks.

# 4. Solution strategy
**Architecture pattern:**  
- **Client-server architecture:** Separation of frontend and backend to increase scalability and maintainability.

**Important design decisions:**
- Use of a swipe system for intuitive interaction.
- Focus on mobile use to maximize accessibility.
- Integration of Wikipedia APIs for further information.

# 5. Building block view
**Overview:**  
- **Frontend:** Web app in React.
- **Backend:** Node.js with modular services for collection management.
- **External services:** API connection to Wikipedia and possibly other GLAM-specific APIs.

**Building blocks:**  
1. **User Interface (UI) Module:** Contains all visual components of the app.
2. **Swipe Mechanism Module:** Realizes the swipe logic to rate artworks.
3. **Collection Management Module:** Manages the personalized collections of the users.
4. **Mix & Match Module:** Enables the creative combination of artworks.
5. **API-Connector Module:** Ensures communication with external services such as Wikipedia.

# 6. Runtime view
**Important scenarios:**
1. **Swipe action:** 
   - The user opens the app, sees a work of art and swipes to the right.
   - The swipe logic evaluates the action and saves the decision in the backend.
   - The backend updates the personal collection and delivers the next artwork.
   
2. **Browse collection:**
   - The user opens her collection and searches through the stored artworks.
   - The backend loads the relevant data from the database and makes it available to the app.

3. **Mix & Match:**
   - The user selects artworks from her collection and combines them to create a new artwork.
   - The new creation is saved and can be shared on social networks.

# 7. Deployment view
**System distribution:**
- **Web app:** Runs on the users' end devices in the browser.
- **Backend server:** Runs as a Github cronjob.

# 8. Crosscutting concepts

**User-friendliness:**  
- Intuitive swipe gestures for easy operation.
- Responsive design for optimal display on different devices.

# 9. Architecture decisions
- Intentionally left blank

# 10. Quality
- **Performance:** Fast response times for swipe actions.
- **Usability:** Simple and intuitive interface.

# 11. Risks and technical debt
**Risks:**  
- Dependence on external APIs (e.g. Wikipedia).
- Possible scaling problems with high user volume.

**Technical debt:**  
- Intentionally left blank

# 12. Glossary
- **GLAM:** Galleries, Libraries, Archives & Museums.
- **Swipe system:** Interaction method in which users navigate by swiping content.

# 13. Appendix
- **Prototypes and mockups:** Visual designs of the app interface.
- **API documentation:** Description of interfaces for integration with external services.
